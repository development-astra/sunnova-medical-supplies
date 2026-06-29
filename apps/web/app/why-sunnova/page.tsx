import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import {
  ArrowRight, Phone, Mail,
  Truck, Brain, PackageOpen, UserCircle2, AlarmClock, BadgeDollarSign,
  Heart, Sparkles, Microscope, Stethoscope, Activity, Leaf,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Choose Sunnova | Miami-Dade Local Medical Supply Partner',
  description:
    'Six reasons Miami-Dade practices switch to Sunnova and stay. Same-day delivery, no minimums, confirmed within 1 hour, and a dedicated local Miami rep.',
};

const REASONS = [
  {
    icon: Truck,
    title: 'Same-Day Delivery Across Miami-Dade',
    description:
      'Order confirmed within 1 hour. Delivered same-day or next-day — directly to your clinic. No waiting on national shipping. No tracking a package through three states.',
    featured: true,
  },
  {
    icon: Brain,
    title: 'Clinical Knowledge Behind Every Order.',
    description:
      "Our founder worked inside clinical settings as a medical scribe. We understand what providers need, what happens when supplies run out, and how to prevent it.",
  },
  {
    icon: PackageOpen,
    title: 'No Minimums. No Contracts.',
    description:
      "Order exactly what your practice needs — one box or one case. No long-term commitments. No minimum order thresholds. First-time order? We deliver before you pay.",
  },
  {
    icon: UserCircle2,
    title: 'Your Dedicated Miami Rep.',
    description:
      'Meet Isabella Lara — your local Miami rep. One direct contact who knows your practice, your products, and your delivery schedule. Not a ticket. Not a queue. A rep.',
  },
  {
    icon: AlarmClock,
    title: 'Confirmed Within 1 Hour.',
    description:
      'Call, text, or email us. We confirm your order within one hour — every time. You will always know what is coming and when.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Competitive Pricing. Quality Products.',
    description:
      'Every product is sourced from vetted national distribution partners. FDA-compliant, clinical-grade — delivered at pricing that works for practices of every size.',
  },
];

const WHO_WE_SERVE = [
  { icon: Heart, label: 'Med Spas' },
  { icon: Sparkles, label: 'Aesthetic Clinics' },
  { icon: Microscope, label: 'Dermatology Offices' },
  { icon: Stethoscope, label: 'Private Practices' },
  { icon: Activity, label: 'Urgent Care' },
  { icon: Leaf, label: 'Wellness Centers' },
];

const FEATURES = [
  'Fast local delivery',
  'A real person, not a call center',
  'Vetted, clinic-grade products',
  'Competitive pricing and flexible ordering',
];

