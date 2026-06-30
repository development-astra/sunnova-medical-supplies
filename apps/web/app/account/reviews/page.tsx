'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Star, Pencil, Trash2, Plus, Package, CheckCircle2,
  Clock, XCircle, ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import { cn, formatDate } from '@/lib/utils';
import { reviewsApi, ordersApi, type Review, type Order } from '@/lib/customer-api';

// ─── Star rating component ─────────────────────────────────────────────────────

function StarRating({
  value,
  onChange,
  readonly = false,
  size = 20,
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: number;
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={cn(
            'transition-transform',
            !readonly && 'hover:scale-110 cursor-pointer',
            readonly && 'cursor-default',
          )}
        >
          <Star
            size={size}
            className={cn(
              'transition-colors',
              star <= display
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-slate-300 dark:text-slate-600',
            )}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Status badge ──────────────────────────────────────────────────────────────

function ReviewStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string; icon: React.ElementType }> = {
    PUBLISHED: { label: 'Published', className: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400', icon: CheckCircle2 },
    PENDING:   { label: 'Pending',   className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400', icon: Clock },
    REJECTED:  { label: 'Rejected',  className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400', icon: XCircle },
  };
  const meta = map[status] ?? map.PENDING;
  const Icon = meta.icon;
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full', meta.className)}>
      <Icon size={11} />
      {meta.label}
    </span>
  );
}

// ─── Review form schema ────────────────────────────────────────────────────────

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  title:  z.string().optional(),
  body:   z.string().min(10, 'Review must be at least 10 characters').optional().or(z.literal('')),
});
type ReviewFormValues = z.infer<typeof reviewSchema>;

// ─── Edit review dialog ────────────────────────────────────────────────────────

function EditReviewDialog({
  review,
  open,
  onClose,
}: {
  review: Review;
  open: boolean;
  onClose: () => void;
}) {
  const qc = useQueryClient();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: review.rating,
      title:  review.title ?? '',
      body:   review.body ?? '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ReviewFormValues) =>
      reviewsApi.update(review.id, {
        rating: data.rating,
        title:  data.title || undefined,
        body:   data.body || undefined,
      }),
    onSuccess: () => {
      toast.success('Review updated');
      qc.invalidateQueries({ queryKey: ['reviews'] });
      onClose();
    },
    onError: () => toast.error('Failed to update review'),
  });

  const rating = watch('rating') ?? review.rating;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'var(--font-heading)' }}>Edit Review</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            {review.product.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Rating</Label>
            <StarRating value={rating} onChange={(v) => setValue('rating', v)} />
            {errors.rating && <p className="text-xs text-red-500">{errors.rating.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit-title" className="text-sm font-medium">Title <span className="text-slate-400 font-normal">(optional)</span></Label>
            <Input id="edit-title" placeholder="Summarize your review" {...register('title')} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit-body" className="text-sm font-medium">Review <span className="text-slate-400 font-normal">(optional)</span></Label>
            <Textarea id="edit-body" rows={4} placeholder="Share your experience…" {...register('body')} />
            {errors.body && <p className="text-xs text-red-500">{errors.body.message}</p>}
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending} className="bg-[#1a4fa0] hover:bg-[#163d80] text-white">
              {mutation.isPending ? 'Saving…' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Write review dialog ───────────────────────────────────────────────────────

function WriteReviewDialog({
  productId,
  productName,
  orderId,
  open,
  onClose,
}: {
  productId: string;
  productName: string;
  orderId?: string;
  open: boolean;
  onClose: () => void;
}) {
  const qc = useQueryClient();

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, title: '', body: '' },
  });

  const mutation = useMutation({
    mutationFn: (data: ReviewFormValues) =>
      reviewsApi.create({
        productId,
        rating: data.rating,
        title:  data.title || undefined,
        body:   data.body || undefined,
        orderId,
      }),
    onSuccess: () => {
      toast.success('Review submitted! Thank you for your feedback.');
      qc.invalidateQueries({ queryKey: ['reviews'] });
      reset();
      onClose();
    },
    onError: () => toast.error('Failed to submit review'),
  });

  const rating = watch('rating') ?? 0;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onClose(); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'var(--font-heading)' }}>Write a Review</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">{productName}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Your Rating <span className="text-red-500">*</span></Label>
            <StarRating value={rating} onChange={(v) => setValue('rating', v)} size={24} />
            {errors.rating && <p className="text-xs text-red-500">{errors.rating.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-title" className="text-sm font-medium">Title <span className="text-slate-400 font-normal">(optional)</span></Label>
            <Input id="new-title" placeholder="Summarize your review" {...register('title')} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-body" className="text-sm font-medium">Review <span className="text-slate-400 font-normal">(optional, min 10 chars)</span></Label>
            <Textarea id="new-body" rows={4} placeholder="Share your experience with this product…" {...register('body')} />
            {errors.body && <p className="text-xs text-red-500">{errors.body.message}</p>}
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={() => reset()}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending || rating === 0} className="bg-[#1a4fa0] hover:bg-[#163d80] text-white">
              {mutation.isPending ? 'Submitting…' : 'Submit Review'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete confirmation ───────────────────────────────────────────────────────

function DeleteConfirmDialog({
  reviewId,
  open,
  onClose,
}: {
  reviewId: string;
  open: boolean;
  onClose: () => void;
}) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => reviewsApi.delete(reviewId),
    onSuccess: () => {
      toast.success('Review deleted');
      qc.invalidateQueries({ queryKey: ['reviews'] });
      onClose();
    },
    onError: () => toast.error('Failed to delete review'),
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'var(--font-heading)' }}>Delete Review?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Your review will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            variant="destructive"
          >
            {mutation.isPending ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Review card ──────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-4"
    >
      <div className="flex items-start gap-4">
        {/* Product image placeholder */}
        <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
          {review.product.imageUrl ? (
            <img src={review.product.imageUrl} alt={review.product.name} className="w-full h-full object-cover" />
          ) : (
            <Package size={24} className="text-slate-400" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                {review.product.name}
              </p>
              <StarRating value={review.rating} readonly size={14} />
            </div>
            <ReviewStatusBadge status={review.status} />
          </div>

          {review.title && (
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">
              {review.title}
            </p>
          )}
          {review.body && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-3">
              {review.body}
            </p>
          )}

          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-slate-400">{formatDate(review.createdAt)}</p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditOpen(true)}
                className="h-7 px-2 text-xs gap-1 text-slate-500 hover:text-[#1a4fa0]"
              >
                <Pencil size={12} />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteOpen(true)}
                className="h-7 px-2 text-xs gap-1 text-slate-500 hover:text-red-600"
              >
                <Trash2 size={12} />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EditReviewDialog review={review} open={editOpen} onClose={() => setEditOpen(false)} />
      <DeleteConfirmDialog reviewId={review.id} open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </motion.div>
  );
}

