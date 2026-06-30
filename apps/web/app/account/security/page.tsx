'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  KeyRound, CheckCircle, AlertTriangle, Monitor, Clock,
  Loader2, Eye, EyeOff, Trash2, ShieldAlert,
} from 'lucide-react';
import { profileApi, type User } from '@/lib/customer-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from '@/components/ui/dialog';

// ─── Schemas ───────────────────────────────────────────────────────────────────

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

// ─── Password field ────────────────────────────────────────────────────────────

function PasswordField({
  label,
  id,
  error,
  registration,
  placeholder,
}: {
  label: string;
  id: string;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<PasswordForm>>['register']>;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          className={cn('pr-10', error ? 'border-red-400 dark:border-red-600' : '')}
          {...registration}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

// Need cn here
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// ─── Password strength indicator ───────────────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const levels = [
    { label: 'Weak', color: 'bg-red-500', width: '25%' },
    { label: 'Fair', color: 'bg-amber-500', width: '50%' },
    { label: 'Good', color: 'bg-blue-500', width: '75%' },
    { label: 'Strong', color: 'bg-green-500', width: '100%' },
  ];
  const level = levels[Math.max(0, score - 1)];

  return (
    <div className="space-y-1">
      <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', level.color)}
          style={{ width: level.width }}
        />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Strength: <span className="font-medium">{level.label}</span>
      </p>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SecurityPage() {
  const [user, setUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const newPassword = watch('newPassword') ?? '';

  const passwordMutation = useMutation({
    mutationFn: profileApi.changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully');
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message ?? 'Failed to change password');
    },
  });

  const onPasswordSubmit = (data: PasswordForm) => {
    passwordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  // Approximate OS/browser from userAgent
  const sessionInfo = (() => {
    if (typeof window === 'undefined') return null;
    const ua = navigator.userAgent;
    const browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Safari') ? 'Safari' : 'Browser';
    const os = ua.includes('Windows') ? 'Windows' : ua.includes('Mac') ? 'macOS' : ua.includes('Linux') ? 'Linux' : 'Unknown OS';
    return { browser, os };
  })();

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
          Security
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your password, email verification, and account security.
        </p>
      </div>

      {/* Change password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
              <KeyRound size={15} className="text-[#1a4fa0] dark:text-blue-400" />
            </div>
            <div>
              <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Change Password</CardTitle>
              <CardDescription>Update your account password. Minimum 8 characters.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4" id="password-form">
            <PasswordField
              id="currentPassword"
              label="Current Password"
              placeholder="Enter your current password"
              error={errors.currentPassword?.message}
              registration={register('currentPassword')}
            />
            <PasswordField
              id="newPassword"
              label="New Password"
              placeholder="At least 8 characters"
              error={errors.newPassword?.message}
              registration={register('newPassword')}
            />
            {newPassword && <PasswordStrength password={newPassword} />}
            <PasswordField
              id="confirmPassword"
              label="Confirm New Password"
              placeholder="Repeat your new password"
              error={errors.confirmPassword?.message}
              registration={register('confirmPassword')}
            />
          </form>
        </CardContent>
        <CardFooter className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-end">
          <Button
            type="submit"
            form="password-form"
            disabled={passwordMutation.isPending}
            className="min-w-[140px]"
          >
            {passwordMutation.isPending ? (
              <><Loader2 size={15} className="animate-spin" /> Changing…</>
            ) : (
              'Change Password'
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Email verification */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
              <CheckCircle size={15} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Email Verification</CardTitle>
              <CardDescription>Verify your email address to secure your account.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{user?.email ?? '—'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your primary email address</p>
            </div>
            {user?.emailVerified ? (
              <Badge variant="success" className="gap-1.5">
                <CheckCircle size={11} /> Verified
              </Badge>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="warning" className="gap-1.5">
                  <AlertTriangle size={11} /> Unverified
                </Badge>
                <Button variant="outline" size="sm" className="text-xs" onClick={() => toast.info('Verification email sent!')}>
                  Resend Email
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Monitor size={15} className="text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Active Sessions</CardTitle>
              <CardDescription>Devices currently signed in to your account.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center">
                <Monitor size={16} className="text-slate-500 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {sessionInfo ? `${sessionInfo.browser} on ${sessionInfo.os}` : 'Current Browser'}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Active now</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <Clock size={10} className="text-slate-400" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Current session</span>
                </div>
              </div>
            </div>
            <Badge variant="success" className="text-xs shrink-0">This device</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
              <ShieldAlert size={15} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <CardTitle className="text-red-700 dark:text-red-400" style={{ fontFamily: 'var(--font-heading)' }}>
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible account actions. Proceed with caution.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/10">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Delete Account</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Permanently delete your account and all associated data. This cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              className="shrink-0 gap-1.5"
            >
              <Trash2 size={14} />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
              <AlertTriangle size={18} /> Delete Account
            </DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              This will permanently delete your account, orders, addresses, and all personal data.
              This action <strong>cannot be undone</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              To confirm, type <strong className="font-mono">DELETE</strong> in the box below:
            </p>
            <Input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="font-mono"
            />
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setDeleteConfirmText('')}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={deleteConfirmText !== 'DELETE'}
              onClick={() => {
                toast.error('Account deletion requires admin approval. Please contact support.', {
                  description: 'We have submitted your request to our team.',
                });
                setDeleteDialogOpen(false);
                setDeleteConfirmText('');
              }}
            >
              Permanently Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
