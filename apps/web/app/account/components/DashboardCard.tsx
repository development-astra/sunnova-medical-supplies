import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  title?: string;
  titleIcon?: ReactNode;
  action?: { label: string; href: string };
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

/** White portal card with an optional header + action link. */
export function DashboardCard({ title, titleIcon, action, children, className, padded = true }: DashboardCardProps) {
  return (
    <section className={`pf-card${className ? ` ${className}` : ''}`}>
      {(title || action) && (
        <div className="pf-card-head">
          {title && (
            <h2 className="pf-card-title">
              {titleIcon}
              {title}
            </h2>
          )}
          {action && (
            <Link href={action.href} className="pf-link">
              {action.label} <ArrowRight size={13} />
            </Link>
          )}
        </div>
      )}
      <div className={padded ? 'pf-card-body' : undefined}>{children}</div>
    </section>
  );
}
