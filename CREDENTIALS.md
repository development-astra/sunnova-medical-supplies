# Sunnova Medical Supplies — Login Credentials & URLs

> **Dev / demo credentials only.** These are the seeded accounts created by `seed.py` on
> first run. They are already visible in the source and on the login page. **Change them
> before any production deployment** (see the *Production* note at the bottom).

## Run the app

```bash
python app.py
```

Serves at **http://127.0.0.1:5000**

## What to open

| Area | URL |
|------|-----|
| **Customer storefront** | http://127.0.0.1:5000/ |
| **Admin dashboard** | http://127.0.0.1:5000/admin  (redirects to `/admin/login`) |

## Admin accounts

**Primary account — use this one (Super Admin, full access):**

- **Email:** `ana@sunnovamedical.com`
- **Password:** `password`

*(The login page pre-fills these.)*

**All seeded staff accounts** (for testing role-based access):

| Name | Email | Role | Password | Status |
|------|-------|------|----------|--------|
| Ana Reyes | `ana@sunnovamedical.com` | Super Admin | `password` | Active |
| Luis Ortega | `luis@sunnovamedical.com` | Store Manager | `sunnova2026` | Active |
| Dana Whitfield | `dana@sunnovamedical.com` | Fulfillment Staff | `sunnova2026` | Active |
| Marco Silva | `marco@sunnovamedical.com` | Sales/Admin Staff | `sunnova2026` | Active |
| Jenna Cole | `jenna@sunnovamedical.com` | Content Editor | `sunnova2026` | Invited |
| Rob Tan | `rob@sunnovamedical.com` | Support Staff | `sunnova2026` | **Disabled — login blocked by design** |

- Default password for every account **except Ana** is `sunnova2026`.
- **Rob Tan** is seeded as *Disabled*; logging in returns "This account has been disabled." — this is intentional, to demo the disable feature.

## Customer storefront

No customer login exists yet — shoppers browse and check out as guests.

| Page | URL |
|------|-----|
| Home | `/` |
| Why Us | `/why-us` |
| How to Order | `/how-to-order` |
| Shop / Catalog | `/services-and-catalog` |
| Product detail | `/product?slug=nitrile-exam-gloves-box-of-100` (or `?id=1`) |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Track order | `/track-order` |
| Contact | `/contact` |

## Admin dashboard pages (all under `/admin`)

| Page | URL | Page | URL |
|------|-----|------|-----|
| Dashboard | `/admin` | Coupons | `/admin/coupons` |
| Products | `/admin/products` | Reports | `/admin/reports` |
| Categories | `/admin/categories` | Reviews | `/admin/reviews` |
| Inventory | `/admin/inventory` | Content (CMS) | `/admin/content` |
| Orders | `/admin/orders` | Email templates | `/admin/email-templates` |
| Quotes | `/admin/quotes` | Search mgmt | `/admin/search` |
| Customers | `/admin/customers` | Uploads | `/admin/uploads` |
| Applications | `/admin/applications` | Admin users | `/admin/admin-users` |
| Delivery | `/admin/delivery` | Audit logs | `/admin/audit-logs` |
| Payments | `/admin/payments` | Settings | `/admin/settings` |
| | | Notifications | `/admin/notifications` |

## Source of these credentials

- Passwords: [`seed.py`](seed.py) lines 30–31 (`DEV_PASSWORDS`, `DEFAULT_DEV_PASSWORD`)
- Account roster: [`admin_data.py`](admin_data.py) line 362 (`ADMIN_USERS`)

## Production note

The seeded passwords are for local development. In production:

1. Change every seeded password (or delete the seed accounts and create real ones via the
   **Admin Users → Invite** flow, which sends a set-password link).
2. Set a real `SECRET_KEY` environment variable (the app refuses to start in non-debug mode without one).
3. Configure `MAIL_SERVER` and SMTP credentials so invite / reset / order emails actually send.
