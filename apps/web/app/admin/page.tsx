'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Package, ShoppingCart, FileText, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { adminApi, DashboardStats } from '@/lib/api';

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  PENDING:    { bg: '#fff7ed', text: '#c2410c' },
  CONFIRMED:  { bg: '#eff6ff', text: '#1d4ed8' },
  PROCESSING: { bg: '#f0fdf4', text: '#15803d' },
  SHIPPED:    { bg: '#f5f3ff', text: '#7c3aed' },
  DELIVERED:  { bg: '#dcfce7', text: '#166534' },
  CANCELLED:  { bg: '#fef2f2', text: '#991b1b' },
  REFUNDED:   { bg: '#f1f5f9', text: '#475569' },
};

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_COLOR[status] ?? { bg: '#f1f5f9', text: '#475569' };
  return (
    <span style={{ background: c.bg, color: c.text, padding: '3px 10px', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600 }}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function StatCard({ label, value, icon: Icon, color, href }: { label: string; value: number | string; icon: any; color: string; href: string }) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', transition: 'box-shadow 0.15s, transform 0.15s', cursor: 'pointer' }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(18,32,54,0.12)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(18,32,54,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={22} color="#fff" />
          </div>
          <ArrowRight size={16} color="#a0aab4" />
        </div>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '32px', color: '#122036', margin: '0 0 4px' }}>
          {value}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', margin: 0 }}>{label}</p>
      </div>
    </Link>
  );
}

function fmt(val: any) {
  const n = parseFloat(val ?? 0);
  return `$${n.toFixed(2)}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.getStats()
      .then(setStats)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#122036', margin: '0 0 4px' }}>
          Dashboard
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>
          Welcome back — here&apos;s what&apos;s happening at Sunnova Medical Supplies.
        </p>
      </div>

      {error && (
        <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '10px', padding: '14px 18px', marginBottom: '24px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#dc2626', margin: 0 }}>Could not load stats: {error}</p>
        </div>
      )}

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Total Customers" value={loading ? '—' : stats?.users ?? 0} icon={Users} color="#1a4fa0" href="/admin/customers" />
        <StatCard label="Active Products" value={loading ? '—' : stats?.products ?? 0} icon={Package} color="#0e9f6e" href="/admin/products" />
        <StatCard label="Total Orders" value={loading ? '—' : stats?.orders ?? 0} icon={ShoppingCart} color="#7c3aed" href="/admin/orders" />
        <StatCard label="Pending Quotes" value={loading ? '—' : stats?.pendingQuotes ?? 0} icon={FileText} color="#ee6a12" href="/admin/reports" />
      </div>

      {/* Recent Orders */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={18} color="#1a4fa0" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#122036', margin: 0 }}>Recent Orders</h2>
          </div>
          <Link href="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#1a4fa0', textDecoration: 'none', fontWeight: 500 }}>
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4' }}>Loading…</div>
        ) : !stats?.recentOrders?.length ? (
          <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4' }}>No orders yet.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Order #', 'Customer', 'Date', 'Total', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6b7690', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order, i) => (
                  <tr key={order.id} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1a4fa0', whiteSpace: 'nowrap' }}>
                      {order.orderNumber}
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660' }}>
                      {order.user ? `${order.user.firstName ?? ''} ${order.user.email}`.trim() : '—'}
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', whiteSpace: 'nowrap' }}>
                      {fmtDate(order.createdAt)}
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600, color: '#122036', whiteSpace: 'nowrap' }}>
                      {fmt(order.total)}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginTop: '20px' }}>
        {[
          { href: '/admin/products', label: 'Add Product', icon: Package },
          { href: '/admin/orders', label: 'Manage Orders', icon: ShoppingCart },
          { href: '/admin/analytics', label: 'View Analytics', icon: TrendingUp },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', background: '#fff', borderRadius: '10px', border: '1px solid #e8eff9', textDecoration: 'none', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#1a4fa0')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e8eff9')}
          >
            <Icon size={17} color="#1a4fa0" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#3a4660' }}>{label}</span>
            <ArrowRight size={14} color="#a0aab4" style={{ marginLeft: 'auto' }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
