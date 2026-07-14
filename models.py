"""
Sunnova Medical Supplies — database models.

Each model owns a ``to_dict()`` (and detail variant where needed) that reproduces
the exact shape the admin templates already consume, so switching the routes from
in-memory sample data to the database required no template changes.

Runs on PostgreSQL only — set DATABASE_URL (there is no SQLite fallback), per the
spec ("store metadata in PostgreSQL").
"""

from datetime import datetime, timezone

from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from extensions import db


def _now():
    # Naive UTC. Postgres TIMESTAMP (WITHOUT TIME ZONE) columns and the seed's
    # naive sample dates must not be mixed with tz-aware values, so normalize to
    # a naive UTC instant everywhere the app stamps a timestamp.
    return datetime.now(timezone.utc).replace(tzinfo=None)


# ---------------------------------------------------------------------------
# Role-based access control
# ---------------------------------------------------------------------------
# Each admin section maps to a permission key. A role grants a set of these.
# "*" means full access (Super Admin). Enforced by the role_required decorator.
PERMISSIONS = [
    "dashboard", "products", "categories", "inventory", "orders", "quotes",
    "delivery", "customers", "applications", "uploads", "admin_users",
    "audit_logs", "settings",
    # V2
    "coupons", "payments", "reports", "search", "reviews", "content",
    "email_templates", "notifications",
]

ROLE_PERMISSIONS = {
    "Super Admin": {"*"},
    "Store Manager": {"dashboard", "products", "categories", "inventory", "orders", "quotes",
                      "customers", "delivery", "uploads", "coupons", "payments", "reports",
                      "reviews", "notifications"},
    "Fulfillment Staff": {"dashboard", "orders", "delivery", "inventory", "notifications"},
    "Sales/Admin Staff": {"dashboard", "quotes", "customers", "applications", "orders", "notifications"},
    "Content Editor": {"dashboard", "uploads", "settings", "content", "email_templates",
                       "reviews", "search", "notifications"},
    "Support Staff": {"dashboard", "customers", "orders", "quotes", "notifications"},
}

# Description + badge tone for the roles overview cards.
ROLE_META = {
    "Super Admin": {"access": "Full access to everything", "tone": "brand"},
    "Store Manager": {"access": "Products, orders, customers, quotes, inventory", "tone": "blue"},
    "Fulfillment Staff": {"access": "Orders, delivery, inventory only", "tone": "teal"},
    "Sales/Admin Staff": {"access": "Quotes, customers, account applications", "tone": "green"},
    "Content Editor": {"access": "CMS content, testimonials, SEO content only", "tone": "amber"},
    "Support Staff": {"access": "Customers, orders, quotes - limited edit", "tone": "purple"},
}


def role_can(role_name, permission):
    perms = ROLE_PERMISSIONS.get(role_name, set())
    return "*" in perms or permission in perms


# ---------------------------------------------------------------------------
# Admin users
# ---------------------------------------------------------------------------
class AdminUser(UserMixin, db.Model):
    __tablename__ = "admin_users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(160), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(60), nullable=False, default="Support Staff")
    status = db.Column(db.String(20), nullable=False, default="Active")  # Active/Invited/Disabled
    last_active = db.Column(db.String(40), default="Never")
    require_secure_password = db.Column(db.Boolean, default=True)
    reset_token = db.Column(db.String(80), index=True)
    reset_expires = db.Column(db.DateTime)

    def set_password(self, raw):
        self.password_hash = generate_password_hash(raw)

    def check_password(self, raw):
        return check_password_hash(self.password_hash, raw)

    @property
    def initials(self):
        parts = [p for p in self.name.replace(".", "").split(" ") if p]
        if not parts:
            return "?"
        return (parts[0][0] + (parts[1][0] if len(parts) > 1 else "")).upper()

    def can(self, permission):
        return self.status == "Active" and role_can(self.role, permission)

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "email": self.email, "role": self.role,
            "status": self.status, "last_active": self.last_active, "initials": self.initials,
        }


