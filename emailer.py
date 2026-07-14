"""
Transactional email with a Sunnova-branded HTML wrapper.

send_email() renders an EmailTemplate (by key) or an explicit subject/body, wraps
it in the brand layout the spec describes (logo, blue header, orange/gold CTA,
clean white card), and sends via Flask-Mail. When MAIL_SERVER is unconfigured
(local dev) it logs the message to the app logger instead of sending — so the
whole app runs with zero SMTP setup while the send path is real in production.

Templates use simple {placeholder} substitution from the context dict, e.g. a
body of "Hi {name}, your order {order_id} shipped." with context={"name": ...}.
"""

from flask import current_app
from markupsafe import escape

from extensions import mail, db
from models import EmailTemplate

BLUE = "#0b3d91"
BLUE_DARK = "#072a63"
ORANGE = "#f7941d"


def _fill(text, context):
    for k, v in (context or {}).items():
        text = text.replace("{" + k + "}", str(v))
    return text


def _paragraphs(body_text):
    parts = [p.strip() for p in body_text.replace("\r\n", "\n").split("\n") if p.strip()]
    return "".join(
        f'<p style="margin:0 0 14px;color:#334155;font-size:15px;line-height:1.6">{escape(p)}</p>'
        for p in parts
    )


def render_branded(subject, body_text, cta_text=None, cta_url=None):
    """Return the full branded HTML document for an email body."""
    cta = ""
    if cta_text and cta_url:
        cta = (
            f'<tr><td style="padding:6px 0 4px"><a href="{escape(cta_url)}" '
            f'style="display:inline-block;background:{ORANGE};color:#fff;text-decoration:none;'
            f'font-weight:700;font-size:15px;padding:12px 22px;border-radius:10px">'
            f'{escape(cta_text)}</a></td></tr>'
        )
    return f"""\
<!DOCTYPE html>
<html><body style="margin:0;background:#eef2f7;font-family:'Segoe UI',Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:28px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
        <tr><td style="background:linear-gradient(135deg,{BLUE},{BLUE_DARK});border-radius:14px 14px 0 0;padding:22px 28px">
          <span style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-.01em">☀ Sunnova</span>
          <span style="color:rgba(255,255,255,.7);font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;margin-left:8px">Medical Supplies</span>
        </td></tr>
        <tr><td style="background:#fff;padding:30px 28px 26px">
          <h1 style="margin:0 0 16px;color:{BLUE};font-size:20px;font-weight:700">{escape(subject)}</h1>
          {_paragraphs(body_text)}
          <table role="presentation" cellpadding="0" cellspacing="0"><tr><td>{cta}</td></tr></table>
        </td></tr>
        <tr><td style="background:#fff;border-radius:0 0 14px 14px;border-top:1px solid #eef2f7;padding:18px 28px;color:#94a3b8;font-size:12px;line-height:1.6">
          Sunnova Medical Supplies · Miami-Dade County, FL<br/>
          Fast, reliable local medical &amp; aesthetic supply delivery.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>"""


def send_email(to, key=None, context=None, subject=None, body=None, cta_text=None, cta_url=None):
    """Send (or, in dev, log) a branded transactional email.

    Provide either a template `key` (an EmailTemplate row) or an explicit
    `subject`+`body`. Returns True if dispatched/logged, False if skipped
    (no recipient, or template disabled/missing).
    """
    context = context or {}
    if key:
        t = db.session.get(EmailTemplate, key)
        if t is None or not t.enabled:
            current_app.logger.info("[email] template '%s' disabled/missing — not sending to %s", key, to)
            return False
        subject = _fill(subject or t.subject, context)
        body = _fill(body or t.body, context)
    else:
        subject = _fill(subject or "", context)
        body = _fill(body or "", context)

    if not to:
        return False

    html = render_branded(subject, body, cta_text=cta_text, cta_url=cta_url)
    if current_app.config.get("MAIL_SERVER"):
        # Never let a mail-server hiccup break the request that triggered it
        # (e.g. an order is already committed before the confirmation is sent).
        try:
            from flask_mail import Message
            mail.send(Message(subject=subject, recipients=[to], body=body, html=html))
        except Exception:  # noqa: BLE001 — log and continue; delivery is best-effort
            current_app.logger.exception("[email] send failed → %s | %s", to, subject)
            return False
    else:
        current_app.logger.info("[email:dev] → %s | %s\n%s", to, subject, body)
    return True
