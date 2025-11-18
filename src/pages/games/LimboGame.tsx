import { useState, useEffect } from 'react'
import { ArrowLeft, Coins, TrendingUp, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'

function LimboGame() {
  const navigate = useNavigate()
  const [balance, setBalance] = useState(1250)
  const [betAmount, setBetAmount] = useState(10)
  const [targetMultiplier, setTargetMultiplier] = useState(2.0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [won, setWon] = useState<boolean | null>(null)
  const [history, setHistory] = useState<Array<{multiplier: number, won: boolean}>>([])

  const playGame = () => {
    if (betAmount > balance || betAmount <= 0) return
    
    setIsPlaying(true)
    setBalance(prev => prev - betAmount)
    
    // Gerçek oyunda server tarafında olur
    const randomMultiplier = Math.random() * 10
    const finalMultiplier = Math.max(1.0, Math.min(10.0, randomMultiplier))
    
    setTimeout(() => {
      setResult(finalMultiplier)
      const didWin = finalMultiplier >= targetMultiplier
      setWon(didWin)
      
      if (didWin) {
        const winAmount = Math.floor(betAmount * targetMultiplier)
        setBalance(prev => prev + winAmount)
      }
      
      setHistory(prev => [{multiplier: finalMultiplier, won: didWin}, ...prev.slice(0, 9)])
      
      setTimeout(() => {
        setIsPlaying(false)
        setResult(null)
        setWon(null)
      }, 3000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-emerald-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate('/games')}
                variant="ghost"
                size="icon"
                className="text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Limbo 🎯</h1>
                <p className="text-xs text-emerald-300">Çarpanı tahmin et</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-bold text-yellow-300">{balance}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Game Display */}
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30 backdrop-blur">
          <div className="p-8 text-center">
            <div className="mb-6">
              <p className="text-sm text-emerald-300 mb-2">Çıkan Çarpan</p>
              <div className={`text-6xl font-bold transition-all duration-500 ${
                result !== null ? (won ? 'text-green-400 animate-bounce' : 'text-red-400') : 'text-white'
              }`}>
                {isPlaying ? (
                  <div className="animate-pulse">?</div>
                ) : result !== null ? (
                  <>
                    {result.toFixed(2)}x
                    {won && <div className="text-2xl mt-2">🎉 Kazandın!</div>}
                    {won === false && <div className="text-2xl mt-2">😔 Kaybettin</div>}
                  </>
                ) : (
                  <TrendingUp className="w-24 h-24 mx-auto text-emerald-400" />
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Betting Controls */}
        <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20">
          <div className="p-6 space-y-4">
            <div>
              <label className="text-sm text-emerald-300 mb-2 block">Bahis Miktarı</label>
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                min="1"
                max={balance}
                disabled={isPlaying}
                className="bg-emerald-950/50 border-emerald-500/30 text-white text-lg"
              />
              <div className="flex gap-2 mt-2">
                {[10, 50, 100, 250].map(amount => (
                  <Button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    disabled={isPlaying || amount > balance}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/20"
                  >
                    {amount}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-emerald-300 mb-2 block">Hedef Çarpan</label>
              <Input
                type="number"
                value={targetMultiplier}
                onChange={(e) => setTargetMultiplier(Number(e.target.value))}
                min="1.1"
                max="10"
                step="0.1"
                disabled={isPlaying}
                className="bg-emerald-950/50 border-emerald-500/30 text-white text-lg"
              />
              <div className="flex justify-between mt-2 text-xs text-emerald-300">
                <span>Olası Kazanç: {Math.floor(betAmount * targetMultiplier)} coin</span>
                <span>Risk: {targetMultiplier < 2 ? 'Düşük' : targetMultiplier < 5 ? 'Orta' : 'Yüksek'}</span>
              </div>
            </div>

            <Button
              onClick={playGame}
              disabled={isPlaying || betAmount > balance || betAmount <= 0}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-6 text-lg shadow-lg shadow-emerald-500/30"
            >
              {isPlaying ? 'Oynanıyor...' : 'Oyna'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>

        {/* History */}
        {history.length > 0 && (
          <Card className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border-emerald-500/20">
            <div className="p-4">
              <h3 className="text-sm font-bold text-white mb-3">Son Oyunlar</h3>
              <div className="flex gap-2 flex-wrap">
                {history.map((game, i) => (
                  <div
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      game.won 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {game.multiplier.toFixed(2)}x
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default LimboGame
