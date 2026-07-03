'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard, Package, Tags, ShoppingCart, FileText, Users, ClipboardList,
  Boxes, Truck, Ticket, CreditCard, BarChart2, CloudUpload, LayoutTemplate,
  Settings, Menu, X, Search, Bell, Mail, ChevronDown, LogOut, ExternalLink,
} from 'lucide-react';
import './admin.css';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/quotes', label: 'Quotes', icon: FileText },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/applications', label: 'Account Applications', icon: ClipboardList },
  { href: '/admin/inventory', label: 'Inventory', icon: Boxes },
  { href: '/admin/shipping', label: 'Delivery', icon: Truck },
  { href: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/reports', label: 'Reports', icon: BarChart2 },
  { href: '/admin/uploads', label: 'Uploads', icon: CloudUpload },
  { href: '/admin/content', label: 'Content', icon: LayoutTemplate },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminUser {
  email: string;
  firstName?: string;
  role?: string;
}

function initials(user: AdminUser | null): string {
  if (!user) return 'AD';
  if (user.firstName) return user.firstName.slice(0, 2).toUpperCase();
  return user.email.slice(0, 2).toUpperCase();
}

function roleLabel(user: AdminUser | null): string {
  if (user?.role === 'ADMIN') return 'Super Admin';
  return user?.role ? user.role.charAt(0) + user.role.slice(1).toLowerCase() : 'Administrator';
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return; }
    const token = localStorage.getItem('admin_token');
    const raw = localStorage.getItem('admin_user');
    if (!token) { router.replace('/admin/login'); return; }
    if (raw) { try { setUser(JSON.parse(raw)); } catch { /* ignore */ } }
    setChecking(false);
  }, [pathname, router]);

  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  }

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const currentLabel = NAV.find((n) => isActive(n.href))?.label ?? 'Admin Dashboard';

  if (pathname === '/admin/login') return <>{children}</>;

  if (checking) {
    return (
      <div className="sunnova-admin" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--admin-font-body)', fontSize: 15, color: 'var(--color-text-muted)' }}>Authenticating…</span>
      </div>
    );
  }

  const displayName = user?.firstName ?? (user?.email ? user.email.split('@')[0] : 'Admin User');

  return (
    <div className="sunnova-admin">
      <div className="sa-shell">
        {sidebarOpen && <div className="sa-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* ─── Sidebar ─────────────────────────────────────────────── */}
        <aside className={`sa-sidebar${sidebarOpen ? ' is-open' : ''}`}>
          <div className="sa-logo-wrap">
            <Link href="/admin" aria-label="Sunnova Medical Supplies — Admin home">
              <Image src="/logo/logo-white.svg" alt="Sunnova Medical Supplies" width={180} height={44} className="sa-logo" priority />
            </Link>
          </div>

          <nav className="sa-nav" aria-label="Admin navigation">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`sa-nav-link${isActive(href) ? ' is-active' : ''}`} aria-current={isActive(href) ? 'page' : undefined}>
                <Icon size={17} className="sa-nav-icon" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Delivery promo card */}
          <div className="sa-promo">
            <span className="sa-promo-badge">
              <Truck size={19} color="#fff" aria-hidden="true" />
            </span>
            <p className="sa-promo-title">Same-week Delivery</p>
            <p className="sa-promo-sub">across Miami-Dade</p>
            <Link href="/admin/shipping" className="sa-promo-btn">Learn More</Link>
          </div>
        </aside>

        {/* ─── Main area ───────────────────────────────────────────── */}
        <div className="sa-main">
          <header className="sa-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <button className="sa-iconbtn" onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle navigation" style={{ border: 'none' }}>
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div style={{ minWidth: 0 }}>
                <h1 className="sa-topbar-title">{currentLabel === 'Dashboard' ? 'Admin Dashboard' : currentLabel}</h1>
                <p className="sa-topbar-sub">Welcome back, manage your store operations</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Search */}
              <div className="sa-search sa-search-lg">
                <Search size={16} color="var(--color-text-subtle)" aria-hidden="true" />
                <input type="search" aria-label="Search orders, products, customers" placeholder="Search orders, products, customers..." />
                <kbd className="sa-kbd">⌘K</kbd>
              </div>

              {/* Notifications */}
              <button className="sa-iconbtn" aria-label="Notifications, 8 unread">
                <Bell size={18} />
                <span className="sa-iconbtn-badge">8</span>
              </button>

              {/* Messages */}
              <button className="sa-iconbtn" aria-label="Messages, 3 unread">
                <Mail size={18} />
                <span className="sa-iconbtn-badge">3</span>
              </button>

              {/* View site */}
              <Link href="/" target="_blank" className="sa-iconbtn" aria-label="View storefront" title="View storefront">
                <ExternalLink size={17} />
              </Link>

              {/* Profile */}
              <div style={{ position: 'relative' }}>
                <button className="sa-profile" onClick={() => setProfileOpen((v) => !v)} aria-haspopup="menu" aria-expanded={profileOpen}>
                  <span className="sa-avatar">{initials(user)}</span>
                  <span className="sa-profile-meta">
                    <span style={{ display: 'block', fontFamily: 'var(--admin-font-heading)', fontSize: 13, fontWeight: 600, color: 'var(--sunnova-dark)', lineHeight: 1.2 }}>
                      {displayName}
                    </span>
                    <span style={{ display: 'block', fontFamily: 'var(--admin-font-body)', fontSize: 11.5, color: 'var(--color-text-muted)' }}>
                      {roleLabel(user)}
                    </span>
                  </span>
                  <ChevronDown size={15} color="var(--color-text-muted)" />
                </button>

                {profileOpen && (
                  <div
                    role="menu"
                    style={{
                      position: 'absolute', right: 0, top: 'calc(100% + 8px)', minWidth: 180,
                      background: '#fff', border: '1px solid var(--color-border)', borderRadius: 12,
                      boxShadow: 'var(--admin-shadow-hover)', padding: 6, zIndex: 50,
                    }}
                  >
                    <Link href="/admin/settings" role="menuitem" className="sa-menu-item" onClick={() => setProfileOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 8, fontFamily: 'var(--admin-font-body)', fontSize: 13.5, color: 'var(--color-text)', textDecoration: 'none' }}>
                      <Settings size={15} /> Settings
                    </Link>
                    <button onClick={logout} role="menuitem"
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--admin-font-body)', fontSize: 13.5, color: 'var(--color-accent)', textAlign: 'left' }}>
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="sa-content" id="main-content">{children}</main>
        </div>
      </div>

      {/* Responsive helpers that need media queries */}
      <style jsx global>{`
        @media (max-width: 1180px) {
          .sunnova-admin .sa-search-lg { width: 220px; }
        }
        @media (max-width: 900px) {
          .sunnova-admin .sa-search-lg { display: none; }
          .sunnova-admin .sa-topbar-sub { display: none; }
        }
        @media (max-width: 640px) {
          .sunnova-admin .sa-profile-meta { display: none; }
          .sunnova-admin .sa-content { padding: 18px 14px; }
          .sunnova-admin .sa-topbar { padding: 0 16px; }
        }
        .sunnova-admin .sa-menu-item:hover { background: var(--color-surface-muted); }
      `}</style>
    </div>
  );
}
