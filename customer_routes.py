"""
Sunnova Medical Supplies — customer accounts & dashboard (storefront).

A self-service area for shoppers, kept deliberately separate from the admin's
Flask-Login system: customers are authenticated with a signed session cookie
(``session['customer_id']``), so nothing here can touch admin sessions or
role-based access.

Routes (all registered directly on the app, storefront-style):
  /account/register  · /account/login · /account/logout
  /account           · /account/orders · /account/orders/<id> · /account/profile

Registered from app.create_app() via register_customer_routes(app).
"""

from datetime import datetime
from functools import wraps

from flask import (
    render_template, request, redirect, url_for, session, flash, abort,
)
from sqlalchemy import func

from extensions import db
from emailer import send_email
from models import Customer, Order, Quote


# ---------------------------------------------------------------------------
# Session-based customer auth helpers
# ---------------------------------------------------------------------------
def current_customer():
    """The logged-in Customer for this session, or None."""
    cid = session.get("customer_id")
    if not cid:
        return None
    cust = db.session.get(Customer, cid)
    # A suspended or deleted account is treated as logged out.
    if cust is None or cust.account == "Suspended":
        session.pop("customer_id", None)
        return None
    return cust


def _login_customer(cust):
    session["customer_id"] = cust.id


def _logout_customer():
    session.pop("customer_id", None)


def customer_login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if current_customer() is None:
            flash("Please sign in to view your account.", "warning")
            return redirect(url_for("account_login", next=request.path))
        return view(*args, **kwargs)
    return wrapped


def _safe_next(target):
    """Only allow same-site relative redirects (never an off-site URL).
    Rejects protocol-relative (//host) and backslash tricks (/\\host) that
    browsers normalize to an absolute off-site URL."""
    if (target and target.startswith("/")
            and not target.startswith("//") and "\\" not in target):
        return target
    return url_for("account_dashboard")


def _password_error(pw, confirm):
    if pw != confirm:
        return "Passwords do not match."
    if len(pw) < 8:
        return "Use at least 8 characters."
    if not any(c.isdigit() for c in pw) or not any(c.isalpha() for c in pw):
        return "Use both letters and numbers."
    return None


def _link_guest_orders(cust):
    """Attach any past guest orders placed with this email to the account."""
    if not cust.email:
        return
    Order.query.filter(
        Order.customer_id.is_(None),
        func.lower(Order.email) == cust.email.lower(),
    ).update({"customer_id": cust.id}, synchronize_session=False)


