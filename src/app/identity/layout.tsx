import { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';

export default function IdentityLayout({ children }: { children: ReactNode }) {
  return <AppShell moduleName="Identity & Security">{children}</AppShell>;
}
