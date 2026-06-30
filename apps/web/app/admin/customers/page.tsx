'use client';
import { useEffect, useState } from 'react';
import { Users, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { adminApi, AdminUser } from '@/lib/api';

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function Avatar({ name }: { name: string }) {
  return (
    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#1a4fa0,#2a6fd0)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, color: '#fff' }}>
        {(name || '?')[0].toUpperCase()}
      </span>
    </div>
  );
}

export default function AdminCustomersPage() {
  const [all, setAll] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const PER_PAGE = 20;

  useEffect(() => {
    adminApi.getCustomers(page)
      .then(data => setAll(Array.isArray(data) ? data : []))
      .catch(() => setAll([]))
      .finally(() => setLoading(false));
  }, [page]);

  const filtered = all.filter(u => {
    const q = search.toLowerCase();
    return (
      u.email.toLowerCase().includes(q) ||
      (u.firstName ?? '').toLowerCase().includes(q) ||
      (u.lastName ?? '').toLowerCase().includes(q) ||
      (u.businessName ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#122036', margin: '0 0 4px' }}>Customers</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>
            {all.length} account{all.length !== 1 ? 's' : ''} registered
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={15} color="#a0aab4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers…"
            style={{ paddingLeft: '36px', padding: '9px 14px 9px 36px', border: '1px solid #e8eff9', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660', background: '#fff', outline: 'none', width: '240px' }}
          />
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#a0aab4' }}>Loading customers…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Users size={36} color="#e0e7f3" style={{ marginBottom: '12px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#a0aab4', margin: 0 }}>No customers found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Customer', 'Email', 'Business', 'Role', 'Joined'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6b7690', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => {
                  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;
                  return (
                    <tr key={user.id} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Avatar name={fullName} />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#122036' }}>{fullName}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#3a4660' }}>
                        {user.email}
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690' }}>
                        {user.businessName ?? <span style={{ color: '#c4ccd8' }}>—</span>}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                          background: user.role === 'ADMIN' ? '#fff7ed' : '#f0f4ff',
                          color: user.role === 'ADMIN' ? '#c2410c' : '#1d4ed8',
                        }}>
                          {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', whiteSpace: 'nowrap' }}>
                        {fmtDate(user.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && all.length >= PER_PAGE && (
          <div style={{ padding: '14px 20px', borderTop: '1px solid #f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '6px 12px', border: '1px solid #e8eff9', borderRadius: '7px', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', color: page === 1 ? '#c4ccd8' : '#3a4660' }}>
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690' }}>Page {page}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={all.length < PER_PAGE} style={{ padding: '6px 12px', border: '1px solid #e8eff9', borderRadius: '7px', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#3a4660' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