# ---------------------------------------------------------------------------
# Catalog
# ---------------------------------------------------------------------------
class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(140), unique=True, nullable=False)
    parent = db.Column(db.String(120))
    featured = db.Column(db.Boolean, default=False)
    sort = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default="Published")  # Published/Draft/Archived
    description = db.Column(db.Text, default="")
    seo_title = db.Column(db.String(200), default="")
    seo_description = db.Column(db.String(400), default="")
    image_url = db.Column(db.String(500))

    def product_count(self):
        return Product.query.filter_by(category=self.name).count()

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "slug": self.slug, "parent": self.parent,
            "products": self.product_count(), "featured": self.featured, "sort": self.sort,
            "status": self.status, "description": self.description,
            "seo_title": self.seo_title, "seo_description": self.seo_description,
            "image_url": self.image_url,
        }


class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    sku = db.Column(db.String(60), unique=True, nullable=False, index=True)
    category = db.Column(db.String(120))
    brand = db.Column(db.String(80))
    price = db.Column(db.Float, default=0.0)
    sale_price = db.Column(db.Float)
    cost = db.Column(db.Float)
    stock = db.Column(db.Integer, default=0)
    committed = db.Column(db.Integer, default=0)
    threshold = db.Column(db.Integer, default=0)
    sale_mode = db.Column(db.String(40), default="Direct Purchase")
    featured = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(20), default="Published")  # Published/Draft/Archived
    short = db.Column(db.String(400), default="")
    img_tone = db.Column(db.String(20), default="blue")
    # Extended catalog fields (spec §2 Add/Edit product).
    slug = db.Column(db.String(180), index=True)
    subcategory = db.Column(db.String(120), default="")
    description = db.Column(db.Text, default="")
    specs = db.Column(db.Text, default="")
    seo_title = db.Column(db.String(200), default="")
    seo_description = db.Column(db.String(400), default="")
    image_url = db.Column(db.String(500))  # primary image (CDN); None → gradient tile
    updated_at = db.Column(db.DateTime, default=_now, onupdate=_now)

    images = db.relationship("ProductImage", backref="product",
                             cascade="all, delete-orphan", order_by="ProductImage.sort")
    variants = db.relationship("ProductVariant", backref="product",
                               cascade="all, delete-orphan")

    @property
    def price_now(self):
        return self.sale_price or self.price

    @property
    def availability(self):
        """Derived stock status — single source of truth for both the catalog
        availability badge and the inventory screen."""
        if self.sale_mode == "Quote Only":
            return "Quote Required"
        if self.stock == 0:
            return "Out of Stock"
        if self.stock <= (self.threshold or 0):
            return "Low Stock"
        if self.sale_mode == "Account Only":
            return "Special Order"
        return "In Stock"

    @property
    def available(self):
        return max(self.stock - (self.committed or 0), 0)

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "sku": self.sku, "category": self.category,
            "brand": self.brand, "price": self.price, "sale_price": self.sale_price,
            "cost": self.cost, "stock": self.stock, "threshold": self.threshold,
            "availability": self.availability, "sale_mode": self.sale_mode,
            "featured": self.featured, "status": self.status,
            "updated": _fmt_date(self.updated_at), "short": self.short, "img_tone": self.img_tone,
            "slug": self.slug, "subcategory": self.subcategory, "description": self.description,
            "specs": self.specs, "seo_title": self.seo_title, "seo_description": self.seo_description,
            "image_url": self.image_url,
            "gallery": [im.to_dict() for im in self.images],
            "variant_list": [v.to_dict() for v in self.variants],
        }

    def to_public_dict(self):
        """Shape consumed by the storefront catalog/product pages."""
        buyable = self.sale_mode in ("Direct Purchase", "Direct Purchase or Quote")
        return {
            "id": self.id, "name": self.name, "sku": self.sku, "slug": self.slug,
            "category": self.category, "brand": self.brand, "short": self.short,
            "description": self.description, "specs": self.specs,
            "price": self.price, "sale_price": self.sale_price, "price_now": self.price_now,
            "availability": self.availability, "sale_mode": self.sale_mode,
            "img_tone": self.img_tone, "image_url": self.image_url,
            "gallery": [im.to_dict() for im in self.images],
            "buyable": buyable and self.availability != "Out of Stock",
            "quotable": self.sale_mode in ("Quote Only", "Direct Purchase or Quote", "Account Only"),
        }

    def to_inventory_dict(self):
        return {
            "sku": self.sku, "name": self.name, "stock": self.stock,
            "threshold": self.threshold, "status": self.availability,
            "committed": self.committed or 0, "available": self.available,
            "updated": _fmt_date(self.updated_at),
        }


