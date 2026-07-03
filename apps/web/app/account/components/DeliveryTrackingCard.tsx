import { MapPin, Check, Truck, Clock } from 'lucide-react';
import { deliveryTracking } from '@/lib/account/mock-customer-dashboard-data';
import { DashboardCard } from './DashboardCard';
import { StatusBadge } from './StatusBadge';

const CITIES = [
  { name: 'Hialeah', style: { top: '14%', left: '16%' } },
  { name: 'Doral', style: { top: '34%', left: '58%' } },
  { name: 'Miami', style: { top: '52%', left: '30%' } },
  { name: 'Coral Gables', style: { bottom: '20%', left: '20%' } },
  { name: 'Miami Beach', style: { top: '60%', right: '10%' } },
];

export function DeliveryTrackingCard() {
  const d = deliveryTracking;
  return (
    <DashboardCard title="Delivery Tracking" action={{ label: 'Track All Deliveries', href: '/account/track' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <StatusBadge status={d.status} />
        <span style={{ fontFamily: 'var(--pf-body)', fontSize: 12.5, color: 'var(--color-text-muted)' }}>
          Est. {d.eta}
        </span>
      </div>

      <div className="pf-delivery-grid">
        {/* Timeline + address */}
        <div>
          <ol className="pf-timeline">
            {d.steps.map((s) => (
              <li key={s.label} className={`pf-timeline-step ${s.state === 'upcoming' ? '' : s.state}`}>
                <span className="pf-timeline-dot">
                  {s.state === 'done' ? <Check size={12} strokeWidth={3} /> : s.state === 'active' ? <Truck size={12} /> : <Clock size={11} />}
                </span>
                <div>
                  <p className="pf-timeline-label">{s.label}</p>
                  {s.sub && <p className="pf-timeline-sub">{s.sub}</p>}
                </div>
              </li>
            ))}
          </ol>

          <div className="pf-address-box" style={{ marginTop: 14 }}>
            <p style={{ fontFamily: 'var(--pf-heading)', fontSize: 13, fontWeight: 600, color: 'var(--sunnova-dark)', margin: '0 0 3px' }}>
              {d.addressName}
            </p>
            {d.addressLines.map((line) => (
              <p key={line} style={{ fontFamily: 'var(--pf-body)', fontSize: 12.5, color: 'var(--color-text-muted)', margin: 0 }}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="pf-map" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 300 220" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
            <path d="M-10 80 Q 80 50 150 110 T 320 130" fill="none" stroke="rgba(0,66,150,0.16)" strokeWidth="2" />
            <path d="M30 -10 Q 60 90 150 120 T 210 230" fill="none" stroke="rgba(0,66,150,0.1)" strokeWidth="2" />
            <path d="M-10 170 Q 120 160 190 120 T 320 90" fill="none" stroke="rgba(229,85,15,0.2)" strokeWidth="2.5" strokeDasharray="5 6" />
            <circle cx="60" cy="150" r="5" fill="#004296" />
            <circle cx="200" cy="112" r="6" fill="#e5550f" />
            <circle cx="200" cy="112" r="13" fill="none" stroke="rgba(229,85,15,0.35)" strokeWidth="2" />
          </svg>
          {CITIES.map((c) => (
            <span key={c.name} className="pf-map-tag" style={c.style}>{c.name}</span>
          ))}
          <MapPin size={24} color="var(--color-accent)" fill="var(--color-accent)" style={{ position: 'absolute', top: '44%', left: '62%' }} />
        </div>
      </div>
    </DashboardCard>
  );
}
