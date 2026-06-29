import { MapPin } from 'lucide-react';

const NEIGHBORHOODS = [
  'Brickell and Downtown',
  'Coral Gables',
  'Coconut Grove',
  'Miami Beach',
  'Midtown',
  'South Miami',
  'Doral',
  'Westchester',
  'Hialeah',
  'Kendall',
  'Aventura',
  'Cutler Bay',
  'Pinecrest',
  'Sweetwater',
];

export default function LocalDelivery() {
  return (
    <section
      style={{ backgroundColor: '#1a4fa0', position: 'relative', overflow: 'hidden' }}
      aria-labelledby="local-delivery-heading"
    >
      {/* Decorative bg circles */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-80px',
          top: '-80px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-60px',
          bottom: '-60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none',
        }}
      />

      <div className="sn-container sn-section">
        <div className="row align-items-center gy-5">
          {/* Left: text content */}
          <div className="col-12 col-lg-6">
            <p className="sn-eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>
              <span style={{ background: 'rgba(255,255,255,0.3)', height: '2px', width: '20px', display: 'inline-block', borderRadius: '2px', marginRight: '6px' }} />
              Local Delivery and Coverage
            </p>
            <h2
              id="local-delivery-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#ffffff',
                marginBottom: '20px',
              }}
            >
              Local Delivery You Can Count On
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.65,
                marginBottom: '32px',
              }}
            >
              Backorders and unreliable shipping windows disrupt patient care and your bottom line.
              Local delivery means you can count on your order arriving when it should.
            </p>

            {/* Neighborhoods */}
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}
              role="list"
              aria-label="Neighborhoods served"
            >
              {NEIGHBORHOODS.map((n) => (
                <span key={n} className="sn-neighborhood-pill" role="listitem">
                  <MapPin size={10} aria-hidden="true" />
                  {n}
                </span>
              ))}
              <span
                className="sn-neighborhood-pill"
                style={{ background: 'linear-gradient(135deg, #ee6a12, #f9b23e)', border: 'none' }}
                role="listitem"
              >
                + surrounding communities
              </span>
            </div>
          </div>

          {/* Right: map card */}
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '32px',
                width: '100%',
                maxWidth: '420px',
              }}
            >
              {/* Map placeholder */}
              <div
                style={{
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.1)',
                  height: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                aria-label="Miami-Dade County service area map"
                role="img"
              >
                {/* Dot markers */}
                {[
                  { top: '30%', left: '48%' },
                  { top: '55%', left: '35%' },
                  { top: '45%', left: '62%' },
                  { top: '70%', left: '50%' },
                  { top: '25%', left: '65%' },
                ].map((pos, i) => (
                  <div
                    key={i}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: pos.top,
                      left: pos.left,
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#f9b23e',
                      border: '2px solid #fff',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  Miami-Dade County
                </span>
              </div>

              {/* Stats */}
              <div className="d-flex align-items-center gap-3">
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '11px',
                      color: '#1a4fa0',
                      letterSpacing: '0.05em',
                      marginBottom: '2px',
                    }}
                  >
                    Miami-Dade County
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '28px',
                      color: '#1a4fa0',
                      lineHeight: 1,
                    }}
                  >
                    15+
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: '13px',
                      color: '#122036',
                    }}
                  >
                    Neighborhoods Served
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
