type BadgeTone = 'green' | 'blue' | 'orange' | 'red' | 'gray';

/** Maps every customer-facing status to a consistent brand tone. */
const TONE_BY_STATUS: Record<string, BadgeTone> = {
  // blue
  Processing: 'blue',
  Shipped: 'blue',
  Responded: 'blue',
  Quoted: 'blue',
  // orange
  Pending: 'orange',
  'Under Review': 'orange',
  'Out for Delivery': 'orange',
  'Payment Due': 'orange',
  // green
  Delivered: 'green',
  Paid: 'green',
  Accepted: 'green',
  Verified: 'green',
  'In Good Standing': 'green',
  // red
  Cancelled: 'red',
  Failed: 'red',
  Declined: 'red',
  Overdue: 'red',
  // gray
  Submitted: 'gray',
  Draft: 'gray',
  Archived: 'gray',
  Refunded: 'gray',
};

export function StatusBadge({ status }: { status: string }) {
  const tone = TONE_BY_STATUS[status] ?? 'gray';
  return <span className={`pf-badge ${tone}`}>{status}</span>;
}
