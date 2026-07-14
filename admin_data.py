"""
Sunnova Medical Supplies — Admin dashboard sample data.

The public site is currently template-only (no database yet), so this module
provides realistic in-memory sample data for the admin dashboard so every
screen renders with lifelike content. When a real PostgreSQL layer is added,
these accessor functions are the seam to swap out — the templates only ever
call the small helper API at the bottom of this file.
"""

# ---------------------------------------------------------------------------
# Navigation — single source of truth for the sidebar (label, endpoint, icon,
# and an optional live "badge" count). `icon` maps to an inline SVG in the
# _icons.html partial. Grouped so the sidebar can render section headings.
# ---------------------------------------------------------------------------
NAV_SECTIONS = [
    {
        "heading": None,
        "items": [
            {"label": "Dashboard", "endpoint": "admin.dashboard", "icon": "grid", "badge": None},
        ],
    },
    {
        "heading": "Catalog",
        "items": [
            {"label": "Products", "endpoint": "admin.products", "icon": "box", "badge": None},
            {"label": "Categories", "endpoint": "admin.categories", "icon": "tag", "badge": None},
            {"label": "Inventory", "endpoint": "admin.inventory", "icon": "layers", "badge": "6"},
        ],
    },
    {
        "heading": "Sales",
        "items": [
            {"label": "Orders", "endpoint": "admin.orders", "icon": "cart", "badge": "7"},
            {"label": "Quotes", "endpoint": "admin.quotes", "icon": "file-text", "badge": "5"},
            {"label": "Delivery", "endpoint": "admin.delivery", "icon": "truck", "badge": "3"},
        ],
    },
    {
        "heading": "People",
        "items": [
            {"label": "Customers", "endpoint": "admin.customers", "icon": "users", "badge": None},
            {"label": "Account Applications", "endpoint": "admin.applications", "icon": "user-plus", "badge": "4"},
        ],
    },
    {
        "heading": "Operations",
        "items": [
            {"label": "Uploads", "endpoint": "admin.uploads", "icon": "image", "badge": None},
            {"label": "Admin Users", "endpoint": "admin.admin_users", "icon": "shield", "badge": None},
            {"label": "Audit Logs", "endpoint": "admin.audit_logs", "icon": "activity", "badge": None},
            {"label": "Settings", "endpoint": "admin.settings", "icon": "settings", "badge": None},
        ],
    },
]

# The signed-in admin (mock session).
CURRENT_ADMIN = {
    "name": "Ana Reyes",
    "role": "Super Admin",
    "email": "ana@sunnovamedical.com",
    "initials": "AR",
}

# ---------------------------------------------------------------------------
# Dashboard
# ---------------------------------------------------------------------------
DASHBOARD_METRICS = [
    {"label": "Total Sales", "value": "$284,190", "delta": "+12.4%", "trend": "up", "note": "vs last 30 days", "icon": "dollar", "tone": "brand"},
    {"label": "Today's Sales", "value": "$4,820", "delta": "+8.1%", "trend": "up", "note": "14 orders today", "icon": "trending-up", "tone": "green"},
    {"label": "Pending Orders", "value": "7", "delta": "3 urgent", "trend": "flat", "note": "awaiting processing", "icon": "cart", "tone": "amber"},
    {"label": "Pending Quotes", "value": "5", "delta": "2 new", "trend": "up", "note": "requests to review", "icon": "file-text", "tone": "blue"},
    {"label": "Low-Stock Products", "value": "6", "delta": "2 critical", "trend": "down", "note": "below threshold", "icon": "alert", "tone": "red"},
    {"label": "New Customers", "value": "18", "delta": "+5", "trend": "up", "note": "this week", "icon": "users", "tone": "teal"},
    {"label": "Open Applications", "value": "4", "delta": "1 today", "trend": "up", "note": "account requests", "icon": "user-plus", "tone": "blue"},
    {"label": "Out for Delivery", "value": "3", "delta": "on route", "trend": "flat", "note": "Miami-Dade", "icon": "truck", "tone": "brand"},
]

# 12 points for a lightweight inline sales sparkline/bar chart.
SALES_TREND = [4200, 5100, 4800, 6200, 5900, 7100, 6800, 7600, 7200, 8300, 7900, 8600]
SALES_TREND_LABELS = ["Jun 28", "Jun 29", "Jun 30", "Jul 1", "Jul 2", "Jul 3", "Jul 4", "Jul 5", "Jul 6", "Jul 7", "Jul 8", "Jul 9"]

BEST_SELLERS = [
    {"name": "Nitrile Exam Gloves (Box of 100)", "sku": "GLV-NIT-100", "sold": 412, "revenue": "$5,768", "stock": 340},
    {"name": "3-Ply Surgical Masks (Box of 50)", "sku": "MSK-3PLY-50", "sold": 388, "revenue": "$3,104", "stock": 1200},
    {"name": "Alcohol Prep Pads (Box of 200)", "sku": "INF-APP-200", "sold": 265, "revenue": "$1,590", "stock": 58},
    {"name": "Sterile Gauze Pads 4x4 (Pack of 100)", "sku": "WND-GZ-44", "sold": 214, "revenue": "$2,354", "stock": 96},
    {"name": "Disposable Isolation Gowns (Pack of 10)", "sku": "PPE-GWN-10", "sold": 176, "revenue": "$3,520", "stock": 22},
]

