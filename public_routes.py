"""
Sunnova Medical Supplies — public storefront routes (transactional).

Registered directly on the app (not a blueprint) so template endpoint names stay
short: url_for('index'), url_for('cart'), etc. The storefront is a real
transactional surface sharing the admin's database:

  browse catalog → product page → add to cart → checkout → Order + Payment + Delivery

Plus quote requests, a contact form, order tracking, and storefront analytics
(product views, add-to-cart, search logging) that feed the admin Reports/Search
screens. Live Settings + CMS content + featured reviews are injected via the
context processor at the bottom (the admin↔storefront bridge).
"""

import secrets

from flask import render_template, request, redirect, url_for, session, flash, abort

from extensions import db
from emailer import send_email
from models import (
    Product, Category, Cart, CartItem, Order, OrderItem, Payment, Delivery, Customer,
    Quote, QuoteItem, Coupon, Review, ContentBlock, Setting, ProductView, CartAdd,
    SearchQuery, ContactSubmission, AuditLog, ACTION_TONE,
)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _public_log(action, target, actor="Customer"):
    db.session.add(AuditLog(
        actor=actor, action=action, target=target,
        ip=(request.headers.get("X-Forwarded-For") or request.remote_addr or "-"),
        tone=ACTION_TONE.get(action, "blue")))


def _cart(create=True):
    """The current session's active cart (created on demand)."""
    sid = session.get("cart_sid")
    if not sid:
        if not create:
            return None
        sid = secrets.token_hex(8)
        session["cart_sid"] = sid
    cart = Cart.query.filter_by(session_id=sid, status="active").first()
    if cart is None and create:
        cart = Cart(session_id=sid, status="active")
        db.session.add(cart)
        db.session.commit()
    return cart


def _settings_map():
    return {s.key: s.value for s in Setting.query.all()}


def _sfloat(m, key, default):
    try:
        return float(m.get(key, default))
    except (TypeError, ValueError):
        return default


def _int(value, default=0):
    try:
        return int(float(value)) if value not in (None, "") else default
    except (TypeError, ValueError):
        return default


def _next_order_id():
    nums = [int(o.id.split("-")[1]) for o in Order.query.all()
            if o.id.startswith("SN-") and o.id.split("-")[1].isdigit()]
    return f"SN-{(max(nums) + 1) if nums else 10001}"


def _published_products():
    return Product.query.filter(Product.status == "Published")


