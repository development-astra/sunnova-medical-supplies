import { Building2 } from 'lucide-react';
import { quoteRequests } from '@/lib/admin/mock-dashboard-data';
import { DashboardCard } from './DashboardCard';
import { StatusBadge } from './StatusBadge';

export function RecentQuoteRequests() {
  return (
    <DashboardCard title="Recent Quote Requests" action={{ label: 'View All Quotes', href: '/admin/quotes' }}>
      <ul className="sa-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {quoteRequests.map((q) => (
          <li key={q.id} className="sa-list-row">
            <span className="sa-thumb" aria-hidden="true">
              <Building2 size={19} />
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="sa-list-name" style={{ display: 'block' }}>{q.business}</span>
              <span className="sa-list-meta" style={{ display: 'block' }}>Requested {q.itemCount} items</span>
            </span>
            <StatusBadge status={q.status} kind="quote" />
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