RECENT_ACTIVITY = [
    {"icon": "cart", "tone": "green", "text": "New order <strong>#SN-10428</strong> placed by Coral Gables Family Clinic", "time": "6 min ago"},
    {"icon": "file-text", "tone": "blue", "text": "Quote <strong>#Q-3391</strong> submitted by Bayview Med Spa", "time": "24 min ago"},
    {"icon": "user-plus", "tone": "teal", "text": "Account application from <strong>Sunrise Dermatology</strong>", "time": "48 min ago"},
    {"icon": "dollar", "tone": "green", "text": "Payment of <strong>$1,240.00</strong> completed for order #SN-10425", "time": "1 hr ago"},
    {"icon": "layers", "tone": "amber", "text": "Inventory adjusted: <strong>Alcohol Prep Pads</strong> −40 (order fulfillment)", "time": "2 hrs ago"},
    {"icon": "box", "tone": "blue", "text": "Product <strong>Isolation Gowns</strong> updated by Ana Reyes", "time": "3 hrs ago"},
    {"icon": "truck", "tone": "brand", "text": "Order <strong>#SN-10419</strong> marked out for delivery", "time": "4 hrs ago"},
    {"icon": "users", "tone": "teal", "text": "New customer <strong>Dr. Miguel Santos</strong> registered", "time": "5 hrs ago"},
]

# ---------------------------------------------------------------------------
# Products
# ---------------------------------------------------------------------------
CATEGORIES = [
    {"id": 1, "name": "Exam Gloves", "slug": "exam-gloves", "parent": None, "products": 24, "featured": True, "sort": 1, "status": "Published", "description": "Nitrile, latex and vinyl exam gloves in all sizes."},
    {"id": 2, "name": "Medical Disposables", "slug": "medical-disposables", "parent": None, "products": 38, "featured": True, "sort": 2, "status": "Published", "description": "Single-use disposable supplies for the treatment room."},
    {"id": 3, "name": "PPE", "slug": "ppe", "parent": None, "products": 19, "featured": True, "sort": 3, "status": "Published", "description": "Masks, gowns, face shields and protective apparel."},
    {"id": 4, "name": "Wound Care", "slug": "wound-care", "parent": None, "products": 27, "featured": False, "sort": 4, "status": "Published", "description": "Dressings, gauze, bandages and wound closure."},
    {"id": 5, "name": "Aesthetic Supplies", "slug": "aesthetic-supplies", "parent": None, "products": 31, "featured": True, "sort": 5, "status": "Published", "description": "Med-spa and aesthetic practice consumables."},
    {"id": 6, "name": "Syringes & Needles", "slug": "syringes-needles", "parent": None, "products": 22, "featured": False, "sort": 6, "status": "Published", "description": "Sterile syringes, needles and sharps."},
    {"id": 7, "name": "Clinic Essentials", "slug": "clinic-essentials", "parent": None, "products": 44, "featured": False, "sort": 7, "status": "Published", "description": "Everyday supplies every clinic runs on."},
    {"id": 8, "name": "Infection Control", "slug": "infection-control", "parent": None, "products": 16, "featured": False, "sort": 8, "status": "Published", "description": "Disinfectants, wipes and sterilization."},
    {"id": 9, "name": "Treatment Room Supplies", "slug": "treatment-room-supplies", "parent": None, "products": 20, "featured": False, "sort": 9, "status": "Draft", "description": "Table paper, drapes and room consumables."},
]

BRANDS = ["MedLine", "Halyard", "Dynarex", "McKesson", "Cardinal Health", "Sunnova Select"]

SALE_MODES = ["Direct Purchase", "Quote Only", "Direct Purchase or Quote", "Account Only"]
AVAILABILITY = ["In Stock", "Low Stock", "Out of Stock", "Special Order", "Quote Required"]

