'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Lock, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const ACCEPTED_METHODS = [
  { label: 'Visa', color: 'bg-blue-600', text: 'VISA' },
  { label: 'Mastercard', color: 'bg-red-600', text: 'MC' },
  { label: 'American Express', color: 'bg-blue-800', text: 'AMEX' },
  { label: 'Discover', color: 'bg-orange-600', text: 'DISC' },
];

export default function PaymentMethodsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#122036] dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Payment Methods
          </h1>
          <p className="text-sm text-[#6b7690] mt-1">Manage your saved payment methods for faster checkout.</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-[#1a4fa0] hover:bg-[#163f80]">
          <CreditCard className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Info card */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-[#1a4fa0] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#122036] dark:text-white">Secure Payment Processing</p>
              <p className="text-sm text-[#6b7690] mt-0.5">
                Payment method storage requires PCI-compliant infrastructure. We are setting up secure tokenized payment storage.
                Currently, payment details are entered at checkout and never stored on our servers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty state */}
      <Card>
        <CardContent className="py-14">
          <div className="flex flex-col items-center text-center max-w-sm mx-auto">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-[#122036] dark:text-white mb-1">No saved payment methods</h2>
            <p className="text-sm text-[#6b7690]">
              Payment method saving is coming soon. You'll be able to save cards for faster checkout.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Accepted payments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Accepted Payment Methods</CardTitle>
          <CardDescription>We accept all major credit and debit cards.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {ACCEPTED_METHODS.map(({ label, color, text }) => (
              <div key={label} className={`${color} text-white rounded-lg px-4 py-2 text-sm font-bold tracking-wide`}>
                {text}
              </div>
            ))}
            <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
              <span className="text-sm font-medium text-[#6b7690]">Bank Transfer</span>
            </div>
            <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
              <span className="text-sm font-medium text-[#6b7690]">Net 30 (approved accounts)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security notice */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#122036] dark:text-white flex items-center gap-2">
                PCI DSS Compliant
                <Badge variant="success" className="text-xs">Level 1</Badge>
              </p>
              <p className="text-sm text-[#6b7690] mt-1">
                All payment data is encrypted with 256-bit SSL encryption. We never store raw card numbers on our servers.
                Our payment processing is handled by Stripe, a PCI Level 1 certified payment processor.
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Lock className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Secured by Stripe</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coming soon dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Saved payment methods are coming soon. Currently, you can enter your payment details securely at checkout.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 p-4">
            <div className="flex items-center gap-2 text-[#1a4fa0]">
              <CheckCircle className="h-4 w-4" />
              <p className="text-sm font-medium">We're working on it</p>
            </div>
            <p className="text-sm text-[#6b7690] mt-1 ml-6">
              Tokenized card storage with one-click checkout will be available soon. You'll receive an email when it's ready.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)} className="bg-[#1a4fa0] hover:bg-[#163f80]">Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
