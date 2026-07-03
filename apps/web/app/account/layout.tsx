'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard, ShoppingBag, RotateCcw, FileText, Heart, ListChecks,
  ReceiptText, Truck, MapPin, Building2, CreditCard, Headset, Settings,
  Menu, X, Search, Bell, MessageSquare, ChevronDown, LogOut,
} from 'lucide-react';
import { getInitials } from '@/lib/utils';
import { authApi, type User } from '@/lib/customer-api';
import { customerProfile } from '@/lib/account/mock-customer-dashboard-data';
import './account.css';

const NAV = [
  { href: '/account', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/account/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/account/reorder', label: 'Reorder Center', icon: RotateCcw },
  { href: '/account/quotes', label: 'Quotes', icon: FileText },
  { href: '/account/wishlist', label: 'Saved Products', icon: Heart },
  { href: '/account/saved-lists', label: 'Saved Lists', icon: ListChecks },
  { href: '/account/invoices', label: 'Invoices', icon: ReceiptText },
  { href: '/account/track', label: 'Delivery Tracking', icon: Truck },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/business', label: 'Business Account', icon: Building2 },
  { href: '/account/payment-methods', label: 'Payment Methods', icon: CreditCard },
  { href: '/account/support', label: 'Support', icon: Headset },
  { href: '/account/profile', label: 'Profile Settings', icon: Settings },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      router.replace('/sign-in?redirect=/account');
      return;
    }
    const raw = localStorage.getItem('user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setChecking(false);
  }, [router]);

  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    try { await authApi.logout(); } catch { /* ignore */ }
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    router.push('/');
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  if (checking) {
    return (
      <div className="sunnova-portal" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--pf-body)', fontSize: 15, color: 'var(--color-text-muted)' }}>Loading your account…</span>
      </div>
    );
  }

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName ?? ''}`.trim()
    : user?.email
      ? user.email.split('@')[0]
      : customerProfile.name;
  const businessName = user?.businessName ?? customerProfile.business;
  const avatarInitials = user?.firstName
    ? getInitials(user.firstName, user.lastName)
    : user?.email
      ? user.email.slice(0, 2).toUpperCase()
      : customerProfile.initials;

  return (
    <div className="sunnova-portal">
      <div className="pf-shell">
        {sidebarOpen && <div className="pf-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* ─── Sidebar ─────────────────────────────────────────────── */}
        <aside className={`pf-sidebar${sidebarOpen ? ' is-open' : ''}`}>
          <div className="pf-logo-wrap">
            <Link href="/account" aria-label="Sunnova Medical Supplies — account home">
              <Image src="/logo/logo-white.svg" alt="Sunnova Medical Supplies" width={180} height={44} className="pf-logo" priority />
            </Link>
          </div>

          <nav className="pf-nav" aria-label="Account navigation">
            {NAV.map(({ href, label, icon: Icon, exact }) => (
              <Link key={href} href={href} className={`pf-nav-link${isActive(href, exact) ? ' is-active' : ''}`} aria-current={isActive(href, exact) ? 'page' : undefined}>
                <Icon size={17} className="pf-nav-icon" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="pf-promo">
            <span className="pf-promo-badge">
              <Truck size={19} color="#fff" aria-hidden="true" />
            </span>
            <p className="pf-promo-title">Same-week delivery across Miami-Dade</p>
            <p className="pf-promo-sub">Local, fast, and reliable for your practice.</p>
            <Link href="/how-it-works" className="pf-promo-btn">Learn More</Link>
          </div>
        </aside>

        {/* ─── Main ────────────────────────────────────────────────── */}
        <div className="pf-main">
          <header className="pf-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <button className="pf-iconbtn" onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle navigation" style={{ border: 'none' }}>
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div style={{ minWidth: 0 }}>
                <h1 className="pf-topbar-title">Customer Dashboard</h1>
                <p className="pf-topbar-sub">Manage your orders, quotes, delivery, and account</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="pf-search pf-search-lg">
                <Search size={16} color="var(--color-text-subtle)" aria-hidden="true" />
                <input type="search" aria-label="Search products, orders, or quotes" placeholder="Search products, orders, or quotes..." />
              </div>

              <Link href="/account/notifications" className="pf-iconbtn" aria-label="Notifications, 3 unread">
                <Bell size={18} />
                <span className="pf-iconbtn-badge">3</span>
              </Link>

              <Link href="/account/support" className="pf-iconbtn" aria-label="Support messages">
                <MessageSquare size={18} />
              </Link>

              <div style={{ position: 'relative' }}>
                <button className="pf-profile" onClick={() => setProfileOpen((v) => !v)} aria-haspopup="menu" aria-expanded={profileOpen}>
                  <span className="pf-avatar">{avatarInitials}</span>
                  <span className="pf-profile-meta">
                    <span style={{ display: 'block', fontFamily: 'var(--pf-heading)', fontSize: 13, fontWeight: 600, color: 'var(--sunnova-dark)', lineHeight: 1.2 }}>
                      {displayName}
                    </span>
                    <span style={{ display: 'block', fontFamily: 'var(--pf-body)', fontSize: 11.5, color: 'var(--color-text-muted)' }}>
                      {businessName}
                    </span>
                  </span>
                  <ChevronDown size={15} color="var(--color-text-muted)" />
                </button>

                {profileOpen && (
                  <div role="menu" style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', minWidth: 190, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 12, boxShadow: 'var(--shadow-hover)', padding: 6, zIndex: 50 }}>
                    <Link href="/account/profile" role="menuitem" className="pf-menu-item" onClick={() => setProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 8, fontFamily: 'var(--pf-body)', fontSize: 13.5, color: 'var(--color-text)', textDecoration: 'none' }}>
                      <Settings size={15} /> Profile Settings
                    </Link>
                    <button onClick={handleSignOut} role="menuitem" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--pf-body)', fontSize: 13.5, color: 'var(--color-accent)', textAlign: 'left' }}>
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="pf-content" id="main-content">{children}</main>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1180px) {
          .sunnova-portal .pf-search-lg { width: 230px; }
        }
        @media (max-width: 900px) {
          .sunnova-portal .pf-search-lg { display: none; }
          .sunnova-portal .pf-topbar-sub { display: none; }
        }
        @media (max-width: 640px) {
          .sunnova-portal .pf-profile-meta { display: none; }
          .sunnova-portal .pf-content { padding: 18px 14px; }
          .sunnova-portal .pf-topbar { padding: 0 16px; }
        }
        .sunnova-portal .pf-menu-item:hover { background: var(--color-surface-muted); }
      `}</style>
    </div>
  );
}