# ---------------------------------------------------------------------------
# Customers
# ---------------------------------------------------------------------------
class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140), nullable=False)
    email = db.Column(db.String(160))
    phone = db.Column(db.String(40))
    business = db.Column(db.String(160), default="")
    type = db.Column(db.String(40), default="Individual")
    account = db.Column(db.String(20), default="Verified")  # Verified/Pending/Suspended
    member_since = db.Column(db.String(40), default="")
    notes = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=_now)
    # Storefront login. Nullable: admin-created customers have no password until
    # they register ("claim" their account) from the storefront.
    password_hash = db.Column(db.String(255))
    address = db.Column(db.String(300), default="")

    def set_password(self, raw):
        self.password_hash = generate_password_hash(raw)

    def check_password(self, raw):
        return bool(self.password_hash) and check_password_hash(self.password_hash, raw)

    @property
    def has_login(self):
        return bool(self.password_hash)

    @property
    def initials(self):
        parts = [p for p in (self.name or "").replace(".", "").split(" ") if p]
        if not parts:
            return "?"
        return (parts[0][0] + (parts[1][0] if len(parts) > 1 else "")).upper()

    def order_count(self):
        return Order.query.filter_by(customer_id=self.id).count()

    def total_spent(self):
        return sum(o.total for o in Order.query.filter_by(customer_id=self.id).all())

    def last_order_date(self):
        o = Order.query.filter_by(customer_id=self.id).order_by(Order.created_at.desc()).first()
        return _fmt_date(o.created_at) if o else "-"

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "email": self.email, "phone": self.phone,
            "business": self.business or "-", "type": self.type, "account": self.account,
            "orders": self.order_count(), "spent": self.total_spent(),
            "last_order": self.last_order_date(),
        }


# ---------------------------------------------------------------------------
# Orders
# ---------------------------------------------------------------------------
class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.String(20), primary_key=True)  # e.g. SN-10428
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))
    customer_name = db.Column(db.String(140))
    business = db.Column(db.String(160))
    email = db.Column(db.String(160))
    phone = db.Column(db.String(40))
    customer_type = db.Column(db.String(40))
    delivery_address = db.Column(db.String(300))
    billing_address = db.Column(db.String(300))
    payment = db.Column(db.String(30), default="Pending")
    status = db.Column(db.String(30), default="Pending")
    delivery = db.Column(db.String(60), default="Local Delivery")
    delivery_status = db.Column(db.String(40), default="Awaiting Scheduling")
    delivery_date = db.Column(db.String(40), default="")
    coupon_code = db.Column(db.String(40), default="")
    tax = db.Column(db.Float, default=0.0)
    delivery_fee = db.Column(db.Float, default=0.0)
    discount = db.Column(db.Float, default=0.0)
    notes = db.Column(db.Text, default="")
    internal_notes = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=_now)

    items = db.relationship("OrderItem", backref="order", cascade="all, delete-orphan")

    @property
    def subtotal(self):
        return round(sum(i.subtotal for i in self.items), 2)

    @property
    def total(self):
        return round(self.subtotal + (self.tax or 0) + (self.delivery_fee or 0) + (self.discount or 0), 2)

    def to_dict(self):
        return {
            "id": self.id, "customer": self.customer_name, "business": self.business,
            "date": _fmt_date(self.created_at), "total": self.total, "payment": self.payment,
            "status": self.status, "delivery": self.delivery,
            "delivery_status": self.delivery_status, "delivery_date": self.delivery_date or "—",
            "items": len(self.items),
        }

    def to_detail_dict(self):
        return {
            "id": self.id, "status": self.status, "payment": self.payment,
            "date": _fmt_datetime(self.created_at), "delivery": self.delivery,
            "delivery_status": self.delivery_status,
            "customer": {
                "name": self.customer_name, "business": self.business, "email": self.email,
                "phone": self.phone, "type": self.customer_type,
            },
            "customer_id": self.customer_id,
            "delivery_address": self.delivery_address, "billing_address": self.billing_address,
            "lines": [i.to_dict() for i in self.items],
            "subtotal": self.subtotal, "tax": self.tax or 0,
            "delivery_fee": self.delivery_fee or 0, "discount": self.discount or 0,
            "total": self.total, "notes": self.notes, "internal_notes": self.internal_notes,
            "timeline": self._timeline(),
        }

    def _timeline(self):
        order = ["Pending", "Confirmed", "Processing", "Out for Delivery", "Delivered"]
        placed = _fmt_datetime(self.created_at)
        steps = [
            {"label": "Order placed", "time": placed, "who": "Customer", "state": "done"},
            {"label": "Payment confirmed", "time": placed if self.payment == "Paid" else "Pending",
             "who": "System", "state": "done" if self.payment == "Paid" else "todo"},
        ]
        idx = order.index(self.status) if self.status in order else 0
        for i, label in enumerate(order[1:], start=1):
            if label == "Confirmed":
                continue
            state = "done" if i < idx else ("current" if i == idx else "todo")
            steps.append({"label": label, "time": "Current" if state == "current" else ("Done" if state == "done" else "Pending"),
                          "who": "System" if state != "todo" else "-", "state": state})
        return steps


