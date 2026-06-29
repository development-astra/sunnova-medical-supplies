import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import { Phone, Mail, Globe, MapPin, CheckCircle2 } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: "Contact Us | Let's Get Your Clinic Supplied — Sunnova Medical Supplies",
  description:
    "Confirmed in 1 hour. Deliver same-day. Reach out — getting started takes one conversation. Call, text, or email Isabella Lara, your local Miami rep.",
};

const NEIGHBORHOODS = [
  'Brickell', 'Downtown Miami', 'Coral Gables', 'Coconut Grove', 'Miami Beach',
  'Midtown', 'South Miami', 'Doral', 'Westchester', 'Hialeah', 'Kendall',
  'Aventura', 'Cutler Bay', 'Pinecrest', 'Sweetwater',
];

const ORDER_TERMS = [
  { term: 'Minimums', def: 'None' },
  { term: 'Contracts', def: 'None' },
  { term: 'Confirmation', def: 'Within 1 hour' },
  { term: 'Delivery', def: 'Same-day or next-day — Miami-Dade' },
  { term: 'Payment Terms', def: 'Net-15 established accounts · First order pre-pay' },
  { term: 'Payment Methods', def: 'ACH · Check · Visa/MC/Amex (2.9% card fee)' },
  { term: 'Returns', def: 'Unopened items, within 14 days' },
  { term: 'First Order Bonus', def: 'Complimentary product sample included' },
];

const HELPFUL_ITEMS = [
  'Facility type (med spa, urgent care, aesthetic clinic, etc.)',
  'Your Miami-Dade location',
  'Products or categories you need',
  'Approximate order frequency',
];

const WHAT_HAPPENS = [
  'We respond and confirm within 1 hour',
  "We learn your practice's supply needs",
  'We send a custom catalog and pricing overview',
  'You review — zero obligation',
  'Approve and receive same-day or next-day delivery',
];