PRODUCTS = [
    {"id": 1, "name": "Nitrile Exam Gloves (Box of 100)", "sku": "GLV-NIT-100", "category": "Exam Gloves", "brand": "MedLine", "price": 13.99, "sale_price": 11.99, "cost": 7.20, "stock": 340, "threshold": 100, "availability": "In Stock", "sale_mode": "Direct Purchase", "featured": True, "status": "Published", "updated": "Jul 8, 2026", "short": "Powder-free nitrile exam gloves, textured fingertips.", "img_tone": "blue"},
    {"id": 2, "name": "3-Ply Surgical Masks (Box of 50)", "sku": "MSK-3PLY-50", "category": "PPE", "brand": "Halyard", "price": 8.49, "sale_price": None, "cost": 3.90, "stock": 1200, "threshold": 200, "availability": "In Stock", "sale_mode": "Direct Purchase", "featured": True, "status": "Published", "updated": "Jul 7, 2026", "short": "ASTM Level 2 pleated ear-loop masks.", "img_tone": "teal"},
    {"id": 3, "name": "Alcohol Prep Pads (Box of 200)", "sku": "INF-APP-200", "category": "Infection Control", "brand": "Dynarex", "price": 5.99, "sale_price": None, "cost": 2.10, "stock": 58, "threshold": 75, "availability": "Low Stock", "sale_mode": "Direct Purchase", "featured": False, "status": "Published", "updated": "Jul 9, 2026", "short": "Sterile 70% isopropyl alcohol prep pads.", "img_tone": "amber"},
    {"id": 4, "name": "Sterile Gauze Pads 4x4 (Pack of 100)", "sku": "WND-GZ-44", "category": "Wound Care", "brand": "McKesson", "price": 10.99, "sale_price": 9.49, "cost": 4.50, "stock": 96, "threshold": 60, "availability": "In Stock", "sale_mode": "Direct Purchase or Quote", "featured": False, "status": "Published", "updated": "Jul 6, 2026", "short": "12-ply sterile gauze pads, individually wrapped.", "img_tone": "blue"},
    {"id": 5, "name": "Disposable Isolation Gowns (Pack of 10)", "sku": "PPE-GWN-10", "category": "PPE", "brand": "Cardinal Health", "price": 19.99, "sale_price": None, "cost": 9.80, "stock": 22, "threshold": 40, "availability": "Low Stock", "sale_mode": "Direct Purchase or Quote", "featured": True, "status": "Published", "updated": "Jul 5, 2026", "short": "AAMI Level 2 fluid-resistant isolation gowns.", "img_tone": "teal"},
    {"id": 6, "name": "Hyaluronic Filler Cannulas 25G (Box of 20)", "sku": "AES-CAN-25", "category": "Aesthetic Supplies", "brand": "Sunnova Select", "price": 78.00, "sale_price": None, "cost": 41.00, "stock": 0, "threshold": 15, "availability": "Quote Required", "sale_mode": "Quote Only", "featured": False, "status": "Published", "updated": "Jul 4, 2026", "short": "Flexible blunt-tip micro-cannulas for filler work.", "img_tone": "purple"},
    {"id": 7, "name": "Luer-Lock Syringes 10ml (Box of 100)", "sku": "SYR-LL-10", "category": "Syringes & Needles", "brand": "MedLine", "price": 24.50, "sale_price": None, "cost": 12.00, "stock": 210, "threshold": 80, "availability": "In Stock", "sale_mode": "Direct Purchase", "featured": False, "status": "Published", "updated": "Jul 3, 2026", "short": "Sterile single-use luer-lock syringes.", "img_tone": "blue"},
    {"id": 8, "name": "Exam Table Paper Rolls (Case of 12)", "sku": "TRS-PAP-12", "category": "Treatment Room Supplies", "brand": "Dynarex", "price": 34.99, "sale_price": 29.99, "cost": 16.00, "stock": 140, "threshold": 50, "availability": "In Stock", "sale_mode": "Direct Purchase", "featured": False, "status": "Published", "updated": "Jul 2, 2026", "short": "Smooth white exam table paper, 21\" x 225'.", "img_tone": "green"},
    {"id": 9, "name": "Surface Disinfectant Wipes (Tub of 160)", "sku": "INF-WIP-160", "category": "Infection Control", "brand": "McKesson", "price": 9.75, "sale_price": None, "cost": 4.30, "stock": 44, "threshold": 60, "availability": "Low Stock", "sale_mode": "Direct Purchase", "featured": False, "status": "Published", "updated": "Jul 1, 2026", "short": "EPA-registered hospital-grade surface wipes.", "img_tone": "amber"},
    {"id": 10, "name": "Nitrile Gloves — Bulk Clinic Pack (Case of 10 Boxes)", "sku": "GLV-NIT-CS10", "category": "Exam Gloves", "brand": "MedLine", "price": 119.00, "sale_price": None, "cost": 66.00, "stock": 34, "threshold": 20, "availability": "Special Order", "sale_mode": "Account Only", "featured": False, "status": "Published", "updated": "Jun 30, 2026", "short": "Case of 10 boxes for high-volume practices.", "img_tone": "blue"},
    {"id": 11, "name": "Adhesive Bandages Assorted (Box of 280)", "sku": "WND-BND-280", "category": "Wound Care", "brand": "Dynarex", "price": 6.49, "sale_price": None, "cost": 2.80, "stock": 260, "threshold": 90, "availability": "In Stock", "sale_mode": "Direct Purchase", "featured": False, "status": "Draft", "updated": "Jun 29, 2026", "short": "Assorted-size fabric adhesive bandages.", "img_tone": "green"},
    {"id": 12, "name": "Med Spa Consumables Starter Kit", "sku": "AES-KIT-01", "category": "Aesthetic Supplies", "brand": "Sunnova Select", "price": 240.00, "sale_price": 210.00, "cost": 120.00, "stock": 12, "threshold": 8, "availability": "In Stock", "sale_mode": "Direct Purchase or Quote", "featured": True, "status": "Published", "updated": "Jun 28, 2026", "short": "Curated starter kit for new aesthetic practices.", "img_tone": "purple"},
]

