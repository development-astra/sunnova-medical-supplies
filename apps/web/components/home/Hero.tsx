import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, User, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section
      style={{ backgroundColor: '#1a4fa0', position: 'relative', overflow: 'hidden' }}
      aria-label="Hero section"
    >
      {/* Decorative sun ring — top right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-60px',
          top: '-60px',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          border: '38px solid rgba(249,178,62,0.45)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '60px',
          top: '60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '22px solid rgba(238,106,18,0.35)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main hero content */}
      <div className="sn-container" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', zIndex: 2 }}>
        <div className="row align-items-center gy-5">
          {/* Left: text */}
          <div className="col-12 col-lg-6">
            {/* Badge */}
            <div className="sn-badge sn-badge-white mb-4" style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.04em' }}>
              <Star size={11} fill="currentColor" />
              Founded by a medical professional
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 'clamp(36px, 5vw, 64px)',
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}
            >
              Miami's Local Medical Supply Partner
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 2vw, 20px)',
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 1.65,
                marginBottom: '36px',
                maxWidth: '520px',
              }}
            >
              Professional medical and aesthetic supplies, delivered fast across Miami-Dade with the
              personal service a national warehouse can&apos;t match.
            </p>

            {/* CTAs */}
            <div className="d-flex flex-wrap gap-3 mb-4">
              <Link href="/shop" className="sn-btn sn-btn-primary sn-btn-primary-lg">
                Shop Products
                <ArrowRight size={18} />
              </Link>
              <Link href="/open-account" className="sn-btn sn-btn-secondary sn-btn-secondary-lg">
                Open an Account
              </Link>
            </div>

            {/* Trust text */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.72)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ color: '#f9b23e' }}>✓</span>
              Founded by a medical professional. Serving med spas, clinics, and practices across
              Miami-Dade.
            </p>
          </div>

          {/* Right: image + floating trust cards */}
          <div className="col-12 col-lg-6 d-flex justify-content-center position-relative">
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px' }}>
              {/* Main hero image */}
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  background: 'rgba(255,255,255,0.1)',
                  position: 'relative',
                }}
              >
                <Image
                  src="/images/hero-delivery.jpg"
                  alt="Sunnova Medical Supplies local delivery team"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              {/* Floating card 1 — same-week delivery */}
              <div
                className="sn-trust-card"
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '-20px',
                  zIndex: 3,
                }}
              >
                <div className="sn-trust-card-icon">
                  <Truck size={20} color="#fff" />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#122036', margin: 0 }}>
                    Same-week delivery
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6b7690', margin: 0 }}>
                    across Miami-Dade
                  </p>
                </div>
              </div>

              {/* Floating card 2 — real person */}
              <div
                className="sn-trust-card"
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '-20px',
                  zIndex: 3,
                }}
              >
                <div className="sn-trust-card-icon">
                  <User size={20} color="#fff" />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#122036', margin: 0 }}>
                    A real person
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6b7690', margin: 0 }}>
                    not a call center
                  </p>
                </div>
              </div>

              {/* Floating card 3 — trusted */}
              <div
                className="sn-trust-card"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-24px',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                }}
              >
                <div className="sn-trust-card-icon">
                  <Star size={20} color="#fff" fill="#fff" />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#122036', margin: 0 }}>
                    Trusted locally
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#f4811e', margin: 0 }}>
                    ★★★★★ by Miami clinics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature strip at bottom of hero */}
      <FeatureStrip />
    </section>
  );
}

function FeatureStrip() {
  const features = [
    { icon: '🚚', label: 'Fast local delivery' },
    { icon: '👤', label: 'A real person, not a call center' },
    { icon: '✅', label: 'Vetted, clinic-grade products' },
    { icon: '💲', label: 'Competitive pricing and flexible ordering' },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #ee6a12 0%, #f9b23e 100%)',
        padding: '20px 0',
      }}
    >
      <div className="sn-container">
        <div className="row gy-3 justify-content-center">
          {features.map((f, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: '18px' }} aria-hidden="true">{f.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#ffffff',
                    lineHeight: 1.3,
                  }}
                >
                  {f.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
