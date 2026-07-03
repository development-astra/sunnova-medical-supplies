import { quickActions } from '@/lib/account/mock-customer-dashboard-data';
import { DashboardCard } from './DashboardCard';
import { QuickActionCard } from './QuickActionCard';

export function QuickActions() {
  return (
    <DashboardCard title="Quick Actions">
      <div>
        {quickActions.map((a) => (
          <QuickActionCard key={a.id} action={a} />
        ))}
      </div>
    </DashboardCard>
  );
}