// ─── Pending review card ───────────────────────────────────────────────────────

function PendingReviewCard({
  productId,
  productName,
  productImage,
  orderId,
  orderNumber,
  reviewedIds,
}: {
  productId: string;
  productName: string;
  productImage: string | null;
  orderId: string;
  orderNumber: string;
  reviewedIds: Set<string>;
}) {
  const [open, setOpen] = useState(false);
  const alreadyReviewed = reviewedIds.has(productId);

  if (alreadyReviewed) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-4 flex items-start gap-4">
      <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
        {productImage ? (
          <img src={productImage} alt={productName} className="w-full h-full object-cover" />
        ) : (
          <Package size={20} className="text-slate-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{productName}</p>
        <p className="text-xs text-slate-400 mt-0.5">From order #{orderNumber}</p>
        <div className="flex gap-1 mt-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={13} className="text-slate-300 dark:text-slate-600" />
          ))}
        </div>
      </div>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className="shrink-0 bg-[#1a4fa0] hover:bg-[#163d80] text-white gap-1.5"
      >
        <Plus size={13} />
        Write Review
      </Button>

      <WriteReviewDialog
        productId={productId}
        productName={productName}
        orderId={orderId}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ReviewsPage() {
  const [tab, setTab] = useState('reviews');

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: reviewsApi.list,
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.list(1),
  });

  const reviewedProductIds = new Set(reviews.map((r) => r.productId));

  const pendingItems = orders
    .filter((o: Order) => o.status === 'DELIVERED')
    .flatMap((o: Order) =>
      o.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        productImage: item.product.imageUrl,
        orderId: o.id,
        orderNumber: o.orderNumber,
      })),
    )
    .filter((item) => !reviewedProductIds.has(item.productId));

  // Deduplicate by productId
  const seen = new Set<string>();
  const uniquePending = pendingItems.filter((item) => {
    if (seen.has(item.productId)) return false;
    seen.add(item.productId);
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
          Reviews
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Share your experience and help other customers.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-100 dark:bg-slate-800/60">
          <TabsTrigger value="reviews" className="gap-2">
            <Star size={14} />
            My Reviews
            {reviews.length > 0 && (
              <span className="ml-1 text-[10px] bg-slate-500 text-white rounded-full px-1.5 py-0.5 leading-none">
                {reviews.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <ShoppingBag size={14} />
            Pending Reviews
            {uniquePending.length > 0 && (
              <span className="ml-1 text-[10px] bg-[#ee6a12] text-white rounded-full px-1.5 py-0.5 leading-none">
                {uniquePending.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* My Reviews */}
        <TabsContent value="reviews" className="mt-5">
          {reviewsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-slate-400" />
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300" style={{ fontFamily: 'var(--font-heading)' }}>
                No reviews yet
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
                Share your experience with products you&apos;ve purchased.
              </p>
              <Button onClick={() => setTab('pending')} className="bg-[#1a4fa0] hover:bg-[#163d80] text-white">
                Write Your First Review
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        {/* Pending Reviews */}
        <TabsContent value="pending" className="mt-5">
          {ordersLoading || reviewsLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
            </div>
          ) : uniquePending.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-slate-400" />
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300" style={{ fontFamily: 'var(--font-heading)' }}>
                All caught up!
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                You&apos;ve reviewed all your delivered orders.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                You have {uniquePending.length} product{uniquePending.length !== 1 ? 's' : ''} awaiting a review. Earn <strong className="text-[#1a4fa0]">+50 points</strong> per review!
              </p>
              {uniquePending.map((item) => (
                <PendingReviewCard
                  key={`${item.productId}-${item.orderId}`}
                  {...item}
                  reviewedIds={reviewedProductIds}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
