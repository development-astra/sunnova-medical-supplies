import Link from 'next/link';
import { RotateCcw, Truck, FilePlus2, ShoppingBag, Headset, ChevronRight, type LucideIcon } from 'lucide-react';
import type { QuickAction, QuickActionIcon } from '@/lib/account/mock-customer-dashboard-data';
import { IconBadge } from './IconBadge';

const ICONS: Record<QuickActionIcon, LucideIcon> = {
  reorder: RotateCcw,
  track: Truck,
  quote: FilePlus2,
  shop: ShoppingBag,
  support: Headset,
};

export function QuickActionCard({ action }: { action: QuickAction }) {
  const Icon = ICONS[action.icon];
  return (
    <Link href={action.href} className={`pf-qa ${action.tone}`}>
      <IconBadge icon={Icon} tone={action.tone} size={40} iconSize={18} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span className="pf-qa-label" style={{ display: 'block' }}>{action.label}</span>
        <span className="pf-qa-help" style={{ display: 'block' }}>{action.help}</span>
      </span>
      <ChevronRight size={17} color="var(--color-text-subtle)" aria-hidden="true" />
    </Link>
  );
}
