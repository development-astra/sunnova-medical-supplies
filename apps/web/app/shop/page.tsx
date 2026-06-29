import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Product Catalog | Professional Supplies. Delivered Same-Day.',
  description:
    '25 clinical-grade products across 5 categories — curated for med spas, aesthetic clinics, private practices, urgent care centers, and dermatology offices in Miami-Dade County.',
};

const CATALOG_SECTIONS = [
  {
    num: '01',
    name: 'PPE & Protection',
    subtitle: 'Gloves · Masks · Gowns · Face Shields',
    products: [
      { id: 1, name: 'Nitrile Exam Gloves — Small', pack: '100/box', delivery: 'Same Day' },
      { id: 2, name: 'Nitrile Exam Gloves — Medium', pack: '100/box', delivery: 'Same Day' },
      { id: 3, name: 'Nitrile Exam Gloves — Large', pack: '100/box', delivery: 'Same Day' },
      { id: 4, name: 'Level 3 Surgical Masks', pack: '50/box', delivery: 'Same Day' },
      { id: 5, name: 'Disposable Isolation Gowns', pack: '10/pack', delivery: 'Next Day' },
    ],
    note: 'Nitrile gloves are our most popular item. We carry small through XL and can accommodate bulk orders.',
    gradient: false,
  },
  {
    num: '02',
    name: 'Exam Room & Linen Supplies',
    subtitle: 'Table Paper · Pillow Cases · Bed Sheets · Drapes',
    products: [
      { id: 6, name: 'Exam Table Paper Roll — 18" × 225ft', pack: '12/case', delivery: 'Same Day' },
      { id: 7, name: 'Disposable Pillow Cases', pack: '100/pack', delivery: 'Same Day' },
      { id: 8, name: 'Disposable Bed Sheet Roll — 31" × 100ft', pack: 'Each roll', delivery: 'Next Day', badge: 'Low Stock' },
      { id: 9, name: 'Disposable Paper Drapes', pack: '50/pack', delivery: 'Same Day' },
    ],
    note: 'All paper products are fluid-resistant and tearproof. Custom sizing available on request.',
    gradient: false,
  },
  {
    num: '03',
    name: 'Wound Care & Procedure Supplies',
    subtitle: 'Gauze · Bandages · Tape · Wound Closure · Antiseptics',
    products: [
      { id: 10, name: 'Sterile Gauze Pads 4×4"', pack: '100/box', delivery: 'Same Day' },
      { id: 11, name: 'Adhesive Bandages — Assorted', pack: '100/box', delivery: 'Same Day' },
      { id: 12, name: 'Medical Tape — 1" Paper', pack: '12/box', delivery: 'Same Day' },
      { id: 13, name: 'Alcohol Prep Pads', pack: '200/box', delivery: 'Same Day' },
      { id: 14, name: 'Wound Closure Strips 1/4 × 3"', pack: '50/box', delivery: 'Same Day' },
      { id: 15, name: 'Povidone Iodine Swabsticks', pack: '50/box', delivery: 'Same Day' },
      { id: 16, name: 'Saline Wound Wash Spray 7oz', pack: 'Each', delivery: 'Next Day' },
    ],
    note: 'Wound care products are sourced from national distributors and meet ASTM clinical standards.',
    gradient: false,
  },
  {
    num: '04',
    name: 'General Clinical Disposables',
    subtitle: 'Tongue Depressors · Specula · Spatulas',
    products: [
      { id: 17, name: 'Tongue Depressors — Wooden', pack: '12/case', delivery: 'Same Day' },
      { id: 18, name: 'Disposable Specula — Vaginal', pack: 'Each roll', delivery: 'Next Day', badge: 'Low Stock' },
      { id: 19, name: 'Disposable Spatulas — Wood', pack: '50/pack', delivery: 'Same Day' },
    ],
    note: 'High-volume products available at bulk pricing. Available in case quantities.',
    gradient: false,
  },
  {
    num: '05',
    name: 'Esthetic & Spa Supplies',
    subtitle: 'Skin Prep · Face Pads · Headbands · Microneedling',
    products: [
      { id: 20, name: 'Non-Woven Esthetic Wipes 3×3"', pack: '200/pack', delivery: 'Same Day' },
      { id: 21, name: 'Disposable Facial Rounds', pack: '100/bag', delivery: 'Same Day' },
      { id: 22, name: 'Disposable Headbands', pack: '60/pack', delivery: 'Same Day' },
      { id: 23, name: 'Linen Eye Gel Pads', pack: '50 pairs/pack', delivery: 'Same Day' },
      { id: 24, name: 'Microneedling Cartridges — 36 Pin', pack: '10/box', delivery: 'Next Day' },
    ],
    note: 'Med spa supplies sourced with aesthetic clinic workflows in mind. Custom bundles available.',
    gradient: false,
  },
];

