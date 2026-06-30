import { SkeletonPageHeader, SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';

export default function PeopleLoading() {
  return (
    <div
      className="space-y-6 py-6"
      role="status"
      aria-label="Loading People workspace"
    >
      <SkeletonPageHeader />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Table */}
      <SkeletonTable rows={8} cols={6} />
    </div>
  );
}
