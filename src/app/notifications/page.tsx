'use client';

import { useState, useEffect, useMemo } from 'react';
import { Bell, Search, Check, Trash2, ShieldAlert, Calendar, CheckSquare, Settings, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';

export default function NotificationCenterPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const loadNotifications = () => {
    TalentService.getNotifications().then((res: any) => {
      if (res && res.data) setNotifications(res.data);
    });
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await TalentService.markNotificationRead(id);
    loadNotifications();
  };

  const handleMarkAllRead = async () => {
    await TalentService.markAllNotificationsRead();
    loadNotifications();
  };

  const handleDelete = async (id: string) => {
    await TalentService.deleteNotification(id);
    loadNotifications();
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || 
                          n.content.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'All' || n.type === filterType;
      return matchSearch && matchType;
    });
  }, [notifications, search, filterType]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.is_read).length;
  }, [notifications]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Training': return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'Certificate': return <Award className="h-4 w-4 text-emerald-500" />;
      case 'Announcement': return <Bell className="h-4 w-4 text-amber-500" />;
      default: return <Settings className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-foreground flex items-center gap-2">
              <Bell className="h-8 w-8 text-brand-600" /> Pusat Pemberitahuan
            </h1>
            <p className="mt-2 text-sm text-muted">
              Kelola dan tinjau semua pemberitahuan sistem, info pelatihan, penerbitan sertifikat, dan pengumuman.
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllRead} className="rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-semibold flex items-center gap-1">
              <CheckSquare className="h-4 w-4" /> Tandai Semua Terbaca
            </Button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <Card className="rounded-[28px] border border-border p-6 shadow-sm h-max space-y-4">
            <h3 className="font-bold text-foreground">Filter Pemberitahuan</h3>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari..."
                className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-4 text-xs outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {(['All', 'Training', 'Certificate', 'Announcement', 'System'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition ${
                    filterType === type 
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400' 
                      : 'text-muted-foreground hover:bg-secondary/40'
                  }`}
                >
                  {type === 'All' ? 'Semua Kategori' : type}
                </button>
              ))}
            </div>
          </Card>

          {/* List panel */}
          <div className="lg:col-span-3 space-y-4">
            {filteredNotifications.map((not) => (
              <Card key={not.id} className={`rounded-2xl border border-border p-4 shadow-sm flex items-start gap-4 transition ${!not.is_read ? 'bg-brand-500/5 border-brand-200' : 'bg-card'}`}>
                <div className="p-2 bg-secondary rounded-xl">
                  {getTypeIcon(not.type)}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-semibold truncate ${!not.is_read ? 'text-brand-700 dark:text-brand-400' : 'text-foreground'}`}>
                      {not.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground">{not.created_at}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{not.content}</p>
                </div>
                <div className="flex gap-1">
                  {!not.is_read && (
                    <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(not.id)} className="text-emerald-500 p-1" title="Tandai Terbaca">
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(not.id)} className="text-rose-500 p-1" title="Hapus">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}

            {filteredNotifications.length === 0 && (
              <Card className="p-8 text-center text-muted border border-dashed rounded-2xl">
                Tidak ada pemberitahuan baru yang cocok dengan filter Anda.
              </Card>
            )}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
