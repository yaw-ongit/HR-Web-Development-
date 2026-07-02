import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PT Indocater HRIS',
    template: '%s | PT Indocater HRIS',
  },
  description:
    'Sistem Informasi SDM internal PT Indocater untuk manajemen karyawan, pelatihan, kesehatan, dan kepatuhan HSE.',
  keywords: ['PT Indocater', 'HRIS', 'SDM', 'pelatihan', 'kesehatan kerja', 'kompensasi'],
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b3b83',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inter font loaded via CSS for performance */}
      </head>
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-2xl focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
