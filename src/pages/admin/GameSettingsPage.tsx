import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Gamepad2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockGameSettings = [
  { id: '1', name: 'Limbo', min_bet: 10, max_bet: 10000, house_edge: 2, is_active: true },
  { id: '2', name: 'Dice', min_bet: 10, max_bet: 5000, house_edge: 1.5, is_active: true },
  { id: '3', name: 'Mines', min_bet: 20, max_bet: 8000, house_edge: 2.5, is_active: true },
  { id: '4', name: 'Tower Legend', min_bet: 50, max_bet: 15000, house_edge: 3, is_active: false },
  { id: '5', name: 'Crash', min_bet: 10, max_bet: 20000, house_edge: 2, is_active: false },
  { id: '6', name: 'Roulette', min_bet: 5, max_bet: 5000, house_edge: 2.7, is_active: false },
];

export default function GameSettingsPage() {
  const [gameSettings, setGameSettings] = useState(mockGameSettings);
  const { toast } = useToast();

  const handleToggleActive = (id: string) => {
    setGameSettings(gameSettings.map(game => 
      game.id === id ? { ...game, is_active: !game.is_active } : game
    ));
  };

  const handleSaveSettings = () => {
    toast({
      title: 'Ayarlar Kaydedildi',
      description: 'Oyun ayarları başarıyla güncellendi',
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Oyun Ayarları</h1>
          <p className="text-emerald-300">Oyun parametrelerini yapılandırın</p>
        </div>
        <Button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Tüm Ayarları Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {gameSettings.map((game) => (
          <Card key={game.id} className="bg-black/40 border-emerald-500/30 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  {game.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-emerald-300">
                    {game.is_active ? 'Aktif' : 'Pasif'}
                  </span>
                  <Switch
                    checked={game.is_active}
                    onCheckedChange={() => handleToggleActive(game.id)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Minimum Bahis</label>
                  <Input
                    type="number"
                    value={game.min_bet}
                    onChange={(e) => setGameSettings(gameSettings.map(g => 
                      g.id === game.id ? { ...g, min_bet: parseInt(e.target.value) } : g
                    ))}
                    className="bg-black/30 border-emerald-500/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-emerald-300">Maximum Bahis</label>
                  <Input
                    type="number"
                    value={game.max_bet}
                    onChange={(e) => setGameSettings(gameSettings.map(g => 
                      g.id === game.id ? { ...g, max_bet: parseInt(e.target.value) } : g
                    ))}
                    className="bg-black/30 border-emerald-500/30 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-emerald-300">House Edge (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={game.house_edge}
                  onChange={(e) => setGameSettings(gameSettings.map(g => 
                    g.id === game.id ? { ...g, house_edge: parseFloat(e.target.value) } : g
                  ))}
                  className="bg-black/30 border-emerald-500/30 text-white"
                />
              </div>
              <div className="pt-2 border-t border-emerald-500/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-emerald-300/60 mb-1">Min</p>
                    <p className="text-white font-semibold">{game.min_bet}</p>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-300/60 mb-1">Max</p>
                    <p className="text-white font-semibold">{game.max_bet.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-300/60 mb-1">Edge</p>
                    <p className="text-white font-semibold">{game.house_edge}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