# ---------------------------------------------------------------------------
# Route registration
# ---------------------------------------------------------------------------
def register_public_routes(app):

    @app.route("/")
    def index():
        featured = _published_products().filter(Product.featured.is_(True)).limit(6).all()
        return render_template("index.html",
                               featured_products=[p.to_public_dict() for p in featured])

    @app.route("/why-us")
    def why_us():
        return render_template("why-us.html")

    @app.route("/how-to-order")
    def how_to_order():
        return render_template("how-to-order.html")

    # ---- Catalog + search -------------------------------------------------
    @app.route("/services-and-catalog")
    def services_and_catalog():
        q = (request.args.get("q") or "").strip()
        cat = (request.args.get("category") or "").strip()
        query = _published_products()
        if q:
            like = f"%{q}%"
            query = query.filter(db.or_(Product.name.ilike(like), Product.short.ilike(like),
                                        Product.sku.ilike(like), Product.category.ilike(like)))
        if cat:
            query = query.filter(Product.category == cat)
        products = query.order_by(Product.featured.desc(), Product.name).all()
        # Log the search so the admin Search screen has real popular/no-result data.
        if q:
            db.session.add(SearchQuery(term=q.lower(), results=len(products),
                                       session_id=session.get("cart_sid", "anon")))
            db.session.commit()
        return render_template("service-and-catalog.html",
                               products=[p.to_public_dict() for p in products],
                               categories=[c.to_dict() for c in Category.query.filter_by(status="Published").order_by(Category.sort).all()],
                               q=q, active_category=cat, result_count=len(products))

    # ---- Product page -----------------------------------------------------
    @app.route("/product")
    def product():
        slug = request.args.get("slug")
        pid = request.args.get("id")
        p = None
        if slug:
            p = Product.query.filter_by(slug=slug).first()
        elif pid and pid.isdigit():
            p = db.session.get(Product, int(pid))
        if p is None:  # fall back to the first featured/published item for a bare /product
            p = _published_products().order_by(Product.featured.desc(), Product.id).first()
        if p is None:
            abort(404)
        # Track the view for the "frequently viewed" report.
        db.session.add(ProductView(sku=p.sku, name=p.name))
        db.session.commit()
        related = _published_products().filter(Product.category == p.category, Product.id != p.id).limit(4).all()
        return render_template("product.html", product=p.to_public_dict(),
                               related=[r.to_public_dict() for r in related])

    # ---- Cart -------------------------------------------------------------
    @app.route("/cart")
    def cart():
        c = _cart(create=False)
        return render_template("cart.html", cart=(c.to_dict() if c else {"items": [], "count": 0, "subtotal": 0}))

    @app.route("/cart/add", methods=["POST"])
    def cart_add():
        sku = request.form.get("sku", "")
        qty = max(_int(request.form.get("qty"), 1), 1)
        p = Product.query.filter_by(sku=sku).first()
        if p is None or p.status != "Published":
            flash("That product is unavailable.", "error")
            return redirect(request.referrer or url_for("services_and_catalog"))
        c = _cart()
        item = next((i for i in c.items if i.sku == sku), None)
        if item:
            item.qty += qty
        else:
            c.items.append(CartItem(sku=p.sku, name=p.name, price=p.price_now, qty=qty))
        db.session.add(CartAdd(sku=p.sku, name=p.name))
        db.session.commit()
        flash(f"Added {p.name} to your cart.", "success")
        return redirect(url_for("cart"))

    @app.route("/cart/update", methods=["POST"])
    def cart_update():
        c = _cart()
        item = db.session.get(CartItem, _int(request.form.get("item_id")))
        if item and item.cart_id == c.id:
            qty = _int(request.form.get("qty"))
            if qty <= 0:
                db.session.delete(item)
            else:
                item.qty = qty
            db.session.commit()
        return redirect(url_for("cart"))

    @app.route("/cart/remove", methods=["POST"])
    def cart_remove():
        c = _cart()
        item = db.session.get(CartItem, _int(request.form.get("item_id")))
        if item and item.cart_id == c.id:
            db.session.delete(item)
            db.session.commit()
        return redirect(url_for("cart"))

    # ---- Checkout ---------------------------------------------------------
    @app.route("/checkout", methods=["GET", "POST"])
    def checkout():
        c = _cart(create=False)
        if not c or not c.items:
            flash("Your cart is empty.", "warning")
            return redirect(url_for("services_and_catalog"))
        settings = _settings_map()
        min_order = _sfloat(settings, "store.min_order", 0)
        free_thresh = _sfloat(settings, "store.free_delivery_threshold", 150)
        base_fee = _sfloat(settings, "delivery.fee", 15)
        subtotal = c.subtotal
        delivery_fee = 0.0 if subtotal >= free_thresh else base_fee

        if request.method == "POST":
            if subtotal < min_order:
                flash(f"Minimum order is ${min_order:.0f}. Add more items to check out.", "error")
                return redirect(url_for("checkout"))
            if not request.form.get("name") or not request.form.get("email") or not request.form.get("address"):
                flash("Name, email and delivery address are required.", "error")
                return redirect(url_for("checkout"))
            oid = _place_order(c, request.form, settings)
            return redirect(url_for("order_confirmation", order_id=oid))

        return render_template("checkout.html",
                               cart=c.to_dict(), subtotal=subtotal, delivery_fee=delivery_fee,
                               min_order=min_order, free_threshold=free_thresh,
                               total=round(subtotal + delivery_fee, 2))

    @app.route("/order-confirmation/<order_id>")
    def order_confirmation(order_id):
        o = db.session.get(Order, order_id)
        if o is None:
            abort(404)
        return render_template("order-confirmation.html", order=o.to_detail_dict())

    # ---- Quote request ----------------------------------------------------
    @app.route("/request-quote", methods=["POST"])
    def request_quote():
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        if not name or not email:
            flash("Name and email are required to request a quote.", "error")
            return redirect(request.referrer or url_for("services_and_catalog"))
        qid = _next_quote_id()
        quote = Quote(id=qid, customer_name=name, business=request.form.get("business", ""),
                      email=email, phone=request.form.get("phone", ""), customer_type="Business",
                      status="New", assigned="Unassigned",
                      notes=request.form.get("message", ""),
                      preferred_delivery=request.form.get("preferred_delivery", "To be confirmed"))
        # Include the cart (if any) or a single requested SKU as quote lines.
        c = _cart(create=False)
        single_sku = request.form.get("sku")
        if single_sku:
            p = Product.query.filter_by(sku=single_sku).first()
            if p:
                quote.items.append(QuoteItem(name=p.name, sku=p.sku,
                                             qty=int(request.form.get("qty") or 1), quoted=None))
                quote.products_summary = p.name
        elif c and c.items:
            for it in c.items:
                quote.items.append(QuoteItem(name=it.name, sku=it.sku, qty=it.qty, quoted=None))
            quote.products_summary = ", ".join(i.name for i in c.items[:3])
        db.session.add(quote)
        _public_log("Quote submitted", f"{qid} · {name}")
        db.session.commit()
        send_email(email, key="quote_received", context={"name": name, "quote_id": qid})
        flash(f"Thanks {name.split(' ')[0]}! Your quote request {qid} was received — we'll respond shortly.", "success")
        return redirect(request.referrer or url_for("services_and_catalog"))

    # ---- Contact ----------------------------------------------------------
    @app.route("/contact", methods=["GET", "POST"])
    def contact():
        if request.method == "POST":
            name = request.form.get("name", "").strip()
            email = request.form.get("email", "").strip()
            if not name or not email:
                flash("Name and email are required.", "error")
                return redirect(url_for("contact"))
            db.session.add(ContactSubmission(
                name=name, email=email, phone=request.form.get("phone", ""),
                subject=request.form.get("subject", "Website enquiry"),
                message=request.form.get("message", "")))
            _public_log("Contact form submission", f"{name} <{email}>")
            db.session.commit()
            send_email(email, subject="We received your message — Sunnova Medical Supplies",
                       context={"name": name},
                       body=(f"Hi {name},\n\nThanks for reaching out to Sunnova Medical Supplies. "
                             f"We've received your message and will respond same day during business hours."))
            flash("Thanks for reaching out — we'll be in touch shortly.", "success")
            return redirect(url_for("contact"))
        return render_template("contact.html")

    # ---- Order tracking ---------------------------------------------------
    @app.route("/track-order")
    def track_order():
        oid = (request.args.get("order") or "").strip().upper()
        order = None
        if oid:
            o = db.session.get(Order, oid)
            if o:
                # Only reveal when the email matches, if one was supplied.
                email = (request.args.get("email") or "").strip().lower()
                if not email or (o.email or "").lower() == email:
                    order = o.to_detail_dict()
                else:
                    flash("No order found for that number and email.", "error")
            else:
                flash(f"No order found with number {oid}.", "error")
        return render_template("track-order.html", order=order, searched=bool(oid))

    # Storefront context (live settings/content/reviews/cart badge).
    register_public_context(app)


