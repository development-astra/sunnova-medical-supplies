'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  ShoppingBag,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Eye,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ordersApi, type Order } from '@/lib/customer-api';
import { cn, formatCurrency, formatDate, ORDER_STATUS_META } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────────

type StatusFilter =
  | 'ALL'
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

interface Tab {
  key: StatusFilter;
  label: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  { key: 'ALL', label: 'All Orders' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'PROCESSING', label: 'Processing' },
  { key: 'SHIPPED', label: 'Shipped' },
  { key: 'DELIVERED', label: 'Delivered' },
  { key: 'CANCELLED', label: 'Cancelled' },
];

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

// ─── Loading Skeleton ──────────────────────────────────────────────────────────

function OrdersSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Table header skeleton */}
      <div className="hidden md:grid md:grid-cols-[1.5fr_1fr_0.7fr_1fr_0.8fr_auto] gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        {['Order #', 'Date', 'Items', 'Status', 'Total', ''].map((h) => (
          <Skeleton key={h} className="h-4 w-16" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_0.7fr_1fr_0.8fr_auto] gap-4 items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0"
        >
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ filtered }: { filtered: boolean }) {
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center mb-5">
        <Package className="w-10 h-10 text-[#1a4fa0] dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
        {filtered ? 'No matching orders' : 'No orders yet'}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-7">
        {filtered
          ? 'Try adjusting your search or filter to find what you are looking for.'
          : 'Your order history will appear here once you make a purchase.'}
      </p>
      {!filtered && (
        <Button
          onClick={() => router.push('/shop')}
          className="bg-[#1a4fa0] hover:bg-[#163d80] text-white px-6"
        >
          Start Shopping
        </Button>
      )}
    </div>
  );
}

// ─── Error State ───────────────────────────────────────────────────────────────

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-red-200 dark:border-red-900/50 flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7 text-red-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
        Failed to load orders
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">{message}</p>
      <Button variant="outline" onClick={onRetry} size="sm">
        Try Again
      </Button>
    </div>
  );
}

// ─── Order Row ─────────────────────────────────────────────────────────────────

function OrderRow({ order, onClick }: { order: Order; onClick: () => void }) {
  const itemCount = order.items.length;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="group grid grid-cols-1 md:grid-cols-[1.5fr_1fr_0.7fr_1fr_0.8fr_auto] gap-3 md:gap-4 items-start md:items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
    >
      {/* Order number */}
      <div>
        <span className="font-semibold text-[#1a4fa0] dark:text-blue-400 text-sm">
          #{order.orderNumber}
        </span>
        {/* mobile: show date beneath on small screens */}
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 md:hidden">
          {formatDate(order.createdAt)}
        </p>
      </div>

      {/* Date – hidden on mobile (shown inline above) */}
      <span className="hidden md:block text-sm text-slate-600 dark:text-slate-400">
        {formatDate(order.createdAt)}
      </span>

      {/* Items count */}
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </span>

      {/* Status */}
      <div>
        <StatusBadge status={order.status} />
      </div>

      {/* Total */}
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        {formatCurrency(order.total)}
      </span>

      {/* Action */}
      <div>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="text-xs border-slate-200 dark:border-slate-700 hover:border-[#1a4fa0] hover:text-[#1a4fa0] dark:hover:border-blue-400 dark:hover:text-blue-400 whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5 mr-1" />
          View Details
        </Button>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const statusParam = (searchParams.get('status') ?? 'ALL') as StatusFilter;
  const pageParam = Number(searchParams.get('page') ?? '1');

  const [search, setSearch] = useState('');

  // Build URL helper
  const buildUrl = useCallback(
    (updates: { status?: StatusFilter; page?: number }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.status !== undefined) {
        if (updates.status === 'ALL') params.delete('status');
        else params.set('status', updates.status);
        params.set('page', '1');
      }
      if (updates.page !== undefined) params.set('page', String(updates.page));
      const qs = params.toString();
      return `${pathname}${qs ? `?${qs}` : ''}`;
    },
    [searchParams, pathname],
  );

  const apiStatus = statusParam === 'ALL' ? undefined : statusParam;

  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['orders', pageParam, apiStatus],
    queryFn: () => ordersApi.list(pageParam, apiStatus),
    staleTime: 30_000,
  });

  // Client-side search filter on order number
  const filtered = useMemo(() => {
    if (!orders) return [];
    const q = search.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        `#${o.orderNumber}`.toLowerCase().includes(q),
    );
  }, [orders, search]);

  const isFiltered = search.trim().length > 0;

  function handleTabChange(key: StatusFilter) {
    setSearch('');
    router.push(buildUrl({ status: key }));
  }

  function handleViewOrder(id: string) {
    router.push(`/account/orders/${id}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#122036] dark:text-white"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Order History
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          View and manage your past orders.
        </p>
      </div>

      {/* Status tabs */}
      <div className="mb-5 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <div className="flex min-w-max -mb-px">
          {TABS.map((tab) => {
            const isActive = statusParam === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={cn(
                  'px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors',
                  isActive
                    ? 'border-[#1a4fa0] text-[#1a4fa0] dark:text-blue-400 dark:border-blue-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600',
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by order number…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4fa0]/30 focus:border-[#1a4fa0] dark:focus:border-blue-400 text-slate-800 dark:text-slate-100 placeholder-slate-400 transition"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <OrdersSkeleton />
      ) : isError ? (
        <ErrorState
          message={(error as Error)?.message ?? 'Something went wrong.'}
          onRetry={() => refetch()}
        />
      ) : filtered.length === 0 ? (
        <EmptyState filtered={isFiltered} />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Table header – desktop only */}
          <div className="hidden md:grid md:grid-cols-[1.5fr_1fr_0.7fr_1fr_0.8fr_auto] gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            {['Order #', 'Date', 'Items', 'Status', 'Total', ''].map((h) => (
              <span
                key={h}
                className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onClick={() => handleViewOrder(order.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination – only show when not searching and data exists */}
      {!isLoading && !isError && !isFiltered && orders && orders.length > 0 && (
        <div className="mt-5 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={pageParam <= 1}
            onClick={() => router.push(buildUrl({ page: pageParam - 1 }))}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <span className="text-sm text-slate-500 dark:text-slate-400">
            Page <span className="font-semibold text-slate-800 dark:text-slate-100">{pageParam}</span>
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={orders.length < 20}
            onClick={() => router.push(buildUrl({ page: pageParam + 1 }))}
            className="gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}
