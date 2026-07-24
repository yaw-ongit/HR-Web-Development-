'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, LockKeyhole, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const usernameId = useId();
  const passwordId = useId();
  
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Username dan kata sandi wajib diisi.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        // Set persistent cookie
        document.cookie = 'hris_session=admin; path=/; max-age=86400; samesite=lax';
        window.location.href = '/';
      } else {
        setLoading(false);
        setErrorMsg('Username atau kata sandi salah. Gunakan admin / admin.');
      }
    }, 800);
  }

  return (
    <main id="main-content" className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="mx-auto grid max-w-6xl w-full items-center gap-10 lg:grid-cols-[1fr_420px]">
        {/* Brand panel */}
        <section aria-label="Branding HRIS PT Indocater" className="space-y-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-sm border border-slate-800" aria-hidden="true">
            <Image src="/logo-indocater.jpg" alt="PT Indocater" width={48} height={48} className="h-12 w-12 object-contain" priority />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-300 font-bold">PT Indocater</p>
            <h1 className="mt-2 max-w-lg text-4xl font-bold text-white lg:text-5xl">
              Sistem Enterprise HRIS
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              Masuk untuk mengelola operasi HR, persetujuan, data karyawan, dan analitik dari satu portal terpadu.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3" aria-label="Fitur keamanan">
            {['SSO siap', 'MFA aktif', 'Audit logging'].map((item) => (
              <li key={item} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 shadow-sm backdrop-blur-sm">
                <LockKeyhole className="h-4 w-4 text-brand-300" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-white">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Form masuk */}
        <Card title="Masuk Ke Sistem" description="Gunakan akun admin perusahaan untuk mengakses.">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate aria-label="Formulir masuk">
            {/* Username */}
            <div>
              <label htmlFor={usernameId} className="block text-xs uppercase tracking-[0.24em] text-slate-400 font-semibold">
                Username <span aria-hidden="true" className="text-rose-600">*</span>
              </label>
              <input
                id={usernameId}
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-required="true"
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 p-4 text-sm text-white outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor={passwordId} className="block text-xs uppercase tracking-[0.24em] text-slate-400 font-semibold">
                Kata sandi <span aria-hidden="true" className="text-rose-600">*</span>
              </label>
              <div className="relative mt-2">
                <input
                  id={passwordId}
                  type={visible ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-required="true"
                  className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-4 pr-12 text-sm text-white outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                />
                <button
                  type="button"
                  aria-label={visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  onClick={() => setVisible((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 transition hover:text-white"
                >
                  {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{errorMsg}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full rounded-full bg-brand-600 text-white hover:bg-brand-700 font-semibold"
            >
              Masuk
            </Button>

            <p className="text-center text-xs text-slate-400">
              Butuh bantuan akses? Hubungi administrator.
            </p>
          </form>
        </Card>
      </div>
    </main>
  );
}
