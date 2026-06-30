'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { MapPin, Plus, Pencil, Trash2, Star } from 'lucide-react';
import { addressesApi, type Address } from '@/lib/customer-api';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

// ─── Zod schema ───────────────────────────────────────────────────────────────

const addressSchema = z.object({
  label: z.string().optional(),
  line1: z.string().min(1, 'Street address is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().regex(/^\d{5}$/, 'ZIP must be exactly 5 digits'),
  country: z.string().default('US'),
  isDefault: z.boolean().default(false),
});

type AddressFormValues = z.infer<typeof addressSchema>;

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function AddressSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-white shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-7 w-14 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

interface EmptyStateProps {
  onAdd: () => void;
}

function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 py-20 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
        <MapPin className="w-10 h-10 text-[#1a4fa0]" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#122036]">No addresses saved</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">
          Add your first address to speed up checkout.
        </p>
      </div>
      <Button
        onClick={onAdd}
        className="bg-[#1a4fa0] hover:bg-[#1a4fa0]/90 text-white gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Address
      </Button>
    </motion.div>
  );
}

// ─── Address card ─────────────────────────────────────────────────────────────

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (address: Address) => void;
  isSettingDefault: boolean;
}

function AddressCard({ address, onEdit, onDelete, onSetDefault, isSettingDefault }: AddressCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border border-gray-100 bg-white shadow-sm p-5 flex flex-col gap-3 hover:border-gray-200 transition-colors"
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 min-h-[22px]">
        <div>
          {address.label && (
            <Badge variant="info" className="text-[11px] px-2.5 py-0.5 font-semibold">
              {address.label}
            </Badge>
          )}
        </div>
        {address.isDefault && (
          <Badge variant="success" className="text-[11px] px-2.5 py-0.5 font-semibold gap-1">
            <Star className="w-2.5 h-2.5 fill-current" />
            Default
          </Badge>
        )}
      </div>

      {/* Address block */}
      <div className="text-sm text-gray-700 leading-relaxed space-y-0.5 flex-1">
        <p className="font-medium text-[#122036]">{address.line1}</p>
        {address.line2 && <p className="text-gray-500">{address.line2}</p>}
        <p className="text-gray-600">
          {address.city}, {address.state} {address.zip}
        </p>
        <p className="text-gray-500 text-xs uppercase tracking-wide">{address.country}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 pt-1 border-t border-gray-50 flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(address)}
          className="h-7 px-2.5 text-xs text-gray-600 hover:text-[#122036] gap-1"
        >
          <Pencil className="w-3 h-3" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(address)}
          className="h-7 px-2.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 gap-1"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </Button>
        {!address.isDefault && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSetDefault(address)}
            disabled={isSettingDefault}
            className="h-7 px-2.5 text-xs text-[#1a4fa0] hover:text-[#1a4fa0] hover:bg-blue-50 gap-1 ml-auto"
          >
            <Star className="w-3 h-3" />
            Set as Default
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Address form dialog ──────────────────────────────────────────────────────

interface AddressDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  existing?: Address | null;
}

