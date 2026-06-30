'use client';

import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
}

interface SelectFilterProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  className?: string;
}

export function SelectFilter({ label, value, options, onChange, className }: SelectFilterProps) {
  return (
    <div className={cn('relative', className)}>
      <label className="sr-only">{label}</label>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  label = 'Search',
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <label className="sr-only">{label}</label>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
        aria-hidden="true"
      />
      <input
        type="search"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-3 pl-11 pr-10 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-500 transition hover:text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-400"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

interface FilterBarProps {
  children: React.ReactNode;
  className?: string;
}

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      role="search"
      className={cn(
        'rounded-[28px] border border-white/10 bg-slate-900/95 px-5 py-4 shadow-card',
        className,
      )}
    >
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}
