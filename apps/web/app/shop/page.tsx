import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import {
  ArrowRight,
  Truck, UserCheck, ShieldCheck, Tag,
  CalendarCheck, Package, Layers, Clock, Gift,
  Ban, MapPin, CheckCircle2, CreditCard, RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Product Catalog | Professional Supplies. Delivered Same-Day.',
  description:
    '25 clinical-grade products across 5 categories — curated for med spas, aesthetic clinics, private practices, urgent care centers, and dermatology offices in Miami-Dade County.',
};

/* ─── data ──────────────────────────────────────────────────── */

const STAT_ITEMS = [
  { Icon: Truck,       label: 'Fast local delivery' },
  { Icon: UserCheck,   label: 'A real person, not a call center' },
  { Icon: ShieldCheck, label: 'Vetted, clinic-grade products' },
  { Icon: Tag,         label: 'Competitive pricing and flexible ordering' },
];

const SERVICES = [
  {
    Icon: Truck,
    title: 'Same-Day Local Delivery',
    body: 'Order by noon, receive same afternoon. We deliver directly to your clinic across all of Miami-Dade. Broward and Palm Beach available on request.',
    featured: true,
  },
  {
    Icon: CalendarCheck,
    title: 'Standing Order Program',
    body: 'Set-up monthly auto-delivery and never manually reorder again. Standing order clients receive priority same-day delivery.',
    featured: false,
  },
  {
    Icon: Package,
    title: 'Flexible Ordering — No Minimums',
    body: 'Order one box or one case. No fixed minimums. No contracts. No pressure.',
    featured: false,
  },
  {
    Icon: Layers,
    title: 'Custom Bundles',
    body: 'We build a monthly supply bundle based on your procedure mix and volume. One order. One invoice.',
    featured: false,
  },
  {
    Icon: Clock,
    title: '1-Hour Order Confirmation',
    body: 'Every order confirmed within 1 hour of receipt. You always know the status.',
    featured: false,
  },
  {
    Icon: UserCheck,
    title: 'Dedicated Account Rep — Isabella Lara',
    body: 'Your local Miami rep, reachable by phone, text, and email. One contact. Every order.',
    featured: false,
  },
];

type Product = { id: string; name: string; pack: string; delivery: 'Same Day' | 'Next Day' };
type CatalogSection = {
  num: string;
  name: string;
  subtitle: string;
  products: Product[];
  notes: string[];
  accent: 'navy' | 'orange';
  numColor: string;
};

