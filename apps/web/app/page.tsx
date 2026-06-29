import type { Metadata } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import WhySunnova from '@/components/home/WhySunnova';
import HowItWorks from '@/components/home/HowItWorks';
import LocalDelivery from '@/components/home/LocalDelivery';
import WhoWeServe from '@/components/home/WhoWeServe';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: "Miami's Local Medical Supply Partner | Sunnova Medical Supplies",
  description:
    "Professional medical and aesthetic supplies delivered fast across Miami-Dade. Founded by a medical professional. Serving med spas, clinics, and practices. Same-week delivery.",
};

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <CategorySection />
      <WhySunnova />
      <HowItWorks />
      <LocalDelivery />
      <WhoWeServe />
      <Testimonials />
      <CTASection />
    </SiteLayout>
  );
}
