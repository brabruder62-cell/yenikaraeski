import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, ShoppingCart, Package, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth-store";
import { table } from "@devvai/devv-code-backend";
import BottomNav from "@/components/BottomNav";
import Confetti from "@/components/Confetti";

const STORE_ITEMS_TABLE_ID = "f41liqhtnvgg";

interface StoreItem {
  _id: string;
  _uid: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  is_active: number;
}

export default function StorePage() {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { user, updateCoinBalance } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchStoreItems();
  }, []);

  const fetchStoreItems = async () => {
    try {
      setLoading(true);
      const result = await table.getItems(STORE_ITEMS_TABLE_ID, {
        limit: 50,
      });

      // Filter active items
      const activeItems = result.items.filter(
        (item: any) => item.is_active === 1 && (item.stock === -1 || item.stock > 0)
      ) as StoreItem[];

      setItems(activeItems);
    } catch (error) {
      console.error("Failed to fetch store items:", error);
      toast({
        title: "Hata",
        description: "Mağaza ürünleri yüklenemedi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (item: StoreItem) => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Ürün satın almak için giriş yapmalısınız",
        variant: "destructive",
      });
      return;
    }

    if (user.coin_balance < item.price) {
      toast({
        title: "Yetersiz Bakiye",
        description: `Bu ürünü satın almak için ${item.price - user.coin_balance} coin daha gerekli`,
        variant: "destructive",
      });
      return;
    }

    try {
      setPurchasing(item._id);

      // Deduct coins
      await updateCoinBalance(-item.price);

      // Update stock if not unlimited
      if (item.stock !== -1) {
        await table.updateItem(STORE_ITEMS_TABLE_ID, {
          _uid: item._uid,
          _id: item._id,
          stock: item.stock - 1,
        });

        // Update local state
        setItems((prev) =>
          prev.map((i) =>
            i._id === item._id ? { ...i, stock: i.stock - 1 } : i
          )
        );
      }

      // Show success
      setShowConfetti(true);
      
      // Haptic feedback
      const tg = (window as any).Telegram?.WebApp;
      tg?.HapticFeedback?.notificationOccurred('success');

      toast({
        title: "🎉 Satın Alma Başarılı!",
        description: `${item.name} başarıyla satın alındı`,
      });

      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error("Purchase failed:", error);
      toast({
        title: "Hata",
        description: "Satın alma işlemi başarısız oldu",
        variant: "destructive",
      });
    } finally {
      setPurchasing(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "booster":
        return <Sparkles className="w-4 h-4" />;
      case "cosmetic":
        return <Package className="w-4 h-4" />;
      default:
        return <ShoppingCart className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "booster":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "cosmetic":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "special":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 pb-20">
      {showConfetti && <Confetti show={showConfetti} />}

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-b border-emerald-500/20 p-6 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">🛍️ Mağaza</h1>
              <p className="text-slate-400 text-sm">Coin'lerinizle özel ürünler satın alın</p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 px-4 py-2 rounded-lg">
              <Coins className="w-5 h-5 text-yellow-400 animate-bounce-slow" />
              <span className="text-xl font-bold text-white">
                {user?.coin_balance.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-emerald-500/20 p-12">
            <div className="text-center space-y-3">
              <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-400">
                Mağaza Boş
              </h3>
              <p className="text-slate-500">
                Şu anda satın alınabilir ürün bulunmuyor
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <Card
                key={item._id}
                className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 overflow-hidden group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800/50">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  
                  {/* Category Badge */}
                  <Badge
                    className={`absolute top-3 right-3 ${getCategoryColor(
                      item.category
                    )} flex items-center gap-1`}
                  >
                    {getCategoryIcon(item.category)}
                    {item.category}
                  </Badge>

                  {/* Stock Badge */}
                  {item.stock !== -1 && (
                    <Badge className="absolute top-3 left-3 bg-slate-900/80 text-slate-300 border-slate-700">
                      Stok: {item.stock}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Purchase */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      <span className="text-xl font-bold text-white">
                        {item.price.toLocaleString()}
                      </span>
                    </div>

                    <Button
                      onClick={() => handlePurchase(item)}
                      disabled={
                        purchasing === item._id ||
                        !user ||
                        user.coin_balance < item.price ||
                        (item.stock !== -1 && item.stock <= 0)
                      }
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {purchasing === item._id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Satın Alınıyor...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Satın Al
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
