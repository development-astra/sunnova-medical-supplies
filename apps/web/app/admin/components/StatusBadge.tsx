import type { OrderStatus, QuoteStatus } from '@/lib/admin/mock-dashboard-data';

type BadgeTone = 'green' | 'blue' | 'orange' | 'amber';

const ORDER_TONE: Record<OrderStatus, BadgeTone> = {
  Pending: 'amber',
  Processing: 'blue',
  'Out for Delivery': 'orange',
  Delivered: 'green',
};

const QUOTE_TONE: Record<QuoteStatus, BadgeTone> = {
  New: 'blue',
  'In Review': 'orange',
  Quoted: 'green',
};

export function StatusBadge({ status, kind = 'order' }: { status: OrderStatus | QuoteStatus; kind?: 'order' | 'quote' }) {
  const tone: BadgeTone =
    kind === 'order'
      ? ORDER_TONE[status as OrderStatus] ?? 'blue'
      : QUOTE_TONE[status as QuoteStatus] ?? 'blue';
  return <span className={`sa-badge ${tone}`}>{status}</span>;
}
