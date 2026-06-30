'use client';
import { useEffect, useState } from 'react';
import { Tag, Plus, Trash2, X } from 'lucide-react';
import { adminApi, AdminCategory } from '@/lib/api';

const EMPTY = { name: '', description: '', imageUrl: '', sortOrder: 0, active: true };

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<typeof EMPTY & { id?: string }>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  function load() {
    setLoading(true);
    adminApi.getCategories()
      .then(data => setCats(Array.isArray(data) ? data : []))
      .catch(() => setCats([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(EMPTY); setShowModal(true); }
  function openEdit(c: AdminCategory) {
    setForm({ id: c.id, name: c.name, description: c.description ?? '', imageUrl: c.imageUrl ?? '', sortOrder: c.sortOrder, active: c.active });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { ...form, sortOrder: Number(form.sortOrder) };
      await adminApi.saveCategory(payload);
      setShowModal(false);
      load();
    } catch { /* ignore */ }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Deactivate this category?')) return;
    setDeletingId(id);
    try { await adminApi.deleteCategory(id); load(); } catch { /* ignore */ }
    finally { setDeletingId(''); }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#122036', margin: '0 0 4px' }}>Categories</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>{cats.length} product categories</p>
        </div>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4' }}>Loading categories…</div>
        ) : cats.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Tag size={36} color="#e0e7f3" style={{ marginBottom: '12px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#a0aab4', margin: '0 0 12px' }}>No categories yet</p>
            <button onClick={openAdd} style={{ padding: '9px 20px', background: '#1a4fa0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#fff' }}>Add First Category</button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Category', 'Description', 'Sort Order', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6b7690', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cats.map((cat, i) => (
                  <tr key={cat.id} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {cat.imageUrl ? (
                          <img src={cat.imageUrl} alt={cat.name} style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Tag size={16} color="#1a4fa0" />
                          </div>
                        )}
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#122036' }}>{cat.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', maxWidth: '280px' }}>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {cat.description ?? <span style={{ color: '#c4ccd8' }}>No description</span>}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660', textAlign: 'center' }}>
                      {cat.sortOrder}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)', background: cat.active ? '#f0fdf4' : '#f1f5f9', color: cat.active ? '#166534' : '#475569' }}>
                        {cat.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => openEdit(cat)} style={{ padding: '6px 12px', border: '1px solid #e8eff9', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#1a4fa0', fontWeight: 500 }}>Edit</button>
                        <button onClick={() => handleDelete(cat.id)} disabled={deletingId === cat.id} style={{ padding: '6px 8px', border: '1px solid #fecaca', borderRadius: '6px', background: '#fff', cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center' }}>
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
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '460px', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', color: '#122036', margin: 0 }}>{form.id ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7690' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              {[
                { label: 'Category Name', key: 'name', required: true },
                { label: 'Image URL', key: 'imageUrl', required: false },
                { label: 'Sort Order', key: 'sortOrder', required: false },
              ].map(({ label, key, required }) => (
                <div key={key} style={{ marginBottom: '14px' }}>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#3a4660', display: 'block', marginBottom: '5px' }}>{label}</label>
                  <input type={key === 'sortOrder' ? 'number' : 'text'} required={required} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} className="sn-input" style={{ width: '100%' }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#3a4660', display: 'block', marginBottom: '5px' }}>Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8eff9', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660', resize: 'vertical', outline: 'none' }} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660', marginBottom: '20px' }}>
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} /> Active
              </label>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', border: '1px solid #e8eff9', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660' }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ padding: '10px 24px', background: saving ? '#ccc' : 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                  {saving ? 'Saving…' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
