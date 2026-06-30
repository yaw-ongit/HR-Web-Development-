import { ReactNode } from 'react';
import { PageContainer } from '@/components/layout/page-container';

export default function PeopleLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <PageContainer>{children}</PageContainer>
    </main>
  );
}
