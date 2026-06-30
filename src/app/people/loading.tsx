export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-100">
      <div className="flex min-h-[260px] w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-[28px] border border-white/10 bg-slate-900/90 p-10 shadow-card">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400"></div>
        <p className="text-lg font-semibold">Loading People workspace</p>
        <p className="text-sm text-slate-400">Preparing the employee directory and workspace content.</p>
      </div>
    </div>
  );
}
