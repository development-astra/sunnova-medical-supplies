import { Heart, Sparkles, Microscope, Stethoscope, Activity, Leaf } from 'lucide-react';

const PRACTICES = [
  { icon: Heart, label: 'Med Spas' },
  { icon: Sparkles, label: 'Aesthetic Clinics' },
  { icon: Microscope, label: 'Dermatology Offices' },
  { icon: Stethoscope, label: 'Private Practices' },
  { icon: Activity, label: 'Urgent Care' },
  { icon: Leaf, label: 'Wellness Centers' },
];

export default function WhoWeServe() {
  return (
    <section className="sn-section sn-bg-white" aria-labelledby="who-we-serve-heading">
      <div className="sn-container text-center">
        <p className="sn-eyebrow d-inline-flex">Who We Serve</p>
        <h2
          id="who-we-serve-heading"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#122036',
            marginBottom: '16px',
          }}
        >
          Built for the Practices We Serve
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            color: '#3a4660',
            maxWidth: '600px',
            marginInline: 'auto',
            marginBottom: '56px',
            lineHeight: 1.65,
          }}
        >
          Med spas, aesthetic clinics, dermatology offices, private practices, urgent care centers,
          and wellness centers across Miami-Dade. We serve Miami&apos;s clinical community, and we
          do it exceptionally well.
        </p>

        <div className="row justify-content-center gy-4">
          {PRACTICES.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="col-4 col-md-2">
                <div
                  className="d-flex flex-column align-items-center gap-2"
                  style={{ cursor: 'default' }}
                >
                  <div className="sn-practice-icon">
                    <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: '#122036',
                      fontWeight: 400,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
