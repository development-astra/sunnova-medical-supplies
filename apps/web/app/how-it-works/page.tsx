import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import { ArrowRight, Phone, Mail, Globe, ChevronDown, ChevronUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Order | Ordering Takes Minutes — Sunnova Medical Supplies',
  description:
    'No portal. No approval process. Three steps from first contact to confirmed order. Browse, get a quote, confirm and receive. Same-day delivery across Miami-Dade.',
};

const STEPS_MAIN = [
  {
    num: '1',
    color: '#1a4fa0',
    title: 'Reach Out',
    description: 'Call, text, or email. Tell us your facility type, location, and what you need. We respond and confirm within 1 hour.',
  },
  {
    num: '2',
    color: '#ee6a12',
    title: 'Receive Your Quote',
    description: 'Clear, itemized pricing — no hidden fees, no bundled surprises. Review it before you commit to anything.',
  },
  {
    num: '3',
    color: '#12b347',
    title: 'Confirm and Receive',
    description: 'Approve by phone, email, or online. We fulfill and deliver same-day or next-day directly to your clinic.',
  },
];

const AFTER_FIRST = [
  { icon: '🔄', title: 'Reorder in Seconds', description: 'We keep your order history on file, so repeat orders take moments.', featured: true },
  { icon: '📅', title: 'Standing Order Program', description: 'Set monthly auto-delivery and never reorder again.', featured: false },
  { icon: '🎁', title: 'Custom Bundles', description: 'We build a recurring supply package around your procedure mix.', featured: false },
  { icon: '🔔', title: 'Proactive Restocking Alerts', description: 'We flag when key items are running low before you do.', featured: false },
];

const CONTACT_METHODS = [
  { icon: Phone, label: 'Phone / Text', value: '(305) 519-6804', sub: 'Mon-Fri, 8am-6pm EST', href: 'tel:+13055196804' },
  { icon: Mail, label: 'Email', value: 'orders@sunnovamedical.com', sub: 'Replies within 1 hour, business hours', href: 'mailto:orders@sunnovamedical.com' },
  { icon: Globe, label: 'Website', value: 'sunnovamedical.com', sub: 'Catalog & quotes — available 24/7', href: '/' },
];

const FAQS = [
  { q: 'Do you have order minimums?', a: 'No minimums, ever. Order one box or one case — whatever your practice needs.' },
  { q: 'How fast can I receive my order?', a: 'Same-day or next-day delivery across Miami-Dade County. We confirm within 1 hour and fulfill quickly.' },
  { q: 'Where do you deliver?', a: 'All of Miami-Dade County. Broward and Palm Beach available on request.' },
  { q: 'What practices do you work with?', a: 'Med spas, aesthetic clinics, dermatology offices, private practices, urgent care centers, and wellness centers.' },
  { q: 'How does payment work?', a: 'First order is pre-pay. Established accounts qualify for Net-15 terms. We accept ACH, check, and card (2.9% fee).' },
  { q: 'Can I set up automatic monthly delivery?', a: 'Yes. Our Standing Order Program lets you set up recurring auto-delivery so you never have to reorder manually.' },
  { q: 'Can I see the catalog and pricing first?', a: "Absolutely. Contact Isabella and she'll send a full catalog with pricing within the hour." },
  { q: 'What if I need a product not in your catalog?', a: "Tell us what you need. We source from national distributors and can often fulfill special requests within 1–2 business days." },
];