# ---------------------------------------------------------------------------
# Route registration
# ---------------------------------------------------------------------------
def register_customer_routes(app):

    # ---- Register / claim account ----------------------------------------
    @app.route("/account/register", methods=["GET", "POST"])
    def account_register():
        if current_customer():
            return redirect(url_for("account_dashboard"))
        if request.method == "POST":
            name = request.form.get("name", "").strip()
            email = request.form.get("email", "").strip().lower()
            phone = request.form.get("phone", "").strip()
            business = request.form.get("business", "").strip()
            pw = request.form.get("password", "")
            confirm = request.form.get("confirm", "")

            if not name or not email:
                flash("Name and email are required.", "error")
                return render_template("account/register.html", form=request.form)
            err = _password_error(pw, confirm)
            if err:
                flash(err, "error")
                return render_template("account/register.html", form=request.form)

            existing = Customer.query.filter(func.lower(Customer.email) == email).first()
            if existing and existing.has_login:
                flash("An account with this email already exists — please sign in.", "warning")
                return redirect(url_for("account_login"))

            if existing:  # admin-created customer claiming their login
                cust = existing
                cust.name = name or cust.name
                cust.phone = phone or cust.phone
                cust.business = business or cust.business
            else:
                cust = Customer(
                    name=name, email=email, phone=phone, business=business,
                    type=("Business" if business else "Individual"),
                    account="Verified", member_since=str(datetime.now().year))
                db.session.add(cust)

            cust.set_password(pw)
            db.session.flush()          # assign an id for order linking
            _link_guest_orders(cust)
            db.session.commit()

            send_email(cust.email, key="welcome", context={"name": cust.name})
            _login_customer(cust)
            flash(f"Welcome, {cust.name.split(' ')[0]}! Your account is ready.", "success")
            return redirect(url_for("account_dashboard"))

        return render_template("account/register.html", form={})

    # ---- Login -----------------------------------------------------------
    @app.route("/account/login", methods=["GET", "POST"])
    def account_login():
        if current_customer():
            return redirect(url_for("account_dashboard"))
        if request.method == "POST":
            email = request.form.get("email", "").strip().lower()
            password = request.form.get("password", "")
            cust = Customer.query.filter(func.lower(Customer.email) == email).first()
            if cust and cust.account == "Suspended":
                flash("This account is suspended. Please contact us for help.", "error")
            elif cust and cust.check_password(password):
                _login_customer(cust)
                cust.member_since = cust.member_since or str(datetime.now().year)
                db.session.commit()
                # 'next' arrives as a hidden form field on POST (falls back to query arg).
                return redirect(_safe_next(request.form.get("next") or request.args.get("next")))
            else:
                flash("Incorrect email or password.", "error")
        return render_template("account/login.html")

    # ---- Logout ----------------------------------------------------------
    @app.route("/account/logout")
    def account_logout():
        _logout_customer()
        flash("You have been signed out.", "success")
        return redirect(url_for("index"))

    # ---- Dashboard overview ----------------------------------------------
    @app.route("/account")
    @customer_login_required
    def account_dashboard():
        cust = current_customer()
        orders = (Order.query.filter_by(customer_id=cust.id)
                  .order_by(Order.created_at.desc()).all())
        open_quotes = Quote.query.filter(
            func.lower(Quote.email) == (cust.email or "").lower(),
            Quote.status.notin_(["Converted to Order", "Declined", "Closed"]),
        ).count()
        active_statuses = ("Pending", "Confirmed", "Processing", "Out for Delivery")
        stats = {
            "orders": len(orders),
            "spent": round(sum(o.total for o in orders), 2),
            "in_progress": sum(1 for o in orders if o.status in active_statuses),
            "open_quotes": open_quotes,
        }
        return render_template("account/dashboard.html", customer=cust,
                               stats=stats, recent=[o.to_dict() for o in orders[:5]])

    # ---- Order history ---------------------------------------------------
    @app.route("/account/orders")
    @customer_login_required
    def account_orders():
        cust = current_customer()
        orders = (Order.query.filter_by(customer_id=cust.id)
                  .order_by(Order.created_at.desc()).all())
        return render_template("account/orders.html", customer=cust,
                               orders=[o.to_dict() for o in orders])

    # ---- Single order detail (ownership-checked) -------------------------
    @app.route("/account/orders/<order_id>")
    @customer_login_required
    def account_order_detail(order_id):
        cust = current_customer()
        order = db.session.get(Order, order_id)
        if order is None or order.customer_id != cust.id:
            abort(404)   # never reveal another customer's order
        return render_template("account/order_detail.html", customer=cust,
                               order=order.to_detail_dict())

    # ---- Profile + change password ---------------------------------------
    @app.route("/account/profile", methods=["GET", "POST"])
    @customer_login_required
    def account_profile():
        cust = current_customer()
        if request.method == "POST":
            action = request.form.get("_action")
            if action == "password":
                current_pw = request.form.get("current_password", "")
                pw = request.form.get("password", "")
                confirm = request.form.get("confirm", "")
                if not cust.check_password(current_pw):
                    flash("Your current password is incorrect.", "error")
                else:
                    err = _password_error(pw, confirm)
                    if err:
                        flash(err, "error")
                    else:
                        cust.set_password(pw)
                        db.session.commit()
                        flash("Password updated.", "success")
            else:  # profile details
                cust.name = request.form.get("name", "").strip() or cust.name
                cust.phone = request.form.get("phone", "").strip()
                cust.business = request.form.get("business", "").strip()
                cust.address = request.form.get("address", "").strip()
                if cust.business and cust.type == "Individual":
                    cust.type = "Business"
                db.session.commit()
                flash("Profile updated.", "success")
            return redirect(url_for("account_profile"))
        return render_template("account/profile.html", customer=cust)

    register_customer_context(app)


def register_customer_context(app):
    """Make the logged-in customer available to every storefront template."""
    @app.context_processor
    def _inject_customer():
        if request.path.startswith("/admin") or request.path.startswith("/static"):
            return {}
        return {"current_customer": current_customer()}
