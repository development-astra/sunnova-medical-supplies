"""
Seed the database with the minimum needed to run — nothing else.

What gets seeded:
  * Admin login accounts (your team's credentials).
  * Store settings (store name, delivery fee, min order, social links, …).
  * Transactional email templates (order confirmation, quote received, …).
  * Homepage / CMS content blocks (default storefront copy).

What does NOT get seeded (starts empty, filled with real data via the admin):
  products, categories, customers, orders, quotes, applications, inventory,
  deliveries, payments, coupons, reviews, uploads, audit logs, search data.

Runs once, only when the database has no admin users, so it is safe to call on
every app startup.
"""

from extensions import db
import admin_data as data
from models import AdminUser, Setting, ContentBlock, EmailTemplate


# Dev passwords for the seeded team. Ana matches the login form's prefilled
# credentials so you can sign in immediately. CHANGE THESE IN PRODUCTION.
DEV_PASSWORDS = {"ana@sunnovamedical.com": "password"}
DEFAULT_DEV_PASSWORD = "sunnova2026"


def seed_if_empty():
    if db.session.query(AdminUser).first():
        return  # already seeded
    seed_all()


def seed_all():
    # --- Admin users (login credentials) ---
    for u in data.ADMIN_USERS:
        user = AdminUser(name=u["name"], email=u["email"], role=u["role"],
                         status=u["status"], last_active=u["last_active"])
        user.set_password(DEV_PASSWORDS.get(u["email"], DEFAULT_DEV_PASSWORD))
        db.session.add(user)

    # --- Store settings (configuration, not sample business data) ---
    for section, kv in data.SETTINGS.items():
        for k, v in kv.items():
            val = "true" if v is True else "false" if v is False else str(v)
            db.session.add(Setting(key=f"{section}.{k}", value=val))

    _seed_config()

    db.session.commit()
    print("Database seeded: admin users + configuration only (no sample data).")


def _seed_config():
    """Baseline configuration the app relies on — transactional email templates
    and editable homepage/CMS content. Both are managed from the admin dashboard
    (Email Templates / Content screens)."""
    # Email templates. emailer.send_email() renders these by key; without them,
    # order/quote/reset emails would have no body to send.
    emails = [
        ("welcome", "Welcome email", "Welcome to Sunnova Medical Supplies", "Thanks for creating an account. Browse the catalog or request a quote anytime."),
        ("verify", "Verify email", "Verify your email address", "Please confirm your email to activate your Sunnova account."),
        ("password_reset", "Password reset", "Reset your password", "Use the link below to reset your Sunnova admin password."),
        ("order_confirmation", "Order confirmation", "Your Sunnova order is confirmed", "We've received your order and will schedule delivery shortly."),
        ("order_status", "Order status update", "Update on your Sunnova order", "Your order status has changed. Track it in your account."),
        ("quote_received", "Quote received", "We received your quote request", "Thanks for your quote request — our team will respond shortly."),
        ("quote_response", "Quote response", "Your Sunnova quote is ready", "We've prepared pricing for your requested items."),
        ("application_received", "Account application received", "We received your account application", "Thanks for applying for a business account. We'll review it soon."),
        ("account_approved", "Account approved", "Your Sunnova account is approved", "Your business account is verified — you can now order and request quotes."),
        ("delivery_update", "Delivery update", "Your Sunnova delivery is on the way", "Your order is out for delivery across Miami-Dade."),
    ]
    for key, name, subject, body in emails:
        db.session.add(EmailTemplate(key=key, name=name, subject=subject, body=body, enabled=True))

    # CMS content blocks — default storefront copy. Edit under admin → Content.
    content = [
        ("home.hero_title", "Homepage hero title", "Fast, Reliable Medical Supply Delivery", "Homepage", False),
        ("home.hero_sub", "Homepage hero subtext", "Miami-Dade County's local partner for medical & aesthetic supplies.", "Homepage", True),
        ("home.feature_strip", "Feature strip text", "Same-week delivery · Trusted locally · Business accounts welcome", "Homepage", False),
        ("home.cta", "Homepage CTA", "Open an account and get supplies delivered this week.", "Homepage", True),
        ("howitworks.body", "How It Works content", "Browse, request a quote or buy directly, and we deliver across Miami-Dade.", "Pages", True),
        ("contact.body", "Contact page content", "Call (786) 643-3036 or request a quote online. We respond same day.", "Pages", True),
        ("delivery.policy", "Delivery policy content", "Local Miami-Dade delivery, typically same week. Free over the delivery threshold.", "Pages", True),
        ("footer.text", "Footer text", "© 2026 Sunnova Medical Supplies · Miami-Dade County, FL", "Global", False),
        ("seo.default_title", "SEO default title", "Sunnova Medical Supplies — Miami-Dade Medical Supply Delivery", "SEO", False),
        ("announcement.bar", "Announcement bar", "Free local delivery on orders over $150 this month.", "Global", False),
    ]
    for key, label, val, group, ml in content:
        db.session.add(ContentBlock(key=key, label=label, value=val, group=group, multiline=ml))


if __name__ == "__main__":
    from app import app
    with app.app_context():
        seed_all()
