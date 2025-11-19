/*  UsersPage.tsx  –  DEVV AI BACKEND  –  TIKLANIR  */
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Users, Coins, Calendar, Edit, UserX, Check } from 'lucide-react';
import { table } from '@devvai/devv-code-backend';
import { toast } from '@/hooks/use-toast';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';

const USERS_TABLE_ID = 'f41liqhtnp4w'; // DEVV AI table ID

type User = any;

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  /* ----------  MODAL  ---------- */
  const [modal, setModal] = useState<{
    open: boolean;
    user: User | null;
    coin: string;
    ref: string;
  }>({ open: false, user: null, coin: '', ref: '' });

  /* ----------  FETCH  ---------- */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await table.getItems(USERS_TABLE_ID, { limit: 10000 });
      setUsers(res.items);
    } catch (e: any) {
      toast({ title: 'Kullanıcılar alınamadı', variant: 'destructive' });
      console.error('❌ fetchUsers:', e.message || e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  /* ----------  EDIT  ---------- */
  const openEdit = (u: User) =>
    setModal({ open: true, user: u, coin: String(u.coin_balance || 0), ref: String(u.referrals || 0) });

  const saveEdit = async () => {
    if (!modal.user) return;
    try {
      await table.updateItem(USERS_TABLE_ID, modal.user._id, {
        coin_balance: Number(modal.coin),
        referrals: Number(modal.ref),
      });
      toast({ title: 'Güncellendi' });
      setModal({ open: false, user: null, coin: '', ref: '' });
      fetchUsers();
    } catch (e: any) {
      toast({ title: 'Güncelleme hatası', variant: 'destructive' });
      console.error(e);
    }
  };

  /* ----------  BAN / UNBAN  ---------- */
  const toggleBan = async (u: User) => {
    const next = u.status === 'banned' ? 'active' : 'banned';
    try {
      await table.updateItem(USERS_TABLE_ID, u._id, { status: next });
      toast({ title: next === 'banned' ? 'Banlandı' : 'Aktif edildi' });
      fetchUsers();
    } catch (e: any) {
      toast({ title: 'İşlem başarısız', variant: 'destructive' });
      console.error(e);
    }
  };

  /* ----------  FILTER  ---------- */
  const filtered = users.filter((u) =>
    (u.username || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.telegram_id || '').includes(search)
  );

  /* ----------  RENDER  ---------- */
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Kullanıcı Yönetimi</h1>
          <p className="text-emerald-300">Tüm kullanıcıları görüntüleyin ve yönetin</p>
        </div>
        <Button onClick={fetchUsers} className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <Users className="w-4 h-4 mr-2" /> Yenile
        </Button>
      </div>

      <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
              <Input
                placeholder="Kullanıcı ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
              <Filter className="w-4 h-4 mr-2" /> Filtrele
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-emerald-300">Yükleniyor...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald-500/30">
                    <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Kullanıcı Adı</th>
                    <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Telegram ID</th>
                    <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Coin</th>
                    <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Referans</th>
                    <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Kayıt</th>
                    <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Durum</th>
                    <th className="text-left py-3 px-4 text-emerald-300 font-semibold">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u._id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <span className="text-white font-bold">{u.username?.[0] || '?'}</span>
                          </div>
                          <span className="text-white font-medium">{u.username}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-emerald-300">{u.telegram_id}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="text-white font-semibold">{(u.coin_balance || 0).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-emerald-300">{u.referrals || 0}</td>
                      <td className="py-4 px-4 text-emerald-300">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {new Date(u.created_at || u.join_date).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${u.status === 'banned' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {u.status === 'banned' ? 'Banlı' : 'Aktif'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => openEdit(u)} className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                            Düzenle
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toggleBan(u)} className={`${u.status === 'banned' ? 'border-emerald-500/30 text-emerald-300' : 'border-red-500/30 text-red-400'} hover:bg-opacity-10`}>
                            {u.status === 'banned' ? 'Unban' : 'Ban'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ----------  MODAL  ---------- */}
      <Dialog open={modal.open} onOpenChange={(o) => setModal((p) => ({ ...p, open: o }))}>
        <DialogContent className="bg-black/90 border-emerald-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-emerald-400">{modal.user?.username} Düzenle</DialogTitle>
            <DialogDescription className="text-emerald-300/70">Coin ve referans sayısını güncelleyin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label className="w-24 text-emerald-300">Coin</Label>
              <Input
                value={modal.coin}
                onChange={(e) => setModal((p) => ({ ...p, coin: e.target.value }))}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-24 text-emerald-300">Referans</Label>
              <Input
                value={modal.ref}
                onChange={(e) => setModal((p) => ({ ...p, ref: e.target.value }))}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setModal({ open: false, user: null, coin: '', ref: '' })}>İptal</Button>
            <Button onClick={saveEdit} className="bg-gradient-to-r from-emerald-600 to-teal-600">Kaydet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
