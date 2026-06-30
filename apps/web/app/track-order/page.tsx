import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Track Your Order | Sunnova Medical Supplies',
};

export default function TrackOrderPage() {
  return (
    <SiteLayout>
      <section className="sn-section sn-bg-light">
        <div className="sn-container">
          <div style={{ maxWidth: '520px', marginInline: 'auto', textAlign: 'center' }}>
            <div className="sn-badge sn-badge-orange mb-4 d-inline-flex" style={{ marginInline: 'auto' }}>Track Order</div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px,3vw,40px)', color: '#122036', marginBottom: '12px' }}>
              Track Your Order
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6b7690', marginBottom: '40px' }}>
              Enter your order number and email to get the latest delivery status.
            </p>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '36px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)', textAlign: 'left' }}>
              <form action="#">
                <div className="mb-3">
                  <label className="sn-label" htmlFor="to-order">Order Number *</label>
                  <input id="to-order" type="text" className="sn-input" placeholder="e.g. SN-2026-0001" required />
                </div>
                <div className="mb-4">
                  <label className="sn-label" htmlFor="to-email">Email or Phone *</label>
                  <input id="to-email" type="text" className="sn-input" placeholder="Email or phone used at checkout" required />
                </div>
                <button type="submit" className="w-100 d-flex align-items-center justify-content-center gap-2" style={{ padding: '14px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                  <Search size={18} /> Track Order
                </button>
              </form>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', marginTop: '24px' }}>
              Need help? <a href="tel:+13055196804" style={{ color: '#1a4fa0', fontWeight: 600 }}>(305) 519-6804</a> or <a href="mailto:orders@sunnovamedical.com" style={{ color: '#1a4fa0', fontWeight: 600 }}>orders@sunnovamedical.com</a>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
