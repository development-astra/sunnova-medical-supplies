import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteLayout from '@/components/layout/SiteLayout';
import { ArrowRight, Phone, Mail, CheckCircle2, Clock, Package, Zap, Users, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Choose Sunnova | Miami-Dade Local Medical Supply Partner',
  description:
    'Six reasons Miami-Dade practices switch to Sunnova and stay. Same-day delivery, no minimums, confirmed within 1 hour, and a dedicated local Miami rep.',
};

const REASONS = [
  {
    icon: Zap,
    title: 'Same-Day Delivery Across Miami-Dade',
    description:
      'Order confirmed within 1 hour. Delivered same-day or next-day — directly to your clinic. No waiting on national shipping. No tracking a package through three states.',
    featured: true,
  },
  {
    icon: Package,
    title: 'No Minimums. No Contracts.',
    description:
      "Order exactly what your practice needs — one box or one case. No long-term commitments. No minimum order thresholds. First-time order? We deliver before you pay.",
    featured: false,
  },
  {
    icon: Clock,
    title: 'Confirmed Within 1 Hour.',
    description:
      'Call, text, or email us. We confirm your order within one hour — every time. You will always know what is coming and when.',
    featured: false,
  },
  {
    icon: CheckCircle2,
    title: 'Clinical Knowledge Behind Every Order.',
    description:
      "Our founder worked inside clinical settings as a medical scribe. We understand what providers need, what happens when supplies run out, and how to prevent it.",
    featured: false,
  },
  {
    icon: Users,
    title: 'Your Dedicated Miami Rep.',
    description:
      'Meet Isabella Lara — your local Miami rep. One direct contact who knows your practice, your products, and your delivery schedule. Not a ticket. Not a queue. A rep.',
    featured: false,
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing. Quality Products.',
    description:
      'Every product is sourced from vetted national distribution partners. FDA-compliant, clinical grade — delivered at pricing that works for practices of every size.',
    featured: false,
  },
];

