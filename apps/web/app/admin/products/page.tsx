'use client';
import { useEffect, useState } from 'react';
import { Package, Plus, Trash2, X, Search } from 'lucide-react';
import { adminApi, AdminProduct, AdminCategory } from '@/lib/api';

function fmt(v: any) { return `$${parseFloat(v ?? 0).toFixed(2)}`; }

function StockBadge({ qty }: { qty: number | null }) {
  if (qty === null || qty === undefined) return <span style={{ color: '#a0aab4', fontSize: '12px' }}>—</span>;
  if (qty === 0) return <span style={{ background: '#fef2f2', color: '#991b1b', padding: '2px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>Out</span>;
  if (qty < 20) return <span style={{ background: '#fff7ed', color: '#c2410c', padding: '2px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>Low ({qty})</span>;
  return <span style={{ background: '#f0fdf4', color: '#166534', padding: '2px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{qty}</span>;
}

const EMPTY = { name: '', sku: '', price: '', unit: 'each', description: '', categoryId: '', stockQty: '', active: true, featured: false };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<typeof EMPTY & { id?: string }>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  function load() {
    setLoading(true);
    Promise.all([adminApi.getProducts(), adminApi.getCategories()])
      .then(([p, c]) => { setProducts(Array.isArray(p) ? p : []); setCategories(Array.isArray(c) ? c : []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(EMPTY); setShowModal(true); }
  function openEdit(p: AdminProduct) {
    setForm({ id: p.id, name: p.name, sku: p.sku, price: String(p.price), unit: p.unit, description: p.description ?? '', categoryId: (p.category as any)?.id ?? '', stockQty: p.stockQty !== null ? String(p.stockQty) : '', active: p.active, featured: p.featured });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { ...form, price: parseFloat(form.price) || 0, stockQty: form.stockQty !== '' ? parseInt(form.stockQty) : null };
      if (form.id) payload.id = form.id;
      await adminApi.saveProduct(payload);
      setShowModal(false);
      load();
    } catch { /* ignore */ }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Deactivate this product?')) return;
    setDeletingId(id);
    try { await adminApi.deleteProduct(id); load(); } catch { /* ignore */ }
    finally { setDeletingId(''); }
  }

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || (p.category?.name ?? '').toLowerCase().includes(q);
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#122036', margin: '0 0 4px' }}>Products</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>{products.length} products in catalog</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} color="#a0aab4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={{ paddingLeft: '36px', padding: '9px 14px 9px 36px', border: '1px solid #e8eff9', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660', background: '#fff', outline: 'none', width: '220px' }} />
          </div>
          <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4' }}>Loading products…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Package size={36} color="#e0e7f3" style={{ marginBottom: '12px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#a0aab4', margin: '0 0 12px' }}>No products found</p>
            <button onClick={openAdd} style={{ padding: '9px 20px', background: '#1a4fa0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#fff' }}>Add First Product</button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Name', 'SKU', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6b7690', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#122036' }}>{p.name}</div>
                      {p.featured && <span style={{ fontSize: '11px', color: '#ee6a12', fontWeight: 600 }}>Featured</span>}
                    </td>
                    <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6b7690', fontFamily: 'monospace' }}>{p.sku}</td>
                    <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690' }}>{p.category?.name ?? '—'}</td>
                    <td style={{ padding: '13px 16px', fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600, color: '#122036', whiteSpace: 'nowrap' }}>{fmt(p.price)}</td>
                    <td style={{ padding: '13px 16px' }}><StockBadge qty={p.stockQty} /></td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)', background: p.active ? '#f0fdf4' : '#f1f5f9', color: p.active ? '#166534' : '#475569' }}>
                        {p.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => openEdit(p)} style={{ padding: '6px 12px', border: '1px solid #e8eff9', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#1a4fa0', fontWeight: 500 }}>Edit</button>
                        <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id} style={{ padding: '6px 8px', border: '1px solid #fecaca', borderRadius: '6px', background: '#fff', cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center' }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', color: '#122036', margin: 0 }}>{form.id ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7690', padding: '4px' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              {[
                { label: 'Product Name', key: 'name', type: 'text', required: true },
                { label: 'SKU', key: 'sku', type: 'text', required: true },
                { label: 'Price ($)', key: 'price', type: 'number', required: true },
                { label: 'Unit (e.g. each, box)', key: 'unit', type: 'text', required: false },
                { label: 'Stock Quantity', key: 'stockQty', type: 'number', required: false },
              ].map(({ label, key, type, required }) => (
                <div key={key} style={{ marginBottom: '14px' }}>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#3a4660', display: 'block', marginBottom: '5px' }}>{label}</label>
                  <input type={type} required={required} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} className="sn-input" style={{ width: '100%' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#3a4660', display: 'block', marginBottom: '5px' }}>Category</label>
                <select value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8eff9', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660', background: '#fff', outline: 'none' }}>
                  <option value="">Select category…</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#3a4660', display: 'block', marginBottom: '5px' }}>Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8eff9', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660', resize: 'vertical', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660' }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
                  Active
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660' }}>
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
                  Featured
                </label>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', border: '1px solid #e8eff9', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660' }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ padding: '10px 24px', background: saving ? '#ccc' : 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                  {saving ? 'Saving…' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
