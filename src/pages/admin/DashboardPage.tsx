import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Coins, Trophy, TrendingUp, Activity } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Toplam Kullanıcı', value: '12,547', change: '+12%', color: 'from-blue-500 to-blue-600' },
  { icon: Coins, label: 'Dağıtılan Coin', value: '1.2M', change: '+8%', color: 'from-emerald-500 to-teal-600' },
  { icon: Trophy, label: 'Aktif Görev', value: '24', change: '+3', color: 'from-yellow-500 to-orange-600' },
  { icon: TrendingUp, label: 'Günlük Aktif', value: '3,842', change: '+18%', color: 'from-purple-500 to-pink-600' },
];

const recentActivities = [
  { user: 'Ali_123', action: 'Limbo oyununda 150 coin kazandı', time: '2 dk önce' },
  { user: 'Mehmet_77', action: 'Daily Bonus aldı', time: '5 dk önce' },
  { user: 'Ayşe_99', action: 'Telegram görevini tamamladı', time: '8 dk önce' },
  { user: 'Fatma_55', action: 'Mines oyununda 200 coin kazandı', time: '12 dk önce' },
  { user: 'Can_88', action: 'Referral görevi tamamladı', time: '15 dk önce' },
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-emerald-300">Karaeski App yönetim paneline hoş geldiniz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-black/40 border-emerald-500/30 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-emerald-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-emerald-300/80">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Son Aktiviteler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.user}</p>
                  <p className="text-sm text-emerald-300/70">{activity.action}</p>
                  <p className="text-xs text-emerald-400/50 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Popüler Oyunlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {['Limbo', 'Dice', 'Mines', 'Tower Legend'].map((game, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5">
                <span className="text-white font-medium">{game}</span>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-300 text-sm">{Math.floor(Math.random() * 500) + 100} oyuncu</span>
                  <div className="w-24 h-2 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                      style={{ width: `${Math.floor(Math.random() * 60) + 40}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
