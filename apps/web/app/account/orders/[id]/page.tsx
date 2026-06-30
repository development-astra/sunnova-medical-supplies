'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Headphones,
  ShoppingCart,
  AlertCircle,
  MapPin,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ordersApi, type Order, type OrderItem, type Address } from '@/lib/customer-api';
import {
  cn,
  formatCurrency,
  formatDate,
  ORDER_STATUS_META,
} from '@/lib/utils';

// ─── Timeline config ───────────────────────────────────────────────────────────

const TIMELINE_STEPS = [
  { key: 'PENDING', label: 'Order Placed' },
  { key: 'CONFIRMED', label: 'Confirmed' },
  { key: 'PROCESSING', label: 'Processing' },
  { key: 'SHIPPED', label: 'Shipped' },
  { key: 'DELIVERED', label: 'Delivered' },
] as const;

const STATUS_STEP_INDEX: Record<string, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  PROCESSING: 2,
  SHIPPED: 3,
  DELIVERED: 4,
};

// ─── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const meta = ORDER_STATUS_META[status] ?? {
    label: status,
    color: 'text-gray-700',
    bg: 'bg-gray-100',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        meta.bg,
        meta.color,
      )}
    >
      {meta.label}
    </span>
  );
}

// ─── Order Timeline ────────────────────────────────────────────────────────────

