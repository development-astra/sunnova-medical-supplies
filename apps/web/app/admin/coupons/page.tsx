'use client';
import { Ticket, Plus, Tag, Percent, Calendar, Users } from 'lucide-react';

const MOCK_COUPONS = [
  { code: 'WELCOME10', type: 'Percentage', value: 10, minOrder: 50, uses: 0, maxUses: 100, expiry: '2026-12-31', active: true },
  { code: 'CLINIC20', type: 'Percentage', value: 20, minOrder: 200, uses: 14, maxUses: 50, expiry: '2026-09-30', active: true },
  { code: 'FREESHIP', type: 'Free Shipping', value: 0, minOrder: 75, uses: 32, maxUses: null, expiry: null, active: false },
];

export default function AdminCouponsPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#122036', margin: '0 0 4px' }}>Coupons</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>Manage discount codes and promotions</p>
        </div>
        <button
          disabled
          style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '8px', cursor: 'not-allowed', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff', opacity: 0.65 }}
        >
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {/* Coming soon banner */}
      <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f0f4ff 100%)', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '20px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#1a4fa0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Ticket size={22} color="#fff" />
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1e40af', margin: '0 0 2px' }}>Coupon Engine — Coming Soon</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#3b82f6', margin: 0 }}>
            Full coupon management with percentage/fixed discounts, free shipping codes, usage limits, and expiry dates is in development. Preview below.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {[
          { label: 'Active Coupons', value: '2', icon: Tag, color: '#0e9f6e' },
          { label: 'Total Redemptions', value: '46', icon: Users, color: '#1a4fa0' },
          { label: 'Avg. Discount', value: '15%', icon: Percent, color: '#ee6a12' },
          { label: 'Expiring Soon', value: '1', icon: Calendar, color: '#7c3aed' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={{ background: '#fff', borderRadius: '12px', padding: '18px', border: '1px solid #e8eff9', boxShadow: '0 2px 8px rgba(18,32,54,0.05)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <Icon size={18} color="#fff" />
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '24px', color: '#122036', margin: '0 0 2px' }}>{value}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6b7690', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Preview table */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden', opacity: 0.7, pointerEvents: 'none' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f4ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Ticket size={16} color="#6b7690" />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#122036' }}>Coupon Codes (Preview)</span>
          <span style={{ marginLeft: '8px', background: '#f0f4ff', color: '#1a4fa0', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>Sample Data</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8faff' }}>
                {['Code', 'Type', 'Value', 'Min. Order', 'Uses', 'Expiry', 'Status'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#6b7690', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_COUPONS.map((c, i) => (
                <tr key={c.code} style={{ borderTop: '1px solid #f0f4ff', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                  <td style={{ padding: '13px 16px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, color: '#1a4fa0', letterSpacing: '0.5px' }}>{c.code}</td>
                  <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#3a4660' }}>{c.type}</td>
                  <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#122036', fontWeight: 600 }}>
                    {c.type === 'Percentage' ? `${c.value}%` : c.type}
                  </td>
                  <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690' }}>${c.minOrder}</td>
                  <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690' }}>
                    {c.uses}{c.maxUses ? ` / ${c.maxUses}` : ''}
                  </td>
                  <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690' }}>
                    {c.expiry ?? <span style={{ color: '#c4ccd8' }}>No expiry</span>}
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)', background: c.active ? '#f0fdf4' : '#f1f5f9', color: c.active ? '#166534' : '#475569' }}>
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
