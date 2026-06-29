'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fa', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e8eff9', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/"><Image src="/logo/logo-dark.svg" alt="Sunnova Medical Supplies" width={140} height={40} style={{ height: '36px', width: 'auto' }} /></Link>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-grow-1 p-4">
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}>
            {done ? (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={48} color="#0f993e" style={{ marginBottom: '16px' }} />
                <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '24px', color: '#122036', marginBottom: '12px' }}>Password Updated</h1>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690' }}>Your password has been reset successfully.</p>
                <Link href="/sign-in" style={{ display: 'inline-block', marginTop: '24px', padding: '12px 32px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, textDecoration: 'none', fontSize: '15px' }}>
                  Sign In
                </Link>
              </div>
            ) : (
              <>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '28px', color: '#122036', marginBottom: '8px' }}>Reset Password</h1>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690', marginBottom: '28px' }}>Enter your new password below.</p>
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} noValidate>
                  <div className="mb-3" style={{ position: 'relative' }}>
                    <label className="sn-label" htmlFor="rp-pw">New Password</label>
                    <div style={{ position: 'relative' }}>
                      <input id="rp-pw" type={showPw ? 'text' : 'password'} className="sn-input" placeholder="Min. 8 characters" required autoComplete="new-password" style={{ paddingRight: '44px' }} />
                      <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7690', padding: '4px', display: 'flex' }} aria-label={showPw ? 'Hide password' : 'Show password'}>
                        {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="sn-label" htmlFor="rp-confirm">Confirm Password</label>
                    <input id="rp-confirm" type="password" className="sn-input" placeholder="Repeat password" required autoComplete="new-password" />
                  </div>
                  <button type="submit" className="w-100" style={{ padding: '14px', background: 'linear-gradient(90deg,#ee6a12,#f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', cursor: 'pointer' }}>
                    Update Password
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
