import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Confetti from "@/components/Confetti";

// TELEGRAM CHANNEL CONFIG
const DEFAULT_CHANNEL_USERNAME = "eserkaraeskichat";
const DEFAULT_BOT_TOKEN = "8414952935:AAH1sPR2wNj-IwzDsEHlAfFumL9x3cu_orU";

interface TelegramConfig {
  channelUsername: string;
  botToken: string;
}

const telegramConfig: TelegramConfig = {
  channelUsername: DEFAULT_CHANNEL_USERNAME,
  botToken: DEFAULT_BOT_TOKEN,
};

const getTelegramChannelUrl = () => `https://t.me/${telegramConfig.channelUsername}`;

interface WelcomePageProps {
  onComplete: () => void;
}

export default function WelcomePage({ onComplete }: WelcomePageProps) {
  const [hasJoined, setHasJoined] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
    const joined = localStorage.getItem("channel_joined");
    if (joined === "true") setHasJoined(true);
  }, []);

  const loadSettings = async () => {
    try {
      // Database bağlantısı olmadan sabit ayarları kullan
      console.log("Settings loaded from defaults");
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const handleJoinChannel = () => {
    const tg = (window as any).Telegram?.WebApp;
    const channelUrl = getTelegramChannelUrl();
    if (tg) {
      tg.openTelegramLink(channelUrl);
      tg.HapticFeedback?.impactOccurred("medium");
    } else {
      window.open(channelUrl, "_blank");
    }
    toast({
      title: "Kanala katıl",
      description: "Telegram kanalımıza katıldıktan sonra 'Kontrol Et' butonuna basın",
    });
  };

  const checkChannelMembership = async () => {
    setIsChecking(true);
    const tg = (window as any).Telegram?.WebApp;
    try {
      const userId = tg?.initDataUnsafe?.user?.id;
      if (!userId) {
        toast({ title: "Hata", description: "Telegram kullanıcı bilgisi alınamadı", variant: "destructive" });
        setIsChecking(false);
        return;
      }

      const response = await fetch(
        `https://api.telegram.org/bot${telegramConfig.botToken}/getChatMember?chat_id=@${telegramConfig.channelUsername}&user_id=${userId}`
      );
      const data = await response.json();

      if (data.ok) {
        const status = data.result.status;
        const isMember = ["creator", "administrator", "member"].includes(status);
        if (isMember) {
          setHasJoined(true);
          setShowConfetti(true);
          localStorage.setItem("channel_joined", "true");
          tg?.HapticFeedback?.notificationOccurred("success");
          toast({ title: "✅ Doğrulandı!", description: "Kanala katılımınız onaylandı. Hoş geldiniz!" });
          setTimeout(() => onComplete(), 2000);
        } else {
          toast({ title: "Henüz katılmadınız", description: "Lütfen önce kanala katılın, sonra tekrar kontrol edin", variant: "destructive" });
          tg?.HapticFeedback?.notificationOccurred("error");
        }
      } else {
        throw new Error("API hatası");
      }
    } catch (error) {
      console.error("Channel check error:", error);
      if (telegramConfig.botToken === "YOUR_BOT_TOKEN") {
        toast({ title: "Demo Mode", description: "Bot token yapılandırılmamış. Demo modunda devam ediliyor..." });
        setTimeout(() => {
          setHasJoined(true);
          setShowConfetti(true);
          localStorage.setItem("channel_joined", "true");
          setTimeout(() => onComplete(), 2000);
        }, 1500);
      } else {
        toast({ title: "Kontrol başarısız", description: "Lütfen tekrar deneyin veya destek ile iletişime geçin", variant: "destructive" });
      }
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 flex items-center justify-center p-4 overflow-hidden relative">
      {showConfetti && <Confetti show={showConfetti} />}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full animate-float-slow blur-xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-teal-500/10 rounded-full animate-float-slower blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-emerald-400/10 rounded-full animate-float blur-xl" />
        <div className="absolute bottom-40 right-1/3 w-48 h-48 bg-teal-400/10 rounded-full animate-float-slow blur-xl" />
      </div>

      <Card className="w-full max-w-md bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-emerald-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
        <div className="p-8 space-y-6 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl animate-pulse-slow" />
              <img
                src="https://static.devv.ai/f4g7d9pnl9ts.png"
                alt="Karaeski Casino"
                className="w-64 h-64 object-contain relative z-10 animate-float"
                style={{ filter: 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.3))' }}
              />
            </div>
          </div>

          <div className="text-center space-y-2 animate-slide-up animation-delay-200">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Karaeski App</h1>
            <p className="text-slate-300 text-sm">Premium Casino & Betting Platform</p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg p-4 space-y-2 animate-slide-up animation-delay-300">
            <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-emerald-400 text-sm font-bold">1</span></div><p className="text-slate-300 text-sm">Telegram kanalımıza katılın</p></div>
            <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-emerald-400 text-sm font-bold">2</span></div><p className="text-slate-300 text-sm">Katılımınızı kontrol edin</p></div>
            <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-emerald-400 text-sm font-bold">3</span></div><p className="text-slate-300 text-sm">Uygulamayı kullanmaya başlayın! 🎰</p></div>
          </div>

          <div className="space-y-3 animate-slide-up animation-delay-400">
            {!hasJoined ? (
              <>
                <Button onClick={handleJoinChannel} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">
                  <ExternalLink className="mr-2 h-5 w-5" /> Kanala Katıl
                </Button>
                <Button onClick={checkChannelMembership} disabled={isChecking} variant="outline" className="w-full border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 font-semibold py-6 text-lg transition-all duration-300 hover:scale-105">
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Kontrol ediliyor...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Kontrol Et
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={onComplete} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Uygulamaya Başla
              </Button>
            )}
          </div>

          <p className="text-center text-slate-500 text-xs animate-slide-up animation-delay-500">Karaeski topluluğuna hoş geldiniz! 🎉</p>
        </div>
      </Card>
    </div>
  );
}
