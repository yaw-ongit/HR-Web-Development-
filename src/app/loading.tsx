export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-100">
      <div className="flex flex-col items-center gap-4 rounded-[28px] border border-white/10 bg-slate-900/90 p-10 shadow-card">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400"></div>
        <div className="text-center">
          <p className="text-xl font-semibold">Loading dashboard</p>
          <p className="mt-2 text-sm text-slate-400">Preparing your enterprise intelligence command center.</p>
        </div>
      </div>
    </div>
  );
}
