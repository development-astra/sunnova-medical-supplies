import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import { ArrowRight, Phone, Mail, Globe, MapPin, CheckCircle2 } from 'lucide-react';

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
  'We learn your practice\'s supply needs',
  'We send a custom catalog and pricing overview',
  'You review — zero obligation',
  'Approve and receive same-day or next-day delivery',
];

export default function ContactPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section style={{ backgroundColor: '#1a4fa0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-60px', top: '-60px', width: '320px', height: '320px', borderRadius: '50%', border: '38px solid rgba(249,178,62,0.4)', pointerEvents: 'none', zIndex: 1 }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '60px', top: '60px', width: '180px', height: '180px', borderRadius: '50%', border: '22px solid rgba(238,106,18,0.3)', pointerEvents: 'none', zIndex: 1 }} />
        <div className="sn-container" style={{ paddingTop: '72px', paddingBottom: '72px', position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center gy-5">
            <div className="col-12 col-lg-6">
              <div className="sn-badge sn-badge-white mb-4">Contact Us</div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(32px,4vw,60px)', color: '#fff', lineHeight: 1.05, marginBottom: '20px' }}>
                Let&apos;s Get Your Clinic Supplied
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '460px' }}>
                We confirm within 1 hour. Deliver same-day. Reach out — getting started takes one conversation.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {['Confirmed in 1 Hour', 'Same-Day Delivery', 'No Minimums · No Contracts'].map((b, i) => (
                  <span key={i} className="sn-badge sn-badge-white" style={{ fontSize: '13px' }}>{b}</span>
                ))}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                <span style={{ color: '#f9b23e' }}>✓</span> Founded by a medical professional. Serving med spas, clinics, and practices across Miami-Dade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Isabella card + contact methods */}
      <section className="sn-section sn-bg-white">
        <div className="sn-container">
          {/* Isabella Lara card */}
          <div style={{ background: '#1a4fa0', borderRadius: '20px', padding: '40px 48px', marginBottom: '48px' }} className="d-flex flex-wrap align-items-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-4">
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #ee6a12, #f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#fff', flexShrink: 0 }} aria-hidden="true">IL</div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '4px' }}>Your Local Miami Rep</p>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '26px', color: '#fff', marginBottom: '6px' }}>Isabella Lara</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: 0, maxWidth: '420px' }}>One direct contact for your account — phone, text, and email. She knows your practice, your products, and your delivery schedule.</p>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <a href="tel:+13055196804" className="d-flex align-items-center gap-2 text-decoration-none" style={{ color: '#fff', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
                <Phone size={15} style={{ color: '#f9b23e' }} /> (305) 519-6804
              </a>
              <a href="mailto:orders@sunnovamedical.com" className="d-flex align-items-center gap-2 text-decoration-none" style={{ color: '#fff', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
                <Mail size={15} style={{ color: '#f9b23e' }} /> orders@sunnovamedical.com
              </a>
              <Link href="/request-quote" className="sn-btn sn-btn-primary mt-2" style={{ fontSize: '15px', padding: '10px 20px' }}>
                Contact Isabella
              </Link>
            </div>
          </div>

          {/* Three contact method cards */}
          <div className="row g-4 mb-5">
            {[
              { icon: Phone, label: 'Phone / Text', value: '(305) 519-6804', sub: 'Mon-Fri, 6am-6pm EST', href: 'tel:+13055196804' },
              { icon: Mail, label: 'Email', value: 'orders@sunnovamedical.com', sub: 'Replies within 1 hour, business hours', href: 'mailto:orders@sunnovamedical.com' },
              { icon: Globe, label: 'Website', value: 'sunnovamedical.com', sub: 'Catalog & quotes — available 24/7', href: '/' },
            ].map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="col-12 col-md-4">
                  <a href={method.href} className="d-block text-decoration-none sn-card p-4 h-100 text-center">
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(26,79,160,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginInline: 'auto', marginBottom: '16px', color: '#1a4fa0' }}>
                      <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: '#1a4fa0', marginBottom: '4px' }}>{method.label}</h3>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#1a4fa0', marginBottom: '4px' }}>{method.value}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', margin: 0 }}>{method.sub}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two-column: Helpful info + Request Form */}
      <section className="sn-section sn-bg-light" aria-labelledby="contact-form-heading">
        <div className="sn-container">
          <div className="row g-5">
            {/* Left: helpful info */}
            <div className="col-12 col-lg-5">
              <h2 id="contact-form-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px,3vw,36px)', color: '#122036', marginBottom: '8px' }}>
                Helpful — but not required
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6b7690', marginBottom: '28px' }}>A simple introduction is enough to get started.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                {HELPFUL_ITEMS.map((item, i) => (
                  <div key={i} className="d-flex align-items-start gap-3">
                    <CheckCircle2 size={18} style={{ color: '#0f993e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#3a4660' }}>{item}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '22px', color: '#122036', marginBottom: '20px' }}>
                What happens next
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {WHAT_HAPPENS.map((step, i) => (
                  <div key={i} className="d-flex align-items-start gap-3">
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `${i === 0 ? '#1a4fa0' : i === 1 ? '#ee6a12' : i === 2 ? '#f9b23e' : i === 3 ? '#6b7690' : '#122036'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#fff', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#3a4660', paddingTop: '4px' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Request form */}
            <div className="col-12 col-lg-7">
              <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '24px', color: '#122036', marginBottom: '8px' }}>
                  Request A Catalog or Quote
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690', marginBottom: '28px' }}>
                  Tell us about your practice — Isabella will follow up within the hour.
                </p>
                <form onSubmit={(e) => e.preventDefault()} noValidate>
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="full-name">Full Name <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                      <input id="full-name" type="text" className="sn-input" placeholder="Jordan Rivera" required autoComplete="name" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="practice-name">Practice Name <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                      <input id="practice-name" type="text" className="sn-input" placeholder="Brickell Aesthetics" required />
                    </div>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="facility-type">Facility Type <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                      <select id="facility-type" className="sn-input" required style={{ cursor: 'pointer' }}>
                        <option value="">Select Facility Type…</option>
                        <option>Med Spa</option>
                        <option>Aesthetic Clinic</option>
                        <option>Dermatology Office</option>
                        <option>Private Practice</option>
                        <option>Urgent Care</option>
                        <option>Wellness Center</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="location">Miami-Dade Location <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                      <input id="location" type="text" className="sn-input" placeholder="e.g. Coral Gables" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="sn-label" htmlFor="products">Products / Categories Needed <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                    <textarea id="products" className="sn-input" rows={3} placeholder="e.g. Nitrile gloves, exam table paper, esthetic wipes..." required style={{ resize: 'vertical', minHeight: '80px' }} />
                  </div>
                  <div className="mb-4">
                    <label className="sn-label" htmlFor="contact-method">Preferred Contact Method <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                    <input id="contact-method" type="text" className="sn-input" placeholder="Phone / Email" required />
                  </div>
                  <button
                    type="submit"
                    className="w-100"
                    style={{ padding: '16px', background: 'linear-gradient(90deg, #ee6a12, #f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                  >
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Terms */}
      <section className="sn-section sn-bg-white" aria-labelledby="terms-heading">
        <div className="sn-container">
          <p className="sn-eyebrow">Order Terms at a Glance</p>
          <h2 id="terms-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px,3vw,36px)', color: '#122036', marginBottom: '40px' }}>
            No surprises — here&apos;s how we work
          </h2>
          <div style={{ border: '1px solid #e8eff9', borderRadius: '16px', overflow: 'hidden', background: '#fff', maxWidth: '640px' }}>
            {ORDER_TERMS.map((t, i) => (
              <div key={t.term} className="d-flex align-items-start" style={{ padding: '16px 28px', borderBottom: i < ORDER_TERMS.length - 1 ? '1px solid #f0f3f8' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', color: '#122036', minWidth: '160px', flexShrink: 0 }}>{t.term}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660' }}>{t.def}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery area */}
      <section style={{ background: '#1a4fa0', padding: '80px 0' }} aria-labelledby="delivery-area-heading">
        <div className="sn-container">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>Our Delivery Area</p>
          <h2 id="delivery-area-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', marginBottom: '16px', maxWidth: '420px', lineHeight: 1.15 }}>
            Same-day &amp; next-day across Miami-Dade
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '480px', marginBottom: '32px', lineHeight: 1.65 }}>
            We deliver professional medical and aesthetic supplies to licensed clinical facilities throughout Miami-Dade County, including:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {NEIGHBORHOODS.map((n) => (
              <span key={n} className="sn-neighborhood-pill">
                <MapPin size={10} aria-hidden="true" />{n}
              </span>
            ))}
            <span className="sn-neighborhood-pill" style={{ background: 'linear-gradient(135deg,#ee6a12,#f9b23e)', border: 'none' }}>+ Surrounding Communities</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
            Broward and Palm Beach available on Request
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