const CATALOG: CatalogSection[] = [
  {
    num: '01',
    name: 'PPE & Protection',
    subtitle: 'Gloves · Masks · Gowns · Face Shields',
    accent: 'navy',
    numColor: '#2A6FD0',
    products: [
      { id: '01', name: 'Nitrile Exam Gloves — Small',  pack: '100/box',  delivery: 'Same Day' },
      { id: '02', name: 'Nitrile Exam Gloves — Medium', pack: '100/box',  delivery: 'Same Day' },
      { id: '03', name: 'Nitrile Exam Gloves — Large',  pack: '100/box',  delivery: 'Same Day' },
      { id: '04', name: 'Level 2 Surgical Masks',        pack: '50/box',   delivery: 'Same Day' },
      { id: '05', name: 'Disposable Isolation Gowns',    pack: '10/pack',  delivery: 'Same Day' },
    ],
    notes: [
      'All nitrile gloves are powder-free, latex-free, and FDA exam-grade compliant.',
      'Level 2 Surgical Masks are ASTM F2100 rated — BFE and PFE 98%+, the correct standard for injectable and laser procedures.',
      'XL gloves and case pricing available — ask your rep.',
    ],
  },
  {
    num: '02',
    name: 'Exam Room & Linen Supplies',
    subtitle: 'Table Paper · Pillow Covers · Bed Sheets · Drapes',
    accent: 'orange',
    numColor: '#E5550F',
    products: [
      { id: '07', name: 'Exam Table Paper Roll — 18" × 225ft',  pack: '12/case',    delivery: 'Same Day' },
      { id: '08', name: 'Disposable Pillow Covers',              pack: '100/pack',   delivery: 'Same Day' },
      { id: '09', name: 'Disposable Bed Sheet Roll — 31" × 180ft', pack: 'Each roll', delivery: 'Next Day' },
      { id: '10', name: 'Disposable Paper Drapes',               pack: '50/pack',    delivery: 'Same Day' },
    ],
    notes: [
      'Set up a monthly standing order on exam room linens and never run out mid-treatment day.',
      'Standing order clients receive priority same-day delivery.',
    ],
  },
  {
    num: '03',
    name: 'Wound Care & Procedure Supplies',
    subtitle: 'Gauze · Bandages · Tape · Wound Closure · Antiseptics',
    accent: 'navy',
    numColor: '#000000',
    products: [
      { id: '11', name: 'Sterile Gauze Pads 4×4"',            pack: '200/box',  delivery: 'Same Day' },
      { id: '12', name: 'Adhesive Bandages — Assorted',        pack: '100/box',  delivery: 'Same Day' },
      { id: '13', name: 'Medical Tape — 1" Paper',             pack: '12/box',   delivery: 'Same Day' },
      { id: '14', name: 'Alcohol Prep Pads',                   pack: '200/box',  delivery: 'Same Day' },
      { id: '15', name: 'Wound Closure Strips 1/4" × 3"',     pack: '50/box',   delivery: 'Same Day' },
      { id: '16', name: 'Povidone-Iodine Swabsticks',          pack: '50/box',   delivery: 'Same Day' },
      { id: '17', name: 'Saline Wound Wash Spray 7oz',         pack: '/pc',      delivery: 'Same Day' },
    ],
    notes: [
      'All single-use and individually packaged for hygiene compliance.',
      'Alcohol prep pads and sterile gauze available in bulk case quantities — contact us for pricing.',
    ],
  },
  {
    num: '04',
    name: 'General Clinical Disposables',
    subtitle: 'Tongue Depressors · Speculums · Spatulas',
    accent: 'orange',
    numColor: '#000000',
    products: [
      { id: '18', name: 'Tongue Depressors — Wooden',              pack: '12/case',    delivery: 'Same Day' },
      { id: '19', name: 'Disposable Speculums — Vaginal, Asst. Sizes', pack: 'Each roll', delivery: 'Next Day' },
      { id: '20', name: 'Disposable Spatulas — Wood',              pack: '50/pack',    delivery: 'Same Day' },
    ],
    notes: [
      'High-volume packs designed for busy practices. Speculums available in assorted sizes.',
    ],
  },
  {
    num: '05',
    name: 'Esthetic & Spa Supplies',
    subtitle: 'Facial Rounds · Esthetic Wipes · Headbands · Eye Pads · Microneedling',
    accent: 'navy',
    numColor: '#000000',
    products: [
      { id: '21', name: 'Non-Woven Esthetic Wipes 3×3"',       pack: '200/pack',        delivery: 'Same Day' },
      { id: '22', name: 'Disposable Facial Rounds',             pack: '100/bag',         delivery: 'Same Day' },
      { id: '23', name: 'Disposable Headbands',                 pack: '50/pack',         delivery: 'Same Day' },
      { id: '24', name: 'Under-Eye Gel Pads',                   pack: '50 pairs/pack',   delivery: 'Same Day' },
      { id: '25', name: 'Microneedling Cartridges — 36 Pin',    pack: '10/box',          delivery: 'Same Day' },
    ],
    notes: [
      'Microneedling cartridges compatible with most standard RF and manual microneedling devices.',
      'Contact us with your device brand and model to confirm compatibility before your first order.',
    ],
  },
];

