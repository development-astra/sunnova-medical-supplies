import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer className="sn-footer" aria-label="Site footer">
      {/* Main footer */}
      <div className="sn-container" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
        <div className="row gy-5">
          {/* Brand column */}
          <div className="col-12 col-lg-3">
            <Link href="/" aria-label="Sunnova Medical Supplies home">
              <Image
                src="/logo/logo-white.svg"
                alt="Sunnova Medical Supplies"
                width={160}
                height={46}
                style={{ height: '42px', width: 'auto', marginBottom: '16px' }}
              />
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              Miami-Dade&apos;s local choice for professional medical and aesthetic supplies.{' '}
              <span style={{ color: '#f9b23e' }}>Fast delivery.</span>{' '}
              <span style={{ color: '#f9b23e' }}>Competitive pricing.</span>{' '}
              <span style={{ color: '#f9b23e' }}>Real service.</span>
            </p>

            {/* Social */}
            <div className="d-flex gap-2">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.2)';
                    el.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.1)';
                    el.style.color = 'rgba(255,255,255,0.8)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop column */}
          <div className="col-6 col-lg-2">
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '15px',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Shop
            </h3>
            <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="col-6 col-lg-2">
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '15px',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Company
            </h3>
            <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ordering & Support column */}
          <div className="col-6 col-lg-2">
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '15px',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Ordering and Support
            </h3>
            <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch column */}
          <div className="col-6 col-lg-3">
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '15px',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Get in Touch
            </h3>
            <ul className="list-unstyled mb-0" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a
                  href="tel:+17866433036"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}
                >
                  <Phone size={14} style={{ color: '#f9b23e', flexShrink: 0 }} />
                  (786) 643-3036
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@sunnovamedical.com"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}
                >
                  <Mail size={14} style={{ color: '#f9b23e', flexShrink: 0 }} />
                  hello@sunnovamedical.com
                </a>
              </li>
              <li className="d-flex align-items-start gap-2">
                <MapPin size={14} style={{ color: '#f9b23e', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  Serving Miami-Dade County, FL
                </span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Clock size={14} style={{ color: '#f9b23e', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  Mon–Fri, 8:00am–6:00pm
                </span>
              </li>
            </ul>

            {/* Email signup */}
            <div style={{ marginTop: '24px' }}>
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
                  aria-label="Email address for newsletter"
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '9px 16px',
                    background: 'linear-gradient(90deg, #ee6a12, #f9b23e)',
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

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '20px 0',
        }}
      >
        <div className="sn-container">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
              © 2026 Sunnova Medical Supplies
            </span>
            <div className="d-flex flex-wrap gap-3">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Accessibility', href: '/accessibility' },
                { label: 'Sitemap', href: '/sitemap.xml' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
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
