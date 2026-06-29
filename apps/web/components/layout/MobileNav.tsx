'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Phone, ShoppingCart, ChevronRight } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  cartCount: number;
}

export default function MobileNav({ isOpen, onClose, navLinks, cartCount }: MobileNavProps) {
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      firstFocusRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(18,32,54,0.5)', zIndex: 149, backdropFilter: 'blur(2px)' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="position-fixed top-0 end-0 h-100 bg-white"
        style={{
          width: '100%',
          maxWidth: '420px',
          zIndex: 150,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          className="d-flex align-items-center justify-content-between p-4"
          style={{ borderBottom: '1px solid #e8eff9' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '18px',
              color: '#122036',
            }}
          >
            Menu
          </span>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            className="border-0 bg-transparent d-flex align-items-center justify-content-center"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#f7f9fa',
              cursor: 'pointer',
              color: '#3a4660',
            }}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-grow-1 p-3" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                onClick={onClose}
                className="d-flex align-items-center justify-content-between text-decoration-none py-3 px-3 rounded-3"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#122036',
                  borderBottom: '1px solid #f0f3f8',
                  transition: 'background 0.1s',
                }}
              >
                {link.label}
                <ChevronRight size={16} style={{ color: '#6b7690' }} />
              </Link>
              {link.children && (
                <div className="ps-3 pb-2">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className="d-block text-decoration-none py-2 px-3"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: '#3a4660',
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4" style={{ borderTop: '1px solid #e8eff9' }}>
          <Link
            href="/request-quote"
            onClick={onClose}
            className="sn-btn sn-btn-primary w-100 mb-3 d-flex justify-content-center"
          >
            Request a Quote
          </Link>
          <Link
            href="/cart"
            onClick={onClose}
            className="d-flex align-items-center gap-2 text-decoration-none justify-content-center py-2"
            style={{ fontFamily: 'var(--font-body)', color: '#3a4660', fontSize: '15px' }}
          >
            <ShoppingCart size={18} />
            View Cart
            {cartCount > 0 && (
              <span
                className="d-inline-flex align-items-center justify-content-center text-white"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ee6a12, #f9b23e)',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          <a
            href="tel:+17866433036"
            className="d-flex align-items-center gap-2 text-decoration-none justify-content-center py-2 mt-1"
            style={{ fontFamily: 'var(--font-body)', color: '#3a4660', fontSize: '15px' }}
          >
            <Phone size={16} />
            (786) 643-3036
          </a>
        </div>
      </div>
    </>
  );
}
