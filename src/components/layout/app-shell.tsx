'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Menu, Bell, SunMedium, Search, ChevronDown } from 'lucide-react';
import { Sidebar } from '@/components/navigation/sidebar';
import { PageContainer } from '@/components/layout/page-container';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  pageTitle?: string;
  moduleName?: string;
}

export function AppShell({ children, pageTitle, moduleName }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#f1f5f9_100%)] text-slate-900">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-72">
        {/* Top header */}
        <header
          className="sticky top-0 z-30 border-b border-brand-100/80 bg-white/95 backdrop-blur-xl"
          role="banner"
        >
          <PageContainer>
            <div className="flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4">
              {/* Left: hamburger + page title */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Buka menu navigasi"
                  aria-expanded={sidebarOpen}
                  aria-controls="sidebar"
                  onClick={() => setSidebarOpen(true)}
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-2xl',
                    'border border-brand-100 bg-brand-50 text-brand-700 transition',
                    'hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 lg:hidden',
                  )}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
                {(moduleName || pageTitle) && (
                  <div>
                    {moduleName && (
                      <p className="text-[10px] uppercase tracking-[0.3em] text-brand-600">
                        {moduleName}
                      </p>
                    )}
                    {pageTitle && (
                      <h2 className="text-lg font-semibold text-brand-900">{pageTitle}</h2>
                    )}
                  </div>
                )}
              </div>

              {/* Right: search + actions */}
              <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
                {/* Global search */}
                <div className="relative hidden sm:block w-full max-w-xs">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    aria-label="Pencarian global"
                    placeholder="Cari..."
                    className={cn(
                      'w-full rounded-full border border-brand-100 bg-white/90 py-2.5 pl-10 pr-4 text-sm text-slate-900',
                      'outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30',
                    )}
                  />
                </div>

                {/* Notifications */}
                <button
                  type="button"
                  aria-label="Lihat pemberitahuan"
                  className={cn(
                    'relative inline-flex h-10 w-10 items-center justify-center rounded-2xl',
                    'bg-brand-50 text-brand-700 transition hover:bg-brand-100 hover:text-brand-900',
                    'focus:outline-none focus:ring-2 focus:ring-brand-500',
                  )}
                >
                  <Bell className="h-5 w-5" aria-hidden="true" />
                  {/* Notification dot */}
                  <span
                    className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-500"
                    aria-label="3 unread notifications"
                  />
                </button>

                {/* Theme toggle */}
                <button
                  type="button"
                  aria-label="Ubah tema"
                  className={cn(
                    'hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-2xl',
                    'bg-slate-50 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900',
                    'focus:outline-none focus:ring-2 focus:ring-brand-500',
                  )}
                >
                  <SunMedium className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* User menu */}
                <button
                  type="button"
                  aria-label="Menu pengguna — Maya Thompson"
                  aria-haspopup="true"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-2.5 py-1.5',
                    'text-sm text-slate-900 transition hover:bg-brand-50',
                    'focus:outline-none focus:ring-2 focus:ring-brand-500',
                  )}
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-xs font-bold text-white"
                    aria-hidden="true"
                  >
                    M
                  </div>
                  <span className="hidden font-medium sm:block">Maya</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                </button>
              </div>
            </div>
          </PageContainer>
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <PageContainer className="pt-2 sm:pt-4 lg:pt-6">{children}</PageContainer>
        </main>
      </div>
    </div>
  );
}
