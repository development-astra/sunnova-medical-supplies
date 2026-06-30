import type { Metadata } from 'next';
import { poppins, hankenGrotesk } from '@/lib/fonts';
import { Toaster } from 'sonner';
import { Providers } from '@/components/providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sunnovamedical.com'),
  title: {
    default: 'Sunnova Medical Supplies | Miami-Dade Local Medical Supply Partner',
    template: '%s | Sunnova Medical Supplies',
  },
  description:
    "Miami-Dade's local medical supply partner. Professional medical and aesthetic supplies delivered fast across Miami-Dade. Founded by a medical professional. Serving med spas, clinics, and practices.",
  keywords: [
    'medical supplies Miami',
    'medical supply Miami-Dade',
    'aesthetic supplies Miami',
    'exam gloves Miami',
    'medical supplies delivery Miami',
    'local medical distributor Miami',
    'med spa supplies Miami',
    'clinic supplies Miami-Dade',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Sunnova Medical Supplies',
    title: 'Sunnova Medical Supplies | Miami-Dade Local Medical Supply Partner',
    description:
      "Miami's local medical supply partner. Fast local delivery across Miami-Dade. Founded by a medical professional.",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunnova Medical Supplies | Miami-Dade Local Medical Supply Partner',
    description: "Miami's local medical supply partner. Fast local delivery across Miami-Dade.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${hankenGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: { fontFamily: 'var(--font-hanken-grotesk)', borderRadius: '8px' },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
