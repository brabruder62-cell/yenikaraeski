import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';
import { useAdminStore } from '@/store/admin-store';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [telegramId, setTelegramId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAdminUser } = useAdminStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Demo login - replace with real authentication
      if (telegramId === 'admin' && password === 'admin123') {
        setAdminUser({
          telegram_id: 'admin',
          username: 'Admin',
          is_admin: true,
        });
        toast({
          title: 'Giriş Başarılı',
          description: 'Admin paneline yönlendiriliyorsunuz...',
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Giriş Başarısız',
          description: 'Geçersiz kullanıcı adı veya şifre',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Giriş yapılırken bir hata oluştu',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/40 border-emerald-500/30 backdrop-blur">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Admin Panel</CardTitle>
          <CardDescription className="text-emerald-300">
            Yönetim paneline erişmek için giriş yapın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Kullanıcı Adı</label>
              <Input
                type="text"
                value={telegramId}
                onChange={(e) => setTelegramId(e.target.value)}
                placeholder="admin"
                className="bg-black/30 border-emerald-500/30 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-emerald-300">Şifre</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-black/30 border-emerald-500/30 text-white"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Giriş Yapılıyor...
                </>
              ) : (
                'Giriş Yap'
              )}
            </Button>
          </form>
          <p className="text-xs text-emerald-400/60 text-center mt-4">
            Demo: admin / admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