# ---------------------------------------------------------------------------
# Orders
# ---------------------------------------------------------------------------
ORDERS = [
    {"id": "SN-10428", "customer": "Dr. Elena Cruz", "business": "Coral Gables Family Clinic", "date": "Jul 9, 2026", "total": 1240.00, "payment": "Paid", "status": "Pending", "delivery": "Local Delivery", "delivery_status": "Awaiting Scheduling", "items": 8},
    {"id": "SN-10427", "customer": "Bayview Med Spa", "business": "Bayview Med Spa", "date": "Jul 9, 2026", "total": 486.50, "payment": "Paid", "status": "Confirmed", "delivery": "Local Delivery", "delivery_status": "Scheduled", "items": 4},
    {"id": "SN-10426", "customer": "Dr. Miguel Santos", "business": "Santos Dermatology", "date": "Jul 8, 2026", "total": 2180.00, "payment": "Authorized", "status": "Processing", "delivery": "Local Delivery", "delivery_status": "Preparing", "items": 15},
    {"id": "SN-10425", "customer": "Sunrise Urgent Care", "business": "Sunrise Urgent Care", "date": "Jul 8, 2026", "total": 1240.00, "payment": "Paid", "status": "Out for Delivery", "delivery": "Local Delivery", "delivery_status": "Out for Delivery", "items": 11},
    {"id": "SN-10424", "customer": "Dr. Priya Nair", "business": "Nair Aesthetics", "date": "Jul 7, 2026", "total": 640.00, "payment": "Paid", "status": "Delivered", "delivery": "Local Delivery", "delivery_status": "Delivered", "items": 6},
    {"id": "SN-10423", "customer": "Westchester Pediatrics", "business": "Westchester Pediatrics", "date": "Jul 7, 2026", "total": 312.75, "payment": "Paid", "status": "Delivered", "delivery": "Pickup", "delivery_status": "Delivered", "items": 3},
    {"id": "SN-10422", "customer": "Dr. Omar Haddad", "business": "Kendall Wellness Center", "date": "Jul 6, 2026", "total": 98.40, "payment": "Refunded", "status": "Refunded", "delivery": "Local Delivery", "delivery_status": "Delivered", "items": 2},
    {"id": "SN-10421", "customer": "Dr. Elena Cruz", "business": "Coral Gables Family Clinic", "date": "Jul 6, 2026", "total": 1560.00, "payment": "Paid", "status": "Delivered", "delivery": "Local Delivery", "delivery_status": "Delivered", "items": 12},
    {"id": "SN-10420", "customer": "Palmetto Surgical", "business": "Palmetto Surgical Group", "date": "Jul 5, 2026", "total": 74.20, "payment": "Failed", "status": "Cancelled", "delivery": "Local Delivery", "delivery_status": "Awaiting Scheduling", "items": 1},
    {"id": "SN-10419", "customer": "Dr. Sofia Marin", "business": "Marin Family Practice", "date": "Jul 5, 2026", "total": 845.00, "payment": "Paid", "status": "Out for Delivery", "delivery": "Local Delivery", "delivery_status": "Out for Delivery", "items": 7},
]

# One fully-detailed order for the order detail screen.
ORDER_DETAIL = {
    "id": "SN-10428",
    "status": "Pending",
    "payment": "Paid",
    "date": "Jul 9, 2026 · 9:42 AM",
    "delivery": "Local Delivery — Miami-Dade",
    "delivery_status": "Awaiting Scheduling",
    "customer": {
        "name": "Dr. Elena Cruz",
        "business": "Coral Gables Family Clinic",
        "email": "elena.cruz@cgfamilyclinic.com",
        "phone": "(305) 555-0142",
        "type": "Clinic",
    },
    "delivery_address": "2450 Ponce de Leon Blvd, Suite 210, Coral Gables, FL 33134",
    "billing_address": "2450 Ponce de Leon Blvd, Suite 210, Coral Gables, FL 33134",
    "lines": [
        {"name": "Nitrile Exam Gloves (Box of 100)", "sku": "GLV-NIT-100", "qty": 24, "price": 11.99, "subtotal": 287.76},
        {"name": "3-Ply Surgical Masks (Box of 50)", "sku": "MSK-3PLY-50", "qty": 30, "price": 8.49, "subtotal": 254.70},
        {"name": "Sterile Gauze Pads 4x4 (Pack of 100)", "sku": "WND-GZ-44", "qty": 20, "price": 9.49, "subtotal": 189.80},
        {"name": "Disposable Isolation Gowns (Pack of 10)", "sku": "PPE-GWN-10", "qty": 18, "price": 19.99, "subtotal": 359.82},
    ],
    "subtotal": 1092.08,
    "tax": 76.44,
    "delivery_fee": 15.00,
    "discount": -43.52,
    "total": 1140.00,
    "notes": "Please deliver to the rear clinic entrance; front desk closes at 4 PM.",
    "internal_notes": "Repeat B2B customer — priority Miami-Dade route. Net-15 terms approved.",
    "timeline": [
        {"label": "Order placed", "time": "Jul 9, 2026 · 9:42 AM", "who": "Customer", "state": "done"},
        {"label": "Payment confirmed", "time": "Jul 9, 2026 · 9:43 AM", "who": "Stripe", "state": "done"},
        {"label": "Awaiting processing", "time": "Current", "who": "System", "state": "current"},
        {"label": "Out for delivery", "time": "Pending", "who": "—", "state": "todo"},
        {"label": "Delivered", "time": "Pending", "who": "—", "state": "todo"},
    ],
}

ORDER_STATUSES = ["Pending", "Confirmed", "Processing", "Out for Delivery", "Delivered", "Cancelled", "Refunded"]
PAYMENT_STATUSES = ["Pending", "Authorized", "Paid", "Failed", "Refunded", "Partially Refunded", "Cancelled"]

