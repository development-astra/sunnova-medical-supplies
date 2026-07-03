import type { Metadata } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import CartView from './CartView';

export const metadata: Metadata = {
  title: 'Your Cart | Sunnova Medical Supplies',
};

export default function CartPage() {
  return (
    <SiteLayout>
      <section className="sn-section sn-bg-light">
        <div className="sn-container">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px,3vw,36px)', color: '#122036', marginBottom: '8px' }}>
            Your Cart
          </h1>
          <CartView />
        </div>
      </section>
    </SiteLayout>
  );
}
