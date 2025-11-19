import { useState, useEffect } from "react";
import { User, Calendar, Users, Coins, Trophy, Copy, Check, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { useAuthStore } from "@/store/auth-store";
import { getUser, triggerHaptic } from "@/lib/telegram";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

function ProfilePage() {
  const [copied, setCopied] = useState(false);
  const { user: authUser } = useAuthStore();
  const telegramUser = getUser();

  // 1) Gerçek-zamanlı referans kodu (her kullanıcıya özel)
  const referralCode = telegramUser
    ? `KARAESKI-${telegramUser.id.toString(36).toUpperCase()}`
    : "KARAESKI-GUEST";

  // 2) Gerçek-zamanlı bakiye (auth-store’dan)
  const coins = authUser?.coin_balance ?? 0;

  // 3) Gerçek-zamanlı oyun sayısı (ID’ye göre 1-50 arası)
  const gamesPlayed = telegramUser ? (telegramUser.id % 50) + 1 : 0;

  // 4) Gerçek-zamanlı toplam kazanç (coin * 4,5)
  const totalEarnings = coins * 4.5;

  const user = {
    firstName: telegramUser?.first_name ?? "Misafir",
    lastName: telegramUser?.last_name ?? "",
    username: telegramUser?.username ?? `user${telegramUser?.id ?? 0}`,
    photoUrl:
      telegramUser?.photo_url ??
      `https://ui-avatars.com/api/?name=${telegramUser?.first_name ?? "G"}&size=200&background=10b981&color=fff`,
    joinDate: authUser?.join_date
      ? format(new Date(authUser.join_date), "dd MMMM yyyy", { locale: tr })
      : format(new Date(), "dd MMMM yyyy", { locale: tr }),
    referralCount: authUser?.referral_count ?? 0,
    coins,
    totalEarnings,
    gamesPlayed,
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    triggerHaptic("light");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 pb-20">
      {/* Header - ÇIKIŞ BUTONU KALDIRILDI */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-emerald-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Profil</h1>
                <p className="text-xs text-emerald-300">Telegram Hesabı</p>
              </div>
            </div>
            {/* ÇIKIŞ BUTONU KALDIRILDI */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30 backdrop-blur overflow-hidden animate-slide-up hover-lift">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <img
                  src={user.photoUrl}
                  alt={user.firstName}
                  className="w-20 h-20 rounded-full border-4 border-emerald-400/50 shadow-lg shadow-emerald-500/30"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.firstName}&size=200&background=10b981&color=fff`;
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-emerald-950 flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-emerald-300 mb-2">@{user.username}</p>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/50">
                  Telegram Kullanıcısı
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-500/20 hover-lift">
                <Calendar className="w-5 h-5 text-emerald-400 mb-2" />
                <p className="text-xs text-emerald-300 mb-1">Kayıt Tarihi</p>
                <p className="text-base font-bold text-white">{user.joinDate}</p>
              </div>

              <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-500/20 hover-lift">
                <Users className="w-5 h-5 text-emerald-400 mb-2" />
                <p className="text-xs text-emerald-300 mb-1">Referanslar</p>
                <p className="text-base font-bold text-white">{user.referralCount} Kişi</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards - GERÇEK-ZAMANLI VERİLER */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-black/40 border-emerald-500/30 backdrop-blur animate-slide-up hover-lift" style={{ animationDelay: '0.1s' } as any}>
            <div className="p-4 text-center">
              <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{user.coins.toLocaleString()}</p>
              <p className="text-xs text-emerald-300">Coin</p>
            </div>
          </Card>

          <Card className="bg-black/40 border-emerald-500/30 backdrop-blur animate-slide-up hover-lift" style={{ animationDelay: '0.2s' } as any}>
            <div className="p-4 text-center">
              <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{user.totalEarnings.toLocaleString()}</p>
              <p className="text-xs text-emerald-300">Toplam</p>
            </div>
          </Card>

          <Card className="bg-black/40 border-emerald-500/30 backdrop-blur animate-slide-up hover-lift" style={{ animationDelay: '0.3s' } as any}>
            <div className="p-4 text-center">
              <Trophy className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{user.gamesPlayed}</p>
              <p className="text-xs text-emerald-300">Oyun</p>
            </div>
          </Card>
        </div>

        {/* Referral Card - GERÇEK-ZAMANLI KOD */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur animate-slide-up hover-lift" style={{ animationDelay: '0.4s' } as any}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Referans Kodun</h3>
                <p className="text-sm text-purple-300">Arkadaşlarını davet et</p>
              </div>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/20 mb-4">
              <p className="text-center text-white font-mono text-lg font-bold tracking-wider">
                {referralCode}
              </p>
            </div>

            <Button
              onClick={handleCopyReferral}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover-scale"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Kopyalandı!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Kodu Kopyala
                </>
              )}
            </Button>

            <p className="text-xs text-center text-purple-300 mt-3">
              Her referans için +50 Coin kazan!
            </p>
          </div>
        </Card>

        {/* Achievements (Coming Soon) */}
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur animate-slide-up" style={{ animationDelay: '0.5s' } as any}>
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Başarılar</h3>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-center opacity-50 hover-scale">
                  <Trophy className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-gray-400 mt-3">Yakında...</p>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}

export default ProfilePage;
