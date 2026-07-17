'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, Menu, Search, Settings, SunMedium, UserRound, X } from 'lucide-react';
import { Sidebar } from '@/components/navigation/sidebar';
import { PageContainer } from '@/components/layout/page-container';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

interface AppShellProps { children: ReactNode; pageTitle?: string; moduleName?: string; }

export function AppShell({ children, pageTitle, moduleName }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:ml-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl" role="banner">
          <PageContainer>
            <div className="flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4">
              <div className="flex min-w-0 items-center gap-3">
                <button type="button" aria-label="Buka menu navigasi" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface text-foreground lg:hidden"><Menu className="h-5 w-5" /></button>
                {(moduleName || pageTitle) && <div className="min-w-0">{moduleName && <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{moduleName}</p>}{pageTitle && <h2 className="truncate text-lg font-semibold text-foreground">{pageTitle}</h2>}</div>}
              </div>
              <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
                <div className="relative hidden w-full max-w-xs sm:block"><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input type="search" aria-label="Pencarian global" placeholder="Cari..." value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></div>
                <div className="relative">
                  <button type="button" aria-label="Lihat pemberitahuan" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((value) => !value)} className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-surface text-foreground hover:bg-secondary"><Bell className="h-5 w-5" /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" /></button>
                  {notificationsOpen && <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-border bg-card p-4 shadow-xl text-card-foreground"><div className="flex items-center justify-between"><p className="font-semibold">Pemberitahuan</p><span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">3 baru</span></div><p className="mt-3 text-sm text-muted-foreground">Ada 3 pengajuan yang menunggu verifikasi Anda.</p><Link href="/workforce/leave-management" onClick={() => setNotificationsOpen(false)} className="mt-3 inline-flex text-sm font-semibold text-primary">Lihat pengajuan →</Link></div>}
                </div>
                <ThemeSwitcher />
                <div className="relative">
                  <button type="button" aria-label="Menu pengguna Maya Sari" aria-haspopup="true" aria-expanded={profileOpen} onClick={() => setProfileOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1.5 text-sm text-foreground hover:bg-secondary"><span className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary text-xs font-bold text-primary-foreground">M</span><span className="hidden font-medium sm:block">Maya</span><ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /></button>
                  {profileOpen && <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-border bg-card p-2 shadow-xl text-card-foreground"><Link href="/people/1" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-secondary"><UserRound className="h-4 w-4" /> Profil saya</Link><Link href="/administration" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-secondary"><Settings className="h-4 w-4" /> Pengaturan</Link><button type="button" onClick={() => setProfileOpen(false)} className="mt-1 flex w-full items-center gap-2 border-t border-border px-3 py-2 pt-3 text-left text-sm text-primary"><X className="h-4 w-4" /> Tutup menu</button></div>}
                </div>
              </div>
            </div>
          </PageContainer>
        </header>
        <main id="main-content" className="flex-1" tabIndex={-1}><PageContainer className="pt-2 sm:pt-4 lg:pt-6">{children}</PageContainer></main>
      </div>
    </div>
  );
}
