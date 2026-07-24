import { SkeletonPageHeader, SkeletonCard, SkeletonChart } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div
      className="min-h-screen bg-card text-foreground"
      role="status"
      aria-label="Loading dashboard"
    >
      <div className="w-full px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <SkeletonPageHeader />

          {/* KPI grid */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <SkeletonChart />
            <SkeletonChart />
          </div>
        </div>
      </div>
    </div>
  );
}
