'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Bell, Package, Truck, Tag, X, CheckCheck, Filter, Inbox,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn, formatRelative, formatDate } from '@/lib/utils';
import { notificationsApi, type Notification } from '@/lib/customer-api';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function notifIcon(type: string) {
  switch (type) {
    case 'ORDER_UPDATE': return Package;
    case 'SHIPPING':     return Truck;
    case 'PROMO':        return Tag;
    default:             return Bell;
  }
}

function groupByDate(notifications: Notification[]): Record<string, Notification[]> {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterday = today - 86400000;

  const groups: Record<string, Notification[]> = {
    Today: [],
    Yesterday: [],
    Earlier: [],
  };

  for (const n of notifications) {
    const d = new Date(n.createdAt).getTime();
    if (d >= today) groups.Today.push(n);
    else if (d >= yesterday) groups.Yesterday.push(n);
    else groups.Earlier.push(n);
  }

  return groups;
}

const TAB_FILTERS: Record<string, (n: Notification) => boolean> = {
  all:       () => true,
  orders:    (n) => n.type === 'ORDER_UPDATE',
  shipping:  (n) => n.type === 'SHIPPING',
  promos:    (n) => n.type === 'PROMO',
  messages:  (n) => n.type === 'MESSAGE',
};

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function NotifSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Notification card ─────────────────────────────────────────────────────────

function NotifCard({
  notification,
  onMarkRead,
  onDelete,
}: {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const Icon = notifIcon(notification.type);

  function handleClick() {
    if (!notification.read) onMarkRead(notification.id);
    if (notification.link) router.push(notification.link);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative group flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border transition-all duration-150 cursor-pointer',
        notification.read
          ? 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
          : 'border-l-4 border-l-[#1a4fa0] border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-blue-50/30 dark:bg-blue-950/10',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Icon */}
      <div className={cn(
        'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
        notification.read
          ? 'bg-slate-100 dark:bg-slate-800'
          : 'bg-blue-100 dark:bg-blue-900/40',
      )}>
        <Icon size={16} className={notification.read ? 'text-slate-500' : 'text-[#1a4fa0] dark:text-blue-400'} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn(
            'text-sm leading-snug',
            notification.read
              ? 'font-medium text-slate-700 dark:text-slate-300'
              : 'font-semibold text-slate-900 dark:text-slate-100',
          )}>
            {notification.title}
          </p>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0 mt-0.5">
            {formatRelative(notification.createdAt)}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
          {notification.message}
        </p>
        {!notification.read && (
          <span className="inline-block mt-1.5 w-2 h-2 rounded-full bg-[#1a4fa0]" />
        )}
      </div>

      {/* Delete button */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12 }}
            onClick={(e) => { e.stopPropagation(); onDelete(notification.id); }}
            className="absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400 text-slate-400 transition-colors"
          >
            <X size={12} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Group section ─────────────────────────────────────────────────────────────

function GroupSection({
  label,
  notifications,
  onMarkRead,
  onDelete,
}: {
  label: string;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (!notifications.length) return null;
  return (
    <div>
      <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2 px-1">
        {label}
      </p>
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {notifications.map((n) => (
            <NotifCard key={n.id} notification={n} onMarkRead={onMarkRead} onDelete={onDelete} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const qc = useQueryClient();
  const [tab, setTab] = useState('all');

  const { data: notifications = [], isLoading, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.list,
  });

  const markReadMutation = useMutation({
    mutationFn: notificationsApi.markRead,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['notifications'] });
      const prev = qc.getQueryData<Notification[]>(['notifications']);
      qc.setQueryData<Notification[]>(['notifications'], (old) =>
        old?.map((n) => n.id === id ? { ...n, read: true } : n) ?? [],
      );
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(['notifications'], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markAllReadMutation = useMutation({
    mutationFn: notificationsApi.markAllRead,
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ['notifications'] });
      const prev = qc.getQueryData<Notification[]>(['notifications']);
      qc.setQueryData<Notification[]>(['notifications'], (old) =>
        old?.map((n) => ({ ...n, read: true })) ?? [],
      );
      return { prev };
    },
    onSuccess: () => toast.success('All notifications marked as read'),
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['notifications'], ctx.prev);
      toast.error('Failed to mark all as read');
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: notificationsApi.delete,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['notifications'] });
      const prev = qc.getQueryData<Notification[]>(['notifications']);
      qc.setQueryData<Notification[]>(['notifications'], (old) =>
        old?.filter((n) => n.id !== id) ?? [],
      );
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(['notifications'], ctx.prev);
      toast.error('Failed to delete notification');
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    const fn = TAB_FILTERS[tab] ?? (() => true);
    return notifications.filter(fn);
  }, [notifications, tab]);

  const groups = useMemo(() => groupByDate(filtered), [filtered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <Badge className="bg-[#1a4fa0] text-white text-[11px] px-2 py-0.5 rounded-full">
                {unreadCount}
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Stay updated on your orders, shipments, and account activity.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAllReadMutation.mutate()}
            disabled={markAllReadMutation.isPending}
            className="shrink-0 gap-2 text-[#1a4fa0] border-[#1a4fa0]/30 hover:bg-blue-50 dark:hover:bg-blue-950/20"
          >
            <CheckCheck size={14} />
            Mark all read
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-100 dark:bg-slate-800/60 h-9">
          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          <TabsTrigger value="orders" className="text-xs">Orders</TabsTrigger>
          <TabsTrigger value="shipping" className="text-xs">Shipping</TabsTrigger>
          <TabsTrigger value="promos" className="text-xs">Promotions</TabsTrigger>
          <TabsTrigger value="messages" className="text-xs">Messages</TabsTrigger>
        </TabsList>

        {['all', 'orders', 'shipping', 'promos', 'messages'].map((t) => (
          <TabsContent key={t} value={t} className="mt-4">
            {isLoading ? (
              <NotifSkeleton />
            ) : isError ? (
              <div className="text-center py-16 text-slate-500 dark:text-slate-400">
                <Bell size={32} className="mx-auto mb-3 opacity-40" />
                <p className="font-medium">Failed to load notifications</p>
                <p className="text-sm mt-1">Please try refreshing the page.</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Inbox size={28} className="text-slate-400 dark:text-slate-500" />
                </div>
                <p className="font-semibold text-slate-700 dark:text-slate-300" style={{ fontFamily: 'var(--font-heading)' }}>
                  You&apos;re all caught up!
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  No notifications in this category.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {(['Today', 'Yesterday', 'Earlier'] as const).map((label) => (
                  <GroupSection
                    key={label}
                    label={label}
                    notifications={groups[label] ?? []}
                    onMarkRead={(id) => markReadMutation.mutate(id)}
                    onDelete={(id) => deleteMutation.mutate(id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}
