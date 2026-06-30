'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, Truck, RotateCcw, Heart, ShoppingCart,
  Gift, MapPin, CreditCard, Star, Award, Bell, Headphones, Download,
  Settings, User, Shield, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';
import { authApi, type User } from '@/lib/customer-api';

// ─── Nav structure ─────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { href: '/account', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'Orders',
    items: [
      { href: '/account/orders', label: 'Order History', icon: ShoppingBag },
      { href: '/account/track', label: 'Track Orders', icon: Truck },
      { href: '/account/orders?tab=returns', label: 'Returns & Refunds', icon: RotateCcw },
    ],
  },
  {
    label: 'Shopping',
    items: [
      { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
      { href: '/account/cart', label: 'Cart', icon: ShoppingCart },
      { href: '/account/gift-cards', label: 'Gift Cards', icon: Gift },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/account/addresses', label: 'Addresses', icon: MapPin },
      { href: '/account/payment-methods', label: 'Payment Methods', icon: CreditCard },
      { href: '/account/reviews', label: 'Reviews', icon: Star },
      { href: '/account/rewards', label: 'Rewards', icon: Award },
    ],
  },
  {
    label: 'Preferences',
    items: [
      { href: '/account/notifications', label: 'Notifications', icon: Bell },
      { href: '/account/support', label: 'Support', icon: Headphones },
      { href: '/account/downloads', label: 'Downloads', icon: Download },
      { href: '/account/preferences', label: 'Preferences', icon: Settings },
    ],
  },
  {
    label: 'Account Settings',
    items: [
      { href: '/account/profile', label: 'Profile', icon: User },
      { href: '/account/security', label: 'Security', icon: Shield },
    ],
  },
];

// ─── NavItem component ─────────────────────────────────────────────────────────

function NavItem({
  href,
  label,
  icon: Icon,
  exact,
  pathname,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  pathname: string;
  onClick?: () => void;
}) {
  const isActive = exact
    ? pathname === href
    : pathname === href || (href !== '/account' && pathname.startsWith(href.split('?')[0]));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 group relative',
        isActive
          ? 'bg-blue-50 dark:bg-blue-950/30 text-[#1a4fa0] dark:text-blue-400 font-medium border-l-2 border-[#1a4fa0] dark:border-blue-400 ml-0 pl-[10px]'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200 border-l-2 border-transparent ml-0 pl-[10px]',
      )}
    >
      <Icon
        size={16}
        className={cn(
          'shrink-0 transition-colors',
          isActive ? 'text-[#1a4fa0] dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300',
        )}
      />
      <span className="truncate">{label}</span>
    </Link>
  );
}

// ─── Sidebar content ───────────────────────────────────────────────────────────

function SidebarContent({
  user,
  pathname,
  onClose,
  onSignOut,
}: {
  user: User | null;
  pathname: string;
  onClose?: () => void;
  onSignOut: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <Link href="/" onClick={onClose} className="block">
          <Image
            src="/logo/logo-color.svg"
            alt="Sunnova Medical Supplies"
            width={140}
            height={36}
            className="h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src="/logo/logo-white.svg"
            alt="Sunnova Medical Supplies"
            width={140}
            height={36}
            className="h-8 w-auto hidden dark:block"
            priority
          />
        </Link>
        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
          My Account
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-3 mb-1.5">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  pathname={pathname}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="shrink-0 px-4 py-4 border-t border-slate-100 dark:border-slate-800">
        {user && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a4fa0] to-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-white text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {getInitials(user.firstName, user.lastName)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── Layout ────────────────────────────────────────────────────────────────────

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      router.replace(`/sign-in?redirect=/account`);
      return;
    }
    const raw = localStorage.getItem('user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setChecking(false);
  }, [router]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    try { await authApi.logout(); } catch { /* ignore */ }
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    router.push('/');
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#1a4fa0] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-body)' }}>
            Loading your account…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* CSS for desktop sidebar offset */}
      <style>{`
        @media (min-width: 1024px) {
          .acc-sidebar { left: 0 !important; }
          .acc-main { margin-left: 260px !important; }
          .acc-overlay { display: none !important; }
          .acc-topbar { display: none !important; }
        }
      `}</style>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="acc-overlay fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className="acc-sidebar fixed top-0 h-screen w-[260px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-[left] duration-250"
        style={{ left: mobileOpen ? 0 : '-260px' }}
      >
        <SidebarContent
          user={user}
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
          onSignOut={handleSignOut}
        />
      </aside>

      {/* Main */}
      <div className="acc-main" style={{ marginLeft: 0 }}>
        {/* Mobile top bar */}
        <header className="acc-topbar sticky top-0 z-30 h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>
            My Account
          </span>
          <Link
            href="/account/notifications"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </Link>
        </header>

        {/* Page content */}
        <main id="main-content" className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
