'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LayoutDashboard, Users2, Layers, ShieldCheck, PieChart, Settings, Briefcase, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Data Karyawan', icon: Users2, href: '/people' },
  { label: 'Kehadiran & Waktu', icon: Layers, href: '/workforce' },
  { label: 'Rekrutmen & Pelatihan', icon: Briefcase, href: '/talent' },
  { label: 'Penggajian & Benefit', icon: ShieldCheck, href: '/compensation' },
  { label: 'Laporan Analitik', icon: PieChart, href: '/analytics' },
  { label: 'Administrasi', icon: Settings, href: '/administration' },
  { label: 'Hak Akses', icon: KeyRound, href: '/identity' },
];

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-white/70 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        id="sidebar"
        aria-label="Main navigation"
        className={cn(
          'fixed left-0 top-0 z-40 flex h-full w-72 shrink-0 flex-col overflow-y-auto',
          'border-r border-slate-200 bg-white/98 px-4 py-6 backdrop-blur-xl',
          'transition-transform duration-300 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo / Brand */}
        <div className="mb-8 flex items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 ring-1 ring-blue-100"
              aria-hidden="true"
            >
              <LayoutDashboard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Enterprise</p>
              <p className="text-sm font-semibold text-slate-900">HRIS Platform</p>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav aria-label="Main menu">
          <p className="mb-3 px-2 text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Navigasi
          </p>
          <ul className="space-y-0.5" role="list">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label} role="listitem">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-slate-950',
                      active
                        ? 'bg-blue-50 text-blue-500 ring-1 ring-blue-100'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        active ? 'text-blue-600' : 'text-slate-400',
                      )}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-slate-950"
                aria-hidden="true"
              >
                M
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">Maya Thompson</p>
                <p className="truncate text-xs text-slate-400">HR Officer</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