export default function HowItWorksPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section style={{ backgroundColor: '#1a4fa0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-60px', top: '-60px', width: '320px', height: '320px', borderRadius: '50%', border: '38px solid rgba(249,178,62,0.4)', pointerEvents: 'none', zIndex: 1 }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '60px', top: '60px', width: '180px', height: '180px', borderRadius: '50%', border: '22px solid rgba(238,106,18,0.3)', pointerEvents: 'none', zIndex: 1 }} />
        <div className="sn-container" style={{ paddingTop: '72px', paddingBottom: '72px', position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center gy-5">
            <div className="col-12 col-lg-6">
              <div className="sn-badge sn-badge-white mb-4">How to Order</div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(32px,4vw,60px)', color: '#fff', lineHeight: 1.05, marginBottom: '20px' }}>
                Ordering Takes Minutes
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '460px' }}>
                No portal. No approval process. Three steps from first contact to confirmed order.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/request-quote" className="sn-btn sn-btn-primary sn-btn-primary-lg">
                  Shop Products <ArrowRight size={18} />
                </Link>
                <Link href="/open-account" className="sn-btn sn-btn-secondary sn-btn-secondary-lg">
                  Open an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
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

      {/* Three Steps */}
      <section className="sn-section sn-bg-light" aria-labelledby="steps-heading">
        <div className="sn-container">
          <p className="sn-eyebrow">The Process</p>
          <h2 id="steps-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,40px)', color: '#122036', marginBottom: '48px' }}>
            Three Steps to Confirmation
          </h2>
          <div className="row g-4 align-items-center">
            {STEPS_MAIN.map((step, i) => (
              <div key={i} className="col-12 col-md-4 d-flex align-items-center gap-3">
                <div className="d-flex flex-column align-items-center flex-grow-1">
                  <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)', width: '100%', textAlign: 'center' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '22px', color: '#fff', marginInline: 'auto', marginBottom: '16px' }}>
                      {step.num}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: '#122036', marginBottom: '10px' }}>{step.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#54585f', lineHeight: 1.65, margin: 0 }}>{step.description}</p>
                  </div>
                </div>
                {i < STEPS_MAIN.length - 1 && (
                  <ArrowRight size={20} style={{ color: '#d0d8e4', flexShrink: 0 }} aria-hidden="true" className="d-none d-md-block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* After First Order */}
      <section className="sn-section sn-bg-white" aria-labelledby="after-heading">
        <div className="sn-container">
          <p className="sn-eyebrow">After Your First Order</p>
          <h2 id="after-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,40px)', color: '#122036', marginBottom: '48px' }}>
            It Only Gets Easier
          </h2>
          <div className="row g-4">
            {AFTER_FIRST.map((item, i) => (
              <div key={i} className="col-12 col-md-6">
                <div className="h-100 p-4" style={{ background: item.featured ? '#1a4fa0' : '#fff', borderRadius: '16px', border: item.featured ? 'none' : '1px solid #e8eff9', boxShadow: item.featured ? '0 8px 32px rgba(26,79,160,0.25)' : 'var(--shadow-card)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: item.featured ? 'rgba(255,255,255,0.15)' : 'linear-gradient(135deg,#ee6a12,#f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '22px' }} aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: item.featured ? '#fff' : '#122036', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: item.featured ? 'rgba(255,255,255,0.85)' : '#54585f', lineHeight: 1.65, margin: 0 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="sn-section sn-bg-light" aria-labelledby="contact-methods-heading">
        <div className="sn-container text-center">
          <p className="sn-eyebrow d-inline-flex">How to Reach Us</p>
          <h2 id="contact-methods-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,40px)', color: '#122036', marginBottom: '48px' }}>
            Reach a real person — every time
          </h2>
          <div className="row g-4 justify-content-center">
            {CONTACT_METHODS.map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="col-12 col-md-4">
                  <a href={method.href} className="d-block text-decoration-none sn-card p-4 h-100 text-center" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = 'var(--shadow-card-hover)'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; }}
                  >
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(26,79,160,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginInline: 'auto', marginBottom: '16px', color: '#1a4fa0' }}>
                      <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: '#1a4fa0', marginBottom: '6px' }}>{method.label}</h3>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#1a4fa0', marginBottom: '4px' }}>{method.value}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', margin: 0 }}>{method.sub}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sn-section sn-bg-white" aria-labelledby="faq-heading">
        <div className="sn-container">
          <div className="text-center mb-5">
            <p className="sn-eyebrow d-inline-flex">Frequently Asked Questions</p>
            <h2 id="faq-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,40px)', color: '#122036' }}>
              Answers Before You Ask
            </h2>
          </div>
          <div style={{ maxWidth: '680px', marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, i) => (
              <details key={i} className="sn-faq-item">
                <summary className="sn-faq-trigger" style={{ listStyle: 'none', cursor: 'pointer' }}>
                  {faq.q}
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#ee6a12,#f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontSize: '18px', fontWeight: 300 }} aria-hidden="true">+</span>
                </summary>
                <div className="sn-faq-content">{faq.a}</div>
              </details>
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
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: '12px', lineHeight: 1.1 }}>
                Set up Your Account Today!
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>
                Isabella Lara — your local Miami rep
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '28px' }}>
                (305) 519-6804 · orders@sunnovamedical.com
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/open-account" className="sn-btn" style={{ background: '#fff', color: '#d85f0c', padding: '14px 24px', fontSize: '15px', fontFamily: 'var(--font-heading)', fontWeight: 600, borderRadius: '999px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Set Up Your Account <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="sn-btn sn-btn-ghost-white">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
