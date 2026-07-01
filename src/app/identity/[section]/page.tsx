import { notFound } from 'next/navigation';
import { IdentityWorkspace } from '@/components/identity/identity-workspace';

const sections = [
  'authentication',
  'session-management',
  'profile-preferences',
  'security-center',
  'notification-center',
  'notification-preferences',
  'login-history',
  'active-sessions',
  'mfa-placeholder',
  'password-policies',
  'role-visibility',
];

export default async function IdentitySectionPage({ params }: { params: Promise<{ section: string }> }) {
  const resolvedParams = await params;
  if (!sections.includes(resolvedParams.section)) {
    notFound();
  }

  return <IdentityWorkspace section={resolvedParams.section} />;
}
