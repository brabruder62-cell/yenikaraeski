/*  SponsorYonetimi.tsx  (varsa)  –  upload düzeltilmiş  */
import { useState } from 'react';
import { table } from '@devvai/devv-code-backend';
import { toast } from '@/hooks/use-toast';

const SPONSORS_TABLE_ID = 'f41liqhw5rsw';

export default function SponsorYonetimi() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', logo_url: '', redirect_url: '' });
  const [uploading, setUploading] = useState(false);

  /* 1) GÖRSEL YÜKLEME – 401 önler */
  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      // anonim oturum aç (401 engeller)
      await table.createSession({ anon: true });

      const { url } = await table.uploadFile(file);
      setForm((f) => ({ ...f, logo_url: url }));
      toast({ title: 'Logo yüklendi!' });
    } catch (e: any) {
      toast({ title: 'Yükleme hatası', variant: 'destructive' });
      console.error('❌ upload:', e);
    } finally {
      setUploading(false);
    }
  };

  /* 2) FILE INPUT – change */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Sadece görsel', variant: 'destructive' });
      return;
    }
    uploadImage(file);
  };

  /* 3) SPONSOR EKLEME – aynı */
  const handleAdd = async () => {
    if (!form.name || !form.logo_url || !form.redirect_url) {
      toast({ title: 'Tüm alanları doldurun', variant: 'destructive' });
      return;
    }
    try {
      await table.addItem(SPONSORS_TABLE_ID, { ...form, status: 'active' });
      toast({ title: 'Sponsor eklendi!' });
      setForm({ name: '', logo_url: '', redirect_url: '' });
      setShowForm(false);
      // listeyi yenile
      const res = await table.getItems(SPONSORS_TABLE_ID, { limit: 100 });
      setSponsors(res.items.filter((s: any) => s.status === 'active'));
    } catch (e: any) {
      toast({ title: 'Ekleme hatası', variant: 'destructive' });
      console.error(e);
    }
  };

  /* 4) İLK YÜKLEME – sponsors */
  useState(() => {
    table.getItems(SPONSORS_TABLE_ID, { limit: 100 })
      .then((res) => setSponsors(res.items.filter((s: any) => s.status === 'active')))
      .catch((e) => console.error(e));
  });

  return (
    <div className="p-8 space-y-6 bg-black text-white min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white mb-2">Sponsor Yönetimi</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-emerald-600 to-teal-600">
          {showForm ? 'Kapat' : 'Yeni Ekle'}
        </Button>
      </div>

      {showForm && (
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur p-6 space-y-4">
          <div>
            <Label className="text-emerald-300">İsim</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-black/30 border-emerald-500/30 text-white"
            />
          </div>
          <div>
            <Label className="text-emerald-300">Yönlendirme URL</Label>
            <Input
              value={form.redirect_url}
              onChange={(e) => setForm({ ...form, redirect_url: e.target.value })}
              className="bg-black/30 border-emerald-500/30 text-white"
            />
          </div>

          {/* GÖRSEL YÜKLEME – 401 giderilmiş */}
          <div>
            <Label className="text-emerald-300">Logo</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="block w-full text-sm text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
            />
            {form.logo_url && (
              <p className="text-emerald-400 text-sm mt-2">✓ Yüklendi: {form.logo_url}</p>
            )}
          </div>

          <Button onClick={handleAdd} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600">
            Ekle
          </Button>
        </Card>
      )}

      {/* Sponsor Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.length === 0 && <p className="text-center text-gray-400 col-span-full">Henüz sponsor eklenmemiş</p>}
        {sponsors.map((s) => (
          <Card key={s._id} className="bg-black/40 border-emerald-500/30 backdrop-blur p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={s.logo_url} alt={s.name} className="w-10 h-10 rounded-lg object-cover" />
              <span className="text-white font-medium">{s.name}</span>
            </div>
            <Button size="sm" variant="outline" onClick={() => window.open(s.redirect_url, '_blank')} className="border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/20">
              Git
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
