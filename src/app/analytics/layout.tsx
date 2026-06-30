import { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';

export default function AnalyticsLayout({ children }: { children: ReactNode }) {
  return <AppShell moduleName="Analytics">{children}</AppShell>;
}
