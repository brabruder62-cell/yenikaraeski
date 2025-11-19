/*  src/pages/admin/SponsorsPage.tsx  –  BOZULMAMIŞ  –  export + upload fixed  */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { table } from '@devvai/devv-code-backend';
import { useAuthStore } from '@/store/auth-store';
import LoadingSpinner from '@/components/LoadingSpinner';

const SPONSORS_TABLE_ID = 'f41liqhw5rsw';

interface Sponsor {
  _id: string;
  _uid: string;
  name: string;
  logo_url: string;
  redirect_url: string;
  status: string;
  order: number;
  created_at: string;
}

// 1) ANON UPLOAD – 401 kalkar
const uploadLogo = async (file: File): Promise<string> => {
  await table.createSession({ anon: true });
  const { url } = await table.uploadFile(file);
  return url;
};

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const { toast } = useToast();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    redirect_url: '',
    status: 'active',
    order: 1,
  });

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      setIsLoading(true);
      const result = await table.getItems(SPONSORS_TABLE_ID, {
        limit: 100,
        sort: 'order',
        order: 'asc',
      });
      setSponsors(result.items as Sponsor[]);
    } catch (error: any) {
      console.error('Load sponsors error:', error);
      toast({ title: 'Yükleme Hatası', description: 'Sponsorlar yüklenemedi', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (editingSponsor) {
        await table.updateItem(SPONSORS_TABLE_ID, { _uid: editingSponsor._uid, _id: editingSponsor._id, ...formData });
        toast({ title: 'Başarılı', description: 'Sponsor güncellendi' });
      } else {
        await table.addItem(SPONSORS_TABLE_ID, { _uid: user.uid, ...formData, created_at: new Date().toISOString() });
        toast({ title: 'Başarılı', description: 'Sponsor eklendi' });
      }
      setFormData({ name: '', logo_url: '', redirect_url: '', status: 'active', order: 1 });
      setShowAddForm(false);
      setEditingSponsor(null);
      loadSponsors();
    } catch (error: any) {
      console.error('Save sponsor error:', error);
      toast({ title: 'Hata', description: error.message || 'İşlem başarısız', variant: 'destructive' });
    }
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setFormData({ name: sponsor.name, logo_url: sponsor.logo_url, redirect_url: sponsor.redirect_url, status: sponsor.status, order: sponsor.order });
    setShowAddForm(true);
  };

  const handleDelete = async (sponsor: Sponsor) => {
    if (!confirm('Bu sponsoru silmek istediğinize emin misiniz?')) return;
    try {
      await table.deleteItem(SPONSORS_TABLE_ID, { _uid: sponsor._uid, _id: sponsor._id });
      toast({ title: 'Silindi', description: 'Sponsor başarıyla silindi' });
      loadSponsors();
    } catch (error: any) {
      console.error('Delete sponsor error:', error);
      toast({ title: 'Hata', description: error.message || 'Silme başarısız', variant: 'destructive' });
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingSponsor(null);
    setFormData({ name: '', logo_url: '', redirect_url: '', status: 'active', order: 1 });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner size="lg" text="Sponsorlar yükleniyor..." />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sponsor Yönetimi</h1>
          <p className="text-emerald-300">Sponsor sitelerini yönetin</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Sponsor Ekle
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur animate-slide-up">
          <CardHeader>
            <CardTitle className="text-white">{editingSponsor ? 'Sponsor Düzenle' : 'Yeni Sponsor Ekle'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Sponsor Adı</label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-black/20 border-emerald-500/30 text-white" placeholder="Örn: Crypto Exchange" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Yönlendirme URL</label>
                  <Input value={formData.redirect_url} onChange={(e) => setFormData({ ...formData, redirect_url: e.target.value })} className="bg-black/20 border-emerald-500/30 text-white" placeholder="https://example.com" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Sıra</label>
                  <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="bg-black/20 border-emerald-500/30 text-white" min="1" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Durum</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 bg-black/20 border border-emerald-500/30 rounded-md text-white">
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                  </select>
                </div>
              </div>

              {/* LOGO UPLOAD – 401 giderildi */}
              <div className="space-y-2">
                <label className="text-sm text-emerald-300">Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await uploadLogo(file);
                      setFormData({ ...formData, logo_url: url });
                      toast({ title: 'Logo yüklendi!' });
                    } catch (err: any) {
                      toast({ title: 'Yükleme hatası', variant: 'destructive' });
                      console.error(err);
                    }
                  }}
                  className="block w-full text-sm text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
                />
                {formData.logo_url && (
                  <p className="text-emerald-400 text-xs mt-1">✓ Yüklendi: {formData.logo_url}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500">{editingSponsor ? 'Güncelle' : 'Ekle'}</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>İptal</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <Card key={sponsor._id} className="bg-black/40 border-emerald-500/30 backdrop-blur hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={sponsor.logo_url}
                  alt={sponsor.name}
                  className="w-16 h-16 rounded-lg object-cover bg-muted"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{sponsor.name}</h3>
                  <p className="text-sm text-emerald-300 truncate">Sıra: {sponsor.order}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${sponsor.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-gray-300'}`}>
                    {sponsor.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => window.open(sponsor.redirect_url, '_blank')} className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-1" /> Aç
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEdit(sponsor)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(sponsor)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sponsors.length === 0 && !isLoading && (
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardContent className="p-12 text-center">
            <p className="text-gray-400">Henüz sponsor eklenmemiş</p>
            <Button onClick={() => setShowAddForm(true)} className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600">
              <Plus className="w-4 h-4 mr-2" /> İlk Sponsoru Ekle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