class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(20), db.ForeignKey("orders.id"))
    name = db.Column(db.String(200))
    sku = db.Column(db.String(60))
    qty = db.Column(db.Integer, default=1)
    price = db.Column(db.Float, default=0.0)

    @property
    def subtotal(self):
        return round(self.qty * self.price, 2)

    def to_dict(self):
        return {"name": self.name, "sku": self.sku, "qty": self.qty,
                "price": self.price, "subtotal": self.subtotal}


# ---------------------------------------------------------------------------
# Quotes
# ---------------------------------------------------------------------------
class Quote(db.Model):
    __tablename__ = "quotes"

    id = db.Column(db.String(20), primary_key=True)  # e.g. Q-3391
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))
    customer_name = db.Column(db.String(140))
    business = db.Column(db.String(160))
    email = db.Column(db.String(160))
    phone = db.Column(db.String(40))
    customer_type = db.Column(db.String(40))
    products_summary = db.Column(db.String(300))
    status = db.Column(db.String(30), default="New")
    assigned = db.Column(db.String(80), default="Unassigned")
    value = db.Column(db.String(20), default="-")
    preferred_delivery = db.Column(db.String(40), default="")
    notes = db.Column(db.Text, default="")
    internal_notes = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=_now)
    updated_at = db.Column(db.DateTime, default=_now, onupdate=_now)

    items = db.relationship("QuoteItem", backref="quote", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id, "customer": self.customer_name, "business": self.business,
            "products": self.products_summary, "date": _fmt_date(self.created_at),
            "status": self.status, "assigned": self.assigned,
            "updated": _fmt_date(self.updated_at), "value": self.value,
        }

    def to_detail_dict(self):
        return {
            "id": self.id, "status": self.status, "date": _fmt_datetime(self.created_at),
            "assigned": self.assigned,
            "customer": {"name": self.customer_name, "business": self.business,
                         "email": self.email, "phone": self.phone, "type": self.customer_type},
            "customer_id": self.customer_id,
            "preferred_delivery": self.preferred_delivery,
            "lines": [i.to_dict() for i in self.items],
            "notes": self.notes, "internal_notes": self.internal_notes,
            "attachments": [{"name": "bayview-supply-list.pdf", "size": "142 KB"},
                            {"name": "practice-license.pdf", "size": "88 KB"}],
            "history": [{"label": "Quote submitted", "time": _fmt_datetime(self.created_at), "who": "Customer"}],
        }


class QuoteItem(db.Model):
    __tablename__ = "quote_items"

    id = db.Column(db.Integer, primary_key=True)
    quote_id = db.Column(db.String(20), db.ForeignKey("quotes.id"))
    name = db.Column(db.String(200))
    sku = db.Column(db.String(60))
    qty = db.Column(db.Integer, default=1)
    quoted = db.Column(db.Float)

    def to_dict(self):
        return {"name": self.name, "sku": self.sku, "qty": self.qty, "quoted": self.quoted}


