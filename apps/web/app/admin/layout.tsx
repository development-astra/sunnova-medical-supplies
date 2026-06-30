'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard, ShoppingCart, Users, Package, Tag, Ticket,
  BarChart2, Boxes, Truck, TrendingUp, LogOut, Menu, X,
  ChevronRight, Bell, ExternalLink,
} from 'lucide-react';

const NAV_PRIMARY = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/coupons', label: 'Coupons', icon: Ticket },
];

const NAV_INSIGHTS = [
  { href: '/admin/reports', label: 'Reports', icon: BarChart2 },
  { href: '/admin/inventory', label: 'Inventory', icon: Boxes },
  { href: '/admin/shipping', label: 'Shipping', icon: Truck },
  { href: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; firstName?: string } | null>(null);
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
  }, [pathname]);

  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  }

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const currentLabel = [...NAV_PRIMARY, ...NAV_INSIGHTS]
    .find(n => n.href !== '/admin' && pathname.startsWith(n.href))?.label;

  if (pathname === '/admin/login') return <>{children}</>;

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6f9' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>Authenticating…</div>
      </div>
    );
  }

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => (
    <Link
      href={href}
      style={{
        display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px',
        borderRadius: '8px', marginBottom: '2px', textDecoration: 'none',
        background: isActive(href) ? 'rgba(238,106,18,0.12)' : 'transparent',
        borderLeft: `3px solid ${isActive(href) ? '#ee6a12' : 'transparent'}`,
        transition: 'background 0.15s',
      }}
    >
      <Icon size={17} color={isActive(href) ? '#ee6a12' : 'rgba(255,255,255,0.5)'} />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: isActive(href) ? 600 : 400, color: isActive(href) ? '#ffffff' : 'rgba(255,255,255,0.55)' }}>
        {label}
      </span>
    </Link>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f9' }}>
      <style>{`
        @media (min-width: 1024px) {
          .adm-sidebar { left: 0 !important; }
          .adm-main { margin-left: 260px !important; }
          .adm-overlay { display: none !important; }
        }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="adm-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <aside
        className="adm-sidebar"
        style={{
          position: 'fixed', top: 0, left: sidebarOpen ? 0 : '-260px',
          width: '260px', height: '100vh', background: '#0d1b2e',
          display: 'flex', flexDirection: 'column', zIndex: 50,
          transition: 'left 0.25s ease', overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <Link href="/admin" style={{ textDecoration: 'none', display: 'block', marginBottom: '10px' }}>
            <Image src="/logo/logo-white.svg" alt="Sunnova" width={130} height={34} style={{ height: '30px', width: 'auto' }} />
          </Link>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(238,106,18,0.15)', borderRadius: '6px', padding: '3px 8px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ee6a12', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#ee6a12', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Admin Panel
            </span>
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.28)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', padding: '0 12px', marginBottom: '8px' }}>
            Management
          </p>
          {NAV_PRIMARY.map(item => <NavLink key={item.href} {...item} />)}

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.28)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', padding: '0 12px', marginBottom: '8px', marginTop: '20px' }}>
            Insights
          </p>
          {NAV_INSIGHTS.map(item => <NavLink key={item.href} {...item} />)}
        </nav>

        {/* User */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#ee6a12,#f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                  {(user.firstName ?? user.email)[0].toUpperCase()}
                </span>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.firstName ?? user.email}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.38)', margin: 0 }}>Administrator</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', fontSize: '13px', transition: 'background 0.15s' }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="adm-main" style={{ flex: 1, marginLeft: 0, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{ background: '#fff', borderBottom: '1px solid #e8eff9', padding: '0 20px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30, gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', color: '#6b7690', borderRadius: '6px' }}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Link href="/admin" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', textDecoration: 'none' }}>Admin</Link>
              {currentLabel && (
                <>
                  <ChevronRight size={13} color="#a0aab4" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#122036', fontWeight: 500 }}>{currentLabel}</span>
                </>
              )}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', color: '#6b7690', position: 'relative', borderRadius: '6px' }}>
              <Bell size={19} />
              <span style={{ position: 'absolute', top: '5px', right: '5px', width: '7px', height: '7px', background: '#ee6a12', borderRadius: '50%', border: '2px solid #fff' }} />
            </button>
            <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#1a4fa0', textDecoration: 'none', padding: '6px 10px', background: '#f0f4ff', borderRadius: '6px', fontWeight: 500 }}>
              View Site <ExternalLink size={12} />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '28px 24px', maxWidth: '1400px', width: '100%' }} id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
