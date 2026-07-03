/* ============================================================================
   Sunnova Medical Supplies — Admin Dashboard mock data
   Replace these exports with `adminApi` calls when the backend is ready; the
   component tree consumes only the typed shapes below.
   ========================================================================== */

export type MetricAccent = 'blue' | 'orange' | 'green';
export type TrendDirection = 'up' | 'warn' | 'neutral';

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trendLabel: string;
  trendDirection: TrendDirection;
  /** lucide icon name, resolved in the component */
  icon: 'sales' | 'orders' | 'quotes' | 'lowstock' | 'applications' | 'delivery';
  accent: MetricAccent;
  spark: number[];
}

export interface SalesChartPoint {
  label: string;
  value: number;
}

export interface OrderStatusDatum {
  label: string;
  value: number;
  percent: number;
  color: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Out for Delivery' | 'Delivered';
export type DeliveryMethod = 'Local Delivery' | 'Pickup';

export interface RecentOrder {
  id: string;
  customer: string;
  status: OrderStatus;
  total: number;
  delivery: DeliveryMethod;
  date: string;
}

export type QuoteStatus = 'New' | 'In Review' | 'Quoted';

export interface QuoteRequest {
  id: string;
  business: string;
  itemCount: number;
  status: QuoteStatus;
}

export interface LowStockProduct {
  id: string;
  name: string;
  sku: string;
  stockLabel: string;
}

export interface TopSellingProduct {
  id: string;
  rank: number;
  name: string;
  revenue: number;
}

export interface DeliverySnapshotData {
  outForDelivery: number;
  deliveredToday: number;
  onTimeRate: string;
}

/* ─── Metric cards ───────────────────────────────────────────────────────── */
export const metrics: DashboardMetric[] = [
  {
    id: 'sales',
    label: 'Total Sales',
    value: '$128,540.00',
    trendLabel: '18.6% vs last 30 days',
    trendDirection: 'up',
    icon: 'sales',
    accent: 'blue',
    spark: [12, 18, 15, 22, 20, 28, 25, 32, 30, 38],
  },
  {
    id: 'pending-orders',
    label: 'Pending Orders',
    value: '48',
    trendLabel: '12 vs yesterday',
    trendDirection: 'up',
    icon: 'orders',
    accent: 'orange',
    spark: [20, 24, 22, 30, 26, 34, 31, 40, 44, 48],
  },
  {
    id: 'new-quotes',
    label: 'New Quotes',
    value: '23',
    trendLabel: '5 vs yesterday',
    trendDirection: 'up',
    icon: 'quotes',
    accent: 'blue',
    spark: [8, 10, 9, 14, 12, 16, 15, 18, 20, 23],
  },
  {
    id: 'low-stock',
    label: 'Low Stock Items',
    value: '15',
    trendLabel: '3 critical',
    trendDirection: 'warn',
    icon: 'lowstock',
    accent: 'orange',
    spark: [22, 20, 21, 18, 19, 17, 16, 15, 16, 15],
  },
  {
    id: 'applications',
    label: 'Account Applications',
    value: '12',
    trendLabel: 'Pending review',
    trendDirection: 'neutral',
    icon: 'applications',
    accent: 'blue',
    spark: [4, 6, 5, 8, 7, 9, 10, 9, 11, 12],
  },
  {
    id: 'out-for-delivery',
    label: 'Out for Delivery',
    value: '27',
    trendLabel: 'On the way',
    trendDirection: 'up',
    icon: 'delivery',
    accent: 'green',
    spark: [10, 14, 12, 18, 16, 20, 22, 24, 26, 27],
  },
];

/* ─── Sales overview ─────────────────────────────────────────────────────── */
export const salesTotalRevenue = '$128,540.00';
export const salesTrendLabel = '18.6% vs previous 30 days';

export const salesChart: SalesChartPoint[] = [
  { label: 'May 5', value: 14200 },
  { label: 'May 10', value: 19800 },
  { label: 'May 15', value: 17600 },
  { label: 'May 20', value: 24100 },
  { label: 'May 25', value: 21500 },
  { label: 'May 28', value: 28450 },
  { label: 'May 30', value: 26200 },
  { label: 'Jun 3', value: 31900 },
];
/** Index of the point that shows the tooltip callout */
export const salesHighlightIndex = 5;

/* ─── Orders by status ───────────────────────────────────────────────────── */
export const orderStatusTotal = 48;
export const orderStatus: OrderStatusDatum[] = [
  { label: 'Pending', value: 8, percent: 16.7, color: '#edd76a' },
  { label: 'Processing', value: 14, percent: 29.2, color: '#004296' },
  { label: 'Out for Delivery', value: 27, percent: 56.3, color: '#e5550f' },
  { label: 'Delivered', value: 86, percent: 63.5, color: '#1a7f4b' },
];

/* ─── Recent orders ──────────────────────────────────────────────────────── */
export const recentOrders: RecentOrder[] = [
  { id: 'ORD-2506031', customer: 'Miami Health Center', status: 'Processing', total: 2450.0, delivery: 'Local Delivery', date: 'Jun 3, 2025' },
  { id: 'ORD-2506030', customer: 'Coral Gables Clinic', status: 'Out for Delivery', total: 1875.5, delivery: 'Local Delivery', date: 'Jun 3, 2025' },
  { id: 'ORD-2506029', customer: 'Sunrise Medical Group', status: 'Pending', total: 980.75, delivery: 'Pickup', date: 'Jun 2, 2025' },
  { id: 'ORD-2506028', customer: 'Doral Family Practice', status: 'Delivered', total: 3120.0, delivery: 'Local Delivery', date: 'Jun 2, 2025' },
  { id: 'ORD-2506027', customer: 'Baptist Health South', status: 'Delivered', total: 1560.25, delivery: 'Local Delivery', date: 'Jun 1, 2025' },
];

/* ─── Recent quote requests ──────────────────────────────────────────────── */
export const quoteRequests: QuoteRequest[] = [
  { id: 'q1', business: 'Aventura Medical Center', itemCount: 12, status: 'New' },
  { id: 'q2', business: 'Health & Wellness Clinic', itemCount: 8, status: 'In Review' },
  { id: 'q3', business: 'Precision Care Group', itemCount: 15, status: 'In Review' },
  { id: 'q4', business: 'Westchester Urgent Care', itemCount: 6, status: 'Quoted' },
  { id: 'q5', business: 'Elite Aesthetics Miami', itemCount: 9, status: 'Quoted' },
];

/* ─── Low stock alerts ───────────────────────────────────────────────────── */
export const lowStockProducts: LowStockProduct[] = [
  { id: 'ls1', name: 'Nitrile Exam Gloves (M)', sku: 'GLV-NIT-M', stockLabel: '32 boxes left' },
  { id: 'ls2', name: 'Sharps Containers 5QT', sku: 'SHP-5QT', stockLabel: '18 units left' },
  { id: 'ls3', name: 'Gauze Pads 4x4 (200ct)', sku: 'GZ-4X4-200', stockLabel: '22 packs left' },
  { id: 'ls4', name: 'Surface Disinfectant Wipes', sku: 'WPS-SURF-160', stockLabel: '28 canisters left' },
];

/* ─── Delivery snapshot ──────────────────────────────────────────────────── */
export const deliverySnapshot: DeliverySnapshotData = {
  outForDelivery: 27,
  deliveredToday: 14,
  onTimeRate: '98.3%',
};

/* ─── Top selling products ───────────────────────────────────────────────── */
export const topSellingProducts: TopSellingProduct[] = [
  { id: 'tp1', rank: 1, name: 'Nitrile Exam Gloves', revenue: 24560.0 },
  { id: 'tp2', rank: 2, name: 'Surgical Masks', revenue: 18320.0 },
  { id: 'tp3', rank: 3, name: 'Hand Sanitizer (1L)', revenue: 12840.0 },
  { id: 'tp4', rank: 4, name: 'Gauze Pads 4x4', revenue: 9675.0 },
];

/* ─── Formatting helpers ─────────────────────────────────────────────────── */
export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
