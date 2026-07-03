/* ============================================================================
   Sunnova Medical Supplies — Customer Dashboard mock data
   Swap these exports for `customer-api` calls when the backend is ready; the
   component tree consumes only the typed shapes below.
   ========================================================================== */

export type MetricAccent = 'blue' | 'orange' | 'green' | 'gold';
export type MetricIcon = 'orders' | 'quotes' | 'delivered' | 'lists' | 'favorites' | 'business';

export interface CustomerProfile {
  name: string;
  business: string;
  initials: string;
}

export interface CustomerMetric {
  id: string;
  label: string;
  value: string;
  descriptor: string;
  descriptorTone?: 'muted' | 'up' | 'accent';
  icon: MetricIcon;
  accent: MetricAccent;
  href: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Pending' | 'Cancelled';

export interface CustomerOrder {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  delivery: string;
  canTrack: boolean;
}

export type QuoteStatus = 'Submitted' | 'Under Review' | 'Responded' | 'Accepted' | 'Declined';

export interface CustomerQuote {
  id: string;
  date: string;
  status: QuoteStatus;
  total: number;
}

export type QuickActionIcon = 'reorder' | 'track' | 'quote' | 'shop' | 'support';

export interface QuickAction {
  id: string;
  label: string;
  help: string;
  href: string;
  icon: QuickActionIcon;
  tone: 'blue' | 'orange';
}

export interface DeliveryTimelineStep {
  label: string;
  state: 'done' | 'active' | 'upcoming';
  sub?: string;
}

export interface DeliveryTrackingData {
  status: string;
  eta: string;
  addressName: string;
  addressLines: string[];
  steps: DeliveryTimelineStep[];
}

export interface FrequentlyOrderedProduct {
  id: string;
  name: string;
  variant: string;
  price: number;
  action: 'Buy Again' | 'Add to Cart';
}

export interface SavedList {
  id: string;
  name: string;
  itemCount: number;
}

export type InvoiceStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export interface CustomerInvoice {
  id: string;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  total: number;
}

export interface BusinessAccountData {
  status: string;
  businessName: string;
  accountNumber: string;
  standing: string;
  savedAddresses: number;
  teamMembers: number;
  specialPricing: string;
  paymentTerms: string;
}

/* ─── Customer profile ───────────────────────────────────────────────────── */
export const customerProfile: CustomerProfile = {
  name: 'Dr. Amanda Lee',
  business: 'Wellness Med Spa',
  initials: 'AL',
};

/* ─── Summary metrics ────────────────────────────────────────────────────── */
export const metrics: CustomerMetric[] = [
  { id: 'active-orders', label: 'Active Orders', value: '8', descriptor: '2 processing', icon: 'orders', accent: 'blue', href: '/account/orders' },
  { id: 'pending-quotes', label: 'Pending Quotes', value: '3', descriptor: '1 under review', icon: 'quotes', accent: 'orange', href: '/account/quotes' },
  { id: 'delivered', label: 'Delivered This Month', value: '12', descriptor: '18% vs last month', descriptorTone: 'up', icon: 'delivered', accent: 'green', href: '/account/track' },
  { id: 'saved-lists', label: 'Saved Lists', value: '4', descriptor: '32 items total', icon: 'lists', accent: 'blue', href: '/account/saved-lists' },
  { id: 'favorites', label: 'Favorite Products', value: '15', descriptor: 'View favorites', descriptorTone: 'accent', icon: 'favorites', accent: 'gold', href: '/account/wishlist' },
  { id: 'business', label: 'Business Account', value: 'Verified', descriptor: 'Eligible for special pricing', descriptorTone: 'up', icon: 'business', accent: 'green', href: '/account/business' },
];

/* ─── Recent orders ──────────────────────────────────────────────────────── */
export const recentOrders: CustomerOrder[] = [
  { id: 'SO-24127', date: 'May 14, 2025', status: 'Processing', total: 685.42, delivery: 'Same-Week Delivery', canTrack: true },
  { id: 'SO-24105', date: 'May 9, 2025', status: 'Shipped', total: 1245.9, delivery: 'Same-Week Delivery', canTrack: true },
  { id: 'SO-24088', date: 'May 5, 2025', status: 'Delivered', total: 742.15, delivery: 'Same-Week Delivery', canTrack: false },
  { id: 'SO-24062', date: 'Apr 28, 2025', status: 'Delivered', total: 1102.33, delivery: 'Same-Week Delivery', canTrack: false },
  { id: 'SO-24031', date: 'Apr 22, 2025', status: 'Delivered', total: 513.6, delivery: 'Same-Week Delivery', canTrack: false },
];

/* ─── Quote requests ─────────────────────────────────────────────────────── */
export const quoteRequests: CustomerQuote[] = [
  { id: 'QT-25043', date: 'May 13, 2025', status: 'Under Review', total: 2845.0 },
  { id: 'QT-25031', date: 'May 8, 2025', status: 'Responded', total: 1950.0 },
  { id: 'QT-25019', date: 'May 2, 2025', status: 'Submitted', total: 1230.0 },
  { id: 'QT-25002', date: 'Apr 25, 2025', status: 'Accepted', total: 3120.0 },
  { id: 'QT-24985', date: 'Apr 18, 2025', status: 'Responded', total: 980.0 },
];

/* ─── Quick actions ──────────────────────────────────────────────────────── */
export const quickActions: QuickAction[] = [
  { id: 'reorder', label: 'Reorder Supplies', help: 'Quickly buy again from previous orders', href: '/account/reorder', icon: 'reorder', tone: 'orange' },
  { id: 'track', label: 'Track an Order', help: 'View active delivery status', href: '/account/track', icon: 'track', tone: 'blue' },
  { id: 'quote', label: 'Request a Quote', help: 'Submit a new quote request', href: '/request-quote', icon: 'quote', tone: 'orange' },
  { id: 'shop', label: 'Shop Products', help: 'Browse the full catalog', href: '/shop', icon: 'shop', tone: 'blue' },
  { id: 'support', label: 'Contact Sunnova', help: 'Reach our support team', href: '/account/support', icon: 'support', tone: 'blue' },
];

/* ─── Delivery tracking ──────────────────────────────────────────────────── */
export const deliveryTracking: DeliveryTrackingData = {
  status: 'Out for Delivery',
  eta: 'May 16, 2025 by 6:00 PM',
  addressName: 'Wellness Med Spa',
  addressLines: ['1234 Coral Way, Suite 200', 'Miami, FL 33145'],
  steps: [
    { label: 'Order Confirmed', state: 'done', sub: 'May 14, 9:12 AM' },
    { label: 'Preparing', state: 'done', sub: 'May 15, 2:40 PM' },
    { label: 'Scheduled for Delivery', state: 'done', sub: 'May 16, 8:00 AM' },
    { label: 'Out for Delivery', state: 'active', sub: 'Arriving by 6:00 PM' },
    { label: 'Delivered', state: 'upcoming' },
  ],
};

/* ─── Frequently ordered ─────────────────────────────────────────────────── */
export const frequentlyOrdered: FrequentlyOrderedProduct[] = [
  { id: 'p1', name: 'Nitrile Exam Gloves', variant: 'Small, Blue (100/Box)', price: 8.95, action: 'Buy Again' },
  { id: 'p2', name: 'Gauze Pads', variant: '2x2, 8-Ply (200/Bag)', price: 4.25, action: 'Add to Cart' },
  { id: 'p3', name: 'Surface Disinfectant', variant: 'Wipes (160 ct)', price: 7.5, action: 'Add to Cart' },
  { id: 'p4', name: 'Sharps Container', variant: '5 Qt. (Red)', price: 5.95, action: 'Add to Cart' },
  { id: 'p5', name: 'Surgical Masks', variant: 'Blue (50/Box)', price: 6.5, action: 'Add to Cart' },
];

/* ─── Saved lists ────────────────────────────────────────────────────────── */
export const savedLists: SavedList[] = [
  { id: 'l1', name: 'Weekly Restock', itemCount: 18 },
  { id: 'l2', name: 'Treatment Room Supplies', itemCount: 24 },
  { id: 'l3', name: 'PPE Essentials', itemCount: 16 },
  { id: 'l4', name: 'Front Desk Supplies', itemCount: 12 },
];

/* ─── Invoices ───────────────────────────────────────────────────────────── */
export const invoices: CustomerInvoice[] = [
  { id: 'INV-25084', date: 'May 10, 2025', dueDate: 'May 30, 2025', status: 'Paid', total: 1245.9 },
  { id: 'INV-25063', date: 'Apr 25, 2025', dueDate: 'May 15, 2025', status: 'Paid', total: 742.15 },
  { id: 'INV-25041', date: 'Apr 10, 2025', dueDate: 'Apr 30, 2025', status: 'Pending', total: 1102.33 },
  { id: 'INV-25018', date: 'Mar 26, 2025', dueDate: 'Apr 15, 2025', status: 'Paid', total: 513.6 },
];

export const currentBalance = {
  amount: 1102.33,
  dueLabel: 'Due by Apr 30, 2025',
};

/* ─── Business account ───────────────────────────────────────────────────── */
export const businessAccount: BusinessAccountData = {
  status: 'Verified Business Account',
  businessName: 'Wellness Med Spa',
  accountNumber: 'BIZ-77234',
  standing: 'In Good Standing',
  savedAddresses: 3,
  teamMembers: 5,
  specialPricing: 'Eligible',
  paymentTerms: 'Net 30',
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */
export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
