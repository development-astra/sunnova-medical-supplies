import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  title?: string;
  titleIcon?: ReactNode;
  /** Optional "View all" style link in the card header. */
  action?: { label: string; href: string };
  children: ReactNode;
  className?: string;
  /** When false, the body padding is removed (e.g. tables that manage their own). */
  padded?: boolean;
}

/** Standard white dashboard card with an optional header + action link. */
export function DashboardCard({ title, titleIcon, action, children, className, padded = true }: DashboardCardProps) {
  return (
    <section className={`sa-card${className ? ` ${className}` : ''}`}>
      {(title || action) && (
        <div className="sa-card-head">
          {title && (
            <h2 className="sa-card-title">
              {titleIcon}
              {title}
            </h2>
          )}
          {action && (
            <Link href={action.href} className="sa-link">
              {action.label} <ArrowRight size={13} />
            </Link>
          )}
        </div>
      )}
      <div className={padded ? 'sa-card-body' : undefined}>{children}</div>
    </section>
  );
}
