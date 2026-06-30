'use client';
import { useEffect, useState } from 'react';
import { BarChart2, TrendingUp, ShoppingCart, FileText, DollarSign } from 'lucide-react';
import { adminApi, AdminOrder, DashboardStats } from '@/lib/api';

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending', CONFIRMED: 'Confirmed', PROCESSING: 'Processing',
  SHIPPED: 'Shipped', DELIVERED: 'Delivered', CANCELLED: 'Cancelled', REFUNDED: 'Refunded',
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#c2410c', CONFIRMED: '#1d4ed8', PROCESSING: '#065f46',
  SHIPPED: '#7c3aed', DELIVERED: '#166534', CANCELLED: '#991b1b', REFUNDED: '#475569',
};

const STATUS_BG: Record<string, string> = {
  PENDING: '#fff7ed', CONFIRMED: '#eff6ff', PROCESSING: '#ecfdf5',
  SHIPPED: '#f5f3ff', DELIVERED: '#dcfce7', CANCELLED: '#fef2f2', REFUNDED: '#f1f5f9',
};

function fmt(v: number) { return `$${v.toFixed(2)}`; }

export default function AdminReportsPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminApi.getOrders(1), adminApi.getStats()])
      .then(([o, s]) => { setOrders(Array.isArray(o) ? o : []); setStats(s); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = orders.filter(o => o.status !== 'CANCELLED' && o.status !== 'REFUNDED').reduce((s, o) => s + parseFloat(String(o.total ?? 0)), 0);
  const deliveredRevenue = orders.filter(o => o.status === 'DELIVERED').reduce((s, o) => s + parseFloat(String(o.total ?? 0)), 0);
  const avgOrderValue = orders.length ? totalRevenue / orders.length : 0;

  const byStatus = Object.keys(STATUS_LABELS).map(s => ({
    status: s,
    count: orders.filter(o => o.status === s).length,
    revenue: orders.filter(o => o.status === s).reduce((sum, o) => sum + parseFloat(String(o.total ?? 0)), 0),
  })).filter(s => s.count > 0);

  const maxCount = Math.max(...byStatus.map(s => s.count), 1);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#122036', margin: '0 0 4px' }}>Reports</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>Revenue and order performance overview</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Revenue', value: loading ? '—' : fmt(totalRevenue), icon: DollarSign, color: '#0e9f6e', sub: 'Excl. cancelled/refunded' },
          { label: 'Delivered Revenue', value: loading ? '—' : fmt(deliveredRevenue), icon: TrendingUp, color: '#1a4fa0', sub: 'Completed orders only' },
          { label: 'Avg. Order Value', value: loading ? '—' : fmt(avgOrderValue), icon: ShoppingCart, color: '#ee6a12', sub: `Across ${orders.length} orders` },
          { label: 'Open Quotes', value: loading ? '—' : String(stats?.pendingQuotes ?? 0), icon: FileText, color: '#7c3aed', sub: 'Awaiting response' },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} style={{ background: '#fff', borderRadius: '14px', padding: '22px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Icon size={20} color="#fff" />
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '28px', color: '#122036', margin: '0 0 2px' }}>{value}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#3a4660', margin: '0 0 2px' }}>{label}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#a0aab4', margin: 0 }}>{sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Orders by Status */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f4ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={17} color="#1a4fa0" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#122036', margin: 0 }}>Orders by Status</h2>
          </div>
          <div style={{ padding: '20px 22px' }}>
            {loading ? (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4', margin: 0 }}>Loading…</p>
            ) : byStatus.length === 0 ? (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4', margin: 0 }}>No order data yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {byStatus.sort((a, b) => b.count - a.count).map(({ status, count, revenue }) => (
                  <div key={status}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: STATUS_COLORS[status] }}>
                        {STATUS_LABELS[status]}
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690' }}>
                        {count} order{count !== 1 ? 's' : ''} · {fmt(revenue)}
                      </span>
                    </div>
                    <div style={{ height: '8px', background: '#f0f4ff', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(count / maxCount) * 100}%`, background: STATUS_COLORS[status], borderRadius: '999px', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary table */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f4ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={17} color="#1a4fa0" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#122036', margin: 0 }}>Revenue Summary</h2>
          </div>
          <div style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Status', 'Orders', 'Revenue'].map(h => (
                    <th key={h} style={{ padding: '11px 18px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6b7690', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3} style={{ padding: '28px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4' }}>Loading…</td></tr>
                ) : byStatus.map(({ status, count, revenue }, i) => (
                  <tr key={status} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{ background: STATUS_BG[status], color: STATUS_COLORS[status], padding: '3px 10px', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600 }}>
                        {STATUS_LABELS[status]}
                      </span>
                    </td>
                    <td style={{ padding: '12px 18px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660', fontWeight: 600 }}>{count}</td>
                    <td style={{ padding: '12px 18px', fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600, color: '#122036' }}>{fmt(revenue)}</td>
                  </tr>
                ))}
                {!loading && (
                  <tr style={{ borderTop: '2px solid #e8eff9', background: '#f8faff' }}>
                    <td style={{ padding: '13px 18px', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, color: '#122036' }}>Total</td>
                    <td style={{ padding: '13px 18px', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, color: '#122036' }}>{orders.length}</td>
                    <td style={{ padding: '13px 18px', fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: '#1a4fa0' }}>{fmt(totalRevenue)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