const SERVICES = [
  {
    icon: '🚚',
    title: 'Same-Day Local Delivery',
    description: 'We deliver directly to your clinic. Same day across all of Miami-Dade. Broward and Palm Beach available to request.',
    featured: true,
  },
  {
    icon: '📦',
    title: 'Flexible Ordering — No Minimums',
    description: 'Order one box or one case. No minimums. No contracts. No surprises.',
    featured: false,
  },
  {
    icon: '✅',
    title: '1-Hour Order Confirmation',
    description: 'Place your order and get a confirmation in less than 1 hour — any time during business hours.',
    featured: false,
  },
  {
    icon: '🔄',
    title: 'Standing Order Program',
    description: 'Set up monthly auto-delivery so you never need to reorder again.',
    featured: false,
  },
  {
    icon: '🎁',
    title: 'Custom Bundles',
    description: 'We build a monthly supply bundle based on your needs. One order. One delivery.',
    featured: false,
  },
  {
    icon: '👤',
    title: 'Dedicated Account Rep — Isabella',
    description: 'Your rep is available by phone, text, and email. Direct. Reliable. Local.',
    featured: false,
  },
];

const GLOSSARY = [
  { term: 'Minimums', def: 'None. Order one box or one case whenever you want.' },
  { term: 'Contracts', def: 'None.' },
  { term: 'Confirmation', def: 'Within 1 hour.' },
  { term: 'Delivery', def: 'Same-day or next-day — Miami-Dade.' },
  { term: 'Payment Terms', def: 'Net-15 established accounts. First order pre-pay.' },
  { term: 'Payment Methods', def: 'ACH · Check · Visa/MC/Amex (2.9% card fee).' },
  { term: 'Returns', def: 'Unopened items, within 14 days.' },
  { term: 'First Order Bonus', def: 'Complimentary product sample included.' },
];

