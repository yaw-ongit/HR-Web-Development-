import { SkeletonPageHeader, SkeletonCard, SkeletonChart } from '@/components/ui/skeleton';

export default function TalentLoading() {
  return (
    <div
      className="space-y-6 py-6"
      role="status"
      aria-label="Loading Talent workspace"
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
      <div className="grid gap-6 lg:grid-cols-3">
        <SkeletonChart />
        <SkeletonChart />
        <SkeletonChart />
      </div>
    </div>
  );
}