# ---------------------------------------------------------------------------
# Account applications
# ---------------------------------------------------------------------------
class Application(db.Model):
    __tablename__ = "applications"

    id = db.Column(db.String(20), primary_key=True)  # e.g. APP-208
    business = db.Column(db.String(160))
    contact = db.Column(db.String(140))
    email = db.Column(db.String(160))
    phone = db.Column(db.String(40))
    type = db.Column(db.String(40))
    status = db.Column(db.String(30), default="New")
    docs = db.Column(db.Integer, default=0)
    address = db.Column(db.String(300), default="")
    notes = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            "id": self.id, "business": self.business, "contact": self.contact,
            "email": self.email, "phone": self.phone, "type": self.type,
            "submitted": _fmt_date(self.created_at), "status": self.status, "docs": self.docs,
            "address": self.address, "notes": self.notes,
        }


# ---------------------------------------------------------------------------
# Inventory adjustments (accountability log)
# ---------------------------------------------------------------------------
class InventoryAdjustment(db.Model):
    __tablename__ = "inventory_adjustments"

    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String(60))
    name = db.Column(db.String(200))
    change = db.Column(db.Integer)          # +/-
    reason = db.Column(db.String(200))
    by = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {"sku": self.sku, "name": self.name, "change": self.change,
                "reason": self.reason, "by": self.by, "time": _fmt_datetime(self.created_at)}


# ---------------------------------------------------------------------------
# Deliveries
# ---------------------------------------------------------------------------
class Delivery(db.Model):
    __tablename__ = "deliveries"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(20))
    customer = db.Column(db.String(160))
    address = db.Column(db.String(300))
    phone = db.Column(db.String(40))
    zip = db.Column(db.String(12))
    date = db.Column(db.String(40), default="-")
    status = db.Column(db.String(40), default="Awaiting Scheduling")
    driver = db.Column(db.String(80), default="Unassigned")
    notes = db.Column(db.Text, default="")

    def to_dict(self):
        return {"id": self.id, "order": self.order_id, "customer": self.customer, "address": self.address,
                "phone": self.phone, "zip": self.zip, "date": self.date,
                "status": self.status, "driver": self.driver, "notes": self.notes or ""}


# ---------------------------------------------------------------------------
# Uploads (metadata only — files live in DigitalOcean Spaces)
# ---------------------------------------------------------------------------
class Upload(db.Model):
    __tablename__ = "uploads"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    type = db.Column(db.String(60))
    size = db.Column(db.String(20))
    dims = db.Column(db.String(20), default="-")
    folder = db.Column(db.String(40))
    by = db.Column(db.String(120))
    tone = db.Column(db.String(20), default="blue")
    url = db.Column(db.String(500))   # public/CDN URL (bytes live in Spaces, not the DB)
    key = db.Column(db.String(500))   # storage object key
    is_image = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "type": self.type, "size": self.size,
                "dims": self.dims, "folder": self.folder, "uploaded": _fmt_date(self.created_at),
                "by": self.by, "tone": self.tone, "url": self.url, "is_image": self.is_image}


# ---------------------------------------------------------------------------
# Audit log (every mutation writes one row)
# ---------------------------------------------------------------------------
class AuditLog(db.Model):
    __tablename__ = "audit_logs"

    id = db.Column(db.Integer, primary_key=True)
    actor = db.Column(db.String(120))
    action = db.Column(db.String(80))
    target = db.Column(db.String(300))
    ip = db.Column(db.String(45), default="-")
    tone = db.Column(db.String(20), default="blue")
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {"time": _fmt_datetime(self.created_at), "actor": self.actor,
                "action": self.action, "target": self.target, "ip": self.ip, "tone": self.tone}


# ---------------------------------------------------------------------------
# Settings (key/value store)
# ---------------------------------------------------------------------------
class Setting(db.Model):
    __tablename__ = "settings"

    key = db.Column(db.String(80), primary_key=True)
    value = db.Column(db.Text, default="")