# ---------------------------------------------------------------------------
# Order/quote creation
# ---------------------------------------------------------------------------
def _next_quote_id():
    nums = [int(q.id.split("-")[1]) for q in Quote.query.all()
            if q.id.startswith("Q-") and q.id.split("-")[1].isdigit()]
    return f"Q-{(max(nums) + 1) if nums else 3400}"


def _place_order(cart, form, settings):
    oid = _next_order_id()
    name = form.get("name", "").strip()
    email = form.get("email", "").strip()
    phone = form.get("phone", "").strip()
    business = form.get("business", "").strip()
    address = form.get("address", "").strip()
    subtotal = cart.subtotal

    # Coupon application (closes the "coupons never applied at checkout" gap).
    code = (form.get("coupon") or "").strip().upper()
    discount, coupon = 0.0, None
    if code:
        coupon = Coupon.query.filter_by(code=code, active=True).first()
        usable = coupon and subtotal >= coupon.min_order and \
            (coupon.usage_limit == 0 or coupon.used < coupon.usage_limit)
        if usable:
            if coupon.type == "Percentage":
                discount = -round(subtotal * coupon.amount / 100.0, 2)
            elif coupon.type == "Fixed":
                discount = -round(min(coupon.amount, subtotal), 2)
        else:
            coupon = None  # invalid/ineligible → ignore

    free_thresh = _sfloat(settings, "store.free_delivery_threshold", 150)
    base_fee = _sfloat(settings, "delivery.fee", 15)
    delivery_fee = 0.0 if subtotal >= free_thresh else base_fee
    if coupon and coupon.type == "Free Delivery":
        delivery_fee = 0.0

    order = Order(
        id=oid, customer_name=name, business=business, email=email, phone=phone,
        customer_type="Individual", delivery_address=address, billing_address=address,
        payment="Paid", status="Pending", delivery="Local Delivery",
        delivery_status="Awaiting Scheduling", tax=0.0, delivery_fee=delivery_fee,
        discount=discount, coupon_code=(code if coupon else ""), notes=form.get("notes", ""))
    # Attach the order to a customer: prefer the logged-in account, then fall
    # back to matching a customer by the email entered at checkout.
    cust = None
    cid = session.get("customer_id")
    if cid:
        cust = db.session.get(Customer, cid)
    if cust is None and email:
        from sqlalchemy import func
        cust = Customer.query.filter(func.lower(Customer.email) == email.lower()).first()
    if cust:
        order.customer_id = cust.id
    for it in cart.items:
        order.items.append(OrderItem(name=it.name, sku=it.sku, qty=it.qty, price=it.price))
        p = Product.query.filter_by(sku=it.sku).first()
        if p:
            p.stock = max(p.stock - it.qty, 0)
    db.session.add(order)
    db.session.flush()  # so order.total reflects the items

    db.session.add(Payment(order_id=oid, customer=name, amount=order.total, status="Paid",
                           provider="Stripe", txn_id="txn_" + oid.replace("-", "").lower()))
    db.session.add(Delivery(order_id=oid, customer=name, address=address, phone=phone,
                            zip=form.get("zip", ""), status="Awaiting Scheduling"))
    if coupon:
        coupon.used += 1
    cart.status = "converted"
    cart.order_id = oid
    cart.customer_name = name
    cart.email = email
    # Mark this session's searches as converted (search-conversion tracking).
    SearchQuery.query.filter_by(session_id=cart.session_id, converted=False).update({"converted": True})
    _public_log("New order placed", f"{oid} · {name} · ${order.total:.2f}")
    db.session.commit()
    send_email(email, key="order_confirmation", context={"name": name, "order_id": oid})
    return oid


# ---------------------------------------------------------------------------
# Storefront context: live Settings, CMS content, featured reviews, cart badge
# ---------------------------------------------------------------------------
def register_public_context(app):
    @app.context_processor
    def _inject_public_context():
        # Admin pages have their own context; skip the storefront queries there.
        if request.path.startswith("/admin") or request.path.startswith("/static"):
            return {}
        content = {b.key: b.value for b in ContentBlock.query.all()}
        settings = {s.key: s.value for s in Setting.query.all()}
        c = _cart(create=False)
        return {
            "content": content,
            "site": settings,
            "cart_count": (c.count if c else 0),
            "featured_reviews": [r.to_dict() for r in Review.query.filter_by(
                status="Approved", featured=True).limit(6).all()],
            "nav_categories": [c.to_dict() for c in Category.query.filter_by(
                status="Published").order_by(Category.sort).limit(8).all()],
        }
