'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fa', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e8eff9', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/">
          <Image src="/logo/logo-dark.svg" alt="Sunnova Medical Supplies" width={140} height={40} style={{ height: '36px', width: 'auto' }} />
        </Link>
        <Link href="/" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', textDecoration: 'none' }}>← Back to site</Link>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-grow-1 p-4">
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '28px', color: '#122036', marginBottom: '8px' }}>Create Account</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690', marginBottom: '28px' }}>
              Already have an account? <Link href="/sign-in" style={{ color: '#1a4fa0', fontWeight: 600 }}>Sign in</Link>
            </p>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">
                  <label className="sn-label" htmlFor="r-first">First Name *</label>
                  <input id="r-first" type="text" className="sn-input" required autoComplete="given-name" />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="sn-label" htmlFor="r-last">Last Name *</label>
                  <input id="r-last" type="text" className="sn-input" required autoComplete="family-name" />
                </div>
              </div>
              <div className="mb-3">
                <label className="sn-label" htmlFor="r-email">Email Address *</label>
                <input id="r-email" type="email" className="sn-input" placeholder="you@clinic.com" required autoComplete="email" />
              </div>
              <div className="mb-3">
                <label className="sn-label" htmlFor="r-practice">Practice / Business Name</label>
                <input id="r-practice" type="text" className="sn-input" />
              </div>
              <div className="mb-4" style={{ position: 'relative' }}>
                <label className="sn-label" htmlFor="r-pw">Password *</label>
                <div style={{ position: 'relative' }}>
                  <input id="r-pw" type={showPw ? 'text' : 'password'} className="sn-input" placeholder="Min. 8 characters" required autoComplete="new-password" style={{ paddingRight: '44px' }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7690', padding: '4px', display: 'flex' }} aria-label={showPw ? 'Hide password' : 'Show password'}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-start gap-2 mb-4">
                <input type="checkbox" id="r-terms" required style={{ marginTop: '3px', flexShrink: 0 }} />
                <label htmlFor="r-terms" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#3a4660', cursor: 'pointer' }}>
                  I agree to the <Link href="/terms" style={{ color: '#1a4fa0' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: '#1a4fa0' }}>Privacy Policy</Link>.
                </label>
              </div>
              <button type="submit" className="w-100" style={{ padding: '14px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
