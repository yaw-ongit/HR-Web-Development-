import Link from 'next/link';
import { ReactNode } from 'react';
import { BarChart3, Bell, BookOpen, CalendarDays, ClipboardList, FolderOpen, Users2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  ctaLabel?: string;
  href?: string;
  onCtaClick?: () => void;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
  children?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  href,
  onCtaClick,
  secondaryLabel,
  secondaryHref,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-label={title}
      className={cn(
        'flex w-full flex-col items-center rounded-[28px] border border-border/70 bg-card/80 p-10 text-center shadow-[0_18px_48px_rgba(2,34,74,0.16)]',
        className,
      )}
    >
      {icon && (
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-primary ring-1 ring-brand-100">
          {icon}
        </div>
      )}

      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-3 max-w-sm text-sm leading-7 text-muted">{description}</p>

      {children}

      {(ctaLabel || secondaryLabel) && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {ctaLabel &&
            (href ? (
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white"
              >
                {ctaLabel}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white"
              >
                {ctaLabel}
              </button>
            ))}
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface/90 px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-brand-400 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export function NoKaryawansEmptyState({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<Users2 className="h-7 w-7" aria-hidden="true" />}
      title="Tidak ada karyawan"
      description="Direktori karyawan kosong atau tidak ada catatan yang cocok dengan filter saat ini. Tambahkan karyawan atau ubah kriteria pencarian."
      ctaLabel="Tambah karyawan"
      onCtaClick={onAdd}
      secondaryLabel="Impor dari CSV"
      secondaryHref="/people"
    />
  );
}

export function NoAttendanceEmptyState() {
  return (
    <EmptyState
      icon={<CalendarDays className="h-7 w-7" aria-hidden="true" />}
      title="Tidak ada data kehadiran"
      description="Tidak ada data kehadiran untuk periode atau filter yang dipilih. Coba ubah rentang tanggal atau departemen."
      ctaLabel="Lihat hari ini"
      href="/workforce/attendance"
    />
  );
}

export function NoTrainingEmptyState() {
  return (
    <EmptyState
      icon={<BookOpen className="h-7 w-7" aria-hidden="true" />}
      title="Belum ada program pelatihan"
      description="Belum ada program pelatihan yang ditetapkan. Buat program baru atau daftarkan karyawan dari modul talenta."
      ctaLabel="Kelola pelatihan"
      href="/talent/training"
    />
  );
}

export function NoClaimsEmptyState() {
  return (
    <EmptyState
      icon={<ClipboardList className="h-7 w-7" aria-hidden="true" />}
      title="Belum ada klaim"
      description="Belum ada klaim yang diajukan. Karyawan yang memenuhi syarat dapat mengajukan klaim kesehatan dan kesejahteraan melalui modul kompensasi."
      ctaLabel="Lihat klaim"
      href="/compensation/claims"
    />
  );
}

export function NoReportsEmptyState() {
  return (
    <EmptyState
      icon={<BarChart3 className="h-7 w-7" aria-hidden="true" />}
      title="Belum ada laporan"
      description="Belum ada laporan yang dibuat untuk periode ini. Buat laporan untuk menganalisis data dan tren tenaga kerja."
      ctaLabel="Buka analitik"
      href="/analytics"
    />
  );
}

export function NoNotificationsEmptyState() {
  return (
    <EmptyState
      icon={<Bell className="h-7 w-7" aria-hidden="true" />}
      title="Tidak ada pemberitahuan baru"
      description="Tidak ada pemberitahuan baru. Kami akan memberi tahu saat ada hal yang memerlukan perhatian Anda."
    />
  );
}

export function NoDataEmptyState({ module }: { module?: string }) {
  return (
    <EmptyState
      icon={<FolderOpen className="h-7 w-7" aria-hidden="true" />}
      title={`Belum ada ${module ?? 'data'}`}
      description="Belum ada catatan untuk ditampilkan saat ini. Bagian ini akan terisi setelah data tersedia."
      ctaLabel="Kembali ke beranda"
      href="/"
    />
  );
}
