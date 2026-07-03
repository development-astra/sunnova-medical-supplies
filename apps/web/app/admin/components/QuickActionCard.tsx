import Link from 'next/link';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { IconBadge } from './IconBadge';

export interface QuickAction {
  label: string;
  help: string;
  href: string;
  icon: LucideIcon;
  tone: 'blue' | 'orange';
}

export function QuickActionCard({ action }: { action: QuickAction }) {
  return (
    <Link href={action.href} className={`sa-qa ${action.tone}`}>
      <IconBadge icon={action.icon} tone={action.tone} size={40} iconSize={18} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span className="sa-qa-label" style={{ display: 'block' }}>{action.label}</span>
        <span className="sa-qa-help" style={{ display: 'block' }}>{action.help}</span>
      </span>
      <ChevronRight size={17} color="var(--color-text-subtle)" aria-hidden="true" />
    </Link>
  );
}