# ---------------------------------------------------------------------------
# Quotes
# ---------------------------------------------------------------------------
QUOTES = [
    {"id": "Q-3391", "customer": "Dr. Laila Fischer", "business": "Bayview Med Spa", "products": "Filler cannulas, isolation gowns +3", "date": "Jul 9, 2026", "status": "New", "assigned": "Unassigned", "updated": "Jul 9, 2026", "value": "—"},
    {"id": "Q-3390", "customer": "Dr. Raymond Ellis", "business": "Ellis Orthopedics", "products": "Bulk nitrile gloves (case), gauze", "date": "Jul 8, 2026", "status": "Reviewing", "assigned": "Ana Reyes", "updated": "Jul 9, 2026", "value": "$3,420"},
    {"id": "Q-3389", "customer": "Dr. Naomi Park", "business": "Park Aesthetic Studio", "products": "Med spa starter kit x4", "date": "Jul 8, 2026", "status": "Responded", "assigned": "Luis Ortega", "updated": "Jul 8, 2026", "value": "$840"},
    {"id": "Q-3388", "customer": "Homestead Community Health", "business": "Homestead Community Health", "products": "PPE bundle, disinfectant wipes", "date": "Jul 7, 2026", "status": "Accepted", "assigned": "Ana Reyes", "updated": "Jul 8, 2026", "value": "$5,180"},
    {"id": "Q-3387", "customer": "Dr. Tomas Vega", "business": "Vega Urgent Care", "products": "Syringes, needles, sharps bins", "date": "Jul 6, 2026", "status": "Converted to Order", "assigned": "Luis Ortega", "updated": "Jul 7, 2026", "value": "$2,260"},
    {"id": "Q-3386", "customer": "Dr. Grace Lin", "business": "Lin Family Dentistry", "products": "Exam gloves, table paper", "date": "Jul 5, 2026", "status": "Declined", "assigned": "Ana Reyes", "updated": "Jul 6, 2026", "value": "$610"},
]

QUOTE_DETAIL = {
    "id": "Q-3391",
    "status": "New",
    "date": "Jul 9, 2026 · 8:18 AM",
    "assigned": "Unassigned",
    "customer": {
        "name": "Dr. Laila Fischer",
        "business": "Bayview Med Spa",
        "email": "laila@bayviewmedspa.com",
        "phone": "(305) 555-0198",
        "type": "Med Spa",
    },
    "preferred_delivery": "Jul 16, 2026",
    "lines": [
        {"name": "Hyaluronic Filler Cannulas 25G (Box of 20)", "sku": "AES-CAN-25", "qty": 10, "quoted": None},
        {"name": "Disposable Isolation Gowns (Pack of 10)", "sku": "PPE-GWN-10", "qty": 25, "quoted": None},
        {"name": "Nitrile Exam Gloves — Bulk Pack (Case)", "sku": "GLV-NIT-CS10", "qty": 6, "quoted": None},
        {"name": "Med Spa Consumables Starter Kit", "sku": "AES-KIT-01", "qty": 2, "quoted": None},
    ],
    "notes": "Opening a second location in August — looking to set up a recurring monthly supply order. Please advise on account pricing.",
    "attachments": [
        {"name": "bayview-supply-list.pdf", "size": "142 KB"},
        {"name": "practice-license.pdf", "size": "88 KB"},
    ],
    "internal_notes": "",
    "history": [
        {"label": "Quote submitted", "time": "Jul 9, 2026 · 8:18 AM", "who": "Customer"},
    ],
}

QUOTE_STATUSES = ["New", "Reviewing", "Responded", "Accepted", "Declined", "Converted to Order"]

# ---------------------------------------------------------------------------
# Customers
# ---------------------------------------------------------------------------
CUSTOMERS = [
    {"id": 1, "name": "Dr. Elena Cruz", "email": "elena.cruz@cgfamilyclinic.com", "phone": "(305) 555-0142", "business": "Coral Gables Family Clinic", "type": "Clinic", "account": "Verified", "orders": 24, "spent": 38420.00, "last_order": "Jul 9, 2026"},
    {"id": 2, "name": "Dr. Laila Fischer", "email": "laila@bayviewmedspa.com", "phone": "(305) 555-0198", "business": "Bayview Med Spa", "type": "Med Spa", "account": "Verified", "orders": 12, "spent": 14680.00, "last_order": "Jul 9, 2026"},
    {"id": 3, "name": "Dr. Miguel Santos", "email": "m.santos@santosderm.com", "phone": "(786) 555-0177", "business": "Santos Dermatology", "type": "Practice", "account": "Verified", "orders": 31, "spent": 52140.00, "last_order": "Jul 8, 2026"},
    {"id": 4, "name": "Sunrise Urgent Care", "email": "orders@sunriseurgent.com", "phone": "(305) 555-0165", "business": "Sunrise Urgent Care", "type": "Business", "account": "Verified", "orders": 18, "spent": 27310.00, "last_order": "Jul 8, 2026"},
    {"id": 5, "name": "Dr. Priya Nair", "email": "priya@nairaesthetics.com", "phone": "(786) 555-0121", "business": "Nair Aesthetics", "type": "Med Spa", "account": "Verified", "orders": 9, "spent": 8940.00, "last_order": "Jul 7, 2026"},
    {"id": 6, "name": "Dr. Omar Haddad", "email": "omar.haddad@kendallwellness.com", "phone": "(305) 555-0188", "business": "Kendall Wellness Center", "type": "Clinic", "account": "Pending", "orders": 2, "spent": 486.00, "last_order": "Jul 6, 2026"},
    {"id": 7, "name": "Dr. Grace Lin", "email": "grace@linfamilydental.com", "phone": "(786) 555-0155", "business": "Lin Family Dentistry", "type": "Practice", "account": "Verified", "orders": 6, "spent": 4120.00, "last_order": "Jul 5, 2026"},
    {"id": 8, "name": "Carlos Mendez", "email": "carlos.mendez@gmail.com", "phone": "(305) 555-0133", "business": "—", "type": "Individual", "account": "Verified", "orders": 3, "spent": 214.50, "last_order": "Jul 3, 2026"},
]

