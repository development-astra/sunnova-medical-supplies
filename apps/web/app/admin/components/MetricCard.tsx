import {
  DollarSign,
  ShoppingCart,
  FileText,
  AlertTriangle,
  UserPlus,
  Truck,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import type { DashboardMetric } from '@/lib/admin/mock-dashboard-data';
import { IconBadge } from './IconBadge';
import { Sparkline } from './Sparkline';

const ICONS: Record<DashboardMetric['icon'], LucideIcon> = {
  sales: DollarSign,
  orders: ShoppingCart,
  quotes: FileText,
  lowstock: AlertTriangle,
  applications: UserPlus,
  delivery: Truck,
};

const ACCENT_TONE: Record<DashboardMetric['accent'], 'blue' | 'orange' | 'green'> = {
  blue: 'blue',
  orange: 'orange',
  green: 'green',
};

const SPARK_COLOR: Record<DashboardMetric['accent'], string> = {
  blue: '#004296',
  orange: '#e5550f',
  green: '#1a7f4b',
};

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  const Icon = ICONS[metric.icon];
  return (
    <article className="sa-metric">
      <div className="sa-metric-top">
        <p className="sa-metric-label">{metric.label}</p>
        <IconBadge icon={Icon} tone={ACCENT_TONE[metric.accent]} size={40} iconSize={19} />
      </div>
      <p className="sa-metric-value">{metric.value}</p>
      <p className={`sa-metric-trend ${metric.trendDirection}`}>
        {metric.trendDirection !== 'neutral' && <ArrowUpRight size={14} />}
        {metric.trendLabel}
      </p>
      <div className="sa-metric-spark">
        <Sparkline data={metric.spark} color={SPARK_COLOR[metric.accent]} gradientId={metric.id} />
      </div>
    </article>
  );
}
