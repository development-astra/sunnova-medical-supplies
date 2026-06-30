'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Heart, HeartOff, ShoppingCart } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { wishlistApi, type WishlistItem } from '@/lib/customer-api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// ─── Medical placeholder SVG ──────────────────────────────────────────────────

function MedicalPlaceholder() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12 text-gray-300"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="76" height="76" rx="14" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
      <rect x="34" y="20" width="12" height="40" rx="3" fill="#d1d5db" />
      <rect x="20" y="34" width="40" height="12" rx="3" fill="#d1d5db" />
    </svg>
  );
}

// ─── Loading skeleton card ─────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-24" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}

// ─── Product card ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  item: WishlistItem;
  onRemove: (productId: string) => void;
  isRemoving: boolean;
}

function ProductCard({ item, onRemove, isRemoving }: ProductCardProps) {
  const { product } = item;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className={cn(
        'rounded-xl border bg-white shadow-sm overflow-hidden',
        'transition-all duration-200 hover:shadow-md hover:scale-[1.02]',
        isRemoving && 'opacity-50 pointer-events-none'
      )}
    >
      {/* Image */}
      <div className="aspect-square bg-gray-50 flex items-center justify-center relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <MedicalPlaceholder />
        )}
      </div>

      {/* Body */}
      <div className="p-3">
        {/* Category */}
        <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-full">
          {product.category.name}
        </Badge>

        {/* Name */}
        <p className="text-sm font-medium text-gray-900 line-clamp-2 mt-1 leading-snug">
          {product.name}
        </p>

        {/* Price */}
        <p className="text-base font-semibold text-[#1a4fa0] mt-1">
          {formatCurrency(product.price)}{' '}
          <span className="text-xs font-normal text-gray-500">/ {product.unit}</span>
        </p>

        {/* In stock */}
        <span className="inline-block text-xs bg-green-50 text-green-700 rounded px-1.5 py-0.5 mt-1 font-medium">
          In Stock
        </span>

        {/* Actions */}
        <div className="mt-2 flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-[#1a4fa0] hover:bg-[#1a4fa0]/90 text-white text-xs h-8"
            onClick={() =>
              toast.success('Added to cart', { description: product.name })
            }
          >
            <ShoppingCart size={13} className="mr-1" />
            Move to Cart
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            className="text-red-400 hover:text-red-600 hover:bg-red-50 shrink-0"
            onClick={() => onRemove(product.id)}
            disabled={isRemoving}
            aria-label="Remove from wishlist"
          >
            <HeartOff size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <Heart size={36} className="text-gray-300" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">
        Save items you love and come back to them later.
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
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 max-w-sm w-full">
        <p className="text-sm font-medium text-red-700 mb-3">Failed to load wishlist</p>
        <Button size="sm" variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function WishlistPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: items,
    isLoading,
    isError,
    refetch,
  } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn: wishlistApi.list,
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => wishlistApi.remove(productId),
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      const previous = queryClient.getQueryData<WishlistItem[]>(['wishlist']);
      queryClient.setQueryData<WishlistItem[]>(['wishlist'], (old) =>
        (old ?? []).filter((item) => item.productId !== productId)
      );
      return { previous };
    },
    onError: (_err, _productId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['wishlist'], context.previous);
      }
      toast.error('Failed to remove item');
    },
    onSuccess: () => {
      toast.success('Removed from wishlist');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-[#122036]">My Wishlist</h1>
        {!isLoading && items && items.length > 0 && (
          <Badge variant="info" className="text-xs px-2.5 py-0.5 rounded-full">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </Badge>
        )}
      </div>

      {/* States */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !items || items.length === 0 ? (
        <EmptyState onBrowse={() => router.push('/shop')} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onRemove={(productId) => removeMutation.mutate(productId)}
              isRemoving={
                removeMutation.isPending &&
                removeMutation.variables === item.productId
              }
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
