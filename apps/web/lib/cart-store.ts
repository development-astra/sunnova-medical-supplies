'use client';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** A line item in the cart. `price` is stored in cents to avoid float drift. */
export interface CartItem {
  id: string;
  name: string;
  variant: string;
  sku: string;
  price: number; // cents
  qty: number;
}

interface CartState {
  items: CartItem[];
  /** Add an item, merging quantity if the id is already in the cart. */
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
}

/** Sample cart so the page demonstrates real behavior before a storefront exists. */
const SEED_ITEMS: CartItem[] = [
  { id: 'GLV-NIT-M-200', name: 'Nitrile Exam Gloves', variant: 'Medium · Box of 200', sku: 'GLV-NIT-M-200', price: 3700, qty: 2 },
  { id: 'SYR-3ML-LL', name: 'Sterile Syringes 3mL', variant: 'Luer Lock · Pack of 100', sku: 'SYR-3ML-LL', price: 2400, qty: 1 },
  { id: 'GZS-4X4-ST', name: 'Gauze Sponges 4×4', variant: 'Sterile · Pack of 50', sku: 'GZS-4X4-ST', price: 975, qty: 1 },
];

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: SEED_ITEMS,
      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return { items: state.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i)) };
          }
          return { items: [...state.items, { ...item, qty }] };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((state) => ({
          items: state.items.flatMap((i) =>
            i.id === id ? (qty <= 0 ? [] : [{ ...i, qty }]) : [i],
          ),
        })),
      increment: (id) => set((state) => ({ items: state.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) })),
      decrement: (id) =>
        set((state) => ({
          items: state.items.flatMap((i) =>
            i.id === id ? (i.qty - 1 <= 0 ? [] : [{ ...i, qty: i.qty - 1 }]) : [i],
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'sunnova-cart', version: 1 },
  ),
);

/* ─── Derived helpers ────────────────────────────────────────────────────── */
export const cartCount = (items: CartItem[]): number => items.reduce((n, i) => n + i.qty, 0);
export const cartSubtotal = (items: CartItem[]): number => items.reduce((s, i) => s + i.price * i.qty, 0);

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Returns true once the persisted store has rehydrated from localStorage.
 * Use it to gate rendering of cart-derived values so SSR and the first client
 * render match (avoids hydration mismatches on the badge / totals).
 */
export function useCartHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
