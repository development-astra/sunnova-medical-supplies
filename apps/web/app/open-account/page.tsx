import type { Metadata } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Open an Account | Sunnova Medical Supplies',
  description: 'Apply for a business account with Sunnova Medical Supplies. Get Net-15 payment terms, dedicated account rep, and priority same-day delivery across Miami-Dade.',
};

export default function OpenAccountPage() {
  return (
    <SiteLayout>
      <section style={{ backgroundColor: '#1a4fa0', padding: '64px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-60px', top: '-60px', width: '280px', height: '280px', borderRadius: '50%', border: '36px solid rgba(249,178,62,0.4)', pointerEvents: 'none' }} />
        <div className="sn-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="sn-badge sn-badge-white mb-3">Open an Account</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: '16px' }}>
            Apply for a Business Account
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.85)', maxWidth: '480px', lineHeight: 1.65 }}>
            Unlock Net-15 payment terms, dedicated rep access, and priority same-day delivery across Miami-Dade.
          </p>
        </div>
      </section>
      <section className="sn-section sn-bg-light">
        <div className="sn-container">
          <div className="row g-5 justify-content-center">
            <div className="col-12 col-lg-8">
              <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '24px', color: '#122036', marginBottom: '8px' }}>Account Application</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6b7690', marginBottom: '28px' }}>Isabella reviews all applications within 1 business day.</p>
                <form onSubmit={(e) => e.preventDefault()} noValidate>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#122036', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #e8eff9' }}>Contact Information</h3>
                  <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="oa-first">First Name *</label>
                      <input id="oa-first" type="text" className="sn-input" required autoComplete="given-name" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="oa-last">Last Name *</label>
                      <input id="oa-last" type="text" className="sn-input" required autoComplete="family-name" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="oa-email">Email Address *</label>
                      <input id="oa-email" type="email" className="sn-input" required autoComplete="email" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="oa-phone">Phone / Text *</label>
                      <input id="oa-phone" type="tel" className="sn-input" required autoComplete="tel" />
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#122036', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #e8eff9' }}>Business Information</h3>
                  <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="oa-business">Business / Practice Name *</label>
                      <input id="oa-business" type="text" className="sn-input" required />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="oa-type">Business Type *</label>
                      <select id="oa-type" className="sn-input" required style={{ cursor: 'pointer' }}>
                        <option value="">Select…</option>
                        <option>Med Spa</option>
                        <option>Aesthetic Clinic</option>
                        <option>Dermatology Office</option>
                        <option>Private Practice</option>
                        <option>Urgent Care</option>
                        <option>Wellness Center</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="sn-label" htmlFor="oa-address">Delivery Address *</label>
                      <input id="oa-address" type="text" className="sn-input" placeholder="Street address, City, ZIP" required autoComplete="street-address" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="oa-tax">Tax / Resale Certificate # (optional)</label>
                      <input id="oa-tax" type="text" className="sn-input" placeholder="If applicable" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="oa-monthly">Estimated Monthly Spend</label>
                      <select id="oa-monthly" className="sn-input" style={{ cursor: 'pointer' }}>
                        <option value="">Select…</option>
                        <option>Under $500</option>
                        <option>$500–$1,500</option>
                        <option>$1,500–$5,000</option>
                        <option>$5,000+</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="sn-label" htmlFor="oa-products">Main Products Needed</label>
                      <textarea id="oa-products" className="sn-input" rows={3} placeholder="e.g. Gloves, exam table paper, esthetic supplies..." style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-4">
                    <input type="checkbox" id="oa-terms" required style={{ marginTop: '3px', flexShrink: 0 }} />
                    <label htmlFor="oa-terms" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#3a4660', cursor: 'pointer' }}>
                      I agree to the <a href="/terms" style={{ color: '#1a4fa0' }}>Terms of Service</a> and <a href="/privacy" style={{ color: '#1a4fa0' }}>Privacy Policy</a>.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-100"
                    style={{ padding: '16px', background: 'linear-gradient(90deg, #ee6a12, #f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17px', cursor: 'pointer' }}
                  >
                    Submit Application
                  </button>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', textAlign: 'center', marginTop: '16px' }}>
                    Isabella reviews applications within 1 business day.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
