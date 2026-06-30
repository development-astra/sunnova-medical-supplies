import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | string, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(value));
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    ...opts,
  }).format(new Date(date));
}

export function formatRelative(date: string | Date): string {
  const now = Date.now();
  const diff = now - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function getInitials(firstName?: string | null, lastName?: string | null): string {
  return `${(firstName?.[0] ?? '').toUpperCase()}${(lastName?.[0] ?? '').toUpperCase()}` || '?';
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
}

export const ORDER_STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  PENDING:    { label: 'Pending',    color: 'text-amber-700',  bg: 'bg-amber-50 dark:bg-amber-950/30'  },
  CONFIRMED:  { label: 'Confirmed',  color: 'text-blue-700',   bg: 'bg-blue-50 dark:bg-blue-950/30'    },
  PROCESSING: { label: 'Processing', color: 'text-purple-700', bg: 'bg-purple-50 dark:bg-purple-950/30'},
  SHIPPED:    { label: 'Shipped',    color: 'text-indigo-700', bg: 'bg-indigo-50 dark:bg-indigo-950/30'},
  DELIVERED:  { label: 'Delivered',  color: 'text-green-700',  bg: 'bg-green-50 dark:bg-green-950/30'  },
  CANCELLED:  { label: 'Cancelled',  color: 'text-red-700',    bg: 'bg-red-50 dark:bg-red-950/30'      },
  REFUNDED:   { label: 'Refunded',   color: 'text-gray-700',   bg: 'bg-gray-100 dark:bg-gray-800'      },
};
