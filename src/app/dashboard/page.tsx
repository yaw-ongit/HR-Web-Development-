import { Suspense } from 'react';
import DashboardPage from '@/components/dashboard/dashboard-page';
import { DashboardService } from '@/lib/dashboard-service';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const realData = await DashboardService.getDashboardData();

  return (
    <Suspense fallback={<div className="p-8 space-y-6"><Skeleton className="h-64 w-full" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /></div></div>}>
      <DashboardPage realData={realData} />
    </Suspense>
  );
}
