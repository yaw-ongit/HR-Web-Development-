import { SkeletonPageHeader, SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';

export default function ClaimsLoading() {
  return (
    <div className="space-y-6 py-6" role="status" aria-label="Loading Claims">
      <SkeletonPageHeader />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <SkeletonTable rows={6} cols={6} />
    </div>
  );
}
