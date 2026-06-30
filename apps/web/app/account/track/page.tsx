'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Package, Truck, ClipboardCopy, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ordersApi, type Order } from '@/lib/customer-api';
import { cn, formatDate, ORDER_STATUS_META } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// ─── Constants ───────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Order Placed',      icon: '📋' },
  { label: 'Payment Confirmed', icon: '💳' },
  { label: 'Preparing Order',   icon: '📦' },
  { label: 'Packed',            icon: '🗃️' },
  { label: 'Shipped',           icon: '🚚' },
  { label: 'Out for Delivery',  icon: '🏠' },
  { label: 'Delivered',         icon: '✅' },
] as const;

const STATUS_TO_STEP: Record<string, number> = {
  PENDING:    0,
  CONFIRMED:  1,
  PROCESSING: 2,
  SHIPPED:    4,
  DELIVERED:  6,
  CANCELLED:  -1,
  REFUNDED:   -1,
};

type TrackState = 'idle' | 'loading' | 'found' | 'notFound';

// ─── Sub-components ──────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 py-14 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
        <Truck className="w-10 h-10 text-[#1a4fa0]" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-semibold text-[#122036]">Track Your Order</h2>
      <p className="text-sm text-gray-500 max-w-xs">
        Enter your order number above to track your shipment in real time.
      </p>
    </motion.div>
  );
}

function NotFoundState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 py-14 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-red-500" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-semibold text-[#122036]">Order not found</h2>
      <p className="text-sm text-gray-500 max-w-xs">
        We couldn&apos;t find an order with that number. Please check and try again.
      </p>
    </motion.div>
  );
}

function CancelledBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 mb-6"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 flex-shrink-0">
        <XIcon />
      </div>
      <div>
        <p className="text-sm font-semibold text-red-700">Order Cancelled</p>
        <p className="text-xs text-red-500 mt-0.5">This order has been cancelled and will not be processed.</p>
      </div>
    </motion.div>
  );
}

interface TrackingTimelineProps {
  order: Order;
  currentStep: number;
}

