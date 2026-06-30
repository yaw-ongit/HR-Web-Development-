'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('dewi.lestari@nts.co.id');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const validation = useMemo(() => {
    if (!email.includes('@')) return 'Use your enterprise email address.';
    if (password && password.length < 8) return 'Password must be at least 8 characters.';
    return '';
  }, [email, password]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_460px]">
        <section className="space-y-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-[28px] bg-slate-900 ring-1 ring-slate-700">
            <ShieldCheck className="h-8 w-8 text-sky-300" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Enterprise HRIS</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-slate-100 lg:text-5xl">Welcome to your secure people platform</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
              Sign in to manage identity, HR operations, approvals, notifications and enterprise workforce data from one governed workspace.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {['SSO ready', 'MFA placeholder', 'Audit enabled'].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                <LockKeyhole className="h-5 w-5 text-sky-300" />
                <p className="mt-3 text-sm font-semibold text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <Card title="Sign in" description="Use your company account to continue." className="bg-slate-900/95">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setLoading(true);
              window.setTimeout(() => setLoading(false), 900);
            }}
          >
            <div>
              <label className="text-xs uppercase tracking-[0.24em] text-slate-500">Email</label>
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none transition focus:border-sky-400" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.24em] text-slate-500">Password</label>
              <div className="relative mt-2">
                <input type={visible ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-3xl border border-white/10 bg-slate-950/90 p-4 pr-12 text-sm text-slate-100 outline-none transition focus:border-sky-400" />
                <button type="button" onClick={() => setVisible((current) => !current)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {validation && <p className="rounded-3xl bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{validation}</p>}
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-sky-400" />
                Remember me
              </label>
              <Link href="/identity/password-policies" className="font-semibold text-sky-300">Forgot password?</Link>
            </div>
            <Button type="submit" disabled={loading || Boolean(validation)} className="w-full rounded-full py-4">
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            <Link href="/identity" className="block text-center text-sm font-semibold text-slate-300 hover:text-sky-300">Open Identity workspace</Link>
          </form>
        </Card>
      </div>
    </main>
  );
}
