import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Users, Coins, Calendar } from 'lucide-react';

const mockUsers = [
  { id: '1', username: 'Ali_123', telegram_id: '123456', coins: 1250, referrals: 5, join_date: '2024-01-15', status: 'active' },
  { id: '2', username: 'Mehmet_77', telegram_id: '234567', coins: 850, referrals: 3, join_date: '2024-01-18', status: 'active' },
  { id: '3', username: 'Ayşe_99', telegram_id: '345678', coins: 2100, referrals: 8, join_date: '2024-01-10', status: 'active' },
  { id: '4', username: 'Fatma_55', telegram_id: '456789', coins: 650, referrals: 2, join_date: '2024-01-22', status: 'active' },
  { id: '5', username: 'Can_88', telegram_id: '567890', coins: 1500, referrals: 6, join_date: '2024-01-12', status: 'active' },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState(mockUsers);

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.telegram_id.includes(searchTerm)
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Kullanıcı Yönetimi</h1>
          <p className="text-emerald-300">Tüm kullanıcıları görüntüleyin ve yönetin</p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500">
          <Users className="w-4 h-4 mr-2" />
          Kullanıcı Ekle
        </Button>
      </div>

      <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
              <Input
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
              <Filter className="w-4 h-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-500/30">
                  <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Kullanıcı Adı</th>
                  <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Telegram ID</th>
                  <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Coin Bakiye</th>
                  <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Referanslar</th>
                  <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Kayıt Tarihi</th>
                  <th className="text-left py-3 px-4 text-emerald-300 font-semibold">Durum</th>
                  <th className="text-left py-3 px-4 text-emerald-300 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-bold">{user.username[0]}</span>
                        </div>
                        <span className="text-white font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-emerald-300">{user.telegram_id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="text-white font-semibold">{user.coins.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-emerald-300">{user.referrals}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.join_date).toLocaleDateString('tr-TR')}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
                        Aktif
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                          Düzenle
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                          Ban
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
