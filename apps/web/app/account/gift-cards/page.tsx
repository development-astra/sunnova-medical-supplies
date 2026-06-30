'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Gift, CreditCard, ArrowRight, Inbox, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function GiftCardsPage() {
  const [code, setCode] = useState('');
  const [redeeming, setRedeeming] = useState(false);

  function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setRedeeming(true);
    setTimeout(() => {
      setRedeeming(false);
      setCode('');
      toast.info('Gift card redemption coming soon! We\'ll notify you when this feature is available.');
    }, 800);
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
          Gift Cards
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your gift card balance and redemptions.
        </p>
      </div>

      {/* Coming soon banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
        <Sparkles size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Gift cards are coming soon! This page is a preview of what&apos;s available.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Current balance */}
          <Card className="border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-[#1a4fa0] to-[#2563eb] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80 mb-1">Current Balance</p>
                  <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>$0.00</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                  <CreditCard size={26} className="text-white" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs opacity-70">No gift cards applied to your account</p>
              </div>
            </div>
          </Card>

          {/* Redeem form */}
          <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
                Redeem a Gift Card
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-5">
              <form onSubmit={handleRedeem} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="gift-code" className="text-sm font-medium">Gift Card Code</Label>
                  <div className="flex gap-3">
                    <Input
                      id="gift-code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="flex-1 font-mono tracking-wider"
                      maxLength={19}
                    />
                    <Button
                      type="submit"
                      disabled={!code.trim() || redeeming}
                      className="bg-[#1a4fa0] hover:bg-[#163d80] text-white shrink-0"
                    >
                      {redeeming ? 'Redeeming…' : 'Redeem'}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Enter the 16-digit code found on your gift card or in your email.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Transaction history */}
          <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
                Transaction History
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Inbox size={24} className="text-slate-400" />
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300" style={{ fontFamily: 'var(--font-heading)' }}>
                No gift card transactions yet
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                Redeemed gift cards and spending history will appear here.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* How it works */}
          <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#122036] dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
                How It Works
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <div className="space-y-4">
                {[
                  { icon: Gift,       label: 'Receive',  desc: 'Get a gift card by email or physical card from Sunnova Medical Supplies.' },
                  { icon: CreditCard, label: 'Redeem',   desc: 'Enter your code above to add the balance to your account.' },
                  { icon: ShieldCheck,label: 'Save',     desc: 'Your balance is applied automatically at checkout — no code needed.' },
                ].map(({ icon: Icon, label, desc }, i) => (
                  <div key={label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#1a4fa0]/10 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-[#1a4fa0] dark:text-blue-400" />
                      </div>
                      {i < 2 && <div className="w-px flex-1 bg-slate-100 dark:bg-slate-800 mt-1 mb-1 min-h-[16px]" />}
                    </div>
                    <div className="pb-4 last:pb-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info card */}
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
              Need a Gift Card?
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Gift cards make the perfect gift for healthcare professionals. Contact our team to purchase.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 gap-1.5 text-[#1a4fa0] border-[#1a4fa0]/30 hover:bg-[#1a4fa0]/5"
              onClick={() => toast.info('Contact us at support@sunnovamedical.com to purchase gift cards.')}
            >
              Contact Us
              <ArrowRight size={13} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
