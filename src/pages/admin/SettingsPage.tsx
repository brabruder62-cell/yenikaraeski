import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Settings, Save, Globe, Bell, Gift, Shield, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { table, auth } from '@devvai/devv-code-backend';

const APP_SETTINGS_TABLE_ID = 'f41liquxmigw';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    app_name: 'Karaeski App',
    app_description: 'Casino ve betting platformu',
    daily_bonus_amount: 100,
    referral_reward: 500,
    maintenance_mode: false,
    new_user_bonus: 1000,
    min_withdrawal: 1000,
    notifications_enabled: true,
    telegram_bot_token: '',
    telegram_channel_username: 'karaeski_official',
    support_url: 'https://t.me/support',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const result = await table.getItems(APP_SETTINGS_TABLE_ID, {
        limit: 100,
      });

      // Parse settings from database
      const updatedSettings: typeof settings = { ...settings };
      result.items.forEach((item: any) => {
        const key = item.key;
        if (key in updatedSettings) {
          const value = item.value;
          // Parse boolean and number values
          if (key === 'maintenance_mode' || key === 'notifications_enabled') {
            (updatedSettings as any)[key] = value === 'true' || value === true;
          } else if (typeof (updatedSettings as any)[key] === 'number') {
            (updatedSettings as any)[key] = parseInt(value) || 0;
          } else {
            (updatedSettings as any)[key] = value;
          }
        }
      });

      setSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast({
        title: 'Hata',
        description: 'Ayarlar yüklenemedi',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      
      // Get current user ID from session
      const sid = localStorage.getItem('DEVV_CODE_SID');
      if (!sid) {
        toast({
          title: 'Hata',
          description: 'Kullanıcı oturumu bulunamadı',
          variant: 'destructive',
        });
        setSaving(false);
        return;
      }

      // For settings, we'll use a default admin UID
      const userId = 'admin_' + Date.now();

      // Save each setting to database
      for (const [key, value] of Object.entries(settings)) {
        const category = key.includes('telegram') || key.includes('bot') ? 'general' :
                        key.includes('bonus') || key.includes('reward') ? 'reward' :
                        key.includes('notification') ? 'notification' : 'general';

        // Check if setting exists
        const existing = await table.getItems(APP_SETTINGS_TABLE_ID, {
          query: {
            key: key,
          },
          limit: 1,
        });

        if (existing.items.length > 0) {
          // Update existing
          await table.updateItem(APP_SETTINGS_TABLE_ID, {
            _uid: existing.items[0]._uid,
            _id: existing.items[0]._id,
            value: String(value),
            updated_at: new Date().toISOString(),
          });
        } else {
          // Create new
          await table.addItem(APP_SETTINGS_TABLE_ID, {
            _uid: userId,
            key: key,
            value: String(value),
            category: category,
            description: getSettingDescription(key),
            updated_at: new Date().toISOString(),
          });
        }
      }

      toast({
        title: '✅ Başarılı',
        description: 'Ayarlar kaydedildi',
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        title: 'Hata',
        description: 'Ayarlar kaydedilemedi',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getSettingDescription = (key: string): string => {
    const descriptions: Record<string, string> = {
      app_name: 'Application name',
      app_description: 'Application description',
      daily_bonus_amount: 'Daily bonus coin amount',
      referral_reward: 'Referral reward amount for both users',
      maintenance_mode: 'Maintenance mode status',
      new_user_bonus: 'Initial coin balance for new users',
      min_withdrawal: 'Minimum withdrawal amount',
      notifications_enabled: 'Push notifications enabled',
      telegram_bot_token: 'Telegram bot token from @BotFather',
      telegram_channel_username: 'Telegram channel username (without @)',
      support_url: 'Support channel URL',
    };
    return descriptions[key] || '';
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Uygulama Ayarları</h1>
          <p className="text-emerald-300">Genel ayarları yapılandırın</p>
        </div>
        <Button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Ayarları Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Genel Ayarlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Uygulama Adı</label>
              <Input
                value={settings.app_name}
                onChange={(e) => setSettings({ ...settings, app_name: e.target.value })}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Açıklama</label>
              <Textarea
                value={settings.app_description}
                onChange={(e) => setSettings({ ...settings, app_description: e.target.value })}
                rows={3}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Destek URL</label>
              <Input
                value={settings.support_url}
                onChange={(e) => setSettings({ ...settings, support_url: e.target.value })}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div>
                <p className="text-white font-medium">Bakım Modu</p>
                <p className="text-xs text-emerald-300/70">Uygulamayı geçici olarak kapat</p>
              </div>
              <Switch
                checked={settings.maintenance_mode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenance_mode: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Ödül Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Günlük Bonus Miktarı</label>
              <Input
                type="number"
                value={settings.daily_bonus_amount}
                onChange={(e) => setSettings({ ...settings, daily_bonus_amount: parseInt(e.target.value) })}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Yeni Kullanıcı Bonusu</label>
              <Input
                type="number"
                value={settings.new_user_bonus}
                onChange={(e) => setSettings({ ...settings, new_user_bonus: parseInt(e.target.value) })}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Referans Ödülü</label>
              <Input
                type="number"
                value={settings.referral_reward}
                onChange={(e) => setSettings({ ...settings, referral_reward: parseInt(e.target.value) })}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Minimum Çekim Miktarı</label>
              <Input
                type="number"
                value={settings.min_withdrawal}
                onChange={(e) => setSettings({ ...settings, min_withdrawal: parseInt(e.target.value) })}
                className="bg-black/30 border-emerald-500/30 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Bildirim Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div>
                <p className="text-white font-medium">Bildirimler Aktif</p>
                <p className="text-xs text-emerald-300/70">Push bildirimleri gönderilebilir</p>
              </div>
              <Switch
                checked={settings.notifications_enabled}
                onCheckedChange={(checked) => setSettings({ ...settings, notifications_enabled: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Telegram Bot Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Bot Token</label>
              <Input
                type="password"
                value={settings.telegram_bot_token}
                onChange={(e) => setSettings({ ...settings, telegram_bot_token: e.target.value })}
                placeholder="Bot token'ınızı girin"
                className="bg-black/30 border-emerald-500/30 text-white"
              />
              <p className="text-xs text-emerald-400/60">
                @BotFather'dan alınan bot token
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