function OrderTimeline({ order }: { order: Order }) {
  const isCancelled = order.status === 'CANCELLED';
  const currentIndex = STATUS_STEP_INDEX[order.status] ?? 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
      <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-6">
        Order Timeline
      </h2>

      <ol className="relative">
        {TIMELINE_STEPS.map((step, idx) => {
          const isCompleted = !isCancelled && idx <= currentIndex;
          const isCurrent = !isCancelled && idx === currentIndex;
          const isLast = idx === TIMELINE_STEPS.length - 1;

          // Determine the date for each step
          let stepDate: string | null = null;
          if (idx === 0) stepDate = order.createdAt;
          else if (idx === 4 && order.deliveredAt) stepDate = order.deliveredAt;
          else if (isCompleted && idx <= currentIndex) stepDate = order.updatedAt;

          return (
            <li key={step.key} className="flex gap-4">
              {/* Connector + circle column */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={cn(
                    'relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors',
                    isCancelled && idx > 0
                      ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                      : isCompleted
                      ? 'border-[#1a4fa0] bg-[#1a4fa0]'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900',
                  )}
                >
                  {isCancelled && idx > 0 ? (
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                      {idx + 1}
                    </span>
                  ) : isCompleted ? (
                    <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                      {idx + 1}
                    </span>
                  )}
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div
                    className={cn(
                      'w-0.5 flex-1 mt-1 mb-1 min-h-[1.5rem]',
                      !isCancelled && idx < currentIndex
                        ? 'bg-[#1a4fa0]'
                        : 'bg-slate-200 dark:bg-slate-700',
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div className={cn('pb-6 flex-1', isLast && 'pb-0')}>
                <p
                  className={cn(
                    'text-sm font-semibold leading-tight',
                    isCancelled && idx > 0
                      ? 'text-slate-400 dark:text-slate-500'
                      : isCompleted
                      ? 'text-slate-800 dark:text-slate-100'
                      : 'text-slate-400 dark:text-slate-500',
                  )}
                >
                  {step.label}
                </p>
                <p
                  className={cn(
                    'text-xs mt-0.5',
                    isCancelled && idx > 0
                      ? 'text-slate-300 dark:text-slate-600'
                      : isCompleted && stepDate
                      ? 'text-slate-500 dark:text-slate-400'
                      : 'text-slate-400 dark:text-slate-500',
                  )}
                >
                  {isCancelled && idx > 0
                    ? 'Pending'
                    : isCompleted && stepDate
                    ? formatDate(stepDate)
                    : isCurrent
                    ? 'In progress'
                    : 'Pending'}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {isCancelled && (
        <div className="mt-4 flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">
            Order Cancelled
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Products Table ────────────────────────────────────────────────────────────

function ProductsTable({ order }: { order: Order }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Items Ordered
        </h2>
      </div>

      {/* Header row */}
      <div className="hidden md:grid md:grid-cols-[2.5fr_1fr_0.7fr_0.8fr_0.8fr] gap-4 px-6 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
        {['Product', 'SKU', 'Qty', 'Unit Price', 'Total'].map((h) => (
          <span
            key={h}
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Item rows */}
      {order.items.map((item: OrderItem) => (
        <div
          key={item.id}
          className="grid grid-cols-1 md:grid-cols-[2.5fr_1fr_0.7fr_0.8fr_0.8fr] gap-3 md:gap-4 items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0"
        >
          {/* Product */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {item.product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.product.imageUrl}
                  alt={item.productName}
                  className="w-10 h-10 object-cover"
                />
              ) : (
                <Package className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-100 line-clamp-2">
              {item.productName}
            </span>
          </div>

          {/* SKU */}
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {item.productSku}
          </span>

          {/* Qty */}
          <span className="text-sm text-slate-700 dark:text-slate-300">{item.quantity}</span>

          {/* Unit price */}
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {formatCurrency(item.unitPrice)}
          </span>

          {/* Total price */}
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {formatCurrency(item.totalPrice)}
          </span>
        </div>
      ))}

      {/* Subtotal footer */}
      <div className="flex justify-end px-6 py-3 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-6">
          <span className="text-sm text-slate-500 dark:text-slate-400">Subtotal</span>
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {formatCurrency(order.subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Order Summary Card ────────────────────────────────────────────────────────

function OrderSummaryCard({ order }: { order: Order }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Order Summary
      </h2>

      <div className="space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
          <span className="text-slate-800 dark:text-slate-100">
            {formatCurrency(order.subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Shipping</span>
          <span className="text-slate-800 dark:text-slate-100">
            {order.shipping === 0 ? (
              <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
            ) : (
              formatCurrency(order.shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Tax</span>
          <span className="text-slate-800 dark:text-slate-100">
            {formatCurrency(order.tax)}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between items-center">
        <span className="text-base font-bold text-slate-800 dark:text-slate-100">
          Grand Total
        </span>
        <span className="text-lg font-bold text-[#1a4fa0] dark:text-blue-400">
          {formatCurrency(order.total)}
        </span>
      </div>
    </div>
  );
}

// ─── Shipping Address Card ─────────────────────────────────────────────────────

function ShippingAddressCard({ address }: { address: Address | null }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-slate-400" />
        Shipping Address
      </h2>

      {address ? (
        <address className="not-italic space-y-1 text-sm text-slate-600 dark:text-slate-400">
          {address.label && (
            <p className="font-medium text-slate-700 dark:text-slate-300">{address.label}</p>
          )}
          <p>{address.line1}</p>
          {address.line2 && <p>{address.line2}</p>}
          <p>
            {address.city}, {address.state} {address.zip}
          </p>
          <p>{address.country}</p>
        </address>
      ) : (
        <p className="text-sm text-slate-400 dark:text-slate-500 italic">
          No shipping address on file.
        </p>
      )}
    </div>
  );
}

// ─── Actions Card ──────────────────────────────────────────────────────────────

function ActionsCard({ order }: { order: Order }) {
  const router = useRouter();

  function handleCopyTracking() {
    if (!order.trackingNumber) return;
    navigator.clipboard
      .writeText(order.trackingNumber)
      .then(() => toast.success('Tracking number copied!'))
      .catch(() => toast.error('Failed to copy tracking number.'));
  }

  function handleDownloadInvoice() {
    toast.info('Invoice download coming soon.');
  }

  function handleBuyAgain() {
    toast.success('Added items to cart.');
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
      <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">
        Actions
      </h2>

      {/* Tracking number */}
      {order.trackingNumber && (
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
            Tracking Number
          </p>
          <button
            onClick={handleCopyTracking}
            className="flex items-center gap-2 w-full group text-left"
            title="Click to copy"
          >
            <span className="text-sm font-mono text-slate-800 dark:text-slate-100 truncate flex-1">
              {order.trackingNumber}
            </span>
            <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1a4fa0] dark:group-hover:text-blue-400 shrink-0 transition-colors" />
          </button>
        </div>
      )}

      <Button
        variant="outline"
        className="w-full justify-start gap-2 text-sm"
        onClick={handleDownloadInvoice}
      >
        <Download className="w-4 h-4" />
        Download Invoice
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start gap-2 text-sm"
        onClick={() => router.push('/account/support')}
      >
        <Headphones className="w-4 h-4" />
        Contact Support
      </Button>

      <Button
        onClick={handleBuyAgain}
        className="w-full justify-start gap-2 text-sm bg-[#1a4fa0] hover:bg-[#163d80] text-white"
      >
        <ShoppingCart className="w-4 h-4" />
        Buy Again
      </Button>
    </div>
  );
}

// ─── Loading Skeleton ──────────────────────────────────────────────────────────

function OrderDetailSkeleton() {
  return (
    <div className="space-y-5">
      {/* Header card skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left column */}
        <div className="lg:col-span-8 space-y-5">
          {/* Timeline skeleton */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <Skeleton className="h-4 w-32 mb-6" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4 mb-6 last:mb-0">
                <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5 pt-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>

          {/* Products skeleton */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <Skeleton className="h-4 w-28" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 space-y-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3"
            >
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Error State ───────────────────────────────────────────────────────────────

function OrderNotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7 text-red-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
        Order not found
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
        We couldn't find the order you're looking for. It may have been removed or the
        link is invalid.
      </p>
      <Button variant="outline" size="sm" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Orders
      </Button>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Next.js 15: params is a Promise
  const { id } = use(params);
  const router = useRouter();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.get(id),
    staleTime: 30_000,
    retry: 1,
  });

  function handleBack() {
    router.push('/account/orders');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back button */}
      <div className="mb-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Orders
        </Button>
      </div>

      {isLoading ? (
        <OrderDetailSkeleton />
      ) : isError || !order ? (
        <OrderNotFound onBack={handleBack} />
      ) : (
        <div className="space-y-5">
          {/* Order header card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1
                  className="text-2xl font-bold text-[#122036] dark:text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  #{order.orderNumber}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={order.status} />
                {/* Payment status – always "Paid" */}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400">
                  Paid
                </span>
              </div>
            </div>
          </div>

          {/* Main layout grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Timeline + Products */}
            <div className="lg:col-span-8 space-y-5">
              <OrderTimeline order={order} />
              <ProductsTable order={order} />
            </div>

            {/* Right: Summary + Address + Actions */}
            <div className="lg:col-span-4 space-y-5">
              <OrderSummaryCard order={order} />
              <ShippingAddressCard address={order.shippingAddress} />
              <ActionsCard order={order} />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
