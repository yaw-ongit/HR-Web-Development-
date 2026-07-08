'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, LockKeyhole, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const emailId = useId();
  const passwordId = useId();
  const [email, setEmail] = useState('dewi.lestari@nts.co.id');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted && !email.includes('@') ? 'Masukkan alamat email perusahaan yang valid.' : '';
  const passwordError = submitted && password.length > 0 && password.length < 8 ? 'Kata sandi harus minimal 8 karakter.' : '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (emailError || passwordError) return;
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1200);
  }

  return (
    <main id="main-content" className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-5xl items-center gap-10 lg:grid-cols-[1fr_420px]">
        {/* Brand panel */}
        <section aria-label="Branding HRIS PT Indocater" className="space-y-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-slate-50 ring-1 ring-slate-700" aria-hidden="true">
            <ShieldCheck className="h-7 w-7 text-brand-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">PT Indocater HRIS</p>
            <h1 className="mt-2 max-w-lg text-4xl font-semibold text-slate-900 lg:text-5xl">
              Platform HR internal yang aman
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Masuk untuk mengelola operasi HR, persetujuan, data karyawan, dan analitik dari satu portal terpadu.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3" aria-label="Fitur keamanan">
            {['SSO siap', 'MFA aktif', 'Audit logging'].map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <LockKeyhole className="h-4 w-4 text-brand-600" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-slate-900">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Login form */}
        <Card title="Masuk" description="Gunakan akun perusahaan untuk masuk.">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate aria-label="Login form">
            {/* Email */}
            <div>
              <label htmlFor={emailId} className="block text-xs uppercase tracking-[0.24em] text-slate-400">
                Alamat email <span aria-hidden="true" className="text-rose-600">*</span>
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? `${emailId}-error` : undefined}
                className={`mt-2 w-full rounded-3xl border bg-white/90 p-4 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-brand-500/30 ${
                  emailError ? 'border-rose-500 focus:border-rose-400' : 'border-slate-200 focus:border-brand-500'
                }`}
              />
              {emailError && (
                <p id={`${emailId}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor={passwordId} className="block text-xs uppercase tracking-[0.24em] text-slate-400">
                Kata sandi <span aria-hidden="true" className="text-rose-600">*</span>
              </label>
              <div className="relative mt-2">
                <input
                  id={passwordId}
                  type={visible ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? `${passwordId}-error` : undefined}
                  className={`w-full rounded-3xl border bg-white/90 p-4 pr-12 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-brand-500/30 ${
                    passwordError ? 'border-rose-500 focus:border-rose-400' : 'border-slate-200 focus:border-brand-500'
                  }`}
                />
                <button
                  type="button"
                  aria-label={visible ? 'Hide password' : 'Show password'}
                  onClick={() => setVisible((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 transition hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordError && (
                <p id={`${passwordId}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{passwordError}
                </p>
              )}
            </div>

            {/* Remember + forgot */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-400 bg-slate-100 text-brand-600 focus:ring-brand-500"
                />
                Ingat saya
              </label>
              <Link
                href="/identity"
                className="text-sm font-semibold text-brand-600 transition hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded"
              >
                Lupa kata sandi?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full rounded-full"
            >
              Masuk
            </Button>

            <p className="text-center text-sm text-slate-400">
              Butuh akses?{' '}
              <Link href="/identity" className="font-semibold text-brand-600 transition hover:text-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 rounded">
                Hubungi administrator
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </main>
  );
}
