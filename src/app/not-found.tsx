'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,#f8fafc_0%,#f1f5f9_100%)] px-6 py-12"
      role="main"
    >
      <div className="flex w-full max-w-md flex-col items-center rounded-[28px] border border-brand-100/80 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] p-10 text-center shadow-[0_18px_48px_rgba(2,34,74,0.08)]">
        {/* Large 404 */}
        <p
          className="select-none text-8xl font-bold tabular-nums text-slate-800"
          aria-hidden="true"
        >
          404
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-brand-600">Page not found</p>

        <h1 className="mt-3 text-2xl font-semibold text-brand-900">
          This page doesn't exist
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          The route you tried to access doesn't exist or may have been moved. Check the URL or
          navigate back to the dashboard.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-brand-600 hover:to-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go to dashboard
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
