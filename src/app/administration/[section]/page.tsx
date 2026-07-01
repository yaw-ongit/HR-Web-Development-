import { notFound } from 'next/navigation';
import { AdministrationWorkspace } from '@/components/administration/administration-workspace';

const sections = [
  'master-data',
  'organization-management',
  'user-management',
  'role-management',
  'permission-management',
  'workflow-configuration',
  'approval-matrix',
  'company-settings',
  'notification-templates',
  'audit-logs',
  'activity-logs',
  'integration-settings',
  'system-preferences',
];

export default async function AdministrationSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = await params;
  if (!sections.includes(resolvedParams.section)) {
    notFound();
  }

  return <AdministrationWorkspace section={resolvedParams.section} />;
}