export default function ContactPage() {
  return (
    <SiteLayout>

      {/* ── Hero ── */}
      <section style={{ background: '#004296', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-80px', top: '-80px', width: '420px', height: '420px', borderRadius: '50%', border: '52px solid rgba(249,178,62,0.12)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '120px', top: '80px', width: '240px', height: '240px', borderRadius: '50%', border: '28px solid rgba(238,106,18,0.1)', pointerEvents: 'none' }} />
        <div className="sn-container" style={{ paddingTop: '88px', paddingBottom: '88px', position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center gy-5">
            {/* Left: badge + headline + stat chips */}
            <div className="col-12 col-lg-7">
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontWeight: 900, fontSize: '12px', color: '#1A4FA0', background: '#FFFFFF', letterSpacing: '2.16px', padding: '4px 16px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '24px' }}>
                contact us
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(36px, 5vw, 64px)', color: '#FFFFFF', lineHeight: 1.09, letterSpacing: '-0.023em', marginBottom: '28px' }}>
                Let&apos;s Get Your<br />Clinic Supplied
              </h1>
              <div className="d-flex flex-wrap gap-3">
                {['Confirmed in 1 Hour', 'Same-Day Delivery', 'No Minimums · No Contracts'].map((b) => (
                  <span key={b} style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '15px', color: '#FFFFFF', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', padding: '10px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>{b}</span>
                ))}
              </div>
            </div>
            {/* Right: body + CTAs */}
            <div className="col-12 col-lg-5">
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '20.5px', color: '#FFFFFF', lineHeight: '33.8px', marginBottom: '32px' }}>
                We confirm within 1 hour. Deliver same-day. Reach out — getting started takes one conversation.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#FFFFFF', background: 'linear-gradient(90deg, #EE6A12, #F9B23E)', padding: '13px 24px', borderRadius: '14px', textDecoration: 'none' }}>
                  Shop Products
                </Link>
                <Link href="/open-account" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#1A4FA0', background: '#FFFFFF', padding: '13px 24px', borderRadius: '14px', textDecoration: 'none' }}>
                  Open an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rep Card + Contact Channels ── */}
      <section style={{ background: '#FFFFFF', padding: '104px 0' }}>
        <div className="sn-container">

          {/* Isabella Lara floating card */}
          <div
            style={{ background: 'radial-gradient(circle at 70% 50%, #1F4F9E 0%, #16356B 55%, #102A52 100%)', borderRadius: '24px', padding: '40px 48px', marginBottom: '71px', boxShadow: '0 4px 11px rgba(0,0,0,0.35)', position: 'relative', overflow: 'hidden' }}
            className="d-flex flex-wrap align-items-center justify-content-between gap-4"
          >
            <div aria-hidden="true" style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div className="d-flex align-items-center gap-4" style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #EE6A12, #F9B23E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '28px', color: '#FFFFFF', flexShrink: 0 }} aria-label="Isabella Lara initials">IL</div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12.8px', fontWeight: 700, color: '#F9B23E', letterSpacing: '1.792px', textTransform: 'uppercase', marginBottom: '4px' }}>Your Local Miami Rep</p>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '32px', color: '#FFFFFF', lineHeight: '50.1px', marginBottom: '6px' }}>Isabella Lara</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.2px', color: 'rgba(255,255,255,0.85)', lineHeight: '25.1px', margin: 0, maxWidth: '500px' }}>
                  One direct contact for your account — phone, text, and email. She knows your practice, your products, and your delivery schedule.
                </p>
              </div>
            </div>
            <div className="d-flex flex-column gap-3" style={{ position: 'relative', zIndex: 1 }}>
              <a href="tel:+13055196804" className="d-flex align-items-center gap-2 text-decoration-none" style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px' }}>
                <Phone size={18} style={{ color: '#F9B23E', flexShrink: 0 }} /> (305) 519-6804
              </a>
              <a href="mailto:orders@sunnovamedical.com" className="d-flex align-items-center gap-2 text-decoration-none" style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px' }}>
                <Mail size={18} style={{ color: '#F9B23E', flexShrink: 0 }} /> orders@sunnovamedical.com
              </a>
              <Link href="/request-quote" style={{ display: 'inline-flex', justifyContent: 'center', padding: '11px 24px', background: 'linear-gradient(90deg, #EE6A12, #F9B23E)', borderRadius: '14px', color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15.2px', textDecoration: 'none', marginTop: '4px' }}>
                Contact Isabella
              </Link>
            </div>
          </div>

          {/* 3-up channel cards */}
          <div className="row g-4">
            {[
              { icon: Phone, label: 'Phone / Text', value: '(305) 519-6804', sub: 'Mon–Fri, 8am–6pm EST', href: 'tel:+13055196804' },
              { icon: Mail, label: 'Email', value: 'orders@sunnovamedical.com', sub: 'Replies within 1 hour, business hours', href: 'mailto:orders@sunnovamedical.com' },
              { icon: Globe, label: 'Website', value: 'sunnovamedical.com', sub: 'Catalog & quotes — available 24/7', href: '/' },
            ].map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="col-12 col-md-4">
                  <a href={method.href} className="d-flex flex-column align-items-center text-center text-decoration-none" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '48px 32px', border: '1px solid #e8eff9', boxShadow: '0 2px 12px rgba(0,66,150,0.06)', height: '100%', gap: '10px' }}>
                    <div style={{ width: '47px', height: '47px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(42,111,208,0.12) 0%, rgba(26,79,160,0.06) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2A6FD0', marginBottom: '4px' }}>
                      <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#004296', lineHeight: 1.3, margin: 0 }}>{method.label}</h3>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(14px, 1.5vw, 21.1px)', color: '#2A6FD0', lineHeight: '22.8px', margin: 0, wordBreak: 'break-all' }}>{method.value}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#54585F', lineHeight: '25.1px', margin: 0 }}>{method.sub}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + What to Expect ── */}
      <section style={{ background: '#F4F6FB', padding: '104px 0' }} aria-labelledby="contact-form-heading">
        <div className="sn-container">
          <div className="row g-5 align-items-start">

            {/* Left: helpful info + steps */}
            <div className="col-12 col-lg-5">
              <h2 id="contact-form-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#122036', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                Helpful — but not required
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#6B7690', lineHeight: '25.1px', marginBottom: '32px' }}>A simple introduction is enough to get started.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '48px' }}>
                {HELPFUL_ITEMS.map((item, i) => (
                  <div key={i} className="d-flex align-items-start gap-3">
                    <div style={{ width: '45px', height: '44px', borderRadius: '11px', background: '#BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={20} style={{ color: '#15803D' }} aria-hidden="true" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '20.5px', color: '#122036', lineHeight: '33.8px', paddingTop: '4px' }}>{item}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px, 3vw, 46.4px)', color: '#122036', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '28px' }}>
                What happens next
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {WHAT_HAPPENS.map((step, i) => (
                  <div key={i} className="d-flex align-items-start gap-3">
                    <div style={{ width: '56px', height: '56px', borderRadius: '28px', background: '#004296', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '22.4px', color: '#FFFFFF', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '20.5px', color: '#122036', lineHeight: '33.8px', paddingTop: '10px' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form card */}
            <div className="col-12 col-lg-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Order Terms ── */}
      <section style={{ background: '#FFFFFF', padding: '104px 0' }} aria-labelledby="terms-heading">
        <div className="sn-container" style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '12.8px', color: '#2A6FD0', letterSpacing: '1.792px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Order Terms at a Glance
          </p>
          <h2 id="terms-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#122036', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '48px' }}>
            No surprises — here&apos;s how we work
          </h2>
          <div style={{ border: '1px solid #e8eff9', borderRadius: '20px', overflow: 'hidden', background: '#FFFFFF', maxWidth: '713px', marginInline: 'auto', textAlign: 'left' }}>
            {ORDER_TERMS.map((t, i) => (
              <div key={t.term} className="d-flex align-items-stretch" style={{ borderBottom: i < ORDER_TERMS.length - 1 ? '1px solid #e8eff9' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#000000', minWidth: '200px', flexShrink: 0, padding: '18px 24px', background: '#F4F6FB', display: 'flex', alignItems: 'center' }}>
                  {t.term}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '17.9px', color: '#0E1822', padding: '18px 24px', lineHeight: '29.6px', display: 'flex', alignItems: 'center' }}>
                  {t.def}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Delivery Area ── */}
      <section style={{ background: '#F4F6FB', padding: '104px 0' }} aria-labelledby="delivery-area-heading">
        <div className="sn-container">
          <div style={{ background: 'radial-gradient(circle at 75% 50%, #1F4F9E 0%, #16356B 55%, #102A52 100%)', borderRadius: '24px', padding: '56px 64px', position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden="true" style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <h2 id="delivery-area-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#FFFFFF', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              Same-day &amp; next-day across Miami-Dade
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '17.9px', color: '#F4F6FB', lineHeight: '29.6px', maxWidth: '640px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
              We deliver professional medical and aesthetic supplies to licensed clinical facilities throughout Miami-Dade County, including:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
              {NEIGHBORHOODS.map((n) => (
                <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#0E1822', background: '#FFFFFF', padding: '5px 16px', borderRadius: '20px', fontWeight: 500 }}>
                  <MapPin size={11} style={{ color: '#2A6FD0', flexShrink: 0 }} aria-hidden="true" />{n}
                </span>
              ))}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#FFFFFF', background: 'linear-gradient(135deg, #EE6A12, #F9B23E)', padding: '5px 16px', borderRadius: '20px', fontWeight: 500 }}>
                + Surrounding Communities
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17.9px', color: '#F4F6FB', lineHeight: '29.6px', position: 'relative', zIndex: 1, marginBottom: 0 }} className="d-flex align-items-center gap-2">
              <MapPin size={18} style={{ color: '#F9B23E', flexShrink: 0 }} aria-hidden="true" />
              Broward and Palm Beach available on Request
            </p>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
