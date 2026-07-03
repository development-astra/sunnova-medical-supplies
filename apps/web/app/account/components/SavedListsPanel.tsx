import Link from 'next/link';
import { FolderHeart, ChevronRight } from 'lucide-react';
import { savedLists } from '@/lib/account/mock-customer-dashboard-data';
import { DashboardCard } from './DashboardCard';

export function SavedListsPanel() {
  return (
    <DashboardCard title="Saved Lists" action={{ label: 'View All Lists', href: '/account/saved-lists' }}>
      <div>
        {savedLists.map((list) => (
          <Link key={list.id} href={`/account/saved-lists/${list.id}`} className="pf-saved-row">
            <span className="pf-thumb" aria-hidden="true">
              <FolderHeart size={19} />
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="pf-list-name" style={{ display: 'block' }}>{list.name}</span>
              <span className="pf-list-meta" style={{ display: 'block' }}>{list.itemCount} items</span>
            </span>
            <ChevronRight size={17} color="var(--color-text-subtle)" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </DashboardCard>
  );
}
