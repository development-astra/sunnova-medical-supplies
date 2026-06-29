'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const [showPw, setShowPw] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fa', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e8eff9', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/">
          <Image src="/logo/logo-dark.svg" alt="Sunnova Medical Supplies" width={140} height={40} style={{ height: '36px', width: 'auto' }} />
        </Link>
        <Link href="/" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', textDecoration: 'none' }}>← Back to site</Link>
      </div>

      {/* Form */}
      <div className="d-flex align-items-center justify-content-center flex-grow-1 p-4">
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '28px', color: '#122036', marginBottom: '8px' }}>Sign In</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690', marginBottom: '28px' }}>
              Don&apos;t have an account?{' '}
              <Link href="/register" style={{ color: '#1a4fa0', fontWeight: 600 }}>Register</Link>
            </p>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="mb-3">
                <label className="sn-label" htmlFor="si-email">Email Address</label>
                <input id="si-email" type="email" className="sn-input" placeholder="you@clinic.com" required autoComplete="email" />
              </div>
              <div className="mb-4" style={{ position: 'relative' }}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="sn-label mb-0" htmlFor="si-pw">Password</label>
                  <Link href="/forgot-password" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#1a4fa0' }}>Forgot password?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <input id="si-pw" type={showPw ? 'text' : 'password'} className="sn-input" placeholder="••••••••" required autoComplete="current-password" style={{ paddingRight: '44px' }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7690', padding: '4px', display: 'flex' }} aria-label={showPw ? 'Hide password' : 'Show password'}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-100 mb-3" style={{ padding: '14px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                Sign In
              </button>
            </form>
            <div style={{ position: 'relative', textAlign: 'center', margin: '20px 0' }}>
              <hr style={{ border: 'none', borderTop: '1px solid #e8eff9' }} />
              <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#fff', padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#a0aab4' }}>or continue with</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', textAlign: 'center', marginTop: '8px' }}>
              OAuth providers can be enabled in settings. Contact your administrator.
            </p>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#a0aab4', textAlign: 'center', marginTop: '20px' }}>
            Need supplies? <Link href="/request-quote" style={{ color: '#1a4fa0' }}>Request a quote</Link> — no account required.
          </p>
        </div>
      </div>
    </div>
  );
}
