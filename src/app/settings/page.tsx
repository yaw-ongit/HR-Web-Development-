'use client';

import { useState, useEffect } from 'react';
import { Settings, Save, Globe, Eye, Volume2, ShieldAlert, Monitor } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import { useToast } from '@/components/ui/toast';

export default function SettingsPage() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState({
    companyName: 'PT Indocater',
    timeZone: 'Asia/Jakarta',
    dateFormat: 'DD/MM/YYYY',
    theme: 'system',
    language: 'id',
    emailNotifications: true,
    browserNotifications: true,
    tableDensity: 'comfortable',
    sidebarCollapse: false,
    defaultDashboard: 'all'
  });

  useEffect(() => {
    TalentService.getSettings().then((res: any) => {
      if (res && res.data) setSettings(res.data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await TalentService.updateSettings(settings);
    if (!error) {
      addToast({ title: 'Tersimpan', description: 'Pengaturan berhasil disimpan!', variant: 'success' });
    } else {
      addToast({ title: 'Gagal', description: 'Gagal menyimpan: ' + error, variant: 'danger' });
    }
  };

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div>
          <h1 className="text-3xl font-semibold text-foreground flex items-center gap-2">
            <Settings className="h-8 w-8 text-brand-600" /> Pengaturan Sistem
          </h1>
          <p className="mt-2 text-sm text-muted">
            Konfigurasi preferensi global, format tampilan, notifikasi, dan keamanan portal HRIS.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* General and Localization settings */}
          <Card className="rounded-[28px] border border-border p-6 bg-card space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Umum & Lokalisasi
            </h3>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Nama Perusahaan</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Zona Waktu</label>
              <select
                value={settings.timeZone}
                onChange={(e) => setSettings({ ...settings, timeZone: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
              >
                <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Format Tanggal</label>
              <select
                value={settings.dateFormat}
                onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-12-31)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2026)</option>
              </select>
            </div>
          </Card>

          {/* Preferences and Theme Settings */}
          <Card className="rounded-[28px] border border-border p-6 bg-card space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" /> Tampilan & Tema
            </h3>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tema Aplikasi</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
                <option value="system">Ikuti Sistem</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Bahasa Default</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Kerapatan Tabel</label>
              <select
                value={settings.tableDensity}
                onChange={(e) => setSettings({ ...settings, tableDensity: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
              >
                <option value="comfortable">Nyaman (Comfortable)</option>
                <option value="compact">Padat (Compact)</option>
              </select>
            </div>
          </Card>

          {/* Notifications config */}
          <Card className="rounded-[28px] border border-border p-6 bg-card space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" /> Pengaturan Notifikasi
            </h3>
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 text-sm select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  className="rounded border-border text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <span className="font-semibold block">Notifikasi Email</span>
                  <span className="text-[10px] text-muted-foreground">Kirim ringkasan laporan pelatihan ke email terdaftar.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-sm select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.browserNotifications}
                  onChange={(e) => setSettings({ ...settings, browserNotifications: e.target.checked })}
                  className="rounded border-border text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <span className="font-semibold block">Notifikasi Browser</span>
                  <span className="text-[10px] text-muted-foreground">Tampilkan pop-up pemberitahuan secara real-time.</span>
                </div>
              </label>
            </div>

            <div className="pt-6 flex justify-end">
              <Button type="submit" className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold flex items-center gap-1.5">
                <Save className="h-4 w-4" /> Simpan Pengaturan
              </Button>
            </div>
          </Card>
        </form>
      </SectionContainer>
    </div>
  );
}
