'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  LayoutDashboard,
  Users2,
  Layers,
  ShieldCheck,
  PieChart,
  Settings,
  Briefcase,
  FileText,
  Clock,
  CalendarCheck,
  BookOpen,
  Sparkles,
  UserPlus,
  Wallet,
  ShieldAlert,
  HeartPulse,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Data Karyawan', icon: Users2, href: '/people' },
  { label: 'Struktur Organisasi', icon: Layers, href: '/people/org-structure' },
  { label: 'Dokumen Karyawan', icon: FileText, href: '/people/documents' },
  { label: 'Presensi', icon: Clock, href: '/workforce' },
  { label: 'Shift', icon: CalendarCheck, href: '/workforce/shift-management' },
  { label: 'Cuti & Izin', icon: BookOpen, href: '/workforce/leave-management' },
  { label: 'Lembur', icon: Sparkles, href: '/workforce/overtime' },
  { label: 'Rekrutmen', icon: Briefcase, href: '/talent' },
  { label: 'Onboarding', icon: UserPlus, href: '/talent/onboarding' },
  { label: 'Pelatihan & Sertifikasi', icon: ShieldCheck, href: '/talent/training' },
  { label: 'Payroll', icon: Wallet, href: '/compensation/payroll-ready' },
  { label: 'Benefit', icon: ShieldAlert, href: '/compensation/benefits' },
  { label: 'BPJS & Asuransi', icon: ShieldCheck, href: '/compensation/insurance' },
  { label: 'MCU', icon: HeartPulse, href: '/compensation/medical' },
  { label: 'Analitik HR', icon: PieChart, href: '/analytics' },
  { label: 'Administrasi HR', icon: Settings, href: '/administration' },
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
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
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
          'border-r border-brand-800/80 bg-[linear-gradient(180deg,#002952_0%,#071f3d_100%)] px-4 py-6 shadow-2xl shadow-brand-950/25',
          'transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo / Brand */}
        <div className="mb-8 flex items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-50 ring-1 ring-brand-200" aria-hidden="true">
              <img src="/placeholder-logo.svg" alt="PT Indocater" className="h-8 w-8" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-300">PT Indocater</p>
              <p className="text-sm font-semibold text-white">HRIS Internal</p>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-full p-1.5 text-brand-200 transition hover:bg-brand-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav aria-label="Main menu">
          <p className="mb-3 px-2 text-[10px] uppercase tracking-[0.3em] text-brand-200/90">
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
                      'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 focus:ring-offset-brand-900',
                      active
                        ? 'bg-gradient-to-r from-brand-700 to-brand-600 text-white ring-1 ring-brand-400/40 shadow-sm'
                        : 'text-brand-100 hover:bg-brand-800/70 hover:text-white',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        active ? 'text-white' : 'text-brand-300',
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
          <div className="rounded-2xl border border-brand-700/70 bg-brand-950/50 px-4 py-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white"
                aria-hidden="true"
              >
                M
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">Maya Thompson</p>
                <p className="truncate text-xs text-brand-300">HR Officer</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
