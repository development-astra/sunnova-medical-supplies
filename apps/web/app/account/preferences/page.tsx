'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import {
  Sun, Moon, Monitor, Globe, DollarSign, Mail, MessageSquare,
  Megaphone, Sparkles, Newspaper, Loader2, Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

// ─── Toggle switch ─────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a4fa0] focus-visible:ring-offset-2 shrink-0',
        checked ? 'bg-[#1a4fa0] dark:bg-blue-500' : 'bg-slate-200 dark:bg-slate-700',
      )}
    >
      <span
        className={cn(
          'inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-[18px]' : 'translate-x-[3px]',
        )}
      />
    </button>
  );
}

// ─── Preference row ────────────────────────────────────────────────────────────

function PrefRow({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
          <Icon size={15} className="text-slate-500 dark:text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// ─── Theme button ──────────────────────────────────────────────────────────────

function ThemeOption({
  value,
  label,
  icon: Icon,
  current,
  onSelect,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  current: string | undefined;
  onSelect: (v: string) => void;
}) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-150 flex-1',
        active
          ? 'border-[#1a4fa0] dark:border-blue-400 bg-blue-50 dark:bg-blue-950/20'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600',
      )}
      aria-pressed={active}
    >
      <div className={cn(
        'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
        active ? 'bg-[#1a4fa0] dark:bg-blue-500' : 'bg-slate-100 dark:bg-slate-800',
      )}>
        <Icon size={17} className={active ? 'text-white' : 'text-slate-500 dark:text-slate-400'} />
      </div>
      <span className={cn(
        'text-xs font-medium transition-colors',
        active ? 'text-[#1a4fa0] dark:text-blue-400' : 'text-slate-600 dark:text-slate-400',
      )}>
        {label}
      </span>
      {active && (
        <span className="absolute top-2 right-2">
          <Check size={11} className="text-[#1a4fa0] dark:text-blue-400" />
        </span>
      )}
    </button>
  );
}

// ─── Defaults ──────────────────────────────────────────────────────────────────

const NOTIFICATION_DEFAULTS = {
  emailNotifications: true,
  smsUpdates: false,
  marketingEmails: false,
  productRecommendations: true,
  newsletter: false,
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PreferencesPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [currency, setCurrency] = useState('USD');
  const [saving, setSaving] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATION_DEFAULTS);

  // Prevent hydration mismatch for theme
  useEffect(() => {
    setMounted(true);
    // Load saved preferences from localStorage
    try {
      const saved = localStorage.getItem('user_preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.currency) setCurrency(parsed.currency);
        if (parsed.notifs) setNotifs({ ...NOTIFICATION_DEFAULTS, ...parsed.notifs });
      }
    } catch { /* ignore */ }
  }, []);

  function setNotif(key: keyof typeof NOTIFICATION_DEFAULTS, value: boolean) {
    setNotifs((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate save
    try {
      localStorage.setItem('user_preferences', JSON.stringify({ language, currency, notifs }));
    } catch { /* ignore */ }
    setSaving(false);
    toast.success('Preferences saved');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-6 max-w-2xl"
    >
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
          Preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your experience — theme, language, notifications, and more.
        </p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Appearance</CardTitle>
          <CardDescription>Choose how Sunnova looks on your device.</CardDescription>
        </CardHeader>
        <CardContent>
          {mounted ? (
            <div className="flex gap-3">
              {[
                { value: 'light', label: 'Light', icon: Sun },
                { value: 'dark', label: 'Dark', icon: Moon },
                { value: 'system', label: 'System', icon: Monitor },
              ].map((opt) => (
                <div key={opt.value} className="flex-1 relative">
                  <ThemeOption
                    value={opt.value}
                    label={opt.label}
                    icon={opt.icon}
                    current={theme}
                    onSelect={setTheme}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 h-24 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 animate-pulse" />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Language & Currency */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Language & Currency</CardTitle>
          <CardDescription>Set your display language and preferred currency.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Globe size={13} className="text-slate-400 dark:text-slate-500" />
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Language</Label>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es" disabled>
                    Español (coming soon)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <DollarSign size={13} className="text-slate-400 dark:text-slate-500" />
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Currency</Label>
              </div>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD — US Dollar</SelectItem>
                  <SelectItem value="EUR" disabled>
                    EUR — Euro (coming soon)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification preferences */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Notification Preferences</CardTitle>
          <CardDescription>Control which notifications you receive from us.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <PrefRow
              icon={Mail}
              label="Email Notifications"
              description="Order confirmations, shipping updates, and account alerts."
              checked={notifs.emailNotifications}
              onChange={(v) => setNotif('emailNotifications', v)}
            />
            <PrefRow
              icon={MessageSquare}
              label="SMS Updates"
              description="Text message alerts for delivery status changes."
              checked={notifs.smsUpdates}
              onChange={(v) => setNotif('smsUpdates', v)}
            />
            <PrefRow
              icon={Megaphone}
              label="Marketing Emails"
              description="Promotions, special offers, and seasonal deals."
              checked={notifs.marketingEmails}
              onChange={(v) => setNotif('marketingEmails', v)}
            />
            <PrefRow
              icon={Sparkles}
              label="Product Recommendations"
              description="Personalized product suggestions based on your orders."
              checked={notifs.productRecommendations}
              onChange={(v) => setNotif('productRecommendations', v)}
            />
            <PrefRow
              icon={Newspaper}
              label="Newsletter"
              description="Monthly newsletter with industry news and product highlights."
              checked={notifs.newsletter}
              onChange={(v) => setNotif('newsletter', v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end pt-1 pb-6">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="min-w-[140px]"
        >
          {saving ? (
            <><Loader2 size={15} className="animate-spin" /> Saving…</>
          ) : (
            'Save Preferences'
          )}
        </Button>
      </div>
    </motion.div>
  );
}