const ORDER_TERMS = [
  { Icon: Ban,          title: 'Minimums',        body: 'None. Order exactly what you need.' },
  { Icon: MapPin,       title: 'Delivery Area',   body: 'Miami-Dade County — same-day or next-day. Broward and Palm Beach on request.' },
  { Icon: CheckCircle2, title: 'Confirmation',    body: 'Within 1 hour of order receipt.' },
  { Icon: Clock,        title: 'Payment Terms',   body: 'Net-15 for established accounts. First orders require payment prior to delivery.' },
  { Icon: CreditCard,   title: 'Payment Methods', body: 'ACH, check, or credit card (Visa/MC/Amex). 2.9% processing fee applies to card transactions.' },
  { Icon: RefreshCw,    title: 'Returns',         body: 'Unopened, damaged items accepted within 14 days of delivery with original packaging.' },
  { Icon: Gift,         title: 'First Order',     body: 'First-time clients receive a complimentary products sample with their initial order.' },
];

/* ─── sub-components ────────────────────────────────────────── */

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div className="d-flex align-items-center gap-2" style={{ marginBottom: '14px' }}>
    <span style={{ width: '22px', height: '2px', background: '#F4811E', borderRadius: '2px', flexShrink: 0 }} />
    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '12.8px', color: light ? '#FFFFFF' : '#2A6FD0', letterSpacing: '1.792px', textTransform: 'uppercase' }}>{children}</span>
  </div>
);

/* ─── page ──────────────────────────────────────────────────── */

