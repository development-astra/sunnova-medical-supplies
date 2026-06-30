'use client';
import { Truck, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';

const MIAMI_ZONES = [
  { zone: 'Zone 1 — Central Miami-Dade', areas: ['Miami Beach', 'Coral Gables', 'Coconut Grove', 'Downtown Miami', 'Brickell', 'Wynwood'], rate: 'Free', eta: 'Same Day' },
  { zone: 'Zone 2 — North Miami-Dade', areas: ['Aventura', 'Hallandale', 'North Miami Beach', 'Hialeah', 'Miami Lakes', 'Opa-locka'], rate: 'Free', eta: 'Same Day' },
  { zone: 'Zone 3 — South Miami-Dade', areas: ['Homestead', 'Florida City', 'Cutler Bay', 'Palmetto Bay', 'Pinecrest', 'Kendall'], rate: 'Free', eta: 'Next Day' },
  { zone: 'Zone 4 — Outside Miami-Dade', areas: ['Broward County', 'Palm Beach', 'Monroe County', 'Rest of Florida'], rate: '$12.50', eta: '2-3 Business Days' },
];

const CARRIERS = [
  { name: 'Sunnova Direct', type: 'Local Fleet', coverage: 'Miami-Dade', tracking: true, active: true },
  { name: 'UPS Ground', type: 'Carrier', coverage: 'Nationwide', tracking: true, active: true },
  { name: 'FedEx Express', type: 'Carrier', coverage: 'Nationwide', tracking: true, active: false },
];

export default function AdminShippingPage() {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: '#122036', margin: '0 0 4px' }}>Shipping</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>Delivery zones, rates, and carrier configuration</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Free Shipping Zones', value: '3', icon: Truck, color: '#0e9f6e' },
          { label: 'Coverage Area', value: 'Miami-Dade', icon: MapPin, color: '#1a4fa0' },
          { label: 'Same-Day Cutoff', value: '2:00 PM', icon: Clock, color: '#ee6a12' },
          { label: 'Min. Free Ship', value: '$0', icon: DollarSign, color: '#7c3aed' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={{ background: '#fff', borderRadius: '12px', padding: '18px', border: '1px solid #e8eff9', boxShadow: '0 2px 8px rgba(18,32,54,0.05)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <Icon size={18} color="#fff" />
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', color: '#122036', margin: '0 0 2px' }}>{value}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6b7690', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Delivery Zones */}
        <div>
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f4ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={17} color="#1a4fa0" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#122036', margin: 0 }}>Delivery Zones</h2>
            </div>
            <div style={{ padding: '16px' }}>
              {MIAMI_ZONES.map(({ zone, areas, rate, eta }) => (
                <div key={zone} style={{ border: '1px solid #e8eff9', borderRadius: '10px', padding: '16px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', color: '#122036', margin: 0 }}>{zone}</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ background: rate === 'Free' ? '#dcfce7' : '#f0f4ff', color: rate === 'Free' ? '#166534' : '#1a4fa0', padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
                        {rate}
                      </span>
                      <span style={{ background: '#f0f4ff', color: '#1a4fa0', padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                        {eta}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {areas.map(a => (
                      <span key={a} style={{ background: '#f7f9fa', color: '#3a4660', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontFamily: 'var(--font-body)' }}>{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Carriers */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(18,32,54,0.06)', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f4ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={16} color="#1a4fa0" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#122036', margin: 0 }}>Carriers</h2>
            </div>
            <div style={{ padding: '14px' }}>
              {CARRIERS.map(c => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid #f0f4ff', borderRadius: '8px', marginBottom: '8px' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#122036', margin: '0 0 2px' }}>{c.name}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6b7690', margin: 0 }}>{c.type} · {c.coverage}</p>
                  </div>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)', background: c.active ? '#f0fdf4' : '#f1f5f9', color: c.active ? '#166534' : '#475569' }}>
                    {c.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Policy */}
          <div style={{ background: 'linear-gradient(135deg, #0d1b2e, #1a3a6b)', borderRadius: '14px', padding: '20px', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <CheckCircle size={16} color="#ee6a12" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#fff', margin: 0 }}>Shipping Policy</h3>
            </div>
            {[
              'Free delivery across Miami-Dade County',
              'Same-day delivery for orders before 2 PM',
              'Order tracking via email notification',
              'Signature required for orders over $500',
              'Returns accepted within 30 days',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ee6a12', marginTop: '6px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