# ===========================================================================
# V2 features
# ===========================================================================
class Coupon(db.Model):
    __tablename__ = "coupons"

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(40), unique=True, nullable=False)
    type = db.Column(db.String(30), default="Percentage")  # Percentage/Fixed/Free Delivery
    amount = db.Column(db.Float, default=0.0)
    min_order = db.Column(db.Float, default=0.0)
    usage_limit = db.Column(db.Integer, default=0)  # 0 = unlimited
    used = db.Column(db.Integer, default=0)
    scope = db.Column(db.String(120), default="All products")
    expires = db.Column(db.String(40), default="")
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=_now)

    @property
    def status(self):
        return "Enabled" if self.active else "Disabled"

    def value_label(self):
        if self.type == "Percentage":
            return f"{self.amount:.0f}% off"
        if self.type == "Fixed":
            return f"${self.amount:.2f} off"
        return "Free delivery"

    def to_dict(self):
        return {
            "id": self.id, "code": self.code, "type": self.type, "amount": self.amount,
            "value": self.value_label(), "min_order": self.min_order, "usage_limit": self.usage_limit,
            "used": self.used, "scope": self.scope, "expires": self.expires,
            "active": self.active, "status": self.status,
        }


class Payment(db.Model):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(20))
    customer = db.Column(db.String(140))
    amount = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(30), default="Paid")
    provider = db.Column(db.String(40), default="Stripe")
    txn_id = db.Column(db.String(60))
    refund_status = db.Column(db.String(40), default="—")
    failed_reason = db.Column(db.String(160), default="")
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            "id": self.id, "order": self.order_id, "customer": self.customer, "amount": self.amount,
            "status": self.status, "provider": self.provider, "txn_id": self.txn_id,
            "refund_status": self.refund_status, "failed_reason": self.failed_reason,
            "date": _fmt_date(self.created_at),
        }


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(140))
    business_type = db.Column(db.String(60))
    rating = db.Column(db.Integer, default=5)
    body = db.Column(db.Text, default="")
    status = db.Column(db.String(20), default="Pending")  # Pending/Approved/Rejected
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            "id": self.id, "author": self.author, "business_type": self.business_type,
            "rating": self.rating, "body": self.body, "status": self.status,
            "featured": self.featured, "date": _fmt_date(self.created_at),
        }


class ContentBlock(db.Model):
    __tablename__ = "content_blocks"

    key = db.Column(db.String(80), primary_key=True)
    label = db.Column(db.String(120))
    value = db.Column(db.Text, default="")
    group = db.Column(db.String(60), default="General")
    multiline = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {"key": self.key, "label": self.label, "value": self.value,
                "group": self.group, "multiline": self.multiline}


class EmailTemplate(db.Model):
    __tablename__ = "email_templates"

    key = db.Column(db.String(80), primary_key=True)
    name = db.Column(db.String(120))
    subject = db.Column(db.String(200), default="")
    body = db.Column(db.Text, default="")
    enabled = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {"key": self.key, "name": self.name, "subject": self.subject,
                "body": self.body, "enabled": self.enabled,
                "status": "Enabled" if self.enabled else "Disabled"}


class SearchSynonym(db.Model):
    __tablename__ = "search_synonyms"

    id = db.Column(db.Integer, primary_key=True)
    term = db.Column(db.String(80))
    synonyms = db.Column(db.String(300))

    def to_dict(self):
        return {"id": self.id, "term": self.term, "synonyms": self.synonyms}


class PromotedProduct(db.Model):
    __tablename__ = "promoted_products"

    id = db.Column(db.Integer, primary_key=True)
    keyword = db.Column(db.String(80))
    sku = db.Column(db.String(60))
    product_name = db.Column(db.String(200))

    def to_dict(self):
        return {"id": self.id, "keyword": self.keyword, "sku": self.sku, "product_name": self.product_name}


# ---------------------------------------------------------------------------
# Product media & variants (spec §2)
# ---------------------------------------------------------------------------
class ProductImage(db.Model):
    __tablename__ = "product_images"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    url = db.Column(db.String(500))
    key = db.Column(db.String(500))
    sort = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {"id": self.id, "url": self.url, "key": self.key, "sort": self.sort}


class ProductVariant(db.Model):
    __tablename__ = "product_variants"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    name = db.Column(db.String(120))          # e.g. "Small", "Box of 200"
    sku_suffix = db.Column(db.String(30), default="")
    price_delta = db.Column(db.Float, default=0.0)
    stock = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "sku_suffix": self.sku_suffix,
                "price_delta": self.price_delta, "stock": self.stock}


