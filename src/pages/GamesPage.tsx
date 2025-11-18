import { Coins, Trophy, Zap, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import BottomNav from '@/components/BottomNav'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import { triggerHaptic } from '@/lib/telegram'

function GamesPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const coins = user?.coin_balance || 1250

  const games = [
    { id: 1, name: 'Limbo', icon: '🎯', color: 'from-emerald-500 to-teal-600', popular: true, players: 234, route: '/games/limbo' },
    { id: 2, name: 'Tower Legend', icon: '🗼', color: 'from-green-500 to-emerald-600', popular: true, players: 189, route: null },
    { id: 3, name: 'Mines', icon: '💣', color: 'from-lime-500 to-green-600', popular: false, players: 156, route: '/games/mines' },
    { id: 4, name: 'Dice', icon: '🎲', color: 'from-teal-500 to-cyan-600', popular: false, players: 143, route: '/games/dice' },
    { id: 5, name: 'Crash', icon: '🚀', color: 'from-emerald-600 to-green-700', popular: true, players: 201, route: null },
    { id: 6, name: 'Roulette', icon: '🎡', color: 'from-green-600 to-teal-700', popular: false, players: 178, route: null },
  ]

  const handleGameClick = (game: typeof games[0]) => {
    triggerHaptic('light')
    if (game.route) {
      navigate(game.route)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-emerald-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Oyunlar</h1>
                <p className="text-xs text-emerald-300">Casino oyunları</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-bold text-yellow-300">{coins.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Popular Games */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Popüler Oyunlar</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {games.filter(game => game.popular).map((game, idx) => (
              <Card 
                key={game.id}
                onClick={() => handleGameClick(game)}
                className={`group relative overflow-hidden bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 hover:border-emerald-400/50 transition-all animate-slide-up ${
                  game.route ? 'cursor-pointer hover-lift hover-glow' : 'opacity-70'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` } as any}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="relative p-6 flex flex-col items-center gap-3">
                  <Badge className="absolute top-2 right-2 bg-yellow-500/90 text-yellow-950 border-yellow-400">
                    <Star className="w-3 h-3 mr-1" />
                    Popüler
                  </Badge>
                  {!game.route && (
                    <Badge className="absolute top-2 left-2 bg-gray-500/90 text-white border-gray-400">
                      Yakında
                    </Badge>
                  )}
                  <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                  <div className="flex items-center gap-1 text-emerald-300 text-sm mb-2">
                    <Zap className="w-3 h-3" />
                    <span>{game.players} oyuncu</span>
                  </div>
                  <Button 
                    disabled={!game.route}
                    size="sm" 
                    variant="outline"
                    className="w-full border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 transition-all disabled:opacity-50"
                  >
                    {game.route ? 'Oyna' : 'Yakında'}
                    {game.route && <ChevronRight className="w-4 h-4 ml-1" />}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Games */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Tüm Oyunlar</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {games.filter(game => !game.popular).map((game, idx) => (
              <Card 
                key={game.id}
                onClick={() => handleGameClick(game)}
                className={`group relative overflow-hidden bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20 hover:border-emerald-400/50 transition-all animate-slide-up ${
                  game.route ? 'cursor-pointer hover-lift hover-glow' : 'opacity-70'
                }`}
                style={{ animationDelay: `${(idx + 3) * 0.1}s` } as any}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="relative p-6 flex flex-col items-center gap-3">
                  {!game.route && (
                    <Badge className="absolute top-2 right-2 bg-gray-500/90 text-white border-gray-400">
                      Yakında
                    </Badge>
                  )}
                  <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                  <div className="flex items-center gap-1 text-emerald-300 text-sm mb-2">
                    <Zap className="w-3 h-3" />
                    <span>{game.players} oyuncu</span>
                  </div>
                  <Button 
                    disabled={!game.route}
                    size="sm" 
                    variant="outline"
                    className="w-full border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 transition-all disabled:opacity-50"
                  >
                    {game.route ? 'Oyna' : 'Yakında'}
                    {game.route && <ChevronRight className="w-4 h-4 ml-1" />}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default GamesPage
