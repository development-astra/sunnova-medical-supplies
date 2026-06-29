import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const STEPS = [
  {
    num: '1',
    title: 'Browse and order',
    description:
      "Shop our catalog online or reach out directly. Need a quote? You'll have it fast.",
  },
  {
    num: '2',
    title: 'We confirm and prep',
    description: 'We confirm your order and get it ready quickly, keeping you posted the whole way.',
  },
  {
    num: '3',
    title: 'Delivered locally',
    description:
      'Your supplies arrive at your clinic on time, without the national-warehouse wait.',
  },
];

export default function HowItWorks() {
  return (
    <section className="sn-section sn-bg-white" aria-labelledby="how-it-works-heading">
      <div className="sn-container">
        <div className="row align-items-center gy-5">
          {/* Left: steps */}
          <div className="col-12 col-lg-6">
            <p className="sn-eyebrow">How Ordering Works</p>
            <h2
              id="how-it-works-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 'clamp(28px, 4vw, 46px)',
                color: '#122036',
                marginBottom: '40px',
              }}
            >
              Ordering, Made Effortless
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {STEPS.map((step, i) => (
                <div key={i} className="d-flex gap-4 align-items-start">
                  {/* Step number */}
                  <div className="sn-step-num flex-shrink-0" aria-hidden="true">
                    {step.num}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '22px',
                        color: '#1a4fa0',
                        marginBottom: '6px',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '17px',
                        color: '#3a4660',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '4/3',
                position: 'relative',
                background: '#f7f9fa',
              }}
            >
              <Image
                src="/images/how-it-works.jpg"
                alt="Medical supply delivery process"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
