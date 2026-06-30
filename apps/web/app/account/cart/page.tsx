'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ShoppingCart, Trash2, Plus, Minus, Tag } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productName: string;
  productSku: string;
  product: {
    imageUrl: string | null;
    unit: string;
    category: { name: string };
  };
}

interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
}

// ─── API base ─────────────────────────────────────────────────────────────────

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(/\/$/, '');

function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('user_token') : null;
}

async function apiFetch<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}/api/v1${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options?.headers ?? {}) as Record<string, string>),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message ?? `HTTP ${res.status}`);
  return (json?.data !== undefined ? json.data : json) as T;
}

// ─── Placeholder image ─────────────────────────────────────────────────────────

function CartItemPlaceholder() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 text-gray-300"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="8" fill="#f3f4f6" />
      <rect x="20" y="10" width="8" height="28" rx="2" fill="#d1d5db" />
      <rect x="10" y="20" width="28" height="8" rx="2" fill="#d1d5db" />
    </svg>
  );
}

// ─── Skeleton rows ─────────────────────────────────────────────────────────────

function ItemSkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-0">
      <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-12 rounded" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-5 w-16 shrink-0" />
      <Skeleton className="h-8 w-8 rounded shrink-0" />
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div className="space-y-3 p-5">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}

// ─── Cart item row ─────────────────────────────────────────────────────────────

interface CartItemRowProps {
  item: CartItem;
  quantity: number;
  onQuantityChange: (itemId: string, qty: number) => void;
  onRemove: (itemId: string) => void;
  isRemoving: boolean;
}

