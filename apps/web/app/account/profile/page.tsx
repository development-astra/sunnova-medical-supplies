'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CheckCircle, Camera, User, Mail, Phone, Building2, Loader2 } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import { authApi, profileApi, type User as UserType } from '@/lib/customer-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// ─── Schema ────────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(80),
  lastName: z.string().min(1, 'Last name is required').max(80),
  phone: z.string().max(30).optional().or(z.literal('')),
  businessName: z.string().max(120).optional().or(z.literal('')),
});

type ProfileForm = z.infer<typeof profileSchema>;

// ─── Field wrapper ─────────────────────────────────────────────────────────────

function Field({
  label,
  icon: Icon,
  error,
  children,
  hint,
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Icon size={13} className="text-slate-400 dark:text-slate-500" />
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</Label>
      </div>
      {children}
      {hint && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const qc = useQueryClient();
  const [localUser, setLocalUser] = useState<UserType | null>(null);

  // Load from localStorage first for instant display
  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try { setLocalUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  // Fetch fresh data from API
  const { data: user, isLoading } = useQuery<UserType>({
    queryKey: ['auth-me'],
    queryFn: authApi.me,
    placeholderData: localUser ?? undefined,
    enabled: typeof window !== 'undefined',
  });

  const displayUser = user ?? localUser;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      businessName: '',
    },
  });

  // Populate form once user data arrives
  useEffect(() => {
    if (displayUser) {
      reset({
        firstName: displayUser.firstName ?? '',
        lastName: displayUser.lastName ?? '',
        phone: displayUser.phone ?? '',
        businessName: displayUser.businessName ?? '',
      });
    }
  }, [displayUser, reset]);

  const updateMutation = useMutation({
    mutationFn: profileApi.update,
    onSuccess: (updated) => {
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updated));
      setLocalUser(updated);
      qc.setQueryData(['auth-me'], updated);
      toast.success('Profile updated successfully');
    },
    onError: (err: Error) => {
      toast.error(err.message ?? 'Failed to update profile');
    },
  });

  const onSubmit = (data: ProfileForm) => {
    updateMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || undefined,
      businessName: data.businessName || undefined,
    });
  };

  const initials = getInitials(displayUser?.firstName, displayUser?.lastName);

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
          Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Avatar card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            {isLoading && !displayUser ? (
              <>
                <Skeleton className="w-20 h-20 rounded-2xl shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-8 w-32 rounded-lg" />
                </div>
              </>
            ) : (
              <>
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1a4fa0] to-[#2563eb] flex items-center justify-center shadow-md">
                    <span className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                      {initials}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {displayUser?.firstName} {displayUser?.lastName}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{displayUser?.email}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="mt-2.5 text-xs gap-1.5"
                    title="Photo upload requires file storage — coming soon"
                  >
                    <Camera size={13} />
                    Upload Photo
                    <span className="ml-1 text-[10px] text-slate-400">(coming soon)</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile form */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle style={{ fontFamily: 'var(--font-heading)' }}>Personal Information</CardTitle>
          <CardDescription>Update your name, phone number, and business details.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && !displayUser ? (
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="First Name" icon={User} error={errors.firstName?.message}>
                  <Input
                    {...register('firstName')}
                    placeholder="Jane"
                    className={errors.firstName ? 'border-red-400 dark:border-red-600' : ''}
                  />
                </Field>
                <Field label="Last Name" icon={User} error={errors.lastName?.message}>
                  <Input
                    {...register('lastName')}
                    placeholder="Doe"
                    className={errors.lastName ? 'border-red-400 dark:border-red-600' : ''}
                  />
                </Field>
              </div>

              <Field
                label="Email Address"
                icon={Mail}
                hint="Email address cannot be changed. Contact support if you need to update it."
              >
                <div className="relative">
                  <Input
                    value={displayUser?.email ?? ''}
                    readOnly
                    className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 cursor-not-allowed pr-28"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    {displayUser?.emailVerified ? (
                      <Badge variant="success" className="text-[10px] gap-1">
                        <CheckCircle size={10} /> Verified
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="text-[10px]">Unverified</Badge>
                    )}
                  </div>
                </div>
              </Field>

              <Field label="Phone Number" icon={Phone} error={errors.phone?.message} hint="Optional — for order updates and delivery notifications.">
                <Input
                  {...register('phone')}
                  type="tel"
                  placeholder="+1 (305) 555-0123"
                  className={errors.phone ? 'border-red-400 dark:border-red-600' : ''}
                />
              </Field>

              <Field label="Business / Practice Name" icon={Building2} error={errors.businessName?.message} hint="Optional — displayed on invoices and quotes.">
                <Input
                  {...register('businessName')}
                  placeholder="Miami Medical Clinic"
                  className={errors.businessName ? 'border-red-400 dark:border-red-600' : ''}
                />
              </Field>

              <Separator />

              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Member since {displayUser?.createdAt ? new Date(displayUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
                </p>
                <Button
                  type="submit"
                  disabled={updateMutation.isPending || !isDirty}
                  className="min-w-[120px]"
                >
                  {updateMutation.isPending ? (
                    <><Loader2 size={15} className="animate-spin" /> Saving…</>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
