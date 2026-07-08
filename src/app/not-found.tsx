'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="grid min-h-screen place-items-center bg-white px-6 py-12"
      role="main"
    >
      <div className="flex w-full max-w-md flex-col items-center rounded-[28px] border border-slate-200 bg-slate-50/90 p-10 text-center shadow-card">
        {/* Large 404 */}
        <p
          className="select-none text-8xl font-bold tabular-nums text-slate-800"
          aria-hidden="true"
        >
          404
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-brand-600">Page not found</p>

        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          This page doesn't exist
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          The route you tried to access doesn't exist or may have been moved. Check the URL or
          navigate back to the dashboard.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go to dashboard
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
