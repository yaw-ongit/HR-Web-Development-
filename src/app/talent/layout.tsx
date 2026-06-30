import { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';

export default function TalentLayout({ children }: { children: ReactNode }) {
  return <AppShell moduleName="Talent">{children}</AppShell>;
}
