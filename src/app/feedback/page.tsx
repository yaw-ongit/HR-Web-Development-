'use client';

import { useState } from 'react';
import { MessageSquare, Save, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';

export default function UserFeedbackPage() {
  const [form, setForm] = useState({
    category: 'Suggestion',
    title: '',
    description: '',
    priority: 'Medium',
    attachment_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await TalentService.submitFeedback(form);
    if (!error) {
      alert('Feedback Anda berhasil dikirim! Terima kasih atas kontribusi Anda.');
      setForm({
        category: 'Suggestion',
        title: '',
        description: '',
        priority: 'Medium',
        attachment_url: ''
      });
    } else {
      alert('Gagal mengirim feedback: ' + error);
    }
  };

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
          <MessageSquare className="h-12 w-12 mx-auto text-brand-600" />
          <h1 className="text-3xl font-semibold text-foreground">Kirim Masukan (Feedback)</h1>
          <p className="text-sm text-muted">Bantu kami meningkatkan portal HRIS. Laporkan bug, berikan saran, atau minta fitur baru.</p>
        </div>

        <Card className="max-w-xl mx-auto rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Kategori Masukan</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
              >
                <option value="Suggestion">Saran & Ide (Suggestion)</option>
                <option value="Bug Report">Laporan Masalah (Bug Report)</option>
                <option value="Feature Request">Permintaan Fitur (Feature Request)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">Judul / Subjek</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                placeholder="Tuliskan judul singkat..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tingkat Prioritas</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
              >
                <option value="Low">Rendah (Low)</option>
                <option value="Medium">Sedang (Medium)</option>
                <option value="High">Tinggi (High)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">Penjelasan Lengkap</label>
              <textarea
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500 h-32"
                placeholder="Tuliskan penjelasan detail langkah-langkah memproduksi bug atau ulasan saran Anda..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tautan Lampiran (Opsional)</label>
              <input
                type="text"
                value={form.attachment_url}
                onChange={(e) => setForm({ ...form, attachment_url: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                placeholder="https://link-to-screenshot.com/image.png"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold flex items-center gap-1.5">
                <Save className="h-4 w-4" /> Kirim Masukan
              </Button>
            </div>
          </form>
        </Card>
      </SectionContainer>
    </div>
  );
}
