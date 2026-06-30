import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '@/components/layout/SiteLayout';
import { ArrowRight, Phone, Mail, Upload } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Request a Quote | Sunnova Medical Supplies',
  description:
    'Request a catalog or quote from Sunnova Medical Supplies. Tell us about your practice and we\'ll follow up within the hour with pricing and availability.',
};

export default function RequestQuotePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section style={{ backgroundColor: '#1a4fa0', padding: '64px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-60px', top: '-60px', width: '280px', height: '280px', borderRadius: '50%', border: '36px solid rgba(249,178,62,0.4)', pointerEvents: 'none' }} />
        <div className="sn-container" style={{ paddingBottom: '64px', position: 'relative', zIndex: 1 }}>
          <div className="sn-badge sn-badge-white mb-3">Request a Quote</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
            Get a Quote From Your Local Supplier
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(255,255,255,0.85)', maxWidth: '480px', lineHeight: 1.65 }}>
            No portal. No forms through five screens. Tell us what you need and Isabella will respond within the hour.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="sn-section sn-bg-light">
        <div className="sn-container">
          <div className="row g-5">
            {/* Form */}
            <div className="col-12 col-lg-7">
              <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', border: '1px solid #e8eff9', boxShadow: 'var(--shadow-card)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '24px', color: '#122036', marginBottom: '24px' }}>
                  Quote Request
                </h2>
                <form action="#">
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="q-name">Full Name <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                      <input id="q-name" type="text" className="sn-input" placeholder="Jordan Rivera" required autoComplete="name" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="q-practice">Practice / Business Name <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                      <input id="q-practice" type="text" className="sn-input" placeholder="Brickell Aesthetics" required />
                    </div>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="q-email">Email Address <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                      <input id="q-email" type="email" className="sn-input" placeholder="you@clinic.com" required autoComplete="email" />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="q-phone">Phone / Text</label>
                      <input id="q-phone" type="tel" className="sn-input" placeholder="(786) 000-0000" autoComplete="tel" />
                    </div>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="q-facility">Facility Type <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                      <select id="q-facility" className="sn-input" required style={{ cursor: 'pointer' }}>
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
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="q-location">Miami-Dade Location <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                      <input id="q-location" type="text" className="sn-input" placeholder="e.g. Coral Gables" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="sn-label" htmlFor="q-products">Products / Categories Needed <span aria-hidden="true" style={{ color: '#e83026' }}>*</span></label>
                    <textarea id="q-products" className="sn-input" rows={4} placeholder="e.g. Nitrile gloves (medium, large), exam table paper 18'', alcohol prep pads..." required style={{ resize: 'vertical', minHeight: '100px' }} />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="q-timeline">Preferred Delivery Timeline</label>
                      <select id="q-timeline" className="sn-input" style={{ cursor: 'pointer' }}>
                        <option value="">Select…</option>
                        <option>Same day</option>
                        <option>Next day</option>
                        <option>Within 3 days</option>
                        <option>This week</option>
                        <option>No rush</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="sn-label" htmlFor="q-contact">Preferred Contact Method</label>
                      <select id="q-contact" className="sn-input" style={{ cursor: 'pointer' }}>
                        <option value="">Select…</option>
                        <option>Phone / Text</option>
                        <option>Email</option>
                        <option>Either</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="sn-label" htmlFor="q-notes">Additional Notes</label>
                    <textarea id="q-notes" className="sn-input" rows={3} placeholder="Any special requirements, quantities, or product specifications..." style={{ resize: 'vertical' }} />
                  </div>
                  {/* File upload */}
                  <div className="mb-4">
                    <label className="sn-label">Attach a File (optional)</label>
                    <div style={{ border: '2px dashed #e6e6e6', borderRadius: '12px', padding: '24px', textAlign: 'center', background: '#f7f9fa', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                      <Upload size={24} style={{ color: '#6b7690', marginBottom: '8px', marginInline: 'auto' }} aria-hidden="true" />
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', marginBottom: '4px' }}>
                        Drag and drop or click to upload
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#a0aab4', margin: 0 }}>
                        PDF, DOC, or image — max 10MB
                      </p>
                      <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} aria-label="Upload file" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-100"
                    style={{ padding: '16px', background: 'linear-gradient(90deg, #ee6a12, #f9b23e)', border: 'none', borderRadius: '999px', color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17px', cursor: 'pointer' }}
                  >
                    Submit Quote Request
                  </button>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b7690', textAlign: 'center', marginTop: '16px' }}>
                    We respond within 1 business hour. No commitment required.
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-12 col-lg-5">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '22px', color: '#122036', marginBottom: '20px' }}>
                Or reach us directly
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                <a href="tel:+13055196804" className="sn-card p-4 d-flex align-items-center gap-3 text-decoration-none">
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg,#ee6a12,#f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} color="#fff" aria-hidden="true" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#122036', margin: 0 }}>Call or Text Isabella</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>(305) 519-6804</p>
                  </div>
                </a>
                <a href="mailto:orders@sunnovamedical.com" className="sn-card p-4 d-flex align-items-center gap-3 text-decoration-none">
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg,#ee6a12,#f9b23e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} color="#fff" aria-hidden="true" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#122036', margin: 0 }}>Email Your Order</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6b7690', margin: 0 }}>orders@sunnovamedical.com</p>
                  </div>
                </a>
              </div>
              <div style={{ background: '#1a4fa0', borderRadius: '16px', padding: '28px' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '16px' }}>What to expect</h4>
                {['Response within 1 hour', 'Clear itemized quote — no surprises', 'Same-day or next-day delivery options', 'No commitment until you approve', 'Dedicated rep for all follow-ups'].map((item, i) => (
                  <div key={i} className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: '#f9b23e', flexShrink: 0 }} aria-hidden="true">✓</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
