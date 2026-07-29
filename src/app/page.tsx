import { cookies } from 'next/headers';
import DashboardPage from '@/components/dashboard/dashboard-page';
import LandingPage from '@/components/landing/landing-page';

export const metadata = {
  title: 'PT Indocater - Catering & Camp Management Services',
};

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get('hris_session')?.value;

  if (session) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}