CUSTOMER_DETAIL = {
    "id": 1,
    "name": "Dr. Elena Cruz",
    "email": "elena.cruz@cgfamilyclinic.com",
    "phone": "(305) 555-0142",
    "business": "Coral Gables Family Clinic",
    "type": "Clinic",
    "account": "Verified",
    "member_since": "Feb 2024",
    "orders": 24,
    "spent": 38420.00,
    "avg_order": 1600.83,
    "last_order": "Jul 9, 2026",
    "addresses": [
        {"label": "Delivery", "value": "2450 Ponce de Leon Blvd, Suite 210, Coral Gables, FL 33134"},
        {"label": "Billing", "value": "2450 Ponce de Leon Blvd, Suite 210, Coral Gables, FL 33134"},
    ],
    "recent_orders": [
        {"id": "SN-10428", "date": "Jul 9, 2026", "total": 1240.00, "status": "Pending"},
        {"id": "SN-10421", "date": "Jul 6, 2026", "total": 1560.00, "status": "Delivered"},
        {"id": "SN-10402", "date": "Jun 28, 2026", "total": 980.00, "status": "Delivered"},
    ],
    "quotes": [
        {"id": "Q-3372", "date": "Jun 20, 2026", "status": "Converted to Order", "value": "$2,140"},
    ],
    "documents": [
        {"name": "medical-license.pdf", "size": "96 KB"},
        {"name": "tax-exempt-cert.pdf", "size": "58 KB"},
    ],
    "notes": "Priority B2B account — Net-15 terms. Prefers rear-entrance delivery.",
}

CUSTOMER_TYPES = ["Individual", "Business", "Clinic", "Med Spa", "Practice"]

# ---------------------------------------------------------------------------
# Account Applications
# ---------------------------------------------------------------------------
APPLICATIONS = [
    {"id": "APP-208", "business": "Sunrise Dermatology", "contact": "Dr. Hannah Ross", "email": "hannah@sunrisederm.com", "phone": "(305) 555-0210", "type": "Practice", "submitted": "Jul 9, 2026", "status": "New", "docs": 3},
    {"id": "APP-207", "business": "Aventura Aesthetics", "contact": "Dr. Ken Park", "email": "ken@aventuraaesthetics.com", "phone": "(786) 555-0203", "type": "Med Spa", "submitted": "Jul 8, 2026", "status": "Under Review", "docs": 2},
    {"id": "APP-206", "business": "Doral Family Care", "contact": "Maria Gutierrez", "email": "maria@doralfamilycare.com", "phone": "(305) 555-0219", "type": "Clinic", "submitted": "Jul 7, 2026", "status": "More Info Needed", "docs": 1},
    {"id": "APP-205", "business": "Brickell Wellness", "contact": "Dr. Alan Reed", "email": "alan@brickellwellness.com", "phone": "(786) 555-0225", "type": "Clinic", "submitted": "Jul 6, 2026", "status": "Approved", "docs": 4},
    {"id": "APP-204", "business": "South Beach Surgical", "contact": "Dr. Nina Patel", "email": "nina@sbsurgical.com", "phone": "(305) 555-0234", "type": "Practice", "submitted": "Jul 4, 2026", "status": "Rejected", "docs": 2},
]

APPLICATION_STATUSES = ["New", "Under Review", "Approved", "Rejected", "More Info Needed"]

# ---------------------------------------------------------------------------
# Inventory
# ---------------------------------------------------------------------------
INVENTORY = [
    {"sku": "GLV-NIT-100", "name": "Nitrile Exam Gloves (Box of 100)", "stock": 340, "threshold": 100, "status": "In Stock", "committed": 42, "available": 298, "updated": "Jul 9, 2026"},
    {"sku": "MSK-3PLY-50", "name": "3-Ply Surgical Masks (Box of 50)", "stock": 1200, "threshold": 200, "status": "In Stock", "committed": 90, "available": 1110, "updated": "Jul 9, 2026"},
    {"sku": "INF-APP-200", "name": "Alcohol Prep Pads (Box of 200)", "stock": 58, "threshold": 75, "status": "Low Stock", "committed": 12, "available": 46, "updated": "Jul 9, 2026"},
    {"sku": "WND-GZ-44", "name": "Sterile Gauze Pads 4x4 (Pack of 100)", "stock": 96, "threshold": 60, "status": "In Stock", "committed": 20, "available": 76, "updated": "Jul 8, 2026"},
    {"sku": "PPE-GWN-10", "name": "Disposable Isolation Gowns (Pack of 10)", "stock": 22, "threshold": 40, "status": "Low Stock", "committed": 18, "available": 4, "updated": "Jul 8, 2026"},
    {"sku": "AES-CAN-25", "name": "Hyaluronic Filler Cannulas 25G (Box of 20)", "stock": 0, "threshold": 15, "status": "Out of Stock", "committed": 0, "available": 0, "updated": "Jul 7, 2026"},
    {"sku": "SYR-LL-10", "name": "Luer-Lock Syringes 10ml (Box of 100)", "stock": 210, "threshold": 80, "status": "In Stock", "committed": 30, "available": 180, "updated": "Jul 7, 2026"},
    {"sku": "INF-WIP-160", "name": "Surface Disinfectant Wipes (Tub of 160)", "stock": 44, "threshold": 60, "status": "Low Stock", "committed": 8, "available": 36, "updated": "Jul 6, 2026"},
]

