import Link from 'next/link';
import { Package } from 'lucide-react';
import { lowStockProducts } from '@/lib/admin/mock-dashboard-data';
import { DashboardCard } from './DashboardCard';

export function LowStockAlerts() {
  return (
    <DashboardCard title="Low Stock Alerts" action={{ label: 'View All Inventory', href: '/admin/inventory' }}>
      <ul className="sa-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {lowStockProducts.map((p) => (
          <li key={p.id} className="sa-list-row">
            <span className="sa-thumb" aria-hidden="true">
              <Package size={19} />
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="sa-list-name" style={{ display: 'block' }}>{p.name}</span>
              <span className="sa-list-meta" style={{ display: 'block' }}>
                SKU: {p.sku} · <span className="sa-stock-warn">{p.stockLabel}</span>
              </span>
            </span>
            <Link href={`/admin/inventory?restock=${p.sku}`} className="sa-restock-btn">
              Restock
            </Link>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
