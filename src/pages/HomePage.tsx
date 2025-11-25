import { useState, useEffect } from 'react';
import { Coins, Gift, Users, Trophy, Zap, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import BottomNav from '@/components/BottomNav';
import LoadingSpinner from '@/components/LoadingSpinner';
import SkeletonCard from '@/components/SkeletonCard';
import Confetti from '@/components/Confetti';
import CoinAnimation from '@/components/CoinAnimation';
import { triggerHaptic, triggerNotification } from '@/lib/telegram';

interface Sponsor {
  _id: string;
  name: string;
  logo_url: string;
  redirect_url: string;
  status: string;
  order: number;
}

function HomePage() {
  const navigate = useNavigate();
  const { user, updateCoinBalance } = useAuthStore();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoadingSponsors, setIsLoadingSponsors] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [lastClaimed, setLastClaimed] = useState<string | null>(
    localStorage.getItem('lastDailyClaim')
  );

  // GERÇEK-ZAMANLI BAKİYE (Telegram ID'ye göre 0-9999 arası)
  const coins = user?.coin_balance ?? 0;

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      setIsLoadingSponsors(true);
      // Database bağlantısı olmadan örnek sponsorlar
      const exampleSponsors: Sponsor[] = [
        {
          _id: '1',
          name: 'Winza Bet',
          logo_url: 'https://static.devv.ai/f4g7d9pnl9ts.png',
          redirect_url: 'https://t.me/eserkaraeskichat',
          status: 'active',
          order: 1
        },
        {
          _id: '2', 
          name: 'Premium Casino',
          logo_url: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400',
          redirect_url: 'https://t.me/eserkaraeskichat',
          status: 'active',
          order: 2
        }
      ];
      setSponsors(exampleSponsors);
    } catch (error) {
      console.error('Load sponsors error:', error);
    } finally {
      setIsLoadingSponsors(false);
    }
  };

  const canClaimDaily = () => {
    if (!lastClaimed) return true;
    const lastClaimDate = new Date(lastClaimed);
    const today = new Date();
    return lastClaimDate.toDateString() !== today.toDateString();
  };

  const handleClaimDaily = () => {
    if (!canClaimDaily()) return;
    const bonusAmount = 100;
    updateCoinBalance(bonusAmount);
    const now = new Date().toISOString();
    localStorage.setItem('lastDailyClaim', now);
    setLastClaimed(now);
    triggerHaptic('heavy');
    triggerNotification('success');
    setShowCoinAnimation(true);
    setTimeout(() => {
      setShowCoinAnimation(false);
      setShowConfetti(true);
    }, 600);
  };

  const handleSponsorClick = (sponsor: Sponsor) => {
    triggerHaptic('light');
    window.open(sponsor.redirect_url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 pb-20">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header with REAL-TIME Coins */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-emerald-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Karaeski App</h1>
                <p className="text-xs text-emerald-300">Casino & Games</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-4 py-2 rounded-full border border-yellow-500/30 hover-glow relative">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-bold text-yellow-300">{coins.toLocaleString()}</span>
              <CoinAnimation show={showCoinAnimation} amount={100} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Daily Bonus Card */}
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30 backdrop-blur hover-lift animate-slide-up">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50 animate-pulse">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Günlük Bonus</h3>
                  <p className="text-sm text-emerald-300">{canClaimDaily() ? '+100 Coin Al' : 'Yarın Tekrar Gel'}</p>
                </div>
              </div>
              <Button
                onClick={handleClaimDaily}
                disabled={!canClaimDaily()}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed hover-scale"
              >
                {canClaimDaily() ? 'Topla' : 'Alındı ✓'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Sponsor Sites */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl font-bold text-white">Sponsor Siteler</h2>

          {isLoadingSponsors ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : sponsors.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {sponsors.map((sponsor) => (
                <Card
                  key={sponsor._id}
                  onClick={() => handleSponsorClick(sponsor)}
                  className="relative overflow-hidden cursor-pointer bg-black/40 border-2 border-emerald-500/30 backdrop-blur hover-lift hover-glow group"
                >
                  <div className="aspect-video relative">
                    <img
                      src={sponsor.logo_url}
                      alt={sponsor.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-semibold text-sm">{sponsor.name}</p>
                        <ExternalLink className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
              <div className="p-8 text-center">
                <p className="text-gray-400">Henüz sponsor eklenmemiş</p>
              </div>
            </Card>
          )}
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card
            onClick={() => navigate('/games')}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur cursor-pointer hover-lift hover-glow"
          >
            <div className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold">Oyunlar</h3>
              <p className="text-xs text-purple-300 mt-1">6 Oyun</p>
            </div>
          </Card>

          <Card
            onClick={() => navigate('/tasks')}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 backdrop-blur cursor-pointer hover-lift hover-glow"
          >
            <div className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold">Görevler</h3>
              <p className="text-xs text-blue-300 mt-1">Ödül Kazan</p>
            </div>
          </Card>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}

export default HomePage;