function CartItemRow({
  item,
  quantity,
  onQuantityChange,
  onRemove,
  isRemoving,
}: CartItemRowProps) {
  return (
    <div
      className={cn(
        'flex items-start sm:items-center gap-3 sm:gap-4 p-4 border-b last:border-0 transition-opacity duration-200',
        isRemoving && 'opacity-40 pointer-events-none'
      )}
    >
      {/* Image */}
      <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
        {item.product.imageUrl ? (
          <img
            src={item.product.imageUrl}
            alt={item.productName}
            className="w-full h-full object-contain rounded-lg p-1"
          />
        ) : (
          <CartItemPlaceholder />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm leading-snug line-clamp-2">
          {item.productName}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">SKU: {item.productSku}</p>
        <p className="text-sm text-gray-600 mt-0.5">
          {formatCurrency(item.unitPrice)}{' '}
          <span className="text-xs text-gray-400">/ {item.product.unit}</span>
        </p>
        <button
          className="text-xs text-blue-600 hover:underline mt-1 text-left"
          onClick={() => toast.info('Saved for later')}
        >
          Save for later
        </button>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full p-0"
          disabled={quantity <= 1}
          onClick={() => onQuantityChange(item.id, quantity - 1)}
          aria-label="Decrease quantity"
        >
          <Minus size={13} />
        </Button>
        <span className="w-10 text-center text-sm font-medium tabular-nums select-none">
          {quantity}
        </span>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full p-0"
          onClick={() => onQuantityChange(item.id, quantity + 1)}
          aria-label="Increase quantity"
        >
          <Plus size={13} />
        </Button>
      </div>

      {/* Line total */}
      <p className="font-semibold text-gray-900 text-sm shrink-0 w-20 text-right">
        {formatCurrency(item.unitPrice * quantity)}
      </p>

      {/* Remove */}
      <Button
        size="icon-sm"
        variant="ghost"
        className="text-red-400 hover:text-red-600 hover:bg-red-50 shrink-0"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
}

// ─── Order Summary card ────────────────────────────────────────────────────────

interface SummaryCardProps {
  subtotal: number;
  total: number;
  isEmpty: boolean;
  onCheckout: () => void;
  onContinue: () => void;
}

function SummaryCard({
  subtotal,
  total,
  isEmpty,
  onCheckout,
  onContinue,
}: SummaryCardProps) {
  const [coupon, setCoupon] = useState('');

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-base font-semibold text-[#122036]">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-0 space-y-3">
        {/* Line items */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-gray-500 text-xs">
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-[#122036]">{formatCurrency(total)}</span>
        </div>

        {/* Coupon */}
        <div className="pt-1">
          <div className="flex gap-2">
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="text-sm h-9"
            />
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 h-9 px-3"
              onClick={() => toast.info('Coupon feature coming soon')}
            >
              <Tag size={13} className="mr-1" />
              Apply
            </Button>
          </div>
        </div>

        {/* Checkout */}
        <Button
          size="lg"
          className="w-full bg-[#1a4fa0] hover:bg-[#1a4fa0]/90 text-white rounded-xl mt-1"
          disabled={isEmpty}
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>

        {/* Continue shopping */}
        <p className="text-center text-sm">
          <button
            className="text-blue-600 hover:underline"
            onClick={onContinue}
          >
            Continue Shopping
          </button>
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center col-span-full">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <ShoppingCart size={36} className="text-gray-300" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">
        Looks like you haven&apos;t added any items yet.
      </p>
      <Button
        className="bg-[#1a4fa0] hover:bg-[#1a4fa0]/90 text-white"
        onClick={onBrowse}
      >
        Browse Products
      </Button>
    </div>
  );
}

// ─── Error state ───────────────────────────────────────────────────────────────

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center col-span-full">
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 max-w-sm w-full">
        <p className="text-sm font-medium text-red-700 mb-3">Failed to load cart</p>
        <Button size="sm" variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Local quantity map: itemId → qty
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  // Optimistically removed item IDs
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  // Debounce timers per item
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const {
    data: cart,
    isLoading,
    isError,
    refetch,
  } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: () => apiFetch<Cart>('/cart'),
  });

  // Sync local quantities when cart data arrives
  useEffect(() => {
    if (cart?.items) {
      setQuantities((prev) => {
        const next: Record<string, number> = { ...prev };
        cart.items.forEach((item) => {
          if (!(item.id in next)) {
            next[item.id] = item.quantity;
          }
        });
        return next;
      });
    }
  }, [cart]);

  // ── Quantity change with debounced PATCH ────────────────────────────────────

  const handleQuantityChange = useCallback(
    (itemId: string, newQty: number) => {
      if (newQty < 1) return;
      setQuantities((prev) => ({ ...prev, [itemId]: newQty }));

      // Clear existing debounce for this item
      if (debounceTimers.current[itemId]) {
        clearTimeout(debounceTimers.current[itemId]);
      }

      debounceTimers.current[itemId] = setTimeout(async () => {
        try {
          await apiFetch(`/cart/items/${itemId}`, {
            method: 'PATCH',
            body: JSON.stringify({ quantity: newQty }),
          });
          queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch {
          toast.error('Failed to update quantity');
          // Restore from server state
          if (cart?.items) {
            const original = cart.items.find((i) => i.id === itemId);
            if (original) {
              setQuantities((prev) => ({ ...prev, [itemId]: original.quantity }));
            }
          }
        }
      }, 400);
    },
    [cart, queryClient]
  );

  // ── Remove item with optimistic update ─────────────────────────────────────

  const handleRemove = useCallback(
    async (itemId: string) => {
      setRemovingIds((prev) => new Set(prev).add(itemId));
      // Optimistically update query cache
      const previous = queryClient.getQueryData<Cart>(['cart']);
      queryClient.setQueryData<Cart>(['cart'], (old) => {
        if (!old) return old;
        const items = old.items.filter((i) => i.id !== itemId);
        const subtotal = items.reduce((sum, i) => sum + i.unitPrice * (quantities[i.id] ?? i.quantity), 0);
        return { ...old, items, subtotal, total: subtotal };
      });

      try {
        await apiFetch(`/cart/items/${itemId}`, { method: 'DELETE' });
        toast.success('Item removed from cart');
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      } catch {
        // Restore
        if (previous) queryClient.setQueryData(['cart'], previous);
        toast.error('Failed to remove item');
      } finally {
        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(itemId);
          return next;
        });
      }
    },
    [queryClient, quantities]
  );

  // Cleanup debounce timers on unmount
  useEffect(() => {
    const timers = debounceTimers.current;
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  // Visible items (filter out locally removed ones not yet settled)
  const visibleItems = cart?.items.filter((i) => !removingIds.has(i.id)) ?? [];
  const isEmpty = !isLoading && !isError && visibleItems.length === 0;

  // Compute local subtotal using live quantities
  const localSubtotal = visibleItems.reduce(
    (sum, item) => sum + item.unitPrice * (quantities[item.id] ?? item.quantity),
    0
  );
  const localTotal = cart ? localSubtotal : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-[#122036]">Shopping Cart</h1>
        {!isLoading && !isError && visibleItems.length > 0 && (
          <Badge variant="info" className="text-xs px-2.5 py-0.5 rounded-full">
            {visibleItems.length} {visibleItems.length === 1 ? 'item' : 'items'}
          </Badge>
        )}
      </div>

      {isLoading ? (
        /* ── Loading ── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0 divide-y">
                <ItemSkeletonRow />
                <ItemSkeletonRow />
                <ItemSkeletonRow />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <SummarySkeleton />
            </Card>
          </div>
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isEmpty ? (
        <EmptyState onBrowse={() => router.push('/shop')} />
      ) : (
        /* ── Main layout ── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Items list */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {visibleItems.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    quantity={quantities[item.id] ?? item.quantity}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                    isRemoving={removingIds.has(item.id)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <div>
            <SummaryCard
              subtotal={localSubtotal}
              total={localTotal}
              isEmpty={visibleItems.length === 0}
              onCheckout={() => toast.info('Checkout coming soon')}
              onContinue={() => router.push('/shop')}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