export default function ShopPage() {
  return (
    <SiteLayout>

      {/* ── Hero ── */}
      <section style={{ background: '#004296', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative sunburst */}
        <div aria-hidden="true" style={{ position: 'absolute', right: '-60px', top: '-60px', width: '360px', height: '360px', borderRadius: '50%', background: 'linear-gradient(135deg, #E5550F, #EDD76A)', opacity: 0.18, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '80px', top: '40px', width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, #E5550F, #EDD76A)', opacity: 0.1, pointerEvents: 'none' }} />

        <div className="sn-container" style={{ paddingTop: '88px', paddingBottom: '88px', position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center gy-5">
            {/* Left — badge + H1 */}
            <div className="col-12 col-lg-7">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#FFFFFF', borderRadius: '999px', padding: '4px 16px', marginBottom: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '4px', background: '#F4811E', flexShrink: 0, boxShadow: '0 0 0 4px #FDEEDD' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 900, fontSize: '12px', color: '#1A4FA0', letterSpacing: '2.16px', textTransform: 'uppercase' }}>services &amp; catalog</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(36px, 5vw, 64px)', color: '#FFFFFF', lineHeight: '70px', letterSpacing: '-0.023em', marginBottom: 0 }}>
                Professional Supplies.<br />Delivered Same-Day.
              </h1>
            </div>

            {/* Right — body + CTAs */}
            <div className="col-12 col-lg-5">
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '20.48px', color: '#FFFFFF', lineHeight: '33.8px', marginBottom: '28px' }}>
                25 clinical-grade products across 5 categories — curated for med spas, aesthetic clinics, private practices, urgent care centers, and dermatology offices in Miami-Dade County.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/request-quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17.6px', color: '#FFFFFF', background: 'linear-gradient(90deg, #EE6A12, #F9B23E)', padding: '17.5px 32px', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 10px 26px rgba(244,129,30,0.34)' }}>
                  Request Pricing <ArrowRight size={18} />
                </Link>
                <Link href="/how-it-works" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17.6px', color: '#1A4FA0', background: '#FFFFFF', padding: '18px 32px', borderRadius: '14px', textDecoration: 'none' }}>
                  How to Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
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

      {/* ── Services ── */}
      <section style={{ background: '#F4F6FB', padding: '104px 0' }} aria-labelledby="services-heading">
        <div className="sn-container">
          <Eyebrow>Our Services</Eyebrow>
          <h2 id="services-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#122036', lineHeight: '50.1px', letterSpacing: '-0.02em', marginBottom: '44px' }}>
            Built For How Busy Clinics Actually Order
          </h2>
          <div className="row g-4">
            {SERVICES.map(({ Icon, title, body, featured }, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div style={{ background: featured ? '#1A4FA0' : '#FFFFFF', borderRadius: '22px', border: featured ? '4px solid #F4811E' : '1px solid #E1E7F0', boxShadow: '0 1px 2px rgba(18,32,54,0.06), 0 2px 6px rgba(18,32,54,0.05)', padding: '40px', height: '100%' }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: featured ? '#FFFFFF' : '#2A6FD0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <Icon size={26} color={featured ? '#1A4FA0' : '#FFFFFF'} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20.8px', color: featured ? '#FFFFFF' : '#122036', lineHeight: '22.5px', letterSpacing: '-0.02em', marginBottom: '10px' }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16.32px', color: featured ? 'rgba(255,255,255,0.88)' : '#6B7690', lineHeight: '26.9px', margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Catalog ── */}
      <section id="catalog" style={{ background: '#F4F6FB', padding: '104px 0 104px' }} aria-labelledby="catalog-heading">
        <div className="sn-container">
          <Eyebrow>Product Catalog</Eyebrow>
          <h2 id="catalog-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#122036', lineHeight: '50.1px', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            25 products. 5 categories. All clinical grade.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#6B7690', lineHeight: '25.1px', marginBottom: '56px' }}>
            Contact us for pricing. All products available for same-day or next-day delivery across Miami-Dade.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {CATALOG.map((cat) => (
              <div key={cat.num} style={{ background: '#FFFFFF', borderRadius: '20px', border: '2px solid #F9F9F9', boxShadow: '0 0 9.1px rgba(0,0,0,0.25)', overflow: 'hidden' }}>

                {/* Category header strip */}
                <div style={{ background: '#F9F9F9', padding: '21px 48px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Number badge */}
                  <div style={{ width: '60px', height: '56px', borderRadius: '15px', background: cat.accent === 'navy' ? 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.45) 0%, #004296 70%)' : '#E5550F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '32px', color: '#FFFFFF', lineHeight: '29.6px' }}>{cat.num}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '32px', color: '#122036', lineHeight: '50.1px', letterSpacing: '-0.928px' }}>{cat.name}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#0E1822', lineHeight: '19.2px', flexShrink: 0 }}>{cat.subtitle}</span>
                </div>

                {/* Table header */}
                <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr 180px 160px', padding: '10px 32px', gap: '8px', borderBottom: '1px solid #F0F3F8' }}>
                  {['#', 'Product', 'Pack Size', 'Delivery'].map((h) => (
                    <span key={h} style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '17.92px', color: '#54585F', lineHeight: '29.6px' }}>{h}</span>
                  ))}
                </div>

                {/* Table rows */}
                {cat.products.map((p, ri) => (
                  <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 180px 160px', padding: '14px 32px', gap: '8px', borderBottom: ri < cat.products.length - 1 ? '1px solid #F0F3F8' : 'none', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '17.92px', color: cat.numColor, lineHeight: '29.6px' }}>{p.id}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '17.92px', color: '#000000', lineHeight: '29.6px' }}>{p.name}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '17.92px', color: '#000000', lineHeight: '29.6px' }}>{p.pack}</span>
                    <DeliveryBadge type={p.delivery} />
                  </div>
                ))}

                {/* Footer notes */}
                {cat.notes.length > 0 && (
                  <div style={{ background: '#F9F9F9', padding: '10px 32px 22px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {cat.notes.map((note, ni) => (
                      <div key={ni} className="d-flex align-items-start gap-2" style={{ paddingTop: '6px' }}>
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '4px' }}>
                          <path d="M9.5 2L11.8 7.2L17.5 7.9L13.5 11.7L14.6 17.4L9.5 14.6L4.4 17.4L5.5 11.7L1.5 7.9L7.2 7.2L9.5 2Z" fill="url(#noteGrad)" />
                          <defs>
                            <linearGradient id="noteGrad" x1="1.5" y1="2" x2="17.5" y2="17.4" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#E5550F" />
                              <stop offset="1" stopColor="#EDD76A" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#54585F', lineHeight: '29.6px' }}>{note}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Order Terms ── */}
      <section style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, #004296 60%)', padding: '104px 0', position: 'relative', overflow: 'hidden' }} aria-labelledby="terms-heading">
        {/* Decorative sunburst right */}
        <div aria-hidden="true" style={{ position: 'absolute', right: '-80px', top: '50%', transform: 'translateY(-50%)', width: '460px', height: '460px', borderRadius: '50%', background: 'linear-gradient(135deg, #E5550F, #EDD76A)', opacity: 0.18, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '120px', top: '40%', width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, #E5550F, #EDD76A)', opacity: 0.1, pointerEvents: 'none' }} />

        <div className="sn-container" style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow light>Order Terms</Eyebrow>
          <h2 id="terms-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 3vw, 46.4px)', color: '#FFFFFF', lineHeight: '50.1px', letterSpacing: '-0.02em', marginBottom: '44px' }}>
            Simpler terms, spelled out
          </h2>
          <div style={{ maxWidth: '790px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ORDER_TERMS.map(({ Icon, title, body }, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '22px', border: '1px solid #E1E7F0', boxShadow: '0 1px 2px rgba(18,32,54,0.06), 0 2px 6px rgba(18,32,54,0.05)', padding: '28px 40px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: '#1A4FA0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={26} color="#FFFFFF" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20.8px', color: '#2A6FD0', lineHeight: '22.5px', letterSpacing: '-0.02em', marginBottom: '6px' }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16.32px', color: '#3A4660', lineHeight: '26.9px', margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(90deg, #EE6A12, #F9B23E)', padding: '64px 0', position: 'relative', overflow: 'hidden' }} aria-labelledby="cta-heading">
        {/* Decorative white sunburst */}
        <div aria-hidden="true" style={{ position: 'absolute', right: '-40px', bottom: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: '#FFFFFF', opacity: 0.08, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', right: '160px', bottom: '-80px', width: '180px', height: '180px', borderRadius: '50%', background: '#FFFFFF', opacity: 0.06, pointerEvents: 'none' }} />

        <div className="sn-container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 id="cta-heading" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px, 4vw, 51.2px)', color: '#FFFFFF', lineHeight: '55.3px', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Request pricing or place an order
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '19.2px', color: '#FFFFFF', lineHeight: '31.7px', marginBottom: '32px' }}>
            Isabella Lara — your local Miami rep · (305) 519-6804 · orders@sunnovamedical.com
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link href="/request-quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17.6px', color: '#D85F0C', background: '#FFFFFF', padding: '17.5px 32px', borderRadius: '14px', textDecoration: 'none', lineHeight: '29px' }}>
              Request Pricing <ArrowRight size={18} />
            </Link>
            <Link href="/how-it-works" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17.6px', color: '#FFFFFF', background: 'rgba(255,255,255,0.08)', padding: '18px 32px', borderRadius: '14px', textDecoration: 'none', lineHeight: '29px' }}>
              How to Order
            </Link>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}

/* ── Delivery badge ──────────────────────────────────────────── */
function DeliveryBadge({ type }: { type: 'Same Day' | 'Next Day' }) {
  const isSameDay = type === 'Same Day';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 12px',
      height: '30px',
      borderRadius: '20px',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: '#FFFFFF',
      background: isSameDay
        ? 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.25) 0%, #004296 65%)'
        : '#E5550F',
      boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
      whiteSpace: 'nowrap',
    }}>
      {type}
    </span>
  );
}