INVENTORY_HISTORY = [
    {"sku": "INF-APP-200", "name": "Alcohol Prep Pads", "change": -40, "reason": "Order fulfillment (SN-10426)", "by": "System", "time": "Jul 9, 2026 · 11:20 AM"},
    {"sku": "PPE-GWN-10", "name": "Isolation Gowns", "change": +100, "reason": "Restock — PO #4821", "by": "Luis Ortega", "time": "Jul 8, 2026 · 3:05 PM"},
    {"sku": "GLV-NIT-100", "name": "Nitrile Gloves", "change": -24, "reason": "Order fulfillment (SN-10428)", "by": "System", "time": "Jul 9, 2026 · 9:43 AM"},
    {"sku": "MSK-3PLY-50", "name": "Surgical Masks", "change": -6, "reason": "Marked as damaged", "by": "Ana Reyes", "time": "Jul 7, 2026 · 1:12 PM"},
]

ADJUSTMENT_REASONS = ["Add stock", "Reduce stock", "Mark as damaged", "Mark as returned", "Correct stock count"]

# ---------------------------------------------------------------------------
# Delivery
# ---------------------------------------------------------------------------
DELIVERIES = [
    {"order": "SN-10425", "customer": "Sunrise Urgent Care", "address": "8900 SW 40th St, Miami, FL 33165", "phone": "(305) 555-0165", "zip": "33165", "date": "Jul 9, 2026", "status": "Out for Delivery", "driver": "Route A · Luis"},
    {"order": "SN-10419", "customer": "Marin Family Practice", "address": "1200 Brickell Ave, Miami, FL 33131", "phone": "(786) 555-0144", "zip": "33131", "date": "Jul 9, 2026", "status": "Out for Delivery", "driver": "Route A · Luis"},
    {"order": "SN-10426", "customer": "Santos Dermatology", "address": "760 NE 125th St, North Miami, FL 33161", "phone": "(786) 555-0177", "zip": "33161", "date": "Jul 10, 2026", "status": "Preparing", "driver": "Unassigned"},
    {"order": "SN-10427", "customer": "Bayview Med Spa", "address": "2100 Biscayne Blvd, Miami, FL 33137", "phone": "(305) 555-0198", "zip": "33137", "date": "Jul 10, 2026", "status": "Scheduled", "driver": "Route B · Dana"},
    {"order": "SN-10428", "customer": "Coral Gables Family Clinic", "address": "2450 Ponce de Leon Blvd, Coral Gables, FL 33134", "phone": "(305) 555-0142", "zip": "33134", "date": "—", "status": "Awaiting Scheduling", "driver": "Unassigned"},
    {"order": "SN-10420", "customer": "Palmetto Surgical Group", "address": "9333 SW 152nd St, Palmetto Bay, FL 33157", "phone": "(305) 555-0170", "zip": "33157", "date": "Jul 8, 2026", "status": "Failed Delivery", "driver": "Route B · Dana"},
]

DELIVERY_STATUSES = ["Awaiting Scheduling", "Scheduled", "Preparing", "Out for Delivery", "Delivered", "Failed Delivery", "Rescheduled"]

# ---------------------------------------------------------------------------
# Uploads / File manager
# ---------------------------------------------------------------------------
UPLOADS = [
    {"name": "nitrile-gloves-blue.jpg", "type": "Product Image", "size": "248 KB", "dims": "1200×1200", "folder": "products", "uploaded": "Jul 8, 2026", "by": "Ana Reyes", "tone": "blue"},
    {"name": "surgical-masks-box.jpg", "type": "Product Image", "size": "192 KB", "dims": "1200×1200", "folder": "products", "uploaded": "Jul 7, 2026", "by": "Ana Reyes", "tone": "teal"},
    {"name": "ppe-category-hero.webp", "type": "Category Image", "size": "410 KB", "dims": "1600×900", "folder": "categories", "uploaded": "Jul 6, 2026", "by": "Luis Ortega", "tone": "amber"},
    {"name": "bayview-supply-list.pdf", "type": "Quote Attachment", "size": "142 KB", "dims": "—", "folder": "quotes", "uploaded": "Jul 9, 2026", "by": "Customer", "tone": "red"},
    {"name": "practice-license.pdf", "type": "Account Document", "size": "88 KB", "dims": "—", "folder": "documents", "uploaded": "Jul 9, 2026", "by": "Customer", "tone": "green"},
    {"name": "isolation-gowns.jpg", "type": "Product Image", "size": "220 KB", "dims": "1200×1200", "folder": "products", "uploaded": "Jul 5, 2026", "by": "Ana Reyes", "tone": "teal"},
    {"name": "med-spa-kit.jpg", "type": "Product Image", "size": "276 KB", "dims": "1200×1200", "folder": "products", "uploaded": "Jun 28, 2026", "by": "Luis Ortega", "tone": "purple"},
    {"name": "wound-care-hero.webp", "type": "Category Image", "size": "388 KB", "dims": "1600×900", "folder": "categories", "uploaded": "Jun 27, 2026", "by": "Ana Reyes", "tone": "green"},
]

UPLOAD_STATS = {
    "total_files": 1284,
    "total_size": "6.4 GB",
    "images": 1102,
    "documents": 182,
    "cdn": "spaces.sunnovamedical.com",
}

# ---------------------------------------------------------------------------
# Admin users & roles
# ---------------------------------------------------------------------------
ADMIN_USERS = [
    {"name": "Ana Reyes", "email": "ana@sunnovamedical.com", "role": "Super Admin", "status": "Active", "last_active": "Online now", "initials": "AR"},
    {"name": "Luis Ortega", "email": "luis@sunnovamedical.com", "role": "Store Manager", "status": "Active", "last_active": "12 min ago", "initials": "LO"},
    {"name": "Dana Whitfield", "email": "dana@sunnovamedical.com", "role": "Fulfillment Staff", "status": "Active", "last_active": "1 hr ago", "initials": "DW"},
    {"name": "Marco Silva", "email": "marco@sunnovamedical.com", "role": "Sales/Admin Staff", "status": "Active", "last_active": "3 hrs ago", "initials": "MS"},
    {"name": "Jenna Cole", "email": "jenna@sunnovamedical.com", "role": "Content Editor", "status": "Invited", "last_active": "Never", "initials": "JC"},
    {"name": "Rob Tan", "email": "rob@sunnovamedical.com", "role": "Support Staff", "status": "Disabled", "last_active": "Jun 12, 2026", "initials": "RT"},
]