# ---------------------------------------------------------------------------
# Storefront cart (session-scoped) — powers checkout + abandoned-cart tracking
# ---------------------------------------------------------------------------
class Cart(db.Model):
    __tablename__ = "carts"

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(64), index=True)
    status = db.Column(db.String(20), default="active")  # active/converted/abandoned
    customer_name = db.Column(db.String(140), default="")
    email = db.Column(db.String(160), default="")
    order_id = db.Column(db.String(20), default="")      # set when converted
    created_at = db.Column(db.DateTime, default=_now)
    updated_at = db.Column(db.DateTime, default=_now, onupdate=_now)

    items = db.relationship("CartItem", backref="cart", cascade="all, delete-orphan")

    @property
    def count(self):
        return sum(i.qty for i in self.items)

    @property
    def subtotal(self):
        return round(sum(i.subtotal for i in self.items), 2)

    def to_dict(self):
        return {"id": self.id, "count": self.count, "subtotal": self.subtotal,
                "items": [i.to_dict() for i in self.items], "status": self.status}


class CartItem(db.Model):
    __tablename__ = "cart_items"

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey("carts.id"))
    sku = db.Column(db.String(60))
    name = db.Column(db.String(200))
    price = db.Column(db.Float, default=0.0)
    qty = db.Column(db.Integer, default=1)

    @property
    def subtotal(self):
        return round(self.price * self.qty, 2)

    def to_dict(self):
        return {"id": self.id, "sku": self.sku, "name": self.name,
                "price": self.price, "qty": self.qty, "subtotal": self.subtotal}


# ---------------------------------------------------------------------------
# Storefront analytics — product views + search log (feed the Reports/Search pages)
# ---------------------------------------------------------------------------
class ProductView(db.Model):
    __tablename__ = "product_views"

    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String(60))
    name = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=_now)


class CartAdd(db.Model):
    __tablename__ = "cart_adds"

    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String(60))
    name = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=_now)


class SearchQuery(db.Model):
    __tablename__ = "search_queries"

    id = db.Column(db.Integer, primary_key=True)
    term = db.Column(db.String(120), index=True)
    results = db.Column(db.Integer, default=0)
    converted = db.Column(db.Boolean, default=False)
    session_id = db.Column(db.String(64), index=True)
    created_at = db.Column(db.DateTime, default=_now)


# ---------------------------------------------------------------------------
# Contact form submissions (spec §21 "Contact form submission" notification)
# ---------------------------------------------------------------------------
class ContactSubmission(db.Model):
    __tablename__ = "contact_submissions"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    email = db.Column(db.String(160))
    phone = db.Column(db.String(40), default="")
    subject = db.Column(db.String(200), default="")
    message = db.Column(db.Text, default="")
    status = db.Column(db.String(20), default="New")  # New/Read/Responded
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email, "phone": self.phone,
                "subject": self.subject, "message": self.message, "status": self.status,
                "date": _fmt_datetime(self.created_at)}


# Tone hint per audit action, so log rows colour consistently.
ACTION_TONE = {
    "Admin login": "blue", "Product created": "green", "Product updated": "blue",
    "Product archived": "red", "Price changed": "blue", "Inventory changed": "amber",
    "Order status changed": "green", "Quote converted to order": "teal",
    "Account approved": "green", "Account rejected": "red", "Account suspended": "red",
    "Category created": "green", "Category updated": "blue", "Category archived": "red",
    "Settings changed": "red", "File deleted": "red", "Coupon created": "green",
    "Password reset": "amber", "Delivery updated": "green", "Payment retry": "amber",
    "New order placed": "green", "Quote submitted": "blue", "Contact form submission": "blue",
}


def _fmt_date(dt):
    if not isinstance(dt, datetime):
        return str(dt) if dt else "-"
    return f"{dt.strftime('%b')} {dt.day}, {dt.year}"


def _fmt_datetime(dt):
    if not isinstance(dt, datetime):
        return str(dt) if dt else "-"
    # %-I / %-d are POSIX-only, so build the time manually for cross-platform safety.
    hour = dt.hour % 12 or 12
    ampm = "AM" if dt.hour < 12 else "PM"
    return f"{dt.strftime('%b')} {dt.day}, {dt.year} - {hour}:{dt.minute:02d} {ampm}"
