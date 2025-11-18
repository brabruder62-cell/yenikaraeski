import { useState } from 'react'
import { ArrowLeft, Coins, Dices, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { Slider } from '@/components/ui/slider'

function DiceGame() {
  const navigate = useNavigate()
  const [balance, setBalance] = useState(1250)
  const [betAmount, setBetAmount] = useState(10)
  const [prediction, setPrediction] = useState(50)
  const [overUnder, setOverUnder] = useState<'over' | 'under'>('over')
  const [isPlaying, setIsPlaying] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [won, setWon] = useState<boolean | null>(null)

  const winChance = overUnder === 'over' ? (100 - prediction) : prediction
  const multiplier = (100 / winChance) * 0.95 // 5% house edge

  const playGame = () => {
    if (betAmount > balance || betAmount <= 0) return
    
    setIsPlaying(true)
    setBalance(prev => prev - betAmount)
    
    const roll = Math.floor(Math.random() * 100) + 1
    
    setTimeout(() => {
      setResult(roll)
      const didWin = overUnder === 'over' ? roll > prediction : roll < prediction
      setWon(didWin)
      
      if (didWin) {
        const winAmount = Math.floor(betAmount * multiplier)
        setBalance(prev => prev + winAmount)
      }
      
      setTimeout(() => {
        setIsPlaying(false)
        setResult(null)
        setWon(null)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-950 via-cyan-900 to-blue-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-teal-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate('/games')}
                variant="ghost"
                size="icon"
                className="text-teal-300 hover:text-teal-200 hover:bg-teal-500/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Dice 🎲</h1>
                <p className="text-xs text-teal-300">Sayıyı tahmin et</p>
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
        <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/30 backdrop-blur">
          <div className="p-8 text-center">
            <div className="mb-6">
              <p className="text-sm text-teal-300 mb-4">Zar Atılıyor...</p>
              <div className={`text-7xl font-bold transition-all duration-500 ${
                result !== null ? (won ? 'text-green-400 animate-bounce' : 'text-red-400') : 'text-white'
              }`}>
                {isPlaying ? (
                  <Dices className="w-24 h-24 mx-auto animate-spin text-teal-400" />
                ) : result !== null ? (
                  <>
                    {result}
                    {won && <div className="text-2xl mt-4">🎉 Kazandın!</div>}
                    {won === false && <div className="text-2xl mt-4">😔 Kaybettin</div>}
                  </>
                ) : (
                  <Dices className="w-24 h-24 mx-auto text-teal-400" />
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Prediction Bar */}
        <Card className="bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border-teal-500/20">
          <div className="p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm text-teal-300">Tahmin</label>
                <div className="text-2xl font-bold text-white">{prediction}</div>
              </div>
              
              <Slider
                value={[prediction]}
                onValueChange={(value) => setPrediction(value[0])}
                min={1}
                max={99}
                step={1}
                disabled={isPlaying}
                className="mb-4"
              />

              <div className="flex gap-2">
                <Button
                  onClick={() => setOverUnder('under')}
                  variant={overUnder === 'under' ? 'default' : 'outline'}
                  className={`flex-1 ${
                    overUnder === 'under' 
                      ? 'bg-gradient-to-r from-red-500 to-orange-600' 
                      : 'border-teal-400/50 text-teal-300'
                  }`}
                  disabled={isPlaying}
                >
                  Alt ({prediction})
                </Button>
                <Button
                  onClick={() => setOverUnder('over')}
                  variant={overUnder === 'over' ? 'default' : 'outline'}
                  className={`flex-1 ${
                    overUnder === 'over' 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600' 
                      : 'border-teal-400/50 text-teal-300'
                  }`}
                  disabled={isPlaying}
                >
                  Üst ({prediction})
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-teal-950/50 rounded-lg p-2 border border-teal-500/20">
                  <p className="text-teal-300">Kazanma Şansı</p>
                  <p className="text-white font-bold">{winChance.toFixed(0)}%</p>
                </div>
                <div className="bg-teal-950/50 rounded-lg p-2 border border-teal-500/20">
                  <p className="text-teal-300">Çarpan</p>
                  <p className="text-white font-bold">{multiplier.toFixed(2)}x</p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-teal-300 mb-2 block">Bahis Miktarı</label>
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                min="1"
                max={balance}
                disabled={isPlaying}
                className="bg-teal-950/50 border-teal-500/30 text-white text-lg"
              />
              <div className="flex gap-2 mt-2">
                {[10, 50, 100, 250].map(amount => (
                  <Button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    disabled={isPlaying || amount > balance}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-teal-400/50 text-teal-300 hover:bg-teal-500/20"
                  >
                    {amount}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-teal-300 mt-2">
                Olası Kazanç: {Math.floor(betAmount * multiplier)} coin
              </p>
            </div>

            <Button
              onClick={playGame}
              disabled={isPlaying || betAmount > balance || betAmount <= 0}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-6 text-lg shadow-lg shadow-teal-500/30"
            >
              {isPlaying ? 'Zar Atılıyor...' : 'Zarı At'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DiceGame
