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
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top header */}
        <header
          className="sticky top-0 z-30 border-b border-slate-200 bg-white/98 backdrop-blur-xl"
          role="banner"
        >
          <PageContainer>
            <div className="flex items-center justify-between gap-4 py-4">
              {/* Left: hamburger + page title */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  aria-expanded={sidebarOpen}
                  aria-controls="sidebar"
                  onClick={() => setSidebarOpen(true)}
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-2xl',
                    'border border-slate-200 bg-slate-50 text-slate-800 transition',
                    'hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden',
                  )}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
                {(moduleName || pageTitle) && (
                  <div>
                    {moduleName && (
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                        {moduleName}
                      </p>
                    )}
                    {pageTitle && (
                      <h2 className="text-lg font-semibold text-slate-900">{pageTitle}</h2>
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
                    aria-label="Global search"
                    placeholder="Search..."
                    className={cn(
                      'w-full rounded-full border border-slate-200 bg-slate-50/90 py-2.5 pl-10 pr-4 text-sm text-slate-900',
                      'outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30',
                    )}
                  />
                </div>

                {/* Notifications */}
                <button
                  type="button"
                  aria-label="View notifications"
                  className={cn(
                    'relative inline-flex h-10 w-10 items-center justify-center rounded-2xl',
                    'bg-slate-50 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  )}
                >
                  <Bell className="h-5 w-5" aria-hidden="true" />
                  {/* Notification dot */}
                  <span
                    className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-blue-500"
                    aria-label="3 unread notifications"
                  />
                </button>

                {/* Theme toggle */}
                <button
                  type="button"
                  aria-label="Toggle theme"
                  className={cn(
                    'hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-2xl',
                    'bg-slate-50 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  )}
                >
                  <SunMedium className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* User menu */}
                <button
                  type="button"
                  aria-label="User menu — Maya Thompson"
                  aria-haspopup="true"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5',
                    'text-sm text-slate-900 transition hover:bg-slate-100',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  )}
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-slate-950"
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
          <PageContainer className="pt-2 sm:pt-4 lg:pt-5">{children}</PageContainer>
        </main>
      </div>
    </div>
  );
}
