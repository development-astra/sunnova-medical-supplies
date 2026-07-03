import { quoteRequests, formatCurrency } from '@/lib/account/mock-customer-dashboard-data';
import { DashboardCard } from './DashboardCard';
import { StatusBadge } from './StatusBadge';

export function QuoteRequestsPanel() {
  return (
    <DashboardCard title="Quote Requests" action={{ label: 'View All Quotes', href: '/account/quotes' }} padded={false}>
      <div className="pf-table-wrap" style={{ padding: '10px 10px 6px' }}>
        <table className="pf-table" style={{ minWidth: 360 }}>
          <thead>
            <tr>
              <th scope="col">Quote #</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col" style={{ textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {quoteRequests.map((q) => (
              <tr key={q.id}>
                <td className="pf-td-strong">{q.id}</td>
                <td style={{ color: 'var(--color-text-muted)' }}>{q.date}</td>
                <td><StatusBadge status={q.status} /></td>
                <td className="pf-td-money" style={{ textAlign: 'right' }}>{formatCurrency(q.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
