import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2, ListTodo, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockTasks = [
  { id: '1', title: 'Telegram Kanalına Katıl', description: 'Telegram kanalımıza katılın', reward: 100, type: 'daily', status: 'active', icon: 'MessageCircle' },
  { id: '2', title: '3 Arkadaş Davet Et', description: '3 arkadaşınızı davet edin', reward: 500, type: 'special', status: 'active', icon: 'Users' },
  { id: '3', title: 'İlk Oyunu Oyna', description: 'Herhangi bir oyunu oynayın', reward: 50, type: 'daily', status: 'active', icon: 'Gamepad2' },
];

export default function TasksPage() {
  const [tasks] = useState(mockTasks);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const handleDeleteTask = (id: string) => {
    toast({
      title: 'Görev Silindi',
      description: 'Görev başarıyla silindi',
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Görev Yönetimi</h1>
          <p className="text-emerald-300">Görevleri oluşturun ve yönetin</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Görev Ekle
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Yeni Görev Oluştur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-emerald-300">Görev Başlığı</label>
                <Input placeholder="Görev başlığı" className="bg-black/30 border-emerald-500/30 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-emerald-300">Ödül (Coin)</label>
                <Input type="number" placeholder="100" className="bg-black/30 border-emerald-500/30 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Açıklama</label>
              <Textarea placeholder="Görev açıklaması" rows={3} className="bg-black/30 border-emerald-500/30 text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-emerald-300">Tip</label>
                <Select>
                  <SelectTrigger className="bg-black/30 border-emerald-500/30 text-white">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Günlük</SelectItem>
                    <SelectItem value="special">Özel</SelectItem>
                    <SelectItem value="referral">Referans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-emerald-300">İkon</label>
                <Select>
                  <SelectTrigger className="bg-black/30 border-emerald-500/30 text-white">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MessageCircle">Mesaj</SelectItem>
                    <SelectItem value="Users">Kullanıcılar</SelectItem>
                    <SelectItem value="Gamepad2">Oyun</SelectItem>
                    <SelectItem value="Trophy">Kupa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-emerald-300">Gerekli Sayı</label>
                <Input type="number" placeholder="1" className="bg-black/30 border-emerald-500/30 text-white" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500">
                Görevi Kaydet
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="border-emerald-500/30 text-emerald-300">
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ListTodo className="w-5 h-5" />
            Mevcut Görevler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.type === 'daily' ? 'bg-blue-500/20 text-blue-400' :
                        task.type === 'special' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {task.type === 'daily' ? 'Günlük' : task.type === 'special' ? 'Özel' : 'Referans'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {task.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                    <p className="text-sm text-emerald-300/70 mb-3">{task.description}</p>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="text-white font-semibold">{task.reward} Coin</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTask(task.id)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
