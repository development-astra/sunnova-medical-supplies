'use client';

export default function ContactForm() {
  return (
    <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '64px 48px', boxShadow: '0 4px 32px rgba(0,66,150,0.08)' }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(24px, 3vw, 46.4px)', color: '#000000', lineHeight: '50.1px', letterSpacing: '-0.02em', marginBottom: '8px' }}>
        Request A Catalog or Quote
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '20.5px', color: '#54585F', lineHeight: '33.8px', marginBottom: '32px' }}>
        Tell us about your practice — Isabella will follow up within the hour.
      </p>
      <form onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#000000', display: 'block', marginBottom: '6px' }} htmlFor="full-name">
              Full Name <span aria-hidden="true" style={{ color: '#e83026' }}>*</span>
            </label>
            <input id="full-name" type="text" placeholder="Jordan Rivera" required autoComplete="name"
              style={{ width: '100%', padding: '12px 16px', background: '#F8F9FA', border: '1px solid #e8eff9', borderRadius: '15px', fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#0E1822', outline: 'none' }} />
          </div>
          <div className="col-12 col-sm-6">
            <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#000000', display: 'block', marginBottom: '6px' }} htmlFor="practice-name">
              Practice Name <span aria-hidden="true" style={{ color: '#e83026' }}>*</span>
            </label>
            <input id="practice-name" type="text" placeholder="Brickell Aesthetics" required
              style={{ width: '100%', padding: '12px 16px', background: '#F8F9FA', border: '1px solid #e8eff9', borderRadius: '15px', fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#0E1822', outline: 'none' }} />
          </div>
        </div>
        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#000000', display: 'block', marginBottom: '6px' }} htmlFor="facility-type">
              Facility Type <span aria-hidden="true" style={{ color: '#e83026' }}>*</span>
            </label>
            <select id="facility-type" required
              style={{ width: '100%', padding: '12px 16px', background: '#F8F9FA', border: '1px solid #e8eff9', borderRadius: '15px', fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#0E1822', outline: 'none', cursor: 'pointer', appearance: 'none' }}>
              <option value="">Select Facility Type…</option>
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
            <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#000000', display: 'block', marginBottom: '6px' }} htmlFor="location">
              Miami-Dade Location <span aria-hidden="true" style={{ color: '#e83026' }}>*</span>
            </label>
            <input id="location" type="text" placeholder="e.g. Coral Gables" required
              style={{ width: '100%', padding: '12px 16px', background: '#F8F9FA', border: '1px solid #e8eff9', borderRadius: '15px', fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#0E1822', outline: 'none' }} />
          </div>
        </div>
        <div className="mb-3">
          <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#000000', display: 'block', marginBottom: '6px' }} htmlFor="products">
            Products / Categories Needed <span aria-hidden="true" style={{ color: '#e83026' }}>*</span>
          </label>
          <textarea id="products" rows={4} placeholder="e.g. Nitrile gloves, exam table paper, esthetic wipes..." required
            style={{ width: '100%', padding: '12px 16px', background: '#F8F9FA', border: '1px solid #e8eff9', borderRadius: '15px', fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#0E1822', outline: 'none', resize: 'vertical', minHeight: '100px' }} />
        </div>
        <div className="mb-4">
          <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: '#000000', display: 'block', marginBottom: '6px' }} htmlFor="contact-method">
            Preferred Contact Method <span aria-hidden="true" style={{ color: '#e83026' }}>*</span>
          </label>
          <input id="contact-method" type="text" placeholder="Phone / Email" required
            style={{ width: '100%', padding: '12px 16px', background: '#F8F9FA', border: '1px solid #e8eff9', borderRadius: '15px', fontFamily: 'var(--font-body)', fontSize: '15.2px', color: '#0E1822', outline: 'none' }} />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '20px', background: 'linear-gradient(90deg, #E5550F, #EDD76A)', border: 'none', borderRadius: '20px', color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '21.1px', cursor: 'pointer', letterSpacing: '-0.02em' }}
        >
          Send Inquiry
        </button>
      </form>
    </div>
  );
}
