import { EmptyState } from '@/components/ui/empty-state';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 py-12 text-slate-100">
      <EmptyState
        title="Page not found"
        description="The dashboard route you tried to access does not exist. Return to the overview to continue." 
        ctaLabel="Return home"
        href="/"
      />
    </main>
  );
}
