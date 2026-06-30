import { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';

export default function WorkforceLayout({ children }: { children: ReactNode }) {
  return <AppShell moduleName="Workforce">{children}</AppShell>;
}
