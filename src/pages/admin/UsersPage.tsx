/*  UsersPage.tsx  –  DEVV AI  –  HATA GÖRÜNÜMLÜ  */
import { useEffect, useState } from 'react';
import { table } from '@devvai/devv-code-backend';
import { toast } from '@/hooks/use-toast';

const USERS_TABLE_ID = 'f41liqhtnp4w';   // ← Devv AI users tablosu

type User = any;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* 1) GERÇEK VERİ */
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await table.getItems(USERS_TABLE_ID, { limit: 10000 });
      setUsers(res.items);
    } catch (e: any) {
      const msg = e.message || 'Kullanıcılar alınamadı';
      setError(msg);
      toast({ title: msg, variant: 'destructive' });
      console.error('❌ fetchUsers:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  /* 2) CANLI GÜNCELLEME */
  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      await table.updateItem(USERS_TABLE_ID, id, updates);
      toast({ title: 'Güncellendi' });
      fetchUsers();
    } catch (e: any) {
      toast({ title: 'Güncelleme hatası', variant: 'destructive' });
      console.error(e);
    }
  };

  /* 3) ARAMA */
  const [search, setSearch] = useState('');
  const filtered = users.filter((u) =>
    (u.username || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.telegram_id || '').includes(search)
  );

  /* 4) RENDER – TAILWIND */
  return (
    <div className="p-8 space-y-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-2">Kullanıcı Yönetimi</h1>

      <div className="flex items-center gap-4">
        <input
          placeholder="Kullanıcı ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-emerald-500/30"
        />
        <button onClick={fetchUsers} className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500">
          Yenile
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded">
          {error} (Demo veri gösteriliyor)
        </div>
      )}

      {loading ? (
        <p className="text-emerald-300">Yükleniyor...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-emerald-500/30">
                <th className="text-left py-3 px-4 text-emerald-300">Kullanıcı</th>
                <th className="text-left py-3 px-4 text-emerald-300">Telegram ID</th>
                <th className="text-left py-3 px-4 text-emerald-300">Coin</th>
                <th className="text-left py-3 px-4 text-emerald-300">Referans</th>
                <th className="text-left py-3 px-4 text-emerald-300">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5">
                  <td className="py-3 px-4 text-white">{u.username}</td>
                  <td className="py-3 px-4 text-emerald-300">{u.telegram_id}</td>
                  <td className="py-3 px-4 text-white">{(u.coin_balance || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-300">{u.referrals || 0}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const coin = prompt('Yeni coin:', String(u.coin_balance || 0));
                          if (coin !== null) updateUser(u._id, { coin_balance: Number(coin) });
                        }}
                        className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                      >
                        Coin
                      </button>
                      <button
                        onClick={() => updateUser(u._id, { status: u.status === 'banned' ? 'active' : 'banned' })}
                        className={`px-2 py-1 rounded text-white ${u.status === 'banned' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}
                      >
                        {u.status === 'banned' ? 'Unban' : 'Ban'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
