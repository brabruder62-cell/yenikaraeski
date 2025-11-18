import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { table } from '@devvai/devv-code-backend';
import { useAuthStore } from '@/store/auth-store';
import LoadingSpinner from '@/components/LoadingSpinner';
import ImageUpload from '@/components/ImageUpload';

const STORE_TABLE_ID = 'f41liqhtnvgg';

interface StoreItem {
  _id: string;
  _uid: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  is_active: number;
}

export default function StorePage() {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<StoreItem | null>(null);
  const { toast } = useToast();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image_url: '',
    category: 'booster',
    stock: -1,
    is_active: 1,
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setIsLoading(true);
      const result = await table.getItems(STORE_TABLE_ID, {
        limit: 100,
      });
      setItems(result.items as StoreItem[]);
    } catch (error) {
      console.error('Load items error:', error);
      toast({
        title: 'Yükleme Hatası',
        description: 'Ürünler yüklenemedi',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingItem) {
        await table.updateItem(STORE_TABLE_ID, {
          _uid: editingItem._uid,
          _id: editingItem._id,
          ...formData,
        });
        toast({
          title: 'Başarılı',
          description: 'Ürün güncellendi',
        });
      } else {
        await table.addItem(STORE_TABLE_ID, {
          _uid: user.uid,
          ...formData,
        });
        toast({
          title: 'Başarılı',
          description: 'Ürün eklendi',
        });
      }

      setFormData({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        category: 'booster',
        stock: -1,
        is_active: 1,
      });
      setShowAddForm(false);
      setEditingItem(null);
      loadItems();
    } catch (error: any) {
      console.error('Save item error:', error);
      toast({
        title: 'Hata',
        description: error.message || 'İşlem başarısız',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: StoreItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image_url: item.image_url,
      category: item.category,
      stock: item.stock,
      is_active: item.is_active,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (item: StoreItem) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

    try {
      await table.deleteItem(STORE_TABLE_ID, {
        _uid: item._uid,
        _id: item._id,
      });
      toast({
        title: 'Silindi',
        description: 'Ürün başarıyla silindi',
      });
      loadItems();
    } catch (error: any) {
      console.error('Delete item error:', error);
      toast({
        title: 'Hata',
        description: error.message || 'Silme başarısız',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      image_url: '',
      category: 'booster',
      stock: -1,
      is_active: 1,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner size="lg" text="Ürünler yükleniyor..." />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mağaza Yönetimi</h1>
          <p className="text-emerald-300">Mağaza ürünlerini yönetin</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ürün Ekle
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur animate-slide-up">
          <CardHeader>
            <CardTitle className="text-white">
              {editingItem ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Ürün Adı</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-black/20 border-emerald-500/30 text-white"
                    placeholder="Örn: 2x Kazanç Çarpanı"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Fiyat (Coin)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="bg-black/20 border-emerald-500/30 text-white"
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black/20 border border-emerald-500/30 rounded-md text-white"
                  >
                    <option value="booster">Güçlendirici</option>
                    <option value="cosmetic">Kozmetik</option>
                    <option value="special">Özel</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Stok (-1 = Sınırsız)</label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                    className="bg-black/20 border-emerald-500/30 text-white"
                    min="-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-emerald-300">Açıklama</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-black/20 border-emerald-500/30 text-white"
                  placeholder="Ürün açıklaması..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-emerald-300">Ürün Görseli</label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  onRemove={() => setFormData({ ...formData, image_url: '' })}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active === 1}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                  className="rounded border-emerald-500/30"
                />
                <label htmlFor="is_active" className="text-sm text-emerald-300">
                  Aktif
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                >
                  {editingItem ? 'Güncelle' : 'Ekle'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card
            key={item._id}
            className="bg-black/40 border-emerald-500/30 backdrop-blur hover-lift"
          >
            <CardContent className="p-6">
              <img
                src={item.image_url || 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400'}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4 bg-muted"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400';
                }}
              />
              <div className="space-y-2">
                <h3 className="text-white font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">{item.price} Coin</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.is_active === 1
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {item.is_active === 1 ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  Stok: {item.stock === -1 ? 'Sınırsız' : item.stock}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  className="flex-1"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Düzenle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(item)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && !isLoading && (
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Henüz ürün eklenmemiş</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              İlk Ürünü Ekle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
