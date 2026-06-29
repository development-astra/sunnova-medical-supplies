import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import {
  ArrowRight, Phone, Mail, Globe,
  Truck, UserCheck, ShieldCheck, Tag,
  RefreshCw, CalendarCheck, Package, Bell,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Order | Ordering Takes Minutes — Sunnova Medical Supplies',
  description:
    'No portal. No approval process. Three steps from first contact to confirmed order. Browse, get a quote, confirm and receive. Same-day delivery across Miami-Dade.',
};

/* ─── data ─────────────────────────────────────────────── */

const STAT_ITEMS = [
  { Icon: Truck,       label: 'Fast local delivery' },
  { Icon: UserCheck,   label: 'A real person, not a call center' },
  { Icon: ShieldCheck, label: 'Vetted, clinic-grade products' },
  { Icon: Tag,         label: 'Competitive pricing and flexible ordering' },
];

const STEPS = [
  {
    num: '1',
    iconBg: '#1A4FA0',
    title: 'Reach Out',
    body: 'Call, text, or email. Tell us your facility type, location, and what you need.\nWe respond and confirm within 1 hour.',
  },
  {
    num: '2',
    iconBg: '#EDD76A',
    title: 'Receive your Quote',
    body: 'Clear, itemized pricing — no hidden fees, no bundled surprises.\nReview it before you commit to anything.',
  },
  {
    num: '3',
    iconBg: '#E5550F',
    title: 'Confirm and Receive',
    body: 'Approve by phone, email, or online.\nWe fulfill and deliver same-day or next-day directly to your clinic.',
  },
];

const AFTER_FIRST = [
  { Icon: RefreshCw,     title: 'Reorder in Seconds',          body: 'We keep your order history on file, so repeat orders take moments.',            featured: true  },
  { Icon: CalendarCheck, title: 'Standing Order Program',      body: 'Set monthly auto-delivery and never reorder again.',                             featured: false },
  { Icon: Package,       title: 'Custom Bundles',              body: 'We build a recurring supply package around your procedure mix.',                 featured: false },
  { Icon: Bell,          title: 'Proactive Restocking Alerts', body: 'We flag when key items are running low before you do.',                         featured: false },
];

const CONTACT_METHODS = [
  { Icon: Phone, label: 'Phone / Text',       value: '(305) 519-6804',           sub: 'Mon–Fri, 8am–6pm EST',                   href: 'tel:+13055196804' },
  { Icon: Mail,  label: 'Email',              value: 'orders@sunnovamedical.com', sub: 'Replies within 1 hour, business hours',  href: 'mailto:orders@sunnovamedical.com' },
  { Icon: Globe, label: 'Website',            value: 'sunnovamedical.com',        sub: 'Catalog & quotes — available 24/7',      href: '/' },
];

const FAQS = [
  { q: 'Do you have order minimums?',                      a: 'No minimums, ever. Order one box or one case — whatever your practice needs.' },
  { q: 'How fast can I receive my order?',                 a: 'Same-day or next-day delivery across Miami-Dade County. We confirm within 1 hour and fulfill quickly.' },
  { q: 'Where do you deliver?',                            a: 'All of Miami-Dade County. Broward and Palm Beach available on request.' },
  { q: 'What practices do you work with?',                 a: 'Med spas, aesthetic clinics, dermatology offices, private practices, urgent care centers, and wellness centers.' },
  { q: 'How does payment work?',                           a: 'First order is pre-pay. Established accounts qualify for Net-15 terms. We accept ACH, check, and card (2.9% fee).' },
  { q: 'Can I set up automatic monthly delivery?',         a: 'Yes. Our Standing Order Program lets you set up recurring auto-delivery so you never have to reorder manually.' },
  { q: 'Can I see the catalog and pricing first?',         a: "Absolutely. Contact Isabella and she'll send a full catalog with pricing within the hour." },
  { q: 'What if I need a product not in your catalog?',   a: 'Tell us what you need. We source from national distributors and can often fulfill special requests within 1–2 business days.' },
];

/* ─── helpers ───────────────────────────────────────────── */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="d-flex align-items-center gap-2" style={{ marginBottom: '14px' }}>
    <span style={{ width: '22px', height: '2px', background: '#F4811E', borderRadius: '2px', flexShrink: 0 }} />
    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '12.8px', color: '#2A6FD0', letterSpacing: '1.792px', textTransform: 'uppercase' }}>{children}</span>
  </div>
);

