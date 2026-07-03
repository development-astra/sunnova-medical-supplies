import Link from 'next/link';
import {
  Package, FileText, Truck, ListChecks, Heart, ShieldCheck, ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import type { CustomerMetric, MetricIcon, MetricAccent } from '@/lib/account/mock-customer-dashboard-data';
import { IconBadge } from './IconBadge';

const ICONS: Record<MetricIcon, LucideIcon> = {
  orders: Package,
  quotes: FileText,
  delivered: Truck,
  lists: ListChecks,
  favorites: Heart,
  business: ShieldCheck,
};

const ACCENT_TONE: Record<MetricAccent, 'blue' | 'orange' | 'green' | 'gold'> = {
  blue: 'blue',
  orange: 'orange',
  green: 'green',
  gold: 'gold',
};

export function CustomerMetricCard({ metric }: { metric: CustomerMetric }) {
  const Icon = ICONS[metric.icon];
  const tone = metric.descriptorTone ?? 'muted';
  return (
    <Link href={metric.href} className="pf-metric" style={{ textDecoration: 'none' }}>
      <div className="pf-metric-top">
        <p className="pf-metric-label">{metric.label}</p>
        <IconBadge icon={Icon} tone={ACCENT_TONE[metric.accent]} size={40} iconSize={19} />
      </div>
      <p className="pf-metric-value">{metric.value}</p>
      <p className={`pf-metric-desc ${tone === 'muted' ? '' : tone}`.trim()}>
        {tone === 'up' && <ArrowUpRight size={13} />}
        {metric.descriptor}
      </p>
    </Link>
  );
}
