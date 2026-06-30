'use client';
import { motion } from 'framer-motion';
import { Download, FileText, BookOpen, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DIGITAL_TYPES = [
  { icon: FileText, label: 'Protocols & SOPs', description: 'Step-by-step clinical protocols and standard operating procedures.' },
  { icon: BookOpen, label: 'Product Guides', description: 'Usage guides, safety data sheets, and product documentation.' },
  { icon: Award, label: 'Certificates', description: 'Certificates of conformity, CoA documents, and compliance records.' },
  { icon: Download, label: 'Training Materials', description: 'Staff training modules and instructional content for your team.' },
];

export default function DownloadsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122036] dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>
          Downloads
        </h1>
        <p className="text-sm text-[#6b7690] mt-1">Access your digital products, documents, and resources.</p>
      </div>

      {/* Empty state */}
      <Card>
        <CardContent className="py-16">
          <div className="flex flex-col items-center text-center max-w-md mx-auto">
            <div className="h-20 w-20 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
              <Download className="h-10 w-10 text-[#1a4fa0]" />
            </div>
            <h2 className="text-xl font-semibold text-[#122036] dark:text-white mb-2">No downloads yet</h2>
            <p className="text-[#6b7690] text-sm mb-6">
              Digital products such as protocols, guides, certificates, and training materials will appear here after purchase.
            </p>
            <Button asChild className="bg-[#1a4fa0] hover:bg-[#163f80]">
              <Link href="/shop">
                Browse Products
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* What types of downloads */}
      <div>
        <h2 className="text-base font-semibold text-[#122036] dark:text-white mb-3">What you'll find here</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DIGITAL_TYPES.map(({ icon: Icon, label, description }) => (
            <Card key={label} className="border-0 bg-muted/50">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-background border flex items-center justify-center shrink-0">
                    <Icon className="h-4.5 w-4.5 text-[#1a4fa0]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#122036] dark:text-white">{label}</p>
                    <p className="text-xs text-[#6b7690] mt-0.5">{description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
