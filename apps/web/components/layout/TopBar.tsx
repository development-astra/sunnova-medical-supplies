import Link from 'next/link';
import { Phone, Truck } from 'lucide-react';

export default function TopBar() {
  return (
    <div
      style={{ backgroundColor: '#163f80', height: '40px' }}
      className="d-none d-md-flex align-items-center"
      role="banner"
    >
      <div className="sn-container w-100">
        <div className="d-flex align-items-center justify-content-between">
          {/* Left: phone + delivery */}
          <div className="d-flex align-items-center gap-3">
            <a
              href="tel:+17866433036"
              className="d-flex align-items-center gap-1 text-white text-decoration-none"
              style={{ fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              <Phone size={12} strokeWidth={2.5} />
              (786) 643-3036
            </a>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>|</span>
            <span
              className="d-flex align-items-center gap-1 text-white"
              style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}
            >
              <Truck size={12} strokeWidth={2} style={{ opacity: 0.85 }} />
              Local delivery across Miami-Dade
            </span>
          </div>

          {/* Right: Track Order + Sign In */}
          <div className="d-flex align-items-center gap-3">
            <Link
              href="/track-order"
              className="text-white text-decoration-none"
              style={{ fontSize: '13px', fontFamily: 'var(--font-body)', opacity: 0.9 }}
            >
              Track Order
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>|</span>
            <Link
              href="/sign-in"
              className="text-white text-decoration-none"
              style={{ fontSize: '13px', fontFamily: 'var(--font-body)', opacity: 0.9 }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