/* ─── page ──────────────────────────────────────────────── */

export default function HowItWorksPage() {
  return (
    <SiteLayout>

      {/* ── Hero ── */}
      <section style={{ background: '#004296', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-80px', top: '-80px', width: '420px', height: '420px', borderRadius: '50%', border: '52px solid rgba(249,178,62,0.12)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '120px', top: '80px', width: '240px', height: '240px', borderRadius: '50%', border: '28px solid rgba(238,106,18,0.1)', pointerEvents: 'none' }} />
        <div className="sn-container" style={{ paddingTop: '88px', paddingBottom: '88px', position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center gy-5">
            <div className="col-12 col-lg-7">
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontWeight: 900, fontSize: '12px', color: '#1A4FA0', background: '#FFFFFF', letterSpacing: '2.16px', padding: '4px 16px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '24px' }}>
                how to order
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(36px, 5vw, 64px)', color: '#FFFFFF', lineHeight: '70px', letterSpacing: '-0.023em', marginBottom: 0 }}>
                Ordering Takes<br />Minutes
              </h1>
            </div>
            <div className="col-12 col-lg-5">
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '20.48px', color: '#FFFFFF', lineHeight: '33.8px', marginBottom: '28px' }}>
                No portal. No approval process. Three steps from first contact to confirmed order.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15.2px', color: '#FFFFFF', background: 'linear-gradient(90deg, #EE6A12, #F9B23E)', padding: '13px 24px', borderRadius: '14px', textDecoration: 'none' }}>
                  Shop Products <ArrowRight size={16} />
                </Link>
                <Link href="/open-account" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15.2px', color: '#1A4FA0', background: '#FFFFFF', padding: '13px 24px', borderRadius: '14px', textDecoration: 'none' }}>
                  Open an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat bar ── */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E1E7F0' }}>
        <div className="sn-container" style={{ paddingTop: '26px', paddingBottom: '26px' }}>
          <div className="row gy-3 align-items-center">
            {STAT_ITEMS.map(({ Icon, label }, i) => (
              <div key={label} className="col-6 col-md-3" style={{ borderLeft: i > 0 ? '1px solid #E1E7F0' : 'none' }}>
                <div className="d-flex align-items-center gap-3 px-2">
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#1A4FA0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={22} color="#FFFFFF" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#122036', lineHeight: 1.35 }}>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Three Steps ── */}
      <section style={{ background: '#FFFFFF', padding: '104px 0' }} aria-labelledby="steps-heading">
        <div className="sn-container">
          <Eyebrow>The process</Eyebrow>
          <h2 id="steps-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#122036', lineHeight: '50.1px', letterSpacing: '-0.02em', marginBottom: '48px' }}>
            Three Steps to Confirmation
          </h2>
          <div className="row g-0 align-items-center">
            {STEPS.map((step, i) => (
              <div key={i} className="col-12 col-md" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ background: '#FFFFFF', borderRadius: '22px', padding: '40px', border: '1px solid #E1E7F0', boxShadow: '0 1px 2px rgba(18,32,54,0.08), 0 3px 6px rgba(18,32,54,0.06)', width: '100%' }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: step.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '32px', color: '#FFFFFF', marginBottom: '20px', boxShadow: '0 4px 4px rgba(196,209,226,0.5)' }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20.8px', color: '#122036', lineHeight: '22.5px', letterSpacing: '-0.02em', marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16.32px', color: '#3A4660', lineHeight: '26.9px', margin: 0, whiteSpace: 'pre-line' }}>{step.body}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="d-none d-md-flex" style={{ padding: '0 12px', flexShrink: 0 }}>
                    <ArrowRight size={22} style={{ color: '#1A4FA0' }} aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── After First Order ── */}
      <section style={{ background: '#F4F6FB', padding: '104px 0' }} aria-labelledby="after-heading">
        <div className="sn-container">
          <Eyebrow>after your first order</Eyebrow>
          <h2 id="after-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#122036', lineHeight: '50.1px', letterSpacing: '-0.02em', marginBottom: '44px' }}>
            It Only Gets Easier
          </h2>
          <div className="row g-4">
            {AFTER_FIRST.map(({ Icon, title, body, featured }, i) => (
              <div key={i} className="col-12 col-md-6">
                <div style={{
                  background: featured ? '#1A4FA0' : '#FFFFFF',
                  borderRadius: '22px',
                  border: featured ? '4px solid #F4811E' : '1px solid #E1E7F0',
                  boxShadow: '0 1px 2px rgba(18,32,54,0.06), 0 2px 6px rgba(18,32,54,0.05)',
                  padding: '36px',
                  height: '100%',
                }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: featured ? '#FFFFFF' : '#1A4FA0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Icon size={24} color={featured ? '#1A4FA0' : '#FFFFFF'} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20.8px', color: featured ? '#FFFFFF' : '#122036', lineHeight: '22.5px', letterSpacing: '-0.02em', marginBottom: '10px' }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16.32px', color: featured ? 'rgba(255,255,255,0.85)' : '#3A4660', lineHeight: '26.9px', margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Methods ── */}
      <section style={{ background: '#FFFFFF', padding: '104px 0' }} aria-labelledby="contact-heading">
        <div className="sn-container" style={{ textAlign: 'center' }}>
          <Eyebrow>how to reach us</Eyebrow>
          <h2 id="contact-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#122036', lineHeight: '50.1px', letterSpacing: '-0.02em', marginBottom: '71px' }}>
            Reach a real person — every time
          </h2>
          <div className="row g-4">
            {CONTACT_METHODS.map(({ Icon, label, value, sub, href }, i) => (
              <div key={i} className="col-12 col-md-4">
                <a href={href} className="d-flex flex-column align-items-center text-decoration-none" style={{ background: '#FFFFFF', borderRadius: '20px', border: '2px solid #0E1822', padding: '48px 32px', gap: '10px', height: '100%', boxShadow: '0 2px 4px rgba(16,24,40,0.10), 0 4px 6px rgba(16,24,40,0.08)' }}>
                  <div style={{ width: '47px', height: '47px', borderRadius: '8px', background: '#2A6FD0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                    <Icon size={22} color="#FFFFFF" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(20px, 2vw, 32px)', color: '#004296', lineHeight: '50.1px', margin: 0 }}>{label}</h3>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(13px, 1.5vw, 21.12px)', color: '#2A6FD0', lineHeight: '22.8px', margin: 0, wordBreak: 'break-all' }}>{value}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#54585F', lineHeight: '25.1px', margin: 0 }}>{sub}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#F4F6FB', padding: '104px 0' }} aria-labelledby="faq-heading">
        <div className="sn-container">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <Eyebrow>frequently asked questions</Eyebrow>
            <h2 id="faq-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#122036', lineHeight: '50.1px', letterSpacing: '-0.02em' }}>
              Answers Before You Ask
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {FAQS.map((faq, i) => (
              <details key={i} style={{ background: '#FFFFFF', borderRadius: '22px', border: '1px solid #E1E7F0', overflow: 'hidden' }}>
                <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '28px 40px', cursor: 'pointer', listStyle: 'none' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(16px, 1.5vw, 20.8px)', color: '#122036', lineHeight: '22.5px', letterSpacing: '-0.02em' }}>{faq.q}</span>
                  <span aria-hidden="true" style={{ width: '43px', height: '43px', borderRadius: '11.2px', background: '#1A4FA0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#FFFFFF', fontSize: '24px', fontWeight: 300, lineHeight: 1 }}>+</span>
                </summary>
                <div style={{ padding: '0 40px 28px', fontFamily: 'var(--font-body)', fontSize: '16.32px', color: '#3A4660', lineHeight: '26.9px' }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(90deg, #EE6A12, #F9B23E)', padding: '64px 0', position: 'relative', overflow: 'hidden' }} aria-labelledby="cta-heading">
        <div aria-hidden="true" style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', borderRadius: '50%', border: '32px solid rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
        <div className="sn-container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 id="cta-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 4vw, 51.2px)', color: '#FFFFFF', lineHeight: '55.3px', letterSpacing: '-0.02em', marginBottom: '18px' }}>
            Set up Your Account Today!
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '19.2px', color: '#FFFFFF', lineHeight: '31.7px', marginBottom: '32px' }}>
            Isabella Lara — your local Miami rep · (305) 519-6804 · orders@sunnovamedical.com
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link href="/open-account" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17.6px', color: '#D85F0C', background: '#FFFFFF', padding: '17.5px 32px', borderRadius: '14px', textDecoration: 'none', lineHeight: '29px' }}>
              Set Up Your Account <ArrowRight size={18} />
            </Link>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17.6px', color: '#FFFFFF', background: 'rgba(255,255,255,0.08)', padding: '18px 32px', borderRadius: '14px', textDecoration: 'none', lineHeight: '29px' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
