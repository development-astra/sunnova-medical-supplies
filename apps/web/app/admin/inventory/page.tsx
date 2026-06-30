'use client';
import { useEffect, useState } from 'react';
import { Boxes, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { adminApi, AdminProduct } from '@/lib/api';

type StockLevel = 'in_stock' | 'low' | 'out' | 'untracked';

function getLevel(qty: number | null): StockLevel {
  if (qty === null || qty === undefined) return 'untracked';
  if (qty === 0) return 'out';
  if (qty < 20) return 'low';
  return 'in_stock';
}

const LEVEL_STYLE: Record<StockLevel, { bg: string; text: string; label: string }> = {
  in_stock:  { bg: '#dcfce7', text: '#166534', label: 'In Stock' },
  low:       { bg: '#fff7ed', text: '#c2410c', label: 'Low Stock' },
  out:       { bg: '#fef2f2', text: '#991b1b', label: 'Out of Stock' },
  untracked: { bg: '#f1f5f9', text: '#475569', label: 'Untracked' },
};

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | StockLevel>('all');

  function load() {
    setLoading(true);
    adminApi.getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  const counts = {
    in_stock:  products.filter(p => getLevel(p.stockQty) === 'in_stock').length,
    low:       products.filter(p => getLevel(p.stockQty) === 'low').length,
    out:       products.filter(p => getLevel(p.stockQty) === 'out').length,
    untracked: products.filter(p => getLevel(p.stockQty) === 'untracked').length,
  };

  const filtered = filter === 'all' ? products : products.filter(p => getLevel(p.stockQty) === filter);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#122036', margin: '0 0 4px' }}>Inventory</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>{products.length} products · stock levels overview</p>
        </div>
        <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#fff', border: '1px solid #e8eff9', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#3a4660' }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Stock level cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {([
          { key: 'in_stock',  label: 'In Stock',   icon: CheckCircle,   color: '#0e9f6e' },
          { key: 'low',       label: 'Low Stock',   icon: AlertTriangle, color: '#ee6a12' },
          { key: 'out',       label: 'Out of Stock',icon: XCircle,       color: '#dc2626' },
          { key: 'untracked', label: 'Untracked',   icon: Boxes,         color: '#6b7280' },
        ] as const).map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => setFilter(filter === key ? 'all' : key)}
            style={{ background: filter === key ? '#0d1b2e' : '#fff', borderRadius: '12px', padding: '18px', border: `1px solid ${filter === key ? '#0d1b2e' : '#e8eff9'}`, boxShadow: '0 2px 8px rgba(18,32,54,0.05)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <Icon size={18} color="#fff" />
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: filter === key ? '#fff' : '#122036', margin: '0 0 2px' }}>{loading ? '—' : counts[key]}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: filter === key ? 'rgba(255,255,255,0.6)' : '#6b7690', margin: 0 }}>{label}</p>
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4' }}>Loading inventory…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Boxes size={36} color="#e0e7f3" style={{ marginBottom: '12px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#a0aab4', margin: 0 }}>No products match this filter</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Product', 'SKU', 'Category', 'Unit', 'Qty on Hand', 'Stock Level'].map(h => (
                    <th key={h} style={{ padding: '12px 18px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6b7690', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const level = getLevel(p.stockQty);
                  const ls = LEVEL_STYLE[level];
                  return (
                    <tr key={p.id} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                      <td style={{ padding: '13px 18px', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#122036' }}>{p.name}</td>
                      <td style={{ padding: '13px 18px', fontFamily: 'monospace', fontSize: '12px', color: '#6b7690' }}>{p.sku}</td>
                      <td style={{ padding: '13px 18px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690' }}>{p.category?.name ?? '—'}</td>
                      <td style={{ padding: '13px 18px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690' }}>{p.unit}</td>
                      <td style={{ padding: '13px 18px', fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: level === 'out' ? '#dc2626' : level === 'low' ? '#c2410c' : '#122036', textAlign: 'center' }}>
                        {p.stockQty !== null ? p.stockQty : <span style={{ color: '#c4ccd8', fontSize: '13px', fontWeight: 400 }}>—</span>}
                      </td>
                      <td style={{ padding: '13px 18px' }}>
                        <span style={{ background: ls.bg, color: ls.text, padding: '3px 10px', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600 }}>
                          {ls.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
