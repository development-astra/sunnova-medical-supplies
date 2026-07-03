import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { businessAccount } from '@/lib/account/mock-customer-dashboard-data';
import { DashboardCard } from './DashboardCard';
import { StatusBadge } from './StatusBadge';
import { IconBadge } from './IconBadge';

export function BusinessAccountCard() {
  const b = businessAccount;
  const details: [string, string][] = [
    ['Saved Delivery Addresses', String(b.savedAddresses)],
    ['Team Members', String(b.teamMembers)],
    ['Special Pricing', b.specialPricing],
    ['Payment Terms', b.paymentTerms],
  ];

  return (
    <DashboardCard title="Business Account" action={{ label: 'Manage Account', href: '/account/business' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13, marginBottom: 14 }}>
        <IconBadge icon={ShieldCheck} tone="green" size={46} iconSize={22} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--pf-heading)', fontSize: 15, fontWeight: 700, color: 'var(--sunnova-dark)', margin: '0 0 3px' }}>
            {b.status}
          </p>
          <p style={{ fontFamily: 'var(--pf-body)', fontSize: 12.5, color: 'var(--color-text-muted)', margin: 0 }}>
            {b.businessName} · Account #{b.accountNumber}
          </p>
        </div>
        <StatusBadge status={b.standing} />
      </div>

      <div>
        {details.map(([key, val]) => (
          <div key={key} className="pf-biz-detail">
            <span className="pf-biz-key">{key}</span>
            <span className="pf-biz-val">{val}</span>
          </div>
        ))}
      </div>

      <Link href="/account/business/benefits" className="pf-link" style={{ marginTop: 14 }}>
        View Account Benefits <ArrowRight size={13} />
      </Link>
    </DashboardCard>
  );
}
