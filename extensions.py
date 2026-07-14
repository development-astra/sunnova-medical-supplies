"""Shared Flask extension instances (avoids circular imports)."""

from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_wtf import CSRFProtect
from flask_mail import Mail

db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = "admin.login"
login_manager.login_message = "Please sign in to access the admin dashboard."
login_manager.login_message_category = "warning"

# CSRF protection for every state-changing POST (admin + storefront).
csrf = CSRFProtect()

# Transactional email. Falls back to console logging when SMTP is unconfigured
# (see emailer.py) so the app is fully runnable in local dev.
mail = Mail()
