import type { ReactNode } from 'react';

export function EmptyState({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="pf-empty">
      {icon && <div style={{ marginBottom: 8, opacity: 0.5 }}>{icon}</div>}
      {children}
    </div>
  );
}
