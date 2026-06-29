'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fa', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e8eff9', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/"><Image src="/logo/logo.svg" alt="Sunnova Medical Supplies" width={140} height={40} style={{ height: '36px', width: 'auto' }} /></Link>
        <Link href="/sign-in" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', textDecoration: 'none' }}>← Back to sign in</Link>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-grow-1 p-4">
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={48} color="#0f993e" style={{ marginBottom: '16px' }} />
                <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '24px', color: '#122036', marginBottom: '12px' }}>Check your email</h1>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>
                  If that email is registered, we&apos;ve sent reset instructions. Check your spam folder too.
                </p>
                <Link href="/sign-in" style={{ display: 'inline-block', marginTop: '24px', color: '#1a4fa0', fontFamily: 'var(--font-body)', fontSize: '14px' }}>
                  Return to sign in
                </Link>
              </div>
            ) : (
              <>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '28px', color: '#122036', marginBottom: '8px' }}>Forgot Password</h1>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690', marginBottom: '28px' }}>
                  Enter your email and we&apos;ll send a reset link.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} noValidate>
                  <div className="mb-4">
                    <label className="sn-label" htmlFor="fp-email">Email Address</label>
                    <input id="fp-email" type="email" className="sn-input" placeholder="you@clinic.com" required autoComplete="email" />
                  </div>
                  <button type="submit" className="w-100" style={{ padding: '14px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                    Send Reset Link
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
