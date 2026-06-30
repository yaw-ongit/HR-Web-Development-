import { SkeletonPageHeader, SkeletonCard, SkeletonChart, SkeletonTable } from '@/components/ui/skeleton';

export default function WorkforceLoading() {
  return (
    <div
      className="space-y-6 py-6"
      role="status"
      aria-label="Loading Workforce workspace"
    >
      <SkeletonPageHeader />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonChart />
        <SkeletonChart />
      </div>
      <SkeletonTable rows={6} cols={7} />
    </div>
  );
}