ADMIN_ROLES = [
    {"name": "Super Admin", "access": "Full access to everything", "users": 1, "tone": "brand"},
    {"name": "Store Manager", "access": "Products, orders, customers, quotes, inventory", "users": 1, "tone": "blue"},
    {"name": "Fulfillment Staff", "access": "Orders, delivery, inventory only", "users": 1, "tone": "teal"},
    {"name": "Sales/Admin Staff", "access": "Quotes, customers, account applications", "users": 1, "tone": "green"},
    {"name": "Content Editor", "access": "CMS content, testimonials, SEO content only", "users": 1, "tone": "amber"},
    {"name": "Support Staff", "access": "Customers, orders, quotes — limited edit", "users": 1, "tone": "purple"},
]

# ---------------------------------------------------------------------------
# Audit logs
# ---------------------------------------------------------------------------
AUDIT_LOGS = [
    {"time": "Jul 9, 2026 · 11:20 AM", "actor": "System", "action": "Inventory changed", "target": "Alcohol Prep Pads −40", "ip": "—", "tone": "amber"},
    {"time": "Jul 9, 2026 · 9:43 AM", "actor": "System", "action": "Order status changed", "target": "SN-10428 → Paid", "ip": "—", "tone": "green"},
    {"time": "Jul 9, 2026 · 9:12 AM", "actor": "Ana Reyes", "action": "Admin login", "target": "Super Admin session", "ip": "72.14.201.4", "tone": "blue"},
    {"time": "Jul 8, 2026 · 3:05 PM", "actor": "Luis Ortega", "action": "Inventory changed", "target": "Isolation Gowns +100 (PO #4821)", "ip": "72.14.201.9", "tone": "amber"},
    {"time": "Jul 8, 2026 · 2:41 PM", "actor": "Ana Reyes", "action": "Product updated", "target": "Isolation Gowns — price changed", "ip": "72.14.201.4", "tone": "blue"},
    {"time": "Jul 8, 2026 · 10:03 AM", "actor": "Ana Reyes", "action": "Account approved", "target": "Brickell Wellness (APP-205)", "ip": "72.14.201.4", "tone": "green"},
    {"time": "Jul 7, 2026 · 4:22 PM", "actor": "Marco Silva", "action": "Quote converted to order", "target": "Q-3387 → SN-10417", "ip": "72.14.201.7", "tone": "teal"},
    {"time": "Jul 7, 2026 · 1:12 PM", "actor": "Ana Reyes", "action": "Inventory changed", "target": "Surgical Masks −6 (damaged)", "ip": "72.14.201.4", "tone": "amber"},
    {"time": "Jul 6, 2026 · 9:30 AM", "actor": "Luis Ortega", "action": "Coupon created", "target": "LOCALDELIVERY — free delivery", "ip": "72.14.201.9", "tone": "purple"},
    {"time": "Jul 5, 2026 · 5:48 PM", "actor": "Ana Reyes", "action": "Settings changed", "target": "Free-delivery threshold → $150", "ip": "72.14.201.4", "tone": "red"},
]

# ---------------------------------------------------------------------------
# Store settings
# ---------------------------------------------------------------------------
SETTINGS = {
    "store": {
        "name": "Sunnova Medical Supplies",
        "phone": "(786) 643-3036",
        "support_email": "support@sunnovamedical.com",
        "address": "Miami-Dade County, FL",
        "hours": "Mon–Fri, 8:00 AM – 6:00 PM",
        "min_order": "50.00",
        "free_delivery_threshold": "150.00",
    },
    "delivery": {
        "enabled": True,
        "fee": "15.00",
        "same_week": True,
        "zip_codes": "33101, 33125, 33126, 33131, 33134, 33137, 33161, 33165, 33157, 33186",
        "cutoff": "2:00 PM",
        "days": "Monday, Wednesday, Friday",
    },
    "social": {
        "facebook": "facebook.com/sunnovamedical",
        "instagram": "instagram.com/sunnovamedical",
        "linkedin": "linkedin.com/company/sunnovamedical",
    },
}


# ---------------------------------------------------------------------------
# Small accessor API used by the templates. Keeping lookups here means the
# route layer (and later the DB layer) stays thin.
# ---------------------------------------------------------------------------
def get_product(product_id):
    for p in PRODUCTS:
        if p["id"] == product_id:
            return p
    return None


def get_order(order_id):
    if order_id == ORDER_DETAIL["id"]:
        return ORDER_DETAIL
    for o in ORDERS:
        if o["id"] == order_id:
            return o
    return None


def get_quote(quote_id):
    if quote_id == QUOTE_DETAIL["id"]:
        return QUOTE_DETAIL
    for q in QUOTES:
        if q["id"] == quote_id:
            return q
    return None


def get_customer(customer_id):
    if customer_id == CUSTOMER_DETAIL["id"]:
        return CUSTOMER_DETAIL
    for c in CUSTOMERS:
        if c["id"] == customer_id:
            return c
    return None
