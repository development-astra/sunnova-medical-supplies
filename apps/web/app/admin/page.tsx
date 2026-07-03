import type { Metadata } from 'next';
import { PieChart } from 'lucide-react';
import { metrics } from '@/lib/admin/mock-dashboard-data';
import { MetricCard } from './components/MetricCard';
import { DashboardCard } from './components/DashboardCard';
import { SalesOverviewChart } from './components/SalesOverviewChart';
import { OrdersStatusChart } from './components/OrdersStatusChart';
import { QuickActions } from './components/QuickActions';
import { RecentOrdersTable } from './components/RecentOrdersTable';
import { RecentQuoteRequests } from './components/RecentQuoteRequests';
import { LowStockAlerts } from './components/LowStockAlerts';
import { TopSellingProducts } from './components/TopSellingProducts';
import { DeliverySnapshot } from './components/DeliverySnapshot';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default function AdminDashboardPage() {
  return (
    <div>
      {/* Top metric cards */}
      <div className="sa-metric-grid">
        {metrics.map((m) => (
          <MetricCard key={m.id} metric={m} />
        ))}
      </div>

      {/* Sales overview + orders by status + quick actions */}
      <div className="sa-grid sa-grid-3 sa-row">
        <DashboardCard title="Sales Overview">
          <SalesOverviewChart />
        </DashboardCard>
        <DashboardCard title="Orders by Status" titleIcon={<PieChart size={17} color="var(--color-primary)" />}>
          <OrdersStatusChart />
        </DashboardCard>
        <QuickActions />
      </div>

      {/* Recent orders + quote requests */}
      <div className="sa-grid sa-grid-2 sa-row">
        <RecentOrdersTable />
        <RecentQuoteRequests />
      </div>

      {/* Low stock + top selling */}
      <div className="sa-grid sa-grid-2 sa-row">
        <LowStockAlerts />
        <TopSellingProducts />
      </div>

      {/* Local delivery snapshot */}
      <div className="sa-row">
        <DeliverySnapshot />
      </div>
    </div>
  );
}
