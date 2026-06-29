import { Building2, Zap, Users, DollarSign } from 'lucide-react';

const REASONS = [
  {
    icon: Building2,
    title: "Built by someone who's been in the room",
    description:
      'Founded by a medical professional with hands-on clinical experience, so our catalog reflects what practices actually need — not just what looks good in a brochure.',
    featured: true,
  },
  {
    icon: Zap,
    title: 'Local speed, not national backorders',
    description:
      'As a Miami-based operation, we move faster and communicate better than large distributors. No endless tracking, no national backorder windows.',
    featured: false,
  },
  {
    icon: Users,
    title: 'Reach a real person',
    description:
      "When something's urgent, you're not on hold or filing a ticket. You're talking to someone who knows your account and your products.",
    featured: false,
  },
  {
    icon: DollarSign,
    title: 'Priced and built for your practice',
    description:
      'Competitive pricing, flexible ordering, and a catalog curated for med spas, clinics, and private practices of every size.',
    featured: false,
  },
];

export default function WhySunnova() {
  return (
    <section className="sn-section sn-bg-light" aria-labelledby="why-sunnova-heading">
      <div className="sn-container">
        <div className="text-center mb-5">
          <p className="sn-eyebrow d-inline-flex">Why Sunnova</p>
          <h2
            id="why-sunnova-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: '#122036',
              marginBottom: '0',
            }}
          >
            Why Miami-Dade Clinics Choose Sunnova
          </h2>
        </div>

        <div className="row g-4">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div key={i} className="col-12 col-md-6">
                <div
                  className="h-100 p-4 p-lg-5"
                  style={{
                    background: reason.featured ? '#1a4fa0' : '#ffffff',
                    borderRadius: '16px',
                    border: reason.featured ? 'none' : '1px solid #e8eff9',
                    boxShadow: reason.featured ? '0 8px 32px rgba(26,79,160,0.25)' : 'var(--shadow-card)',
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: reason.featured ? 'rgba(255,255,255,0.15)' : 'linear-gradient(135deg, #ee6a12, #f9b23e)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={22} color={reason.featured ? '#f9b23e' : '#ffffff'} strokeWidth={1.8} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '22px',
                      color: reason.featured ? '#ffffff' : '#122036',
                      marginBottom: '12px',
                      lineHeight: 1.25,
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '17px',
                      color: reason.featured ? 'rgba(255,255,255,0.85)' : '#54585f',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
