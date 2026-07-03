'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/customer-api';

const linkStyle: React.CSSProperties = {
  fontSize: '13px',
  fontFamily: 'var(--font-body)',
  opacity: 0.9,
};

/**
 * Top-bar auth control. Renders "Sign In" for guests and "Sign Out" once a
 * customer is authenticated (detected via the `user_token` in localStorage).
 * Defaults to the guest state on first render so SSR and hydration match.
 */
export default function AuthLink() {
  const router = useRouter();
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sync = () => setSignedIn(!!localStorage.getItem('user_token'));
    sync();
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [pathname]);

  async function handleSignOut() {
    setBusy(true);
    try { await authApi.logout(); } catch { /* ignore */ }
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    setSignedIn(false);
    router.push('/');
    router.refresh();
  }

  if (!signedIn) {
    return (
      <Link href="/sign-in" className="text-white text-decoration-none" style={linkStyle}>
        Sign In
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={busy}
      className="text-white text-decoration-none"
      style={{
        ...linkStyle,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: busy ? 'default' : 'pointer',
      }}
    >
      {busy ? 'Signing Out…' : 'Sign Out'}
    </button>
  );
}
