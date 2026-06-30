'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { adminApi } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) router.replace('/admin');
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminApi.login(email, password);
      if (res.user.role !== 'ADMIN') {
        setError('Access denied. This account does not have admin privileges.');
        setLoading(false);
        return;
      }
      localStorage.setItem('admin_token', res.accessToken);
      localStorage.setItem('admin_user', JSON.stringify(res.user));
      router.push('/admin');
    } catch (err: any) {
      setError(err.message ?? 'Invalid credentials. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d1b2e 0%, #1a3a6b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <Image src="/logo/logo-white.svg" alt="Sunnova Medical Supplies" width={160} height={42} style={{ height: '40px', width: 'auto' }} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
            <ShieldCheck size={15} color="#ee6a12" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.5px' }}>
              Admin Portal
            </span>
          </div>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '36px 32px', boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '24px', color: '#122036', marginBottom: '6px' }}>
            Sign in to Admin
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', marginBottom: '28px' }}>
            Sunnova Medical Supplies — Management Console
          </p>

          {error && (
            <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 14px', marginBottom: '20px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#dc2626', margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#3a4660', display: 'block', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@sunnovamedical.com"
                required
                autoComplete="email"
                className="sn-input"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#3a4660', display: 'block', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="sn-input"
                  style={{ width: '100%', paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7690', padding: '4px', display: 'flex' }}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? '#ccc' : 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'opacity 0.15s' }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: '20px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← Back to Sunnova website</Link>
        </p>
      </div>
    </div>
  );
}
