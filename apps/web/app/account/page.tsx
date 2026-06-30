'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  ShoppingBag, Clock, CheckCircle, Heart, MapPin,
  ArrowRight, ShoppingCart, Truck, UserCircle, Award, Coins,
  PackageOpen,
} from 'lucide-react';
import { cn, getInitials, formatCurrency, formatDate, ORDER_STATUS_META } from '@/lib/utils';
import { dashboardApi, type User, type DashboardSummary, type Order } from '@/lib/customer-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// ─── Stat card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  bg: string;
  loading?: boolean;
}

function StatCard({ label, value, icon: Icon, color, bg, loading }: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <Skeleton className="h-7 w-14" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', bg)}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
                {value}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Order status badge ────────────────────────────────────────────────────────

function OrderStatusBadge({ status }: { status: string }) {
  const meta = ORDER_STATUS_META[status] ?? { label: status, color: 'text-slate-700', bg: 'bg-slate-100' };
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', meta.bg, meta.color)}>
      {meta.label}
    </span>
  );
}

// ─── Quick action ──────────────────────────────────────────────────────────────

function QuickAction({ href, label, icon: Icon, description }: {
  href: string;
  label: string;
  icon: React.ElementType;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-blue-200 dark:group-hover:border-blue-800 flex items-center justify-center shrink-0 shadow-sm transition-colors">
        <Icon size={18} className="text-[#1a4fa0] dark:text-blue-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{description}</p>
      </div>
      <ArrowRight size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-[#1a4fa0] dark:group-hover:text-blue-400 shrink-0 transition-colors" />
    </Link>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AccountDashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const { data: summary, isLoading, isError, error } = useQuery<DashboardSummary>({
    queryKey: ['dashboard-summary'],
    queryFn: dashboardApi.summary,
  });

  const firstName = user?.firstName ?? 'there';
  const initials = getInitials(user?.firstName, user?.lastName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a4fa0] to-[#2563eb] flex items-center justify-center shadow-lg shrink-0">
            <span className="text-white text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              {initials}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
                Welcome back, {firstName}!
              </h1>
              <Badge variant="info" className="text-xs">
                Verified Member
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Here's what's happening with your account today.
            </p>
          </div>
        </div>

        {/* Rewards & credit pills */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </>
          ) : summary ? (
            <>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-full">
                <Award size={14} className="text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {summary.rewardPoints.toLocaleString()} pts
                </span>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          Failed to load dashboard data. Please refresh the page.
          {error instanceof Error && <span className="ml-1 opacity-70">({error.message})</span>}
        </div>
      )}

      {/* Stat cards */}
      <div>
        <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard
            label="Total Orders"
            value={summary?.totalOrders ?? 0}
            icon={ShoppingBag}
            color="text-[#1a4fa0] dark:text-blue-400"
            bg="bg-blue-50 dark:bg-blue-950/30"
            loading={isLoading}
          />
          <StatCard
            label="Pending"
            value={summary?.pendingOrders ?? 0}
            icon={Clock}
            color="text-amber-600 dark:text-amber-400"
            bg="bg-amber-50 dark:bg-amber-950/30"
            loading={isLoading}
          />
          <StatCard
            label="Completed"
            value={summary?.completedOrders ?? 0}
            icon={CheckCircle}
            color="text-green-600 dark:text-green-400"
            bg="bg-green-50 dark:bg-green-950/30"
            loading={isLoading}
          />
          <StatCard
            label="Wishlist"
            value={summary?.wishlistCount ?? 0}
            icon={Heart}
            color="text-pink-600 dark:text-pink-400"
            bg="bg-pink-50 dark:bg-pink-950/30"
            loading={isLoading}
          />
          <StatCard
            label="Addresses"
            value={summary?.addressCount ?? 0}
            icon={MapPin}
            color="text-purple-600 dark:text-purple-400"
            bg="bg-purple-50 dark:bg-purple-950/30"
            loading={isLoading}
          />
        </div>
      </div>

      {/* Bottom grid: Recent Orders + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4 px-5">
              <CardTitle className="text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                Recent Orders
              </CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-[#1a4fa0] dark:text-blue-400 text-xs">
                <Link href="/account/orders">View all <ArrowRight size={13} /></Link>
              </Button>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0">
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-20 rounded-full ml-auto" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              ) : !summary?.recentOrders?.length ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                    <PackageOpen size={24} className="text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No orders yet</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                    Start shopping to see your orders here.
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/shop">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-1">
                  <table className="w-full text-sm min-w-[480px]">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="text-left py-2 px-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order</th>
                        <th className="text-left py-2 px-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                        <th className="text-left py-2 px-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="text-right py-2 px-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</th>
                        <th className="text-right py-2 px-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                      {summary.recentOrders.slice(0, 5).map((order: Order) => (
                        <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-1">
                            <span className="font-medium text-slate-800 dark:text-slate-100">
                              #{order.orderNumber}
                            </span>
                          </td>
                          <td className="py-3 px-1 text-slate-500 dark:text-slate-400">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="py-3 px-1">
                            <OrderStatusBadge status={order.status} />
                          </td>
                          <td className="py-3 px-1 text-right font-medium text-slate-800 dark:text-slate-100">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="py-3 px-1 text-right">
                            <Link
                              href={`/account/orders/${order.id}`}
                              className="text-xs text-[#1a4fa0] dark:text-blue-400 hover:underline font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader className="py-4 px-5">
              <CardTitle className="text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0 space-y-2">
              <QuickAction
                href="/shop"
                label="Continue Shopping"
                icon={ShoppingCart}
                description="Browse our product catalog"
              />
              <QuickAction
                href="/account/orders"
                label="View Orders"
                icon={ShoppingBag}
                description="Track and manage your orders"
              />
              <QuickAction
                href="/account/track"
                label="Track Shipment"
                icon={Truck}
                description="Check delivery status"
              />
              <QuickAction
                href="/account/profile"
                label="Edit Profile"
                icon={UserCircle}
                description="Update your account details"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
