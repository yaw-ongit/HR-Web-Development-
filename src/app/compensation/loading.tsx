import { SkeletonPageHeader, SkeletonCard, SkeletonChart } from '@/components/ui/skeleton';

export default function CompensationLoading() {
  return (
    <div
      className="space-y-6 py-6"
      role="status"
      aria-label="Loading Compensation workspace"
    >
      <SkeletonPageHeader />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonChart />
        <SkeletonChart />
      </div>
    </div>
  );
}
