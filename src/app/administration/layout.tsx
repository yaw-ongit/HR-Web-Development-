import { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';

export default function AdministrationLayout({ children }: { children: ReactNode }) {
  return <AppShell moduleName="Administration">{children}</AppShell>;
}
