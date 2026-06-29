import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    slug: 'gloves-ppe',
    label: 'PPE',
    name: 'Gloves and PPE',
    description: 'Exam gloves, masks, gowns, and protective wear ready to ship.',
    image: '/images/categories/gloves-ppe.jpg',
  },
  {
    slug: 'wound-care',
    label: 'FIRST AID',
    name: 'Wound Care and First Aid',
    description: 'Dressings, bandages, antiseptics, and treatment supplies.',
    image: '/images/categories/wound-care.jpg',
  },
  {
    slug: 'syringes-needles',
    label: 'INJECTABLES',
    name: 'Syringes and Needles',
    description: 'Sterile syringes, needles, and sharps containers in every size.',
    image: '/images/categories/syringes.jpg',
  },
  {
    slug: 'aesthetic-skincare',
    label: 'MED SPA',
    name: 'Aesthetic and Skincare Consumables',
    description: 'Treatment-room consumables curated for med spa workflows.',
    image: '/images/categories/aesthetic.jpg',
  },
  {
    slug: 'exam-room-essentials',
    label: 'ESSENTIALS',
    name: 'Exam Room Essentials',
    description: 'Table paper, drapes, sanitizers, and everyday room supplies.',
    image: '/images/categories/exam-room.jpg',
  },
];

export default function CategorySection() {
  return (
    <section className="sn-section sn-bg-white" aria-labelledby="categories-heading">
      <div className="sn-container">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-5">
          <div>
            <p className="sn-eyebrow">Shop by Category</p>
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
          <Link
            href="/shop"
            className="d-flex align-items-center gap-1 text-decoration-none"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '12px',
              color: '#f4811e',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Browse All
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {/* Category cards — left column (2×2) */}
          <div className="col-12 col-lg-8">
            <div className="row g-4">
              {/* Shop All Products — featured card */}
              <div className="col-12 col-md-6">
                <Link
                  href="/shop"
                  className="d-flex flex-column justify-content-end text-decoration-none h-100"
                  style={{
                    background: 'linear-gradient(135deg, #1a4fa0 0%, #163f80 100%)',
                    borderRadius: '16px',
                    padding: '28px',
                    minHeight: '220px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative ring */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      right: '-30px',
                      bottom: '-30px',
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      border: '22px solid rgba(249,178,62,0.3)',
                    }}
                  />
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '28px',
                        color: '#ffffff',
                        marginBottom: '8px',
                      }}
                    >
                      Shop All Products
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '16px',
                      }}
                    >
                      The full Sunnova catalog, organized for the way clinics actually order.
                    </p>
                    <span
                      className="d-inline-flex align-items-center gap-1"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: '#f9b23e',
                      }}
                    >
                      Explore the catalog
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Regular category cards */}
              {CATEGORIES.slice(0, 3).map((cat) => (
                <div key={cat.slug} className="col-12 col-md-6">
                  <CategoryCard cat={cat} />
                </div>
              ))}
            </div>
          </div>

          {/* Right column: last 2 categories stacked */}
          <div className="col-12 col-lg-4">
            <div className="row g-4 h-100">
              {CATEGORIES.slice(3).map((cat) => (
                <div key={cat.slug} className="col-12 col-md-6 col-lg-12">
                  <CategoryCard cat={cat} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Source line */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: '#6b7690',
            textAlign: 'center',
            marginTop: '40px',
          }}
        >
          We source from reputable, vetted distributors and national supply partners, so every
          product meets the standards your patients expect.
        </p>
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: (typeof CATEGORIES)[0] }) {
  return (
    <Link
      href={`/shop/${cat.slug}`}
      className="d-flex flex-column sn-card text-decoration-none h-100"
      style={{ overflow: 'hidden', minHeight: '200px' }}
    >
      {/* Image */}
      <div style={{ height: '140px', position: 'relative', overflow: 'hidden', background: '#f7f9fa' }}>
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
        />
      </div>
      {/* Content */}
      <div className="p-4 flex-grow-1 d-flex flex-column">
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '11px',
            color: '#2a6fd0',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: '6px',
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
            marginBottom: '8px',
          }}
        >
          {cat.name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: '#6b7690',
            lineHeight: 1.55,
            marginBottom: '16px',
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
