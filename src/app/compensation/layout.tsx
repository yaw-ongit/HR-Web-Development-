import { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';

export default function CompensationLayout({ children }: { children: ReactNode }) {
  return <AppShell moduleName="Compensation">{children}</AppShell>;
}
