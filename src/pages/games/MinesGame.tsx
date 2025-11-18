import { useState } from 'react'
import { ArrowLeft, Coins, Bomb, Gem, RotateCcw, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'

const GRID_SIZE = 25 // 5x5 grid

function MinesGame() {
  const navigate = useNavigate()
  const [balance, setBalance] = useState(1250)
  const [betAmount, setBetAmount] = useState(10)
  const [mineCount, setMineCount] = useState(3)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle')
  const [revealedCells, setRevealedCells] = useState<Set<number>>(new Set())
  const [minePositions, setMinePositions] = useState<Set<number>>(new Set())
  const [currentMultiplier, setCurrentMultiplier] = useState(1)
  const [totalWin, setTotalWin] = useState(0)

  const startGame = () => {
    if (betAmount > balance || betAmount <= 0) return
    
    setBalance(prev => prev - betAmount)
    
    // Rastgele mayın pozisyonları
    const mines = new Set<number>()
    while (mines.size < mineCount) {
      mines.add(Math.floor(Math.random() * GRID_SIZE))
    }
    
    setMinePositions(mines)
    setRevealedCells(new Set())
    setGameState('playing')
    setCurrentMultiplier(1)
    setTotalWin(0)
  }

  const revealCell = (index: number) => {
    if (gameState !== 'playing' || revealedCells.has(index)) return
    
    const newRevealed = new Set(revealedCells)
    newRevealed.add(index)
    setRevealedCells(newRevealed)
    
    if (minePositions.has(index)) {
      // Hit a mine - game over
      setGameState('lost')
    } else {
      // Safe cell - calculate multiplier
      const safeCells = GRID_SIZE - mineCount
      const revealedSafe = newRevealed.size
      const multiplier = 1 + (revealedSafe * 0.3) // Her güvenli hücre %30 artırır
      setCurrentMultiplier(multiplier)
      setTotalWin(Math.floor(betAmount * multiplier))
    }
  }

  const cashout = () => {
    if (gameState !== 'playing') return
    setBalance(prev => prev + totalWin)
    setGameState('won')
  }

  const reset = () => {
    setGameState('idle')
    setRevealedCells(new Set())
    setMinePositions(new Set())
    setCurrentMultiplier(1)
    setTotalWin(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-950 via-green-900 to-emerald-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-lime-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate('/games')}
                variant="ghost"
                size="icon"
                className="text-lime-300 hover:text-lime-200 hover:bg-lime-500/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Mines 💣</h1>
                <p className="text-xs text-lime-300">Mayınlardan kaçın</p>
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
        {/* Game Board */}
        <Card className="bg-gradient-to-br from-lime-500/10 to-green-500/10 border-lime-500/30 backdrop-blur">
          <div className="p-6">
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mb-4">
              {Array.from({ length: GRID_SIZE }).map((_, i) => {
                const isRevealed = revealedCells.has(i)
                const isMine = minePositions.has(i)
                const showMines = gameState === 'lost' || gameState === 'won'
                
                return (
                  <button
                    key={i}
                    onClick={() => revealCell(i)}
                    disabled={gameState !== 'playing' || isRevealed}
                    className={`aspect-square rounded-lg font-bold text-2xl transition-all transform active:scale-95 ${
                      isRevealed
                        ? isMine
                          ? 'bg-red-500 shadow-lg shadow-red-500/50'
                          : 'bg-green-500 shadow-lg shadow-green-500/50'
                        : showMines && isMine
                        ? 'bg-red-900/50 border-2 border-red-500/30'
                        : 'bg-lime-900/40 border-2 border-lime-500/30 hover:border-lime-400 hover:bg-lime-800/40'
                    }`}
                  >
                    {isRevealed ? (
                      isMine ? '💣' : '💎'
                    ) : showMines && isMine ? (
                      '💣'
                    ) : null}
                  </button>
                )
              })}
            </div>

            {gameState === 'playing' && (
              <div className="text-center space-y-2">
                <p className="text-sm text-lime-300">Çarpan</p>
                <p className="text-4xl font-bold text-white">{currentMultiplier.toFixed(2)}x</p>
                <p className="text-lg text-green-400">{totalWin} coin</p>
              </div>
            )}

            {gameState === 'won' && (
              <div className="text-center">
                <p className="text-3xl mb-2">🎉</p>
                <p className="text-2xl font-bold text-green-400">Kazandın!</p>
                <p className="text-lg text-white">+{totalWin} coin</p>
              </div>
            )}

            {gameState === 'lost' && (
              <div className="text-center">
                <p className="text-3xl mb-2">💥</p>
                <p className="text-2xl font-bold text-red-400">Mayına Bastın!</p>
              </div>
            )}
          </div>
        </Card>

        {/* Controls */}
        <Card className="bg-gradient-to-br from-lime-900/40 to-green-900/40 border-lime-500/20">
          <div className="p-6 space-y-4">
            {gameState === 'idle' && (
              <>
                <div>
                  <label className="text-sm text-lime-300 mb-2 block">Bahis Miktarı</label>
                  <Input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    min="1"
                    max={balance}
                    className="bg-lime-950/50 border-lime-500/30 text-white text-lg"
                  />
                  <div className="flex gap-2 mt-2">
                    {[10, 50, 100, 250].map(amount => (
                      <Button
                        key={amount}
                        onClick={() => setBetAmount(amount)}
                        disabled={amount > balance}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-lime-400/50 text-lime-300 hover:bg-lime-500/20"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-lime-300 mb-2 block">Mayın Sayısı</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 5, 10, 15].map(count => (
                      <Button
                        key={count}
                        onClick={() => setMineCount(count)}
                        variant={mineCount === count ? 'default' : 'outline'}
                        className={
                          mineCount === count 
                            ? 'bg-gradient-to-r from-lime-500 to-green-600' 
                            : 'border-lime-400/50 text-lime-300'
                        }
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={startGame}
                  disabled={betAmount > balance || betAmount <= 0}
                  className="w-full bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-bold py-6 text-lg shadow-lg shadow-lime-500/30"
                >
                  Oyunu Başlat
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </>
            )}

            {gameState === 'playing' && (
              <Button
                onClick={cashout}
                disabled={revealedCells.size === 0}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6 text-lg shadow-lg shadow-green-500/30"
              >
                Para Çek ({totalWin} coin)
              </Button>
            )}

            {(gameState === 'won' || gameState === 'lost') && (
              <Button
                onClick={reset}
                className="w-full bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-bold py-6 text-lg shadow-lg shadow-lime-500/30"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Yeniden Oyna
              </Button>
            )}
          </div>
        </Card>

        {/* Info */}
        <Card className="bg-gradient-to-br from-lime-900/20 to-green-900/20 border-lime-500/20">
          <div className="p-4">
            <h3 className="text-sm font-bold text-white mb-2">Nasıl Oynanır?</h3>
            <ul className="text-xs text-lime-300 space-y-1">
              <li>• Mayın olmayan hücreleri açın</li>
              <li>• Her güvenli hücre çarpanı artırır</li>
              <li>• İstediğiniz zaman para çekebilirsiniz</li>
              <li>• Mayına basarsanız tüm parayı kaybedersiniz</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MinesGame
