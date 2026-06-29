import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #ee6a12 0%, #f9b23e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="cta-heading"
    >
      {/* Decorative rings */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-40px',
          top: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '30px solid rgba(255,255,255,0.15)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '60px',
          top: '60px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '18px solid rgba(255,255,255,0.1)',
          pointerEvents: 'none',
        }}
      />

      <div className="sn-container sn-section">
        <div className="row align-items-center gy-5">
          <div className="col-12 col-lg-6">
            <h2
              id="cta-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 'clamp(28px, 4vw, 51px)',
                color: '#ffffff',
                marginBottom: '20px',
                lineHeight: 1.1,
              }}
            >
              Ready to Simplify Your Supply Ordering?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '36px',
                lineHeight: 1.65,
              }}
            >
              Request a catalog, get a quote, or open your account. We make it easy to start and
              even easier to keep ordering.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="sn-btn d-inline-flex"
                style={{
                  background: '#ffffff',
                  color: '#d85f0c',
                  padding: '16px 28px',
                  fontSize: '17px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  borderRadius: '999px',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
              >
                Shop Products
                <ArrowRight size={18} />
              </Link>
              <Link href="/open-account" className="sn-btn sn-btn-ghost-white sn-btn-secondary-lg">
                Open an Account
              </Link>
              <Link href="/request-quote" className="sn-btn sn-btn-ghost-white sn-btn-secondary-lg">
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Right: product image */}
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '3/2',
                position: 'relative',
                background: 'rgba(255,255,255,0.15)',
              }}
              aria-hidden="true"
            >
              <Image
                src="/images/products-cta.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                style={{ objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.9 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
