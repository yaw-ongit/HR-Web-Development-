import { SkeletonPageHeader, SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';

export default function IdentityLoading() {
  return (
    <div
      className="space-y-6 py-6"
      role="status"
      aria-label="Loading Identity workspace"
    >
      <SkeletonPageHeader />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <SkeletonTable rows={5} cols={6} />
    </div>
  );
}
