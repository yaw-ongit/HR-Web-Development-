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

export default function IdentitySectionPage({ params }: { params: { section: string } }) {
  if (!sections.includes(params.section)) {
    notFound();
  }

  return <IdentityWorkspace section={params.section} />;
}
