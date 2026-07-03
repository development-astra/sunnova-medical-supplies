'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Lock, ShoppingBag } from 'lucide-react';
import { useCartStore, useCartHydrated, cartCount, cartSubtotal, formatPrice } from '@/lib/cart-store';

const TAX_RATE = 0.07; // Miami-Dade sales tax

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  border: '1px solid #e8eff9',
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  color: '#122036',
  outline: 'none',
};
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  fontWeight: 600,
  color: '#3a4660',
  marginBottom: '6px',
};

export default function CheckoutView() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const hydrated = useCartHydrated();

  const [placing, setPlacing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setPlacing(true);
    // Mock order placement — Stripe/checkout API wires in here later.
    const num = `SO-${String(Date.now()).slice(-8)}`;
    setTimeout(() => {
      clear();
      setOrderNumber(num);
      setPlacing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  }

  if (!hydrated) {
    return <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>Loading checkout…</p>;
  }

  // ─── Confirmation ─────────────────────────────────────────────────────────
  if (orderNumber) {
    return (
      <div style={{ background: '#fff', borderRadius: '20px', padding: '48px 32px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#eafaf0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <CheckCircle2 size={34} color="#0f993e" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '24px', color: '#122036', marginBottom: '8px' }}>Order placed!</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690', marginBottom: '4px' }}>
          Thank you — your order <strong style={{ color: '#1a4fa0' }}>{orderNumber}</strong> has been received.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', marginBottom: '28px' }}>
          We&apos;ll email your confirmation and schedule same-week local delivery across Miami-Dade.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Link href="/account/orders" className="d-inline-flex align-items-center gap-2" style={{ padding: '13px 24px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}>
            View My Orders <ArrowRight size={16} />
          </Link>
          <Link href="/shop" className="d-inline-flex align-items-center gap-2" style={{ padding: '13px 24px', background: '#f7f9fa', borderRadius: '999px', color: '#1a4fa0', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none', border: '1px solid #e8eff9' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ─── Empty cart ───────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div style={{ background: '#fff', borderRadius: '20px', padding: '48px 24px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f7f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
          <ShoppingBag size={26} color="#a0aab4" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: '#122036', marginBottom: '8px' }}>Your cart is empty</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690', marginBottom: '24px' }}>Add products before checking out.</p>
        <Link href="/shop" className="d-inline-flex align-items-center gap-2" style={{ padding: '13px 24px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}>
          Browse Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const count = cartCount(items);
  const subtotal = cartSubtotal(items);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax; // free local delivery

  return (
    <form onSubmit={handlePlaceOrder}>
      <div className="row g-5">
        {/* Delivery + contact */}
        <div className="col-12 col-lg-7">
          <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '18px', color: '#122036', marginBottom: '20px' }}>Delivery details</h2>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label style={labelStyle} htmlFor="co-name">Full name</label>
                <input id="co-name" style={inputStyle} required autoComplete="name" placeholder="Dr. Amanda Lee" />
              </div>
              <div className="col-12 col-md-6">
                <label style={labelStyle} htmlFor="co-business">Business / practice</label>
                <input id="co-business" style={inputStyle} autoComplete="organization" placeholder="Wellness Med Spa" />
              </div>
              <div className="col-12 col-md-6">
                <label style={labelStyle} htmlFor="co-email">Email</label>
                <input id="co-email" type="email" style={inputStyle} required autoComplete="email" placeholder="you@clinic.com" />
              </div>
              <div className="col-12 col-md-6">
                <label style={labelStyle} htmlFor="co-phone">Phone</label>
                <input id="co-phone" type="tel" style={inputStyle} required autoComplete="tel" placeholder="(786) 555-0123" />
              </div>
              <div className="col-12">
                <label style={labelStyle} htmlFor="co-addr">Delivery address</label>
                <input id="co-addr" style={inputStyle} required autoComplete="address-line1" placeholder="1234 Coral Way, Suite 200" />
              </div>
              <div className="col-12 col-md-5">
                <label style={labelStyle} htmlFor="co-city">City</label>
                <input id="co-city" style={inputStyle} required autoComplete="address-level2" placeholder="Miami" />
              </div>
              <div className="col-6 col-md-3">
                <label style={labelStyle} htmlFor="co-state">State</label>
                <input id="co-state" style={inputStyle} required defaultValue="FL" autoComplete="address-level1" />
              </div>
              <div className="col-6 col-md-4">
                <label style={labelStyle} htmlFor="co-zip">ZIP</label>
                <input id="co-zip" style={inputStyle} required autoComplete="postal-code" placeholder="33145" />
              </div>
              <div className="col-12">
                <label style={labelStyle} htmlFor="co-notes">Delivery notes (optional)</label>
                <textarea id="co-notes" rows={2} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Suite entrance, front desk, preferred time…" />
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '18px', color: '#122036', margin: '28px 0 16px' }}>Payment</h2>
            <div style={{ background: '#f7f9fa', border: '1px solid #e8eff9', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={16} color="#0f993e" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660' }}>
                Verified business accounts are billed <strong>Net 30</strong>. A card option is added at launch.
              </span>
            </div>
          </div>
          <Link href="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1a4fa0', textDecoration: 'none' }}>
            ← Back to cart
          </Link>
        </div>

        {/* Order summary */}
        <div className="col-12 col-lg-5">
          <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)', position: 'sticky', top: '108px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', color: '#122036', marginBottom: '18px' }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
              {items.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-start gap-2">
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660' }}>
                    {item.name} <span style={{ color: '#a0aab4' }}>× {item.qty}</span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600, color: '#122036', whiteSpace: 'nowrap' }}>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #e8eff9', margin: '0 0 16px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div className="d-flex justify-content-between">
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#3a4660' }}>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>Local delivery</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#0f993e', fontWeight: 600 }}>Free</span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>Tax (7%)</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#3a4660' }}>{formatPrice(tax)}</span>
              </div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #e8eff9', margin: '0 0 16px' }} />
            <div className="d-flex justify-content-between mb-4">
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: '#122036' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '22px', color: '#122036' }}>{formatPrice(total)}</span>
            </div>

            <button type="submit" disabled={placing} className="d-flex align-items-center justify-content-center gap-2 w-100" style={{ padding: '15px', background: placing ? '#f0a877' : 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', cursor: placing ? 'default' : 'pointer', gap: '8px' }}>
              {placing ? 'Placing Order…' : <>Place Order <ArrowRight size={18} /></>}
            </button>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#a0aab4', textAlign: 'center', margin: '12px 0 0' }}>
              Same-week local delivery across Miami-Dade
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
