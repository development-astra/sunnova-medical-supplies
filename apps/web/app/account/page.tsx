import type { Metadata } from 'next';
import { metrics } from '@/lib/account/mock-customer-dashboard-data';
import { CustomerMetricCard } from './components/CustomerMetricCard';
import { RecentOrdersTable } from './components/RecentOrdersTable';
import { QuickActions } from './components/QuickActions';
import { QuoteRequestsPanel } from './components/QuoteRequestsPanel';
import { DeliveryTrackingCard } from './components/DeliveryTrackingCard';
import { ReorderCenter } from './components/ReorderCenter';
import { SavedListsPanel } from './components/SavedListsPanel';
import { InvoicesPaymentsCard } from './components/InvoicesPaymentsCard';
import { BusinessAccountCard } from './components/BusinessAccountCard';

export const metadata: Metadata = { title: 'Customer Dashboard' };

export default function CustomerDashboardPage() {
  return (
    <div>
      {/* Summary cards */}
      <div className="pf-metric-grid">
        {metrics.map((m) => (
          <CustomerMetricCard key={m.id} metric={m} />
        ))}
      </div>

      {/* Recent orders + quick actions */}
      <div className="pf-grid pf-grid-2a pf-row">
        <RecentOrdersTable />
        <QuickActions />
      </div>

      {/* Delivery tracking + quote requests */}
      <div className="pf-grid pf-grid-2a pf-row">
        <DeliveryTrackingCard />
        <QuoteRequestsPanel />
      </div>

      {/* Reorder center */}
      <div className="pf-row">
        <ReorderCenter />
      </div>

      {/* Saved lists + business account */}
      <div className="pf-grid pf-grid-2b pf-row">
        <SavedListsPanel />
        <BusinessAccountCard />
      </div>

      {/* Invoices & payments */}
      <div className="pf-row">
        <InvoicesPaymentsCard />
      </div>
    </div>
  );
}
