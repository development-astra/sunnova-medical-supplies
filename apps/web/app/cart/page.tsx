import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Your Cart | Sunnova Medical Supplies',
};

const CART_ITEMS = [
  { id: 1, name: 'Nitrile Exam Gloves', variant: 'Medium · Box of 200', price: 3700, qty: 2, sku: 'GLV-NIT-M-200' },
  { id: 2, name: 'Sterile Syringes 3mL', variant: 'Luer Lock · Pack of 100', price: 2400, qty: 1, sku: 'SYR-3ML-LL' },
  { id: 3, name: 'Gauze Sponges 4×4', variant: 'Sterile · Pack of 50', price: 975, qty: 1, sku: 'GZS-4X4-ST' },
];

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function CartPage() {
  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <SiteLayout>
      <section className="sn-section sn-bg-light">
        <div className="sn-container">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px,3vw,36px)', color: '#122036', marginBottom: '8px' }}>
            Your Cart
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690', marginBottom: '36px' }}>
            {CART_ITEMS.length} items
          </p>

          <div className="row g-5">
            {/* Cart items */}
            <div className="col-12 col-lg-8">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {CART_ITEMS.map((item) => (
                  <div key={item.id} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}>
                    <div className="d-flex gap-4">
                      {/* Image placeholder */}
                      <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: '#f7f9fa', border: '1px solid #e8eff9', flexShrink: 0 }} aria-hidden="true" />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start gap-3">
                          <div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#122036', marginBottom: '4px' }}>{item.name}</h3>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', marginBottom: '2px' }}>{item.variant}</p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#a0aab4', margin: 0 }}>SKU: {item.sku}</p>
                          </div>
                          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17px', color: '#1a4fa0', margin: 0, whiteSpace: 'nowrap' }}>
                            {formatPrice(item.price * item.qty)}
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          {/* Qty controls */}
                          <div className="d-flex align-items-center gap-0" style={{ border: '1px solid #e8eff9', borderRadius: '8px', overflow: 'hidden' }}>
                            <button style={{ width: '36px', height: '36px', background: '#f7f9fa', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '17px', color: '#3a4660', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Decrease quantity">−</button>
                            <span style={{ width: '40px', textAlign: 'center', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px', color: '#122036' }}>{item.qty}</span>
                            <button style={{ width: '36px', height: '36px', background: '#f7f9fa', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '17px', color: '#3a4660', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Increase quantity">+</button>
                          </div>
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a0aab4', padding: '6px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-body)', fontSize: '13px', transition: 'color 0.15s' }} aria-label={`Remove ${item.name}`}>
                            <Trash2 size={15} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '24px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1a4fa0', textDecoration: 'none' }}>
                ← Continue shopping
              </Link>
            </div>

            {/* Order summary */}
            <div className="col-12 col-lg-4">
              <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)', position: 'sticky', top: '108px' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: '#122036', marginBottom: '20px' }}>Order Summary</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <div className="d-flex justify-content-between">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>Subtotal ({CART_ITEMS.length} items)</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#3a4660' }}>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>Delivery</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#0f993e', fontWeight: 600 }}>Calculated at checkout</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>Tax</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#3a4660' }}>Calculated at checkout</span>
                  </div>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #e8eff9', margin: '0 0 16px' }} />
                <div className="d-flex justify-content-between mb-4">
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: '#122036' }}>Estimated Total</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '22px', color: '#122036' }}>{formatPrice(subtotal)}</span>
                </div>
                <Link href="/checkout" className="d-flex align-items-center justify-content-center gap-2 w-100 mb-3" style={{ padding: '15px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', textDecoration: 'none', gap: '8px' }}>
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
                <Link href="/request-quote" className="d-flex align-items-center justify-content-center gap-2 w-100" style={{ padding: '13px', background: '#f7f9fa', borderRadius: '999px', color: '#1a4fa0', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none', border: '1px solid #e8eff9' }}>
                  <ShoppingBag size={16} /> Request a Quote Instead
                </Link>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#a0aab4', textAlign: 'center', marginTop: '12px', margin: '12px 0 0' }}>
                  Account pricing applied at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
