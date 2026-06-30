'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Award, Gift, Star, ShoppingCart, Users, Cake, ChevronRight,
  TrendingUp, Copy, Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { cn, formatDate } from '@/lib/utils';
import { rewardsApi, type RewardTransaction } from '@/lib/customer-api';

// ─── Tier config ───────────────────────────────────────────────────────────────

const TIERS = [
  { name: 'Bronze',   min: 0,    max: 499,  color: 'from-amber-700 to-amber-500',   bg: 'bg-amber-50 dark:bg-amber-950/20',   text: 'text-amber-700 dark:text-amber-400',   badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' },
  { name: 'Silver',   min: 500,  max: 1999, color: 'from-slate-500 to-slate-400',   bg: 'bg-slate-50 dark:bg-slate-800/40',   text: 'text-slate-600 dark:text-slate-300',   badge: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { name: 'Gold',     min: 2000, max: 4999, color: 'from-yellow-500 to-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/20', text: 'text-yellow-700 dark:text-yellow-400', badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' },
  { name: 'Platinum', min: 5000, max: Infinity, color: 'from-cyan-600 to-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/20',     text: 'text-cyan-700 dark:text-cyan-400',     badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400' },
];

function getTier(points: number) {
  return TIERS.find((t) => points >= t.min && points <= t.max) ?? TIERS[0];
}

function getNextTier(currentTierName: string) {
  const idx = TIERS.findIndex((t) => t.name === currentTierName);
  return idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
}

// ─── Transaction type config ───────────────────────────────────────────────────

const TX_TYPE_META: Record<string, { label: string; className: string }> = {
  PURCHASE:       { label: 'Purchase',       className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' },
  REVIEW:         { label: 'Review',         className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400' },
  REFERRAL:       { label: 'Referral',       className: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' },
  BIRTHDAY:       { label: 'Birthday',       className: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400' },
  REDEMPTION:     { label: 'Redemption',     className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' },
  ADJUSTMENT:     { label: 'Adjustment',     className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
  EXPIRY:         { label: 'Expiry',         className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
};

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function RewardsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-48 rounded-2xl" />
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-4 text-center">
      <p className="text-2xl font-bold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
        {value}
      </p>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
      {sub && <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function RewardsPage() {
  const [copied, setCopied] = useState(false);

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['rewards-summary'],
    queryFn: rewardsApi.summary,
  });

  const { data: history = [], isLoading: historyLoading } = useQuery({
    queryKey: ['rewards-history'],
    queryFn: rewardsApi.history,
  });

  const isLoading = summaryLoading || historyLoading;

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>Rewards</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Earn points with every purchase.</p>
        </div>
        <RewardsSkeleton />
      </motion.div>
    );
  }

  const totalPoints = summary?.totalPoints ?? 0;
  const lifetimePoints = summary?.lifetimePoints ?? 0;
  const tier = getTier(totalPoints);
  const nextTier = getNextTier(tier.name);
  const pointsToNext = nextTier ? nextTier.min - totalPoints : 0;
  const progressPct = nextTier
    ? Math.min(100, ((totalPoints - tier.min) / (nextTier.min - tier.min)) * 100)
    : 100;

  function handleCopyReferral() {
    navigator.clipboard.writeText(`${window.location.origin}?ref=sunnova-me`).then(() => {
      setCopied(true);
      toast.success('Referral link copied!');
      setTimeout(() => setCopied(false), 2500);
    });
  }

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
          Rewards
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Earn points with every purchase and redeem them for discounts.
        </p>
      </div>

      {/* Hero card */}
      <div className={cn('relative rounded-2xl overflow-hidden bg-gradient-to-br', tier.color, 'p-6 text-white shadow-lg')}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white" />
          <div className="absolute -bottom-12 -left-8 w-64 h-64 rounded-full bg-white" />
        </div>
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award size={18} className="opacity-90" />
                <span className="text-sm font-semibold opacity-90">{tier.name} Member</span>
              </div>
              <p className="text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {totalPoints.toLocaleString()}
              </p>
              <p className="text-sm opacity-80 mt-1">Available Points</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                <Award size={14} />
                {tier.name}
              </span>
            </div>
          </div>

          {nextTier && (
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="opacity-80">{tier.name}</span>
                <span className="opacity-80">{nextTier.name} ({nextTier.min.toLocaleString()} pts)</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs opacity-80 mt-1.5">
                {pointsToNext.toLocaleString()} more points to {nextTier.name}
              </p>
            </div>
          )}

          {!nextTier && (
            <div className="mt-4 flex items-center gap-2">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2 w-full" />
              </div>
              <span className="text-xs opacity-80 whitespace-nowrap">Max tier reached!</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Available Points" value={totalPoints.toLocaleString()} />
        <StatCard label="Lifetime Points" value={lifetimePoints.toLocaleString()} />
        <StatCard
          label="Next Tier In"
          value={nextTier ? `${pointsToNext.toLocaleString()} pts` : 'Max!'}
          sub={nextTier?.name}
        />
      </div>

      {/* All tiers */}
      <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
            Membership Tiers
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={cn(
                  'rounded-xl p-4 border-2 transition-all',
                  t.name === tier.name
                    ? 'border-current shadow-sm ' + t.bg + ' ' + t.text
                    : 'border-transparent bg-slate-50 dark:bg-slate-800/40 text-slate-500',
                )}
              >
                <Award size={20} className="mb-2" />
                <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{t.name}</p>
                <p className="text-xs mt-0.5 opacity-75">
                  {t.max === Infinity ? `${t.min.toLocaleString()}+ pts` : `${t.min.toLocaleString()} – ${t.max.toLocaleString()} pts`}
                </p>
                {t.name === tier.name && (
                  <span className={cn('mt-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full', t.badge)}>
                    Current
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Points history */}
      <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
            Points History
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          {history.length === 0 ? (
            <div className="text-center py-12 px-4">
              <TrendingUp size={28} className="mx-auto mb-3 text-slate-400" />
              <p className="font-medium text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-heading)' }}>
                No points activity yet
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Make your first purchase to start earning points.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Date</th>
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Type</th>
                    <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Description</th>
                    <th className="text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((tx: RewardTransaction, i: number) => {
                    const meta = TX_TYPE_META[tx.type] ?? TX_TYPE_META.ADJUSTMENT;
                    const isPositive = tx.points > 0;
                    return (
                      <tr
                        key={tx.id}
                        className={cn(
                          'border-b border-slate-50 dark:border-slate-800/50 last:border-0',
                          i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20',
                        )}
                      >
                        <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {formatDate(tx.createdAt)}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', meta.className)}>
                            {meta.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-slate-700 dark:text-slate-300">
                          {tx.description}
                        </td>
                        <td className={cn(
                          'px-5 py-3.5 text-right font-bold tabular-nums text-sm',
                          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400',
                        )}>
                          {isPositive ? '+' : ''}{tx.points.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Referral */}
      <Card className="border-slate-100 dark:border-slate-800 shadow-sm bg-gradient-to-br from-[#1a4fa0]/5 to-blue-50 dark:from-blue-950/20 dark:to-slate-900">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a4fa0]/10 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
              <Users size={22} className="text-[#1a4fa0] dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
                Refer a Friend, Earn 500 Points
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Share your referral link. When your friend makes their first purchase, you both earn <strong className="text-[#1a4fa0]">500 points</strong>.
              </p>
              <Button
                onClick={handleCopyReferral}
                variant="outline"
                size="sm"
                className="mt-3 gap-2 border-[#1a4fa0]/30 text-[#1a4fa0] hover:bg-[#1a4fa0]/5"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Referral Link'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to earn */}
      <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
            How to Earn Points
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: ShoppingCart, label: 'Make a Purchase',   desc: '+1 point per $1 spent',        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' },
              { icon: Star,         label: 'Write a Review',    desc: '+50 points per review',         color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400' },
              { icon: Users,        label: 'Refer a Friend',    desc: '+500 points per referral',      color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' },
              { icon: Cake,         label: 'Birthday Bonus',    desc: '+100 points on your birthday',  color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400' },
            ].map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', color)}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
