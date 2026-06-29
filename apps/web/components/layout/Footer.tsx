'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const SHOP_LINKS = [
  { label: 'Gloves and PPE', href: '/shop/gloves-ppe' },
  { label: 'Wound Care and First Aid', href: '/shop/wound-care' },
  { label: 'Syringes and Needles', href: '/shop/syringes-needles' },
  { label: 'Aesthetic and Skincare Consumables', href: '/shop/aesthetic-skincare' },
  { label: 'Exam Room Essentials', href: '/shop/exam-room-essentials' },
  { label: 'All Products', href: '/shop' },
];

const COMPANY_LINKS = [
  { label: 'About Sunnova', href: '/about' },
  { label: 'Why Sunnova', href: '/why-sunnova' },
  { label: 'Service Area', href: '/service-area' },
  { label: 'Blog and Resources', href: '/blog' },
];

const SUPPORT_LINKS = [
  { label: 'How Ordering Works', href: '/how-it-works' },
  { label: 'Open an Account', href: '/open-account' },
  { label: 'Request a Quote', href: '/request-quote' },
  { label: 'Shipping and Delivery', href: '/shipping-delivery' },
  { label: 'Returns and Exchanges', href: '/returns' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Sitemap', href: '/sitemap.xml' },
];

const SOCIAL_LINKS = [
  { Icon: InstagramIcon, href: '#', label: 'Instagram' },
  { Icon: FacebookIcon, href: '#', label: 'Facebook' },
  { Icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
];

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 600,
  fontSize: '15px',
  color: '#ffffff',
  letterSpacing: '0.01em',
  marginBottom: '20px',
};

const LINK_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
};

export default function Footer() {
  return (
    <footer className="sn-footer" aria-label="Site footer" style={{ background: '#122036' }}>

      {/* ── Brand band ── */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '56px 24px 44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Link href="/" aria-label="Sunnova Medical Supplies home">
          <Image
            src="/logo/logo-white.svg"
            alt="Sunnova Medical Supplies"
            width={210}
            height={60}
            style={{ height: '54px', width: 'auto', marginBottom: '20px' }}
          />
        </Link>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: '17px',
            lineHeight: '28.05px',
            letterSpacing: 0,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.8)',
            margin: 0,
          }}
        >
          Miami-Dade&apos;s local choice for professional medical and aesthetic supplies.{' '}
          <span style={{ color: '#f4811e', fontWeight: 600 }}>Fast delivery. Competitive pricing. Real service.</span>
        </p>
      </div>

      {/* ── Main columns ── */}
      <div className="sn-container" style={{ paddingTop: '64px', paddingBottom: '56px' }}>
        <div className="row gy-5">

          {/* Shop */}
          <div className="col-6 col-lg-3">
            <h3 style={HEADING_STYLE}>Shop</h3>
            <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={LINK_STYLE}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-6 col-lg-3">
            <h3 style={HEADING_STYLE}>Company</h3>
            <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={LINK_STYLE}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ordering and Support */}
          <div className="col-6 col-lg-3">
            <h3 style={HEADING_STYLE}>Ordering and Support</h3>
            <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={LINK_STYLE}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="col-12 col-lg-3">
            <h3 style={HEADING_STYLE}>Get in Touch</h3>
            <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <a
                  href="tel:+17866433036"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}
                >
                  <Phone size={15} style={{ color: '#f9b23e', flexShrink: 0 }} />
                  (786) 643-3036
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@sunnovamedical.com"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}
                >
                  <Mail size={15} style={{ color: '#f9b23e', flexShrink: 0 }} />
                  hello@sunnovamedical.com
                </a>
              </li>
              <li className="d-flex align-items-start gap-2">
                <MapPin size={15} style={{ color: '#f9b23e', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  Serving Miami-Dade County, FL
                </span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Clock size={15} style={{ color: '#f9b23e', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  Mon–Fri, 8:00am–6:00pm
                </span>
              </li>
            </ul>

            {/* Social icons — square rounded cards as per design */}
            <div className="d-flex gap-2" style={{ marginTop: '28px' }}>
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'background 0.2s, color 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.18)';
                    el.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.08)';
                    el.style.color = 'rgba(255,255,255,0.8)';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: '28px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '10px',
                }}
              >
                Get restock alerts and account pricing
              </p>
              <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="you@clinic.com"
                  aria-label="Email for restock alerts"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.16)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '10px 16px',
                    background: '#f4811e',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 0' }}>
        <div className="sn-container">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
              © 2026 Sunnova Medical Supplies
            </span>
            <div className="d-flex flex-wrap gap-3">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