export default function WhySunnovaPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section
        style={{ backgroundColor: '#1a4fa0', position: 'relative', overflow: 'hidden' }}
        aria-labelledby="why-hero-heading"
      >
        {/* Decorative rings */}
        <div aria-hidden="true" style={{ position: 'absolute', right: '-60px', top: '-60px', width: '320px', height: '320px', borderRadius: '50%', border: '38px solid rgba(249,178,62,0.4)', pointerEvents: 'none', zIndex: 1 }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '60px', top: '60px', width: '180px', height: '180px', borderRadius: '50%', border: '22px solid rgba(238,106,18,0.3)', pointerEvents: 'none', zIndex: 1 }} />

        <div className="sn-container" style={{ paddingTop: '72px', paddingBottom: '72px', position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center gy-5">
            <div className="col-12 col-lg-6">
              <div className="sn-badge sn-badge-white mb-4">Why Choose Sunnova</div>
              <h1
                id="why-hero-heading"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(32px, 4vw, 56px)', color: '#ffffff', lineHeight: 1.1, marginBottom: '24px' }}
              >
                Miami-Dade&apos;s Local Medical Supply Partner
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '480px' }}>
                Not a warehouse. Not a call center. A Miami-based distributor built specifically for the clinics, med spas, and practices in our community.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Link href="/shop" className="sn-btn sn-btn-primary sn-btn-primary-lg">
                  Shop Products <ArrowRight size={18} />
                </Link>
                <Link href="/open-account" className="sn-btn sn-btn-secondary sn-btn-secondary-lg">
                  Open an Account
                </Link>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                <span style={{ color: '#f9b23e' }}>✓</span> Founded by a medical professional. Serving med spas, clinics, and practices across Miami-Dade.
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative', background: 'rgba(255,255,255,0.1)' }}>
                <Image src="/images/why-sunnova-hero.jpg" alt="Sunnova Medical Supplies team" fill sizes="(max-width: 768px) 100vw, 540px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div style={{ background: 'linear-gradient(90deg, #ee6a12 0%, #f9b23e 100%)', padding: '20px 0' }}>
          <div className="sn-container">
            <div className="row gy-3 justify-content-center">
              {['Fast local delivery', 'A real person, not a call center', 'Vetted, clinic-grade products', 'Competitive pricing and flexible ordering'].map((f, i) => (
                <div key={i} className="col-6 col-md-3 d-flex align-items-center gap-2">
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#fff' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Six reasons */}
      <section className="sn-section sn-bg-light" aria-labelledby="reasons-heading">
        <div className="sn-container">
          <div className="text-center mb-5">
            <p className="sn-eyebrow d-inline-flex">Built for Clinical Reality</p>
            <h2 id="reasons-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#122036', marginBottom: '12px' }}>
              Why Miami-Dade Clinics Choose Sunnova
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6b7690', maxWidth: '520px', marginInline: 'auto' }}>
              Six reasons practices switch to a local distributor — and stay.
            </p>
          </div>

          <div className="row g-4">
            {REASONS.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="h-100 p-4"
                    style={{
                      background: reason.featured ? '#1a4fa0' : '#ffffff',
                      borderRadius: '16px',
                      border: reason.featured ? 'none' : '1px solid #e8eff9',
                      boxShadow: reason.featured ? '0 8px 32px rgba(26,79,160,0.25)' : 'var(--shadow-card)',
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: reason.featured ? 'rgba(255,255,255,0.15)' : 'linear-gradient(135deg,#ee6a12,#f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <Icon size={22} color={reason.featured ? '#f9b23e' : '#fff'} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: reason.featured ? '#fff' : '#122036', marginBottom: '10px', lineHeight: 1.25 }}>
                      {reason.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: reason.featured ? 'rgba(255,255,255,0.85)' : '#54585f', lineHeight: 1.65, margin: 0 }}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Isabella Lara — Local Rep */}
      <section className="sn-section sn-bg-white">
        <div className="sn-container">
          <div
            style={{ background: '#1a4fa0', borderRadius: '20px', padding: '40px 48px' }}
            className="d-flex flex-wrap align-items-center justify-content-between gap-4"
          >
            <div className="d-flex align-items-center gap-4">
              <div
                style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #ee6a12, #f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#fff', flexShrink: 0 }}
                aria-hidden="true"
              >
                IL
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Your Local Miami Rep
                </p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '26px', color: '#fff', marginBottom: '6px' }}>
                  Isabella Lara
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: 0, maxWidth: '420px' }}>
                  One direct contact for your account — phone, text, and email. She knows your practice, your products, and your delivery schedule.
                </p>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <a href="tel:+13055196804" className="d-flex align-items-center gap-2 text-decoration-none" style={{ color: '#fff', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
                <Phone size={15} style={{ color: '#f9b23e' }} /> (305) 519-6804
              </a>
              <a href="mailto:orders@sunnovamedical.com" className="d-flex align-items-center gap-2 text-decoration-none" style={{ color: '#fff', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
                <Mail size={15} style={{ color: '#f9b23e' }} /> orders@sunnovamedical.com
              </a>
              <Link href="/contact" className="sn-btn sn-btn-primary mt-2" style={{ fontSize: '15px', padding: '10px 20px' }}>
                Contact Isabella
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section style={{ background: '#1a4fa0', padding: '80px 0' }} aria-labelledby="serve-heading">
        <div className="sn-container text-center">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>Who We Serve</p>
          <h2 id="serve-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: '16px' }}>
            Built for the Practices We Serve
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.8)', maxWidth: '580px', marginInline: 'auto', marginBottom: '52px', lineHeight: 1.65 }}>
            Med spas, aesthetic clinics, dermatology offices, private practices, urgent care centers, and wellness centers across Miami-Dade.
          </p>
          <div className="row justify-content-center gy-4">
            {['Med Spas','Aesthetic Clinics','Dermatology Offices','Private Practices','Urgent Care','Wellness Centers'].map((p,i) => (
              <div key={i} className="col-4 col-md-2">
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px 12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#fff', margin: 0, lineHeight: 1.3 }}>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #ee6a12 0%, #f9b23e 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', borderRadius: '50%', border: '30px solid rgba(255,255,255,0.15)' }} />
        <div className="sn-container">
          <div className="row align-items-center gy-5">
            <div className="col-12 col-lg-6">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,48px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
                Ready to Simplify Your Supply Ordering?
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', lineHeight: 1.65 }}>
                Request a catalog, get a quote, or open your account. We make it easy to start and even easier to keep ordering.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/shop" className="sn-btn" style={{ background: '#fff', color: '#d85f0c', padding: '14px 26px', fontSize: '16px', fontFamily: 'var(--font-heading)', fontWeight: 600, borderRadius: '999px', gap: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                  Shop Products <ArrowRight size={17} />
                </Link>
                <Link href="/open-account" className="sn-btn sn-btn-ghost-white">Open an Account</Link>
                <Link href="/request-quote" className="sn-btn sn-btn-ghost-white">Request a Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
