import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { deliverySnapshot } from '@/lib/admin/mock-dashboard-data';

const STATS = [
  { value: String(deliverySnapshot.outForDelivery), label: 'Out for Delivery' },
  { value: String(deliverySnapshot.deliveredToday), label: 'Delivered Today' },
  { value: deliverySnapshot.onTimeRate, label: 'On-time Delivery' },
];

export function DeliverySnapshot() {
  return (
    <section className="sa-card sa-delivery">
      <div className="sa-card-body" style={{ display: 'flex', gap: 24, alignItems: 'stretch', flexWrap: 'wrap' }}>
        {/* Left: copy + stats */}
        <div style={{ flex: '1 1 340px', minWidth: 260, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 4 }}>
            <MapPin size={18} color="var(--color-primary)" aria-hidden="true" />
            <h2 className="sa-card-title" style={{ padding: 0 }}>Miami-Dade Local Delivery</h2>
          </div>
          <p className="sa-metric-label" style={{ fontWeight: 500, margin: '0 0 20px' }}>
            Local delivery excellence across Miami-Dade
          </p>

          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 22 }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="sa-delivery-stat">{s.value}</p>
                <p className="sa-delivery-stat-label">{s.label}</p>
              </div>
            ))}
          </div>

          <Link href="/admin/shipping" className="sa-promo-btn" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>
            View Deliveries <ArrowRight size={13} />
          </Link>
        </div>

        {/* Right: soft map illustration */}
        <div
          aria-hidden="true"
          style={{
            flex: '1 1 260px',
            minHeight: 190,
            position: 'relative',
            borderRadius: 14,
            overflow: 'hidden',
            background:
              'radial-gradient(90% 90% at 60% 40%, rgba(0,66,150,0.07), transparent 70%), var(--color-surface-muted)',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* faux road/route lines */}
          <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
            <path d="M-10 60 Q 90 40 150 90 T 320 120" fill="none" stroke="rgba(0,66,150,0.14)" strokeWidth="2" />
            <path d="M40 -10 Q 70 80 150 100 T 220 210" fill="none" stroke="rgba(0,66,150,0.1)" strokeWidth="2" />
            <path d="M-10 150 Q 120 150 180 110 T 320 70" fill="none" stroke="rgba(229,85,15,0.16)" strokeWidth="2" strokeDasharray="5 6" />
            <circle cx="150" cy="98" r="5" fill="#e5550f" />
            <circle cx="150" cy="98" r="12" fill="none" stroke="rgba(229,85,15,0.35)" strokeWidth="2" />
          </svg>
          <span className="sa-map-tag" style={{ top: 24, left: 30 }}>Hialeah</span>
          <span className="sa-map-tag" style={{ top: '46%', left: '52%' }}>Miami</span>
          <span className="sa-map-tag" style={{ bottom: 26, left: '34%' }}>Kendall</span>
          <MapPin
            size={26}
            color="var(--color-primary)"
            fill="var(--color-primary)"
            style={{ position: 'absolute', top: '38%', left: '48%' }}
          />
        </div>
      </div>
    </section>
  );
}