export default function WhySunnovaPage() {
  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: '#004296', position: 'relative', overflow: 'hidden' }}
        aria-labelledby="why-hero-heading"
      >
        {/* Decorative rings */}
        <div aria-hidden="true" style={{ position: 'absolute', right: '-80px', top: '-80px', width: '400px', height: '400px', borderRadius: '50%', border: '48px solid rgba(249,178,62,0.2)', pointerEvents: 'none', zIndex: 1 }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '60px', top: '60px', width: '220px', height: '220px', borderRadius: '50%', border: '28px solid rgba(238,106,18,0.15)', pointerEvents: 'none', zIndex: 1 }} />

        <div className="sn-container" style={{ paddingTop: '80px', paddingBottom: '64px', position: 'relative', zIndex: 2 }}>
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '20px', height: '3px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', borderRadius: '2px' }} aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
              why choose sunnova
            </span>
          </div>

          <h1
            id="why-hero-heading"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(32px,4vw,60px)', color: '#fff', lineHeight: 1.05, marginBottom: '20px', maxWidth: '680px' }}
          >
            Miami-Dade&apos;s Local Medical Supply Partner
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, marginBottom: '36px', maxWidth: '560px' }}>
            Not a warehouse. Not a call center. A Miami-based distributor built specifically for the clinics, med spas, and practices in our community.
          </p>

          <div className="d-flex flex-wrap gap-3 mb-5">
            <Link
              href="/shop"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(238,106,18,0.35)' }}
            >
              Shop Products <ArrowRight size={18} />
            </Link>
            <Link
              href="/open-account"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', textDecoration: 'none', backdropFilter: 'blur(4px)' }}
            >
              Open an Account
            </Link>
          </div>

          {/* Trust note */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '48px' }}>
            <span style={{ color: '#f9b23e', marginRight: '6px' }}>✓</span>
            Founded by a medical professional. Serving med spas, clinics, and practices across Miami-Dade.
          </p>

          {/* Feature chips */}
          <div className="d-flex flex-wrap gap-2">
            {FEATURES.map((f, i) => (
              <span
                key={i}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#1a4fa0', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f9b23e', flexShrink: 0 }} aria-hidden="true" />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Six Reasons ───────────────────────────────────────────── */}
      <section className="sn-section sn-bg-light" aria-labelledby="reasons-heading">
        <div className="sn-container">
          <div className="text-center mb-5">
            <p className="sn-eyebrow d-inline-flex">Built for Clinical Reality</p>
            <h2
              id="reasons-heading"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,44px)', color: '#122036', marginBottom: '12px' }}
            >
              Why Miami-Dade Clinics Choose Sunnova
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6b7690', maxWidth: '500px', marginInline: 'auto' }}>
              Six reasons practices switch to a local distributor — and stay.
            </p>
          </div>

          <div className="row g-4">
            {REASONS.map((reason, i) => {
              const Icon = reason.icon;
              const featured = !!reason.featured;
              return (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="h-100 p-4"
                    style={{
                      background: featured ? '#004296' : '#fff',
                      borderRadius: '16px',
                      border: featured ? 'none' : '1px solid #e8eff9',
                      boxShadow: featured ? '0 8px 32px rgba(0,66,150,0.22)' : 'var(--shadow-card)',
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      style={{ width: '48px', height: '48px', borderRadius: '12px', background: featured ? 'rgba(255,255,255,0.15)' : '#2a6fd0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}
                    >
                      <Icon size={22} color={featured ? '#f9b23e' : '#fff'} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3
                      style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '19px', color: featured ? '#fff' : '#122036', marginBottom: '10px', lineHeight: 1.25 }}
                    >
                      {reason.title}
                    </h3>
                    <p
                      style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: featured ? 'rgba(255,255,255,0.82)' : '#6b7690', lineHeight: 1.65, margin: 0 }}
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

      {/* ── Isabella Lara Card ────────────────────────────────────── */}
      <section style={{ background: '#f7f9fa', padding: '0 0 80px' }}>
        <div className="sn-container">
          <div
            style={{ background: '#1a4fa0', borderRadius: '20px', padding: 'clamp(28px,4vw,52px) clamp(24px,5vw,56px)' }}
          >
            <div className="row align-items-center gy-4">
              <div className="col-12 col-md-8">
                <div className="d-flex align-items-start gap-4">
                  {/* Avatar */}
                  <div
                    style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,#ee6a12,#f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '24px', color: '#fff', flexShrink: 0 }}
                    aria-hidden="true"
                  >
                    IL
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: '#f9b23e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                      YOUR LOCAL MIAMI REP
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '28px', color: '#fff', marginBottom: '10px' }}>
                      Isabella Lara
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.6, maxWidth: '420px' }}>
                      One direct contact for your account — phone, text, and email. She knows your practice, your products, and your delivery schedule.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 d-flex flex-column gap-2 align-items-md-end">
                <a href="tel:+13055196804" className="d-flex align-items-center gap-2 text-decoration-none mb-1" style={{ color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '15px' }}>
                  <Phone size={15} style={{ color: '#f9b23e', flexShrink: 0 }} aria-hidden="true" />
                  (305) 519-6804
                </a>
                <a href="mailto:orders@sunnovamedical.com" className="d-flex align-items-center gap-2 text-decoration-none mb-3" style={{ color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '15px' }}>
                  <Mail size={15} style={{ color: '#f9b23e', flexShrink: 0 }} aria-hidden="true" />
                  orders@sunnovamedical.com
                </a>
                <Link
                  href="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}
                >
                  Contact Isabella
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Serve ─────────────────────────────────────────── */}
      <section style={{ background: '#1a4fa0', padding: '80px 0' }} aria-labelledby="serve-heading">
        <div className="sn-container">
          <div className="text-center mb-5">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Who We Serve
            </p>
            <h2 id="serve-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: '16px' }}>
              Built for the Practices We Serve
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.78)', maxWidth: '600px', marginInline: 'auto', lineHeight: 1.65 }}>
              Med spas, aesthetic clinics, dermatology offices, private practices, urgent care centers, and wellness centers across Miami-Dade. We&apos;re not trying to be everything to everyone. We serve Miami&apos;s clinical community, and we do it exceptionally well.
            </p>
          </div>
          <div className="row justify-content-center g-3">
            {WHO_WE_SERVE.map(({ icon: Icon, label }, i) => (
              <div key={i} className="col-6 col-sm-4 col-md-2">
                <div
                  style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px 12px', border: '1px solid rgba(255,255,255,0.12)', textAlign: 'center' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginInline: 'auto', marginBottom: '12px' }}>
                    <Icon size={20} color="#f9b23e" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.35 }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg,#ee6a12 0%,#f9b23e 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-60px', top: '-60px', width: '260px', height: '260px', borderRadius: '50%', border: '36px solid rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', left: '-40px', bottom: '-40px', width: '160px', height: '160px', borderRadius: '50%', border: '24px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div className="sn-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '640px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px,3.5vw,48px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
              Ready to Simplify Your Supply Ordering?
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '36px', lineHeight: 1.65 }}>
              Request a catalog, get a quote, or open your account. We make it easy to start and even easier to keep ordering.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link
                href="/shop"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#fff', borderRadius: '999px', color: '#c85a0c', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', textDecoration: 'none' }}
              >
                Shop Products <ArrowRight size={17} />
              </Link>
              <Link
                href="/open-account"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.6)', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', textDecoration: 'none' }}
              >
                Open an Account
              </Link>
              <Link
                href="/request-quote"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.6)', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', textDecoration: 'none' }}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
