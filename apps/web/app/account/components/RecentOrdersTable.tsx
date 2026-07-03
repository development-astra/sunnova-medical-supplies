import Link from 'next/link';
import { Eye, MapPin, RotateCcw } from 'lucide-react';
import { recentOrders, formatCurrency } from '@/lib/account/mock-customer-dashboard-data';
import { DashboardCard } from './DashboardCard';
import { StatusBadge } from './StatusBadge';

export function RecentOrdersTable() {
  return (
    <DashboardCard title="Recent Orders" action={{ label: 'View All Orders', href: '/account/orders' }} padded={false}>
      <div className="pf-table-wrap" style={{ padding: '10px 10px 6px' }}>
        <table className="pf-table">
          <thead>
            <tr>
              <th scope="col">Order #</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Delivery</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td className="pf-td-strong">{o.id}</td>
                <td style={{ color: 'var(--color-text-muted)' }}>{o.date}</td>
                <td><StatusBadge status={o.status} /></td>
                <td className="pf-td-money">{formatCurrency(o.total)}</td>
                <td>
                  <span className="pf-delivery-tag">
                    <MapPin size={14} color="var(--color-accent)" aria-hidden="true" />
                    {o.delivery}
                  </span>
                </td>
                <td>
                  <span style={{ display: 'inline-flex', gap: 6 }}>
                    <Link href={`/account/orders/${o.id}`} className="pf-actionbtn" aria-label={`View order ${o.id}`}>
                      <Eye size={15} />
                    </Link>
                    {o.canTrack && (
                      <Link href={`/account/track?order=${o.id}`} className="pf-actionbtn" aria-label={`Track order ${o.id}`}>
                        <MapPin size={15} />
                      </Link>
                    )}
                    <Link href={`/account/reorder?order=${o.id}`} className="pf-actionbtn" aria-label={`Reorder from order ${o.id}`}>
                      <RotateCcw size={15} />
                    </Link>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
