const TESTIMONIALS = [
  {
    quote:
      "Sunnova got our med spa restocked the same week when our old supplier left us waiting. Same price, better service. We haven't looked back.",
    name: 'Name Placeholder',
    title: 'Practice Manager, Med Spa',
  },
  {
    quote:
      "Sunnova got our med spa restocked the same week when our old supplier left us waiting. Same price, better service. We haven't looked back.",
    name: 'Name Placeholder',
    title: 'Practice Manager, Med Spa',
  },
  {
    quote:
      "Sunnova got our med spa restocked the same week when our old supplier left us waiting. Same price, better service. We haven't looked back.",
    name: 'Name Placeholder',
    title: 'Practice Manager, Med Spa',
  },
];

export default function Testimonials() {
  return (
    <section className="sn-section sn-bg-light" aria-labelledby="testimonials-heading">
      <div className="sn-container">
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-5">
          <div>
            <p className="sn-eyebrow">Social Proof</p>
            <h2
              id="testimonials-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#122036',
                margin: 0,
              }}
            >
              Trusted by Miami&apos;s Clinics
            </h2>
          </div>
          {/* Google Reviews badge */}
          <div
            className="d-flex align-items-center gap-2 px-3 py-2 bg-white rounded-3"
            style={{ border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}
            aria-label="Google Reviews rating"
          >
            <svg width="68" height="24" viewBox="0 0 68 24" aria-hidden="true">
              <text x="0" y="18" fontFamily="var(--font-heading)" fontSize="16" fontWeight="700" fill="#4285f4">G</text>
              <text x="12" y="18" fontFamily="var(--font-heading)" fontSize="16" fontWeight="700" fill="#ea4335">o</text>
              <text x="22" y="18" fontFamily="var(--font-heading)" fontSize="16" fontWeight="700" fill="#fbbc05">o</text>
              <text x="32" y="18" fontFamily="var(--font-heading)" fontSize="16" fontWeight="700" fill="#4285f4">g</text>
              <text x="41" y="18" fontFamily="var(--font-heading)" fontSize="16" fontWeight="700" fill="#34a853">l</text>
              <text x="49" y="18" fontFamily="var(--font-heading)" fontSize="16" fontWeight="700" fill="#ea4335">e</text>
            </svg>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 600, color: '#3a4660' }}>
                Reviews
              </div>
              <div style={{ color: '#f4811e', fontSize: '13px', lineHeight: 1 }}>★★★★★</div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="col-12 col-md-4">
              <div className="sn-testimonial-card h-100">
                {/* Quote mark */}
                <span className="sn-testimonial-quote" aria-hidden="true">&ldquo;</span>
                {/* Stars */}
                <div style={{ color: '#f4811e', fontSize: '14px', marginBottom: '12px' }} aria-label="5 stars">
                  ★★★★★
                </div>
                {/* Quote text */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '17px',
                    color: '#122036',
                    lineHeight: 1.65,
                    marginBottom: '24px',
                    flexGrow: 1,
                  }}
                >
                  {t.quote}
                </p>
                {/* Attribution */}
                <div className="d-flex align-items-center gap-3">
                  {/* Avatar placeholder */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ee6a12, #f9b23e)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '16px',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: '#122036',
                        margin: 0,
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: '#6b7690',
                        margin: 0,
                      }}
                    >
                      {t.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
