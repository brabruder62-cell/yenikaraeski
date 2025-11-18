import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Send, History, Info, AlertTriangle, CheckCircle, Megaphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const notificationHistory = [
  { id: '1', title: 'Yeni Oyun Eklendi!', message: 'Tower Legend oyunu artık aktif...', type: 'info', target: 'all', sent_at: '2024-01-20T10:30:00Z', sent_count: 1247 },
  { id: '2', title: 'Bakım Bildirisi', message: 'Sistem bakımı yapılacak...', type: 'warning', target: 'all', sent_at: '2024-01-19T15:00:00Z', sent_count: 1150 },
  { id: '3', title: 'Bonus Kazananlar', message: 'Günlük bonus kazananları...', type: 'success', target: 'active', sent_at: '2024-01-18T12:00:00Z', sent_count: 850 },
];

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'success' | 'announcement'>('info');
  const [target, setTarget] = useState<'all' | 'active' | 'new'>('all');
  const { toast } = useToast();

  const handleSendNotification = () => {
    if (!title || !message) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Başlık ve mesaj alanları zorunludur',
      });
      return;
    }

    // Here you would send the notification via SDK
    toast({
      title: 'Bildirim Gönderildi',
      description: `${target === 'all' ? 'Tüm kullanıcılara' : target === 'active' ? 'Aktif kullanıcılara' : 'Yeni kullanıcılara'} bildirim gönderildi`,
    });

    setTitle('');
    setMessage('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'announcement': return <Megaphone className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-500/20 text-blue-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'success': return 'bg-emerald-500/20 text-emerald-400';
      case 'announcement': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Bildirim Yönetimi</h1>
        <p className="text-emerald-300">Kullanıcılara toplu bildirim gönderin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Send className="w-5 h-5" />
              Yeni Bildirim Gönder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Başlık</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Bildirim başlığı"
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Mesaj</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bildirim mesajı"
                rows={4}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-emerald-300">Tip</label>
                <Select value={type} onValueChange={(value: any) => setType(value)}>
                  <SelectTrigger className="bg-black/30 border-emerald-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Bilgi</SelectItem>
                    <SelectItem value="warning">Uyarı</SelectItem>
                    <SelectItem value="success">Başarılı</SelectItem>
                    <SelectItem value="announcement">Duyuru</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-emerald-300">Hedef</label>
                <Select value={target} onValueChange={(value: any) => setTarget(value)}>
                  <SelectTrigger className="bg-black/30 border-emerald-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Kullanıcılar</SelectItem>
                    <SelectItem value="active">Aktif Kullanıcılar</SelectItem>
                    <SelectItem value="new">Yeni Kullanıcılar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={handleSendNotification}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
            >
              <Send className="w-4 h-4 mr-2" />
              Bildirimi Gönder
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <History className="w-5 h-5" />
              Bildirim Geçmişi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notificationHistory.map((notification) => (
              <div key={notification.id} className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${getTypeColor(notification.type)}`}>
                      {getTypeIcon(notification.type)}
                      {notification.type}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400/60">
                    {new Date(notification.sent_at).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <h4 className="text-white font-semibold mb-1">{notification.title}</h4>
                <p className="text-sm text-emerald-300/70 mb-2">{notification.message}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400">{notification.sent_count} kullanıcıya gönderildi</span>
                  <span className="text-emerald-400/60">
                    Hedef: {notification.target === 'all' ? 'Tümü' : notification.target === 'active' ? 'Aktif' : 'Yeni'}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
