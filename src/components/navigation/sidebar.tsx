'use client';

import Link from 'next/link';
import { Menu, Users2, Layers, ShieldCheck, PieChart, Settings, Briefcase, KeyRound } from 'lucide-react';

const sections = [
  {
    title: 'Navigation',
    items: [
      { label: 'Dashboard', icon: PieChart, href: '/' },
      { label: 'People', icon: Users2, href: '/people' },
      { label: 'Workforce', icon: Layers, href: '/workforce' },
      { label: 'Talent', icon: Briefcase, href: '/talent' },
      { label: 'Compensation', icon: ShieldCheck, href: '/compensation' },
      { label: 'Analytics', icon: PieChart, href: '/analytics' },
      { label: 'Administration', icon: Settings, href: '/administration' },
      { label: 'Identity', icon: KeyRound, href: '/identity' },
    ],
  },
];

export function Sidebar({ open }: { open: boolean }) {
  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-full w-80 shrink-0 overflow-y-auto border-r border-white/10 bg-slate-950/95 px-5 py-6 transition-transform duration-300 lg:static lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 ring-1 ring-slate-700">
          <Menu className="h-6 w-6 text-sky-300" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Enterprise HRIS</p>
          <h1 className="text-lg font-semibold text-slate-100">Command center</h1>
        </div>
      </div>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">{section.title}</p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-3xl border border-white/5 bg-slate-900/90 px-4 py-3 text-sm text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
                >
                  <item.icon className="h-4 w-4 text-sky-300" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
