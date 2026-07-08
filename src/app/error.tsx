'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error monitoring in production
    console.error('[HRIS Error]', error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="grid min-h-screen place-items-center bg-white px-6 py-12"
      role="main"
    >
      <div className="flex w-full max-w-md flex-col items-center rounded-[28px] border border-rose-500/20 bg-slate-50/90 p-10 text-center shadow-card">
        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 ring-1 ring-rose-200">
          <AlertTriangle className="h-8 w-8 text-rose-600" aria-hidden="true" />
        </div>

        {/* Label */}
        <p className="text-xs uppercase tracking-[0.3em] text-rose-600">Error 500</p>

        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          A technical issue prevented the application from loading. Our team has been notified.
          Try refreshing the page or return to the dashboard.
        </p>

        {error.digest && (
          <p className="mt-3 rounded-2xl bg-white/80 px-4 py-2 text-xs text-slate-400">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
