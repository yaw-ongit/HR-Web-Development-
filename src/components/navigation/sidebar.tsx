'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Briefcase,
  CalendarCheck,
  Clock,
  FileText,
  HeartPulse,
  Layers,
  LayoutDashboard,
  PieChart,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users2,
  Wallet,
  X,
  LogOut,
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

  const handleLogout = () => {
    document.cookie = 'hris_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/login';
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      <aside
        id="sidebar"
        aria-label="Navigasi utama"
        className={cn(
          'fixed left-0 top-0 z-40 flex h-full w-72 shrink-0 flex-col overflow-y-auto',
          'bg-transparent px-4 py-6',
          'transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mb-8 flex items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card ring-1 ring-brand-200" aria-hidden="true">
              <Image src="/logo-indocater.jpg" alt="PT Indocater" width={40} height={40} className="h-10 w-10 object-contain" priority />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-300">PT Indocater</p>
              <p className="text-sm font-semibold text-white">Enterprise HRIS</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Tutup navigasi"
            onClick={onClose}
            className="rounded-full p-1.5 text-brand-200 transition hover:bg-brand-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Menu utama">
          <p className="mb-3 px-2 text-[10px] uppercase tracking-[0.3em] text-brand-200/90">
            Navigasi
          </p>
          <ul className="space-y-0.5" role="list">
            {navItems.filter(item => ['Dashboard', 'Data Karyawan', 'Pelatihan & Sertifikasi'].includes(item.label)).map((item) => {
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
                        ? 'bg-gradient-to-r from-brand-700 to-brand-600 text-white shadow-sm ring-1 ring-brand-400/40'
                        : 'text-brand-100 hover:bg-brand-800/70 hover:text-white',
                    )}
                  >
                    <item.icon
                      className={cn('h-4 w-4 shrink-0', active ? 'text-white' : 'text-brand-300')}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-6">
          <div className="rounded-2xl border border-brand-700/70 bg-brand-950/50 px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  M
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">Maya Sari</p>
                  <p className="truncate text-xs text-brand-300">Staf SDM</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Keluar"
                className="p-1.5 text-brand-300 hover:text-white rounded-lg hover:bg-brand-800 transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