function AddressDialog({ open, onClose, mode, existing }: AddressDialogProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: '',
      line1: '',
      line2: '',
      city: '',
      state: 'FL',
      zip: '',
      country: 'US',
      isDefault: false,
    },
  });

  // Pre-fill form when dialog opens or mode/existing changes
  useEffect(() => {
    if (!open) return;
    if (mode === 'edit' && existing) {
      reset({
        label: existing.label ?? '',
        line1: existing.line1,
        line2: existing.line2 ?? '',
        city: existing.city,
        state: existing.state,
        zip: existing.zip,
        country: existing.country,
        isDefault: existing.isDefault,
      });
    } else {
      reset({
        label: '',
        line1: '',
        line2: '',
        city: '',
        state: 'FL',
        zip: '',
        country: 'US',
        isDefault: false,
      });
    }
  }, [open, mode, existing, reset]);

  const saveMutation = useMutation({
    mutationFn: (data: AddressFormValues) => {
      const payload: Partial<Address> = {
        ...(mode === 'edit' && existing ? { id: existing.id } : {}),
        label: data.label || null,
        line1: data.line1,
        line2: data.line2 || null,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        isDefault: data.isDefault,
      };
      return addressesApi.save(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success(mode === 'add' ? 'Address added successfully' : 'Address updated successfully');
      onClose();
    },
    onError: (err: Error) => {
      toast.error(err.message ?? 'Something went wrong. Please try again.');
    },
  });

  function onSubmit(data: AddressFormValues) {
    saveMutation.mutate(data);
  }

  // Reset form on open/close transitions
  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#122036]">
            {mode === 'add' ? 'Add Address' : 'Edit Address'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-1">
          {/* Label */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-gray-600">
              Label <span className="text-gray-400">(optional)</span>
            </Label>
            <Input
              {...register('label')}
              placeholder="e.g. Home, Office, Clinic"
              className="rounded-lg border-gray-200 text-sm"
            />
          </div>

          {/* Line 1 */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-gray-600">
              Street Address <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register('line1')}
              placeholder="Street address"
              className={cn('rounded-lg border-gray-200 text-sm', errors.line1 && 'border-red-400 focus-visible:ring-red-400/30')}
            />
            {errors.line1 && (
              <p className="text-xs text-red-500">{errors.line1.message}</p>
            )}
          </div>

          {/* Line 2 */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-gray-600">
              Apt, Suite, Unit <span className="text-gray-400">(optional)</span>
            </Label>
            <Input
              {...register('line2')}
              placeholder="Apt, suite, unit"
              className="rounded-lg border-gray-200 text-sm"
            />
          </div>

          {/* City + State row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-600">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register('city')}
                placeholder="City"
                className={cn('rounded-lg border-gray-200 text-sm', errors.city && 'border-red-400 focus-visible:ring-red-400/30')}
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-600">
                State <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register('state')}
                placeholder="FL"
                className={cn('rounded-lg border-gray-200 text-sm', errors.state && 'border-red-400 focus-visible:ring-red-400/30')}
              />
              {errors.state && (
                <p className="text-xs text-red-500">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* ZIP + Country row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-600">
                ZIP Code <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register('zip')}
                placeholder="12345"
                maxLength={5}
                className={cn('rounded-lg border-gray-200 text-sm', errors.zip && 'border-red-400 focus-visible:ring-red-400/30')}
              />
              {errors.zip && (
                <p className="text-xs text-red-500">{errors.zip.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-600">Country</Label>
              <Input
                value="United States"
                disabled
                className="rounded-lg border-gray-100 bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
              />
              <input type="hidden" {...register('country')} value="US" />
            </div>
          </div>

          {/* Default checkbox */}
          <Controller
            name="isDefault"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#1a4fa0] accent-[#1a4fa0] cursor-pointer"
                />
                <label
                  htmlFor="isDefault"
                  className="text-sm text-gray-600 cursor-pointer select-none"
                >
                  Set as default address
                </label>
              </div>
            )}
          />

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={saveMutation.isPending}
              className="rounded-lg border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saveMutation.isPending}
              className="bg-[#1a4fa0] hover:bg-[#1a4fa0]/90 text-white rounded-lg gap-2"
            >
              {saveMutation.isPending ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving…
                </>
              ) : mode === 'add' ? (
                'Save Address'
              ) : (
                'Update Address'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete confirmation dialog ───────────────────────────────────────────────

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  address: Address | null;
}

function DeleteDialog({ open, onClose, address }: DeleteDialogProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => addressesApi.delete(address!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Address deleted');
      onClose();
    },
    onError: (err: Error) => {
      toast.error(err.message ?? 'Failed to delete address. Please try again.');
    },
  });

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#122036]">Delete Address</DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <p className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to delete this address? This action cannot be undone.
          </p>
          {address && (
            <div className="mt-3 rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 text-sm text-gray-700">
              <p className="font-medium">{address.line1}</p>
              {address.line2 && <p className="text-gray-500">{address.line2}</p>}
              <p>{address.city}, {address.state} {address.zip}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="rounded-lg border-gray-200"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="rounded-lg gap-2"
          >
            {deleteMutation.isPending ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Deleting…
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AddressesPage() {
  const queryClient = useQueryClient();

  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);
  const [settingDefaultId, setSettingDefaultId] = useState<string | null>(null);

  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressesApi.list(),
    staleTime: 60_000,
  });

  const setDefaultMutation = useMutation({
    mutationFn: (address: Address) =>
      addressesApi.save({ ...address, isDefault: true }),
    onMutate: (address) => setSettingDefaultId(address.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Default address updated');
    },
    onError: (err: Error) => {
      toast.error(err.message ?? 'Failed to update default address.');
    },
    onSettled: () => setSettingDefaultId(null),
  });

  function openAdd() {
    setEditingAddress(null);
    setDialogMode('add');
    setDialogOpen(true);
  }

  function openEdit(address: Address) {
    setEditingAddress(address);
    setDialogMode('edit');
    setDialogOpen(true);
  }

  function openDelete(address: Address) {
    setDeletingAddress(address);
    setDeleteDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    // Defer clearing editing address so dialog exit animation isn't jarring
    setTimeout(() => setEditingAddress(null), 200);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setTimeout(() => setDeletingAddress(null), 200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50/50 py-10 px-4"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#122036]">Address Book</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage your saved delivery addresses</p>
          </div>
          <Button
            onClick={openAdd}
            className="bg-[#1a4fa0] hover:bg-[#1a4fa0]/90 text-white gap-2 rounded-xl h-10 px-5"
          >
            <Plus className="w-4 h-4" />
            Add Address
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <AddressSkeleton />
        ) : !addresses || addresses.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <EmptyState onAdd={openAdd} />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={openEdit}
                  onDelete={openDelete}
                  onSetDefault={(a) => setDefaultMutation.mutate(a)}
                  isSettingDefault={settingDefaultId === address.id}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Add / Edit dialog */}
      <AddressDialog
        open={dialogOpen}
        onClose={closeDialog}
        mode={dialogMode}
        existing={editingAddress}
      />

      {/* Delete confirmation dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        address={deletingAddress}
      />
    </motion.div>
  );
}