export default function ShopPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section style={{ backgroundColor: '#1a4fa0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-60px', top: '-60px', width: '320px', height: '320px', borderRadius: '50%', border: '38px solid rgba(249,178,62,0.4)', pointerEvents: 'none', zIndex: 1 }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '60px', top: '60px', width: '180px', height: '180px', borderRadius: '50%', border: '22px solid rgba(238,106,18,0.3)', pointerEvents: 'none', zIndex: 1 }} />
        <div className="sn-container" style={{ paddingTop: '72px', paddingBottom: '72px', position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center gy-5">
            <div className="col-12 col-lg-7">
              <div className="sn-badge sn-badge-white mb-4">Services &amp; Catalog</div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(32px,4vw,60px)', color: '#fff', lineHeight: 1.05, marginBottom: '20px' }}>
                Professional Supplies. Delivered Same-Day.
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '480px' }}>
                25 clinical-grade products across 5 categories — curated for med spas, aesthetic clinics, private practices, urgent care centers, and dermatology offices in Miami-Dade County.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <a href="#catalog" className="sn-btn sn-btn-primary sn-btn-primary-lg">
                  Request Pricing <ArrowRight size={18} />
                </a>
                <Link href="/how-it-works" className="sn-btn sn-btn-secondary sn-btn-secondary-lg">
                  How to Order
                </Link>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                <span style={{ color: '#f9b23e' }}>✓</span> Founded by a medical professional. Serving med spas, clinics, and practices across Miami-Dade.
              </p>
            </div>
          </div>
        </div>
        <div style={{ background: 'linear-gradient(90deg, #ee6a12 0%, #f9b23e 100%)', padding: '20px 0' }}>
          <div className="sn-container">
            <div className="row gy-3 justify-content-center">
              {['Fast local delivery', 'A real person, not a call center', 'Vetted, clinic-grade products', 'No order minimums'].map((f, i) => (
                <div key={i} className="col-6 col-md-3 d-flex align-items-center gap-2">
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#fff' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="sn-section sn-bg-light" aria-labelledby="services-heading">
        <div className="sn-container">
          <p className="sn-eyebrow">Our Services</p>
          <h2 id="services-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,40px)', color: '#122036', marginBottom: '48px' }}>
            Built For How Busy Clinics Actually Order
          </h2>
          <div className="row g-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="h-100 p-4" style={{ background: s.featured ? '#1a4fa0' : '#fff', borderRadius: '16px', border: s.featured ? 'none' : '1px solid #e8eff9', boxShadow: s.featured ? '0 8px 32px rgba(26,79,160,0.25)' : 'var(--shadow-card)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: s.featured ? 'rgba(255,255,255,0.15)' : 'linear-gradient(135deg,#ee6a12,#f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '22px' }} aria-hidden="true">
                    {s.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '18px', color: s.featured ? '#fff' : '#122036', marginBottom: '8px' }}>{s.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: s.featured ? 'rgba(255,255,255,0.85)' : '#54585f', lineHeight: 1.6, margin: 0 }}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="catalog" className="sn-section sn-bg-white" aria-labelledby="catalog-heading">
        <div className="sn-container">
          <p className="sn-eyebrow">Product Catalog</p>
          <h2 id="catalog-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,40px)', color: '#122036', marginBottom: '8px' }}>
            25 products. 5 categories. All clinical grade.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6b7690', marginBottom: '48px' }}>
            Contact us for pricing. All products available for same-day or next-day delivery across Miami-Dade.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {CATALOG_SECTIONS.map((section) => (
              <div key={section.num} style={{ border: '1px solid #e8eff9', borderRadius: '16px', overflow: 'hidden' }}>
                {/* Section header */}
                <div style={{ padding: '24px 28px', borderBottom: '1px solid #e8eff9', background: '#f7f9fa' }}>
                  <div className="d-flex align-items-center gap-3">
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '28px', color: '#e8eff9', lineHeight: 1 }}>{section.num}</span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: '#122036', margin: 0 }}>{section.name}</h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', margin: 0 }}>{section.subtitle}</p>
                    </div>
                  </div>
                </div>
                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table className="sn-table" aria-label={`${section.name} products`}>
                    <thead>
                      <tr>
                        <th style={{ width: '48px' }}>#</th>
                        <th>Product</th>
                        <th>Pack Size</th>
                        <th>Delivery</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.products.map((p) => (
                        <tr key={p.id}>
                          <td style={{ color: '#a0aab4', fontSize: '13px' }}>{p.id}</td>
                          <td>
                            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#122036' }}>{p.name}</span>
                            {p.badge && (
                              <span style={{ marginLeft: '8px', padding: '2px 8px', background: 'rgba(244,129,30,0.1)', color: '#f4811e', borderRadius: '20px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                                {p.badge}
                              </span>
                            )}
                          </td>
                          <td>{p.pack}</td>
                          <td>
                            <span
                              style={{
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: 600,
                                fontFamily: 'var(--font-body)',
                                background: p.delivery === 'Same Day' ? 'linear-gradient(135deg,#ee6a12,#f9b23e)' : '#e8eff9',
                                color: p.delivery === 'Same Day' ? '#fff' : '#3a4660',
                              }}
                            >
                              {p.delivery}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {section.note && (
                  <div style={{ padding: '14px 28px', background: '#f7f9fa', borderTop: '1px solid #e8eff9' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', margin: 0 }}>
                      <span style={{ color: '#2a6fd0', fontWeight: 600 }}>Note: </span>{section.note}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="sn-section sn-bg-light" aria-labelledby="glossary-heading">
        <div className="sn-container">
          <p className="sn-eyebrow">Simpler Terms, Spelled Out</p>
          <h2 id="glossary-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px,3vw,36px)', color: '#122036', marginBottom: '40px' }}>
            No surprises — here&apos;s how we work
          </h2>
          <div style={{ border: '1px solid #e8eff9', borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
            {GLOSSARY.map((g, i) => (
              <div
                key={g.term}
                className="d-flex align-items-start"
                style={{ padding: '18px 28px', borderBottom: i < GLOSSARY.length - 1 ? '1px solid #f0f3f8' : 'none' }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', color: '#122036', minWidth: '160px', flexShrink: 0 }}>{g.term}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#3a4660' }}>{g.def}</span>
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
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: '12px', lineHeight: 1.1 }}>
                Request pricing or place an order
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>
                Isabella Lara — your local Miami rep
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '28px' }}>
                (305) 519-6804 · orders@sunnovamedical.com
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/request-quote" className="sn-btn" style={{ background: '#fff', color: '#d85f0c', padding: '14px 24px', fontSize: '15px', fontFamily: 'var(--font-heading)', fontWeight: 600, borderRadius: '999px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Request Pricing <ArrowRight size={16} />
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
