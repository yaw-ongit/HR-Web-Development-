import { useEffect } from 'react';
import { EmptyState } from '@/components/ui/empty-state';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 py-12 text-slate-100">
      <EmptyState
        title="Something went wrong"
        description="A technical issue prevented the dashboard from loading. Try refreshing or coming back in a moment."
        ctaLabel="Reload page"
        href="/"
      />
    </main>
  );
}
