import { Download } from 'lucide-react';
import { invoices, currentBalance, formatCurrency } from '@/lib/account/mock-customer-dashboard-data';
import { DashboardCard } from './DashboardCard';
import { StatusBadge } from './StatusBadge';

export function InvoicesPaymentsCard() {
  return (
    <DashboardCard title="Invoices & Payments" action={{ label: 'View All Invoices', href: '/account/invoices' }}>
      <div className="pf-invoice-grid">
        <div className="pf-table-wrap">
          <table className="pf-table" style={{ minWidth: 420 }}>
            <thead>
              <tr>
                <th scope="col">Invoice #</th>
                <th scope="col">Date</th>
                <th scope="col">Due</th>
                <th scope="col">Status</th>
                <th scope="col" style={{ textAlign: 'right' }}>Total</th>
                <th scope="col"><span className="pf-visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="pf-td-strong">{inv.id}</td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{inv.date}</td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{inv.dueDate}</td>
                  <td><StatusBadge status={inv.status} /></td>
                  <td className="pf-td-money" style={{ textAlign: 'right' }}>{formatCurrency(inv.total)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <a href={`/account/invoices/${inv.id}.pdf`} className="pf-actionbtn" aria-label={`Download invoice ${inv.id}`}>
                      <Download size={15} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Current balance */}
        <div className="pf-balance">
          <p className="pf-balance-label">Current Balance</p>
          <p className="pf-balance-value">{formatCurrency(currentBalance.amount)}</p>
          <p className="pf-balance-due">{currentBalance.dueLabel}</p>
          <a href="/account/invoices?pay=1" className="pf-balance-btn">Make a Payment</a>
        </div>
      </div>
    </DashboardCard>
  );
}
