'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import MobileNav from './MobileNav';
import { useCartStore, useCartHydrated } from '@/lib/cart-store';

const NAV_LINKS = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'Gloves and PPE', href: '/shop/gloves-ppe' },
      { label: 'Wound Care and First Aid', href: '/shop/wound-care' },
      { label: 'Syringes and Needles', href: '/shop/syringes-needles' },
      { label: 'Aesthetic and Skincare', href: '/shop/aesthetic-skincare' },
      { label: 'Exam Room Essentials', href: '/shop/exam-room-essentials' },
      { label: 'All Products', href: '/shop' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Order', href: '/request-quote' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const hydrated = useCartHydrated();
  const cartCount = hydrated ? items.reduce((n, i) => n + i.qty, 0) : 0;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          backgroundColor: '#ffffff',
          height: '84px',
          borderBottom: '1px solid #e8eff9',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 8px rgba(18,32,54,0.06)',
        }}
      >
        <div className="sn-container h-100">
          <div className="d-flex align-items-center h-100 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 me-2" aria-label="Sunnova Medical Supplies home">
              <Image
                src="/logo/logo-dark.svg"
                alt="Sunnova Medical Supplies"
                width={168}
                height={48}
                priority
                style={{ height: '44px', width: 'auto' }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="d-none d-xl-flex align-items-center gap-1 flex-grow-1" role="navigation" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="position-relative"
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                  >
                    <button
                      className="d-flex align-items-center gap-1 border-0 bg-transparent px-3 py-2"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: '#3a4660',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        transition: 'color 0.15s',
                      }}
                      aria-haspopup="true"
                      aria-expanded={shopOpen}
                    >
                      {link.label}
                      <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: shopOpen ? 'rotate(180deg)' : 'none' }} />
                    </button>
                    {shopOpen && (
                      <div
                        className="position-absolute start-0 top-100 bg-white rounded-3 py-2"
                        style={{
                          minWidth: '220px',
                          boxShadow: '0 8px 32px rgba(18,32,54,0.14)',
                          border: '1px solid #e8eff9',
                          zIndex: 200,
                        }}
                        role="menu"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="d-block px-4 py-2 text-decoration-none"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              color: '#3a4660',
                              transition: 'background 0.1s, color 0.1s',
                            }}
                            role="menuitem"
                            onMouseEnter={(e) => {
                              (e.target as HTMLElement).style.background = '#f7f9fa';
                              (e.target as HTMLElement).style.color = '#1a4fa0';
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLElement).style.background = '';
                              (e.target as HTMLElement).style.color = '#3a4660';
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-decoration-none"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '15px',
                      color: '#3a4660',
                      borderRadius: '6px',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#1a4fa0')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#3a4660')}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right: Search + Icons + CTA */}
            <div className="d-flex align-items-center gap-2 ms-auto">
              {/* Search */}
              <div className="d-none d-lg-flex align-items-center position-relative">
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    color: '#a0aab4',
                    pointerEvents: 'none',
                  }}
                />
                <input
                  type="search"
                  placeholder="Search supplies..."
                  className="sn-input"
                  style={{
                    paddingLeft: '36px',
                    width: '220px',
                    height: '40px',
                    fontSize: '14px',
                    borderRadius: '8px',
                  }}
                  aria-label="Search products"
                />
              </div>

              {/* Account */}
              <Link
                href="/account"
                className="d-none d-lg-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  color: '#3a4660',
                  transition: 'background 0.15s',
                }}
                aria-label="My account"
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#f7f9fa')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '')}
              >
                <User size={20} strokeWidth={1.8} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="d-flex align-items-center justify-content-center position-relative"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  color: '#3a4660',
                  transition: 'background 0.15s',
                }}
                aria-label={`Shopping cart, ${cartCount} items`}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#f7f9fa')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '')}
              >
                <ShoppingCart size={20} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 end-0 d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ee6a12 0%, #f9b23e 100%)',
                      fontSize: '10px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Request a Quote CTA */}
              <Link href="/request-quote" className="sn-btn-quote-nav d-none d-lg-inline-flex ms-1">
                Request a Quote
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="d-flex d-xl-none align-items-center justify-content-center border-0 bg-transparent ms-1"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  color: '#3a4660',
                  cursor: 'pointer',
                }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        cartCount={cartCount}
      />
    </>
  );
}
