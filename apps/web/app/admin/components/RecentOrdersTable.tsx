import { Truck, Store } from 'lucide-react';
import { recentOrders, formatCurrency } from '@/lib/admin/mock-dashboard-data';
import { DashboardCard } from './DashboardCard';
import { StatusBadge } from './StatusBadge';

export function RecentOrdersTable() {
  return (
    <DashboardCard title="Recent Orders" action={{ label: 'View All Orders', href: '/admin/orders' }} padded={false}>
      <div className="sa-table-wrap" style={{ padding: '10px 10px 6px' }}>
        <table className="sa-table">
          <thead>
            <tr>
              <th scope="col">Order #</th>
              <th scope="col">Customer</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Delivery</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td className="sa-td-strong">{o.id}</td>
                <td>{o.customer}</td>
                <td><StatusBadge status={o.status} kind="order" /></td>
                <td className="sa-td-money">{formatCurrency(o.total)}</td>
                <td>
                  <span className="sa-delivery-tag">
                    {o.delivery === 'Local Delivery' ? (
                      <Truck size={15} color="var(--color-accent)" aria-hidden="true" />
                    ) : (
                      <Store size={15} color="var(--color-primary)" aria-hidden="true" />
                    )}
                    {o.delivery}
                  </span>
                </td>
                <td style={{ color: 'var(--color-text-muted)' }}>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
