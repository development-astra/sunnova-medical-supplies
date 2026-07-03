import type { Metadata } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import CheckoutView from './CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout | Sunnova Medical Supplies',
};

export default function CheckoutPage() {
  return (
    <SiteLayout>
      <section className="sn-section sn-bg-light">
        <div className="sn-container">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px,3vw,36px)', color: '#122036', marginBottom: '28px' }}>
            Checkout
          </h1>
          <CheckoutView />
        </div>
      </section>
    </SiteLayout>
  );
}