function TrackingTimeline({ order, currentStep }: TrackingTimelineProps) {
  const isCancelled = order.status === 'CANCELLED' || order.status === 'REFUNDED';
  const completedCount = isCancelled ? 0 : currentStep + 1;
  const progressPct = Math.round((completedCount / STEPS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{isCancelled ? 'Order cancelled' : `${completedCount} of ${STEPS.length} steps complete`}</span>
          <span>{isCancelled ? '—' : `${progressPct}%`}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#1a4fa0]"
            initial={{ width: 0 }}
            animate={{ width: `${isCancelled ? 0 : progressPct}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Cancelled banner */}
      {isCancelled && <CancelledBanner />}

      {/* Steps */}
      <div className="relative">
        {/* Connector track */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 hidden sm:block" />

        <div className="relative grid grid-cols-7 gap-0">
          {STEPS.map((step, index) => {
            const isCompleted = !isCancelled && index < currentStep;
            const isCurrent = !isCancelled && index === currentStep;
            const isFuture = isCancelled || index > currentStep;

            const stepDate =
              index === 0
                ? formatDate(order.createdAt)
                : index === currentStep && !isCancelled
                ? formatDate(order.updatedAt)
                : null;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.35 }}
                className="flex flex-col items-center gap-1.5 relative"
              >
                {/* Connector line (left side) */}
                {index > 0 && (
                  <div
                    className={cn(
                      'absolute top-5 right-1/2 w-1/2 h-0.5 -translate-y-1/2',
                      isCompleted || isCurrent ? 'bg-[#1a4fa0]' : 'bg-gray-200'
                    )}
                  />
                )}
                {/* Connector line (right side) */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-5 left-1/2 w-1/2 h-0.5 -translate-y-1/2',
                      isCompleted ? 'bg-[#1a4fa0]' : 'bg-gray-200'
                    )}
                  />
                )}

                {/* Circle */}
                <div className="relative z-10 flex-shrink-0">
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#ee6a12]/40" />
                  )}
                  <div
                    className={cn(
                      'relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                      isCompleted
                        ? 'bg-[#1a4fa0] border-[#1a4fa0]'
                        : isCurrent
                        ? 'bg-[#ee6a12] border-[#ee6a12]'
                        : 'bg-white border-gray-200'
                    )}
                  >
                    {isCompleted ? (
                      <CheckIcon />
                    ) : isCurrent ? (
                      <CheckIcon />
                    ) : (
                      <span className="text-xs font-semibold text-gray-400">{index + 1}</span>
                    )}
                  </div>
                </div>

                {/* Label */}
                <p
                  className={cn(
                    'text-center text-[10px] font-medium leading-tight mt-0.5',
                    isCompleted || isCurrent ? 'text-[#122036]' : 'text-gray-400'
                  )}
                >
                  {step.label}
                </p>

                {/* Date */}
                {stepDate && (
                  <p className="text-[9px] text-gray-400 text-center leading-tight">{stepDate}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface TrackingCardProps {
  order: Order;
}

function TrackingCard({ order }: TrackingCardProps) {
  const currentStep = STATUS_TO_STEP[order.status] ?? 0;
  const statusMeta = ORDER_STATUS_META[order.status];

  async function copyTracking() {
    if (!order.trackingNumber) return;
    await navigator.clipboard.writeText(order.trackingNumber);
    toast.success('Copied to clipboard!');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Order header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Order Number</p>
          <p className="text-lg font-bold text-[#122036] font-mono">{order.orderNumber}</p>
        </div>
        {statusMeta && (
          <Badge
            className={cn(
              'text-xs px-3 py-1 rounded-full font-semibold border-0',
              statusMeta.bg,
              statusMeta.color
            )}
          >
            {statusMeta.label}
          </Badge>
        )}
      </div>

      {/* Timeline */}
      <TrackingTimeline order={order} currentStep={currentStep} />

      {/* Tracking number card */}
      {order.trackingNumber && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border border-gray-100 bg-gray-50/60 shadow-none rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Tracking Number</p>
                  <p className="font-mono text-sm font-semibold text-[#122036] tracking-wider">
                    {order.trackingNumber}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Standard Shipping</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyTracking}
                  className="gap-2 text-xs flex-shrink-0"
                >
                  <ClipboardCopy className="w-3.5 h-3.5" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Inner page (needs useSearchParams) ──────────────────────────────────────

function TrackPageInner() {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [trackState, setTrackState] = useState<TrackState>('idle');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);

  // Pre-fill from URL param
  useEffect(() => {
    const param = searchParams.get('orderNumber');
    if (param) {
      setInputValue(param);
      setSearchTerm(param);
    }
  }, [searchParams]);

  const { data: orders, isFetching } = useQuery({
    queryKey: ['orders-track', searchTerm],
    queryFn: () => ordersApi.list(1),
    enabled: !!searchTerm,
    staleTime: 30_000,
  });

  // Resolve the found order when data arrives
  useEffect(() => {
    if (!searchTerm) return;

    if (isFetching) {
      setTrackState('loading');
      return;
    }

    if (orders) {
      const match = orders.find(
        (o) => o.orderNumber.toLowerCase() === searchTerm.toLowerCase()
      );
      if (match) {
        setFoundOrder(match);
        setTrackState('found');
      } else {
        setFoundOrder(null);
        setTrackState('notFound');
      }
    }
  }, [orders, isFetching, searchTerm]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setFoundOrder(null);
    setSearchTerm(trimmed);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50/50 py-10 px-4"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Page title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#122036]">Order Tracking</h1>
          <p className="text-sm text-gray-500 mt-1">Track the status of your order in real time</p>
        </div>

        {/* Search card */}
        <Card className="border border-gray-100 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your order number"
                className="h-12 text-base rounded-xl border-gray-200 focus-visible:ring-[#1a4fa0]/30"
              />
              <Button
                type="submit"
                disabled={isFetching || !inputValue.trim()}
                className="h-12 px-6 rounded-xl bg-[#1a4fa0] hover:bg-[#1a4fa0]/90 text-white font-semibold flex-shrink-0"
              >
                {isFetching ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Searching…
                  </span>
                ) : (
                  'Track'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result area */}
        <AnimatePresence mode="wait">
          {trackState === 'idle' && (
            <motion.div key="idle" exit={{ opacity: 0 }}>
              <Card className="border border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <EmptyState />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {trackState === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card className="border border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 py-10">
                    <svg className="animate-spin h-8 w-8 text-[#1a4fa0]" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <p className="text-sm text-gray-500">Looking up your order…</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {trackState === 'found' && foundOrder && (
            <motion.div key="found" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="border border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <TrackingCard order={foundOrder} />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {trackState === 'notFound' && (
            <motion.div key="notFound" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="border border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <NotFoundState />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Default export (Suspense boundary for useSearchParams) ──────────────────

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-[#1a4fa0]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
    }>
      <TrackPageInner />
    </Suspense>
  );
}
