import { Package } from 'lucide-react';
import { topSellingProducts, formatCurrency } from '@/lib/admin/mock-dashboard-data';
import { DashboardCard } from './DashboardCard';

export function TopSellingProducts() {
  return (
    <DashboardCard title="Top Selling Products" action={{ label: 'View Full Report', href: '/admin/reports' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 14,
        }}
      >
        {topSellingProducts.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'relative',
              border: '1px solid var(--color-border)',
              borderRadius: 14,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <span className="sa-rank">{p.rank}</span>
            <span
              className="sa-thumb"
              style={{ width: 52, height: 52, borderRadius: 12 }}
              aria-hidden="true"
            >
              <Package size={24} />
            </span>
            <div>
              <p className="sa-list-name" style={{ fontSize: 13.5, marginBottom: 4 }}>{p.name}</p>
              <p className="sa-td-money" style={{ fontSize: 15 }}>{formatCurrency(p.revenue)}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
