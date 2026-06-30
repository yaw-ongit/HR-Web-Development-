import { SkeletonPageHeader, SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';

export default function AttendanceLoading() {
  return (
    <div className="space-y-6 py-6" role="status" aria-label="Loading Attendance">
      <SkeletonPageHeader />
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <SkeletonTable rows={8} cols={8} />
    </div>
  );
}
