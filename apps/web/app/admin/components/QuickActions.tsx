import { Box, Tag, MessageSquare, CloudUpload } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { QuickActionCard, type QuickAction } from './QuickActionCard';

const ACTIONS: QuickAction[] = [
  { label: 'Add Product', help: 'Add new product to store', href: '/admin/products', icon: Box, tone: 'blue' },
  { label: 'Create Coupon', help: 'Create discount coupon', href: '/admin/coupons', icon: Tag, tone: 'orange' },
  { label: 'View Quotes', help: 'Review quote requests', href: '/admin/quotes', icon: MessageSquare, tone: 'blue' },
  { label: 'Upload Images', help: 'Upload product images', href: '/admin/uploads', icon: CloudUpload, tone: 'orange' },
];

export function QuickActions() {
  return (
    <DashboardCard title="Quick Actions">
      <div>
        {ACTIONS.map((a) => (
          <QuickActionCard key={a.label} action={a} />
        ))}
      </div>
    </DashboardCard>
  );
}
