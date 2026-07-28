'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, RefreshCw, FileText, Calendar, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterModule, setFilterModule] = useState('All');

  const loadLogs = () => {
    TalentService.getActivityLogs().then((res: any) => {
      if (res && res.data) setLogs(res.data);
    });
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchSearch = log.user_name.toLowerCase().includes(search.toLowerCase()) || 
                          log.action.toLowerCase().includes(search.toLowerCase());
      const matchModule = filterModule === 'All' || log.module === filterModule;
      return matchSearch && matchModule;
    });
  }, [logs, search, filterModule]);

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-8 w-8 text-brand-600" /> Log Aktivitas Sistem
            </h1>
            <p className="mt-2 text-sm text-muted">
              Audit jejak aktivitas audit pengguna, mutasi data pelatihan, dan status sistem secara real-time.
            </p>
          </div>
          <Button onClick={loadLogs} variant="outline" className="rounded-xl">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>

        <Card className="rounded-[28px] border border-border p-6 shadow-sm">
          {/* Filters toolbar */}
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <div className="relative w-64">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari user atau aktivitas..."
                className="w-full rounded-xl border border-border bg-card py-2 pl-11 pr-4 text-xs outline-none focus:border-brand-500"
              />
            </div>

            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-2 text-xs outline-none"
            >
              <option value="All">Semua Modul</option>
              <option value="Training">Training</option>
              <option value="Approval">Approval</option>
              <option value="Certificate">Certificate</option>
              <option value="System">System</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Tanggal & Waktu</th>
                  <th className="px-6 py-4">Pengguna</th>
                  <th className="px-6 py-4">Aksi / Kegiatan</th>
                  <th className="px-6 py-4">Modul</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-secondary/40 transition">
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{log.created_at}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">{log.user_name}</td>
                    <td className="px-6 py-4 text-xs">{log.action}</td>
                    <td className="px-6 py-4 text-xs">{log.module}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted">Belum ada jejak aktivitas sistem tercatat.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </SectionContainer>
    </div>
  );
}
