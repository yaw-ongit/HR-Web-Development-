import { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';

export default function PeopleLayout({ children }: { children: ReactNode }) {
  return <AppShell moduleName="People">{children}</AppShell>;
}
