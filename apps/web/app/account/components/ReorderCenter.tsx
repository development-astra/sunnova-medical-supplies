import { frequentlyOrdered } from '@/lib/account/mock-customer-dashboard-data';
import { DashboardCard } from './DashboardCard';
import { FrequentlyOrderedProductCard } from './FrequentlyOrderedProductCard';

export function ReorderCenter() {
  return (
    <DashboardCard title="Reorder Center" action={{ label: 'View All Products', href: '/shop' }}>
      <p style={{ fontFamily: 'var(--pf-body)', fontSize: 12.5, color: 'var(--color-text-muted)', margin: '-6px 0 14px' }}>
        Frequently ordered by your practice
      </p>
      <div className="pf-product-scroll">
        {frequentlyOrdered.map((p) => (
          <FrequentlyOrderedProductCard key={p.id} product={p} />
        ))}
      </div>
    </DashboardCard>
  );
}
