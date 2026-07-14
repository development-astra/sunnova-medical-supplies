"""
Sunnova Medical Supplies — Flask application entry point.

Run locally with:
    python app.py
Then visit http://127.0.0.1:5000/  (storefront)  and  /admin  (dashboard).

The admin dashboard and the storefront are both backed by a PostgreSQL database
(set DATABASE_URL; there is no SQLite fallback) with login, role-based access,
an audit trail, a working cart/checkout, and transactional email. Security:
CSRF protection on every POST, a required SECRET_KEY in production, and the
debugger only in explicit dev mode.

Configuration (DATABASE_URL, SECRET_KEY, MAIL_*) is read from a local .env file
if present — copy .env.example to .env and fill in your values.
"""

import os

from dotenv import load_dotenv
from flask import Flask

from extensions import db, login_manager, csrf, mail

# Load .env into the environment before anything reads os.environ. Real
# environment variables always win over .env values.
load_dotenv()


def _configure(app):
    """Populate app.config from the environment with safe production defaults."""
    debug = os.environ.get("FLASK_DEBUG", "1") == "1"
    app.config["DEBUG"] = debug

    # SECRET_KEY must be supplied in production; only dev gets a throwaway key.
    secret = os.environ.get("SECRET_KEY")
    if not secret:
        if not debug:
            raise RuntimeError(
                "SECRET_KEY must be set when FLASK_DEBUG=0. Refusing to start "
                "with a hard-coded key in production."
            )
        secret = "dev-sunnova-secret-change-in-production"
    app.config["SECRET_KEY"] = secret

    # PostgreSQL only — DATABASE_URL is required and there is no SQLite fallback.
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        raise RuntimeError(
            "DATABASE_URL is not set. This app runs on PostgreSQL only.\n"
            "Copy .env.example to .env and set it, e.g.\n"
            "  DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/sunnova"
        )
    if db_url.startswith("postgres://"):  # accept Heroku-style URLs
        db_url = db_url.replace("postgres://", "postgresql://", 1)
    # Route Postgres through the installed psycopg (v3) driver.
    if db_url.startswith("postgresql://"):
        db_url = db_url.replace("postgresql://", "postgresql+psycopg://", 1)
    # Reject anything that isn't PostgreSQL (e.g. a stray sqlite:/// URL).
    if not db_url.startswith("postgresql+psycopg://"):
        raise RuntimeError(
            f"DATABASE_URL must be a PostgreSQL URL (postgresql://...); got: {db_url!r}"
        )
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # CSRF tokens are bound to the session; don't expire them mid-session.
    app.config["WTF_CSRF_TIME_LIMIT"] = None

    # Transactional email. With MAIL_SERVER unset, emailer.py logs to the console
    # instead of sending, so local dev needs no SMTP server.
    app.config["MAIL_SERVER"] = os.environ.get("MAIL_SERVER")
    app.config["MAIL_PORT"] = int(os.environ.get("MAIL_PORT", "587"))
    app.config["MAIL_USE_TLS"] = os.environ.get("MAIL_USE_TLS", "true").lower() == "true"
    app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
    app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
    app.config["MAIL_DEFAULT_SENDER"] = os.environ.get(
        "MAIL_DEFAULT_SENDER", "Sunnova Medical Supplies <no-reply@sunnovamedical.com>")


def create_app():
    app = Flask(__name__)
    _configure(app)

    db.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)
    mail.init_app(app)

    from models import AdminUser

    @login_manager.user_loader
    def load_user(user_id):
        return db.session.get(AdminUser, int(user_id))

    # Blueprints / route groups
    from admin_routes import admin as admin_blueprint
    app.register_blueprint(admin_blueprint)
    from public_routes import register_public_routes
    register_public_routes(app)
    from customer_routes import register_customer_routes
    register_customer_routes(app)

    # Create tables and seed sample data on first run.
    with app.app_context():
        db.create_all()
        _ensure_schema()
        from seed import seed_if_empty
        seed_if_empty()

    return app


def _ensure_schema():
    """Lightweight, idempotent column migrations for tables created before a
    model gained a new column (there is no migration framework yet). Safe to run
    on every startup — PostgreSQL's ADD COLUMN IF NOT EXISTS is a no-op when the
    column already exists."""
    from sqlalchemy import text
    statements = [
        "ALTER TABLE customers ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255)",
        "ALTER TABLE customers ADD COLUMN IF NOT EXISTS address VARCHAR(300) DEFAULT ''",
    ]
    for sql in statements:
        db.session.execute(text(sql))
    db.session.commit()


app = create_app()


if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"])
