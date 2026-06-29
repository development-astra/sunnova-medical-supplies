import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  {
    slug: 'gloves-ppe',
    label: 'PPE',
    name: 'Gloves and PPE',
    description: 'Exam gloves, masks, gowns, and protective wear ready to ship.',
    image: '/images/categories/gloves-ppe.png',
  },
  {
    slug: 'wound-care',
    label: 'FIRST AID',
    name: 'Wound Care and First Aid',
    description: 'Dressings, bandages, antiseptics, and treatment supplies.',
    image: '/images/categories/wound-care.png',
  },
  {
    slug: 'syringes-needles',
    label: 'INJECTABLES',
    name: 'Syringes and Needles',
    description: 'Sterile syringes, needles, and sharps containers in every size.',
    image: '/images/categories/syringes.png',
  },
  {
    slug: 'aesthetic-skincare',
    label: 'MED SPA',
    name: 'Aesthetic and Skincare Consumables',
    description: 'Treatment-room consumables curated for med spa workflows.',
    image: '/images/categories/aesthetic.png',
  },
  {
    slug: 'exam-room-essentials',
    label: 'ESSENTIALS',
    name: 'Exam Room Essentials',
    description: 'Table paper, drapes, sanitizers, and everyday room supplies.',
    image: '/images/categories/exam-room.png',
  },
];

export default function CategorySection() {
  return (
    <section className="sn-section sn-bg-white" aria-labelledby="categories-heading">
      <div className="sn-container">

        {/* ── Centered header ── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="sn-eyebrow" style={{ justifyContent: 'center' }}>Shop by Category</p>
          <h2
            id="categories-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: '#122036',
              margin: 0,
            }}
          >
            Everything Your Practice Runs On,{' '}
            <br className="d-none d-md-block" />
            In One Place
          </h2>
        </div>

        {/* ── 2 × 3 grid ── */}
        <div className="row g-4">

          {/* Row 1: 5 category cards */}
          {CATEGORIES.map((cat) => (
            <div key={cat.slug} className="col-12 col-sm-6 col-lg-4">
              <CategoryCard cat={cat} />
            </div>
          ))}

          {/* Row 2 col-3: Shop All CTA card */}
          <div className="col-12 col-sm-6 col-lg-4">
            <ShopAllCard />
          </div>

        </div>

        {/* ── Source line ── */}
        <div
          className="d-flex align-items-center justify-content-center gap-2"
          style={{ marginTop: '40px' }}
        >
          <ShieldCheck size={16} style={{ color: '#6b7690', flexShrink: 0 }} aria-hidden="true" />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#6b7690',
              margin: 0,
              textAlign: 'center',
            }}
          >
            We source from reputable, vetted distributors and national supply partners, so every
            product meets the standards your patients expect.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ── Category card ──────────────────────────────────────────── */
function CategoryCard({ cat }: { cat: (typeof CATEGORIES)[0] }) {
  return (
    <Link
      href={`/shop/${cat.slug}`}
      className="d-flex flex-column text-decoration-none h-100"
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #E6E6E6',
        boxShadow: '0 2px 8px rgba(18,32,54,0.07)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: '200px',
          position: 'relative',
          overflow: 'hidden',
          background: '#f4f6fb',
          flexShrink: 0,
        }}
      >
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 380px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Content */}
      <div
        className="d-flex flex-column flex-grow-1"
        style={{ padding: '20px 24px 24px' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '11px',
            color: '#2a6fd0',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          {cat.label}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '20px',
            color: '#122036',
            lineHeight: 1.25,
            marginBottom: '10px',
          }}
        >
          {cat.name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14.5px',
            color: '#6b7690',
            lineHeight: 1.55,
            marginBottom: '20px',
            flexGrow: 1,
          }}
        >
          {cat.description}
        </p>
        <span
          className="d-inline-flex align-items-center gap-1"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '15px',
            color: '#1a4fa0',
          }}
        >
          Shop category
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

/* ── Shop All CTA card ──────────────────────────────────────── */
function ShopAllCard() {
  return (
    <Link
      href="/shop"
      className="d-flex flex-column text-decoration-none h-100"
      style={{
        background: '#1a4fa0',
        borderRadius: '16px',
        overflow: 'hidden',
        minHeight: '200px',
        position: 'relative',
      }}
    >
      {/* Content */}
      <div style={{ padding: '28px 28px 20px', position: 'relative', zIndex: 1, flexGrow: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '11px',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px',
          }}
        >
          Browse all
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '28px',
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '10px',
          }}
        >
          Shop All Products
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14.5px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.55,
            marginBottom: '20px',
          }}
        >
          The full Sunnova catalog, organized for the way clinics actually order.
        </p>
        <span
          className="d-inline-flex align-items-center gap-2"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '15px',
            color: '#ffffff',
            background: 'linear-gradient(90deg, #EE6A12, #F9B23E)',
            padding: '10px 20px',
            borderRadius: '999px',
          }}
        >
          Explore the catalog
          <ArrowRight size={14} />
        </span>
      </div>

      {/* Decorative brand rings */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-28px',
          bottom: '-28px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          border: '28px solid #F4811E',
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '52px',
          bottom: '-48px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: '18px solid #F9B23E',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
    </Link>
  );
}
