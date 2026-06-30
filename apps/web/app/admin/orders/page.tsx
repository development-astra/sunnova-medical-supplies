'use client';
import { useEffect, useState } from 'react';
import { ShoppingCart, RefreshCw } from 'lucide-react';
import { adminApi, AdminOrder } from '@/lib/api';

const STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  PENDING:    { bg: '#fff7ed', text: '#c2410c' },
  CONFIRMED:  { bg: '#eff6ff', text: '#1d4ed8' },
  PROCESSING: { bg: '#ecfdf5', text: '#065f46' },
  SHIPPED:    { bg: '#f5f3ff', text: '#7c3aed' },
  DELIVERED:  { bg: '#dcfce7', text: '#166534' },
  CANCELLED:  { bg: '#fef2f2', text: '#991b1b' },
  REFUNDED:   { bg: '#f1f5f9', text: '#475569' },
};

function Badge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? { bg: '#f1f5f9', text: '#475569' };
  return (
    <span style={{ background: s.bg, color: s.text, padding: '3px 10px', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function fmt(v: any) { return `$${parseFloat(v ?? 0).toFixed(2)}`; }
function fmtDate(iso: string) { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState('');

  function load(status?: string) {
    setLoading(true);
    adminApi.getOrders(1, status === 'ALL' ? undefined : status)
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(filter); }, [filter]);

  async function changeStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      await adminApi.updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch { /* ignore */ }
    finally { setUpdatingId(''); }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#122036', margin: '0 0 4px' }}>Orders</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>
            {orders.length} order{orders.length !== 1 ? 's' : ''} {filter !== 'ALL' ? `· ${filter.charAt(0) + filter.slice(1).toLowerCase()}` : ''}
          </p>
        </div>
        <button onClick={() => load(filter)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#fff', border: '1px solid #e8eff9', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#3a4660' }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Status Tabs */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '7px 14px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: filter === s ? 600 : 400, transition: 'all 0.15s',
              background: filter === s ? '#1a4fa0' : '#fff',
              color: filter === s ? '#fff' : '#6b7690',
              boxShadow: filter === s ? '0 2px 8px rgba(26,79,160,0.25)' : '0 1px 4px rgba(18,32,54,0.06)',
            }}
          >
            {s === 'ALL' ? 'All Orders' : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4' }}>Loading orders…</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <ShoppingCart size={36} color="#e0e7f3" style={{ marginBottom: '12px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#a0aab4', margin: 0 }}>No orders found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Order #', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Update Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6b7690', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={order.id} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, color: '#1a4fa0', whiteSpace: 'nowrap' }}>
                      {order.orderNumber}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#3a4660' }}>
                      <div>{order.user ? `${order.user.firstName ?? ''} ${order.user.lastName ?? ''}`.trim() || '—' : '—'}</div>
                      <div style={{ fontSize: '12px', color: '#a0aab4' }}>{order.user?.email ?? ''}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', whiteSpace: 'nowrap' }}>
                      {fmtDate(order.createdAt)}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', textAlign: 'center' }}>
                      {order.items?.length ?? 0}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600, color: '#122036', whiteSpace: 'nowrap' }}>
                      {fmt(order.total)}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <Badge status={order.status} />
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={e => changeStatus(order.id, e.target.value)}
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#3a4660', border: '1px solid #e8eff9', borderRadius: '7px', padding: '6px 10px', background: '#fff', cursor: 'pointer', outline: 'none' }}
                      >
                        {STATUSES.filter(s => s !== 'ALL').map(s => (
                          <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
