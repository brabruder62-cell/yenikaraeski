import { Home, Trophy, Zap, ShoppingBag, User } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Ana Sayfa' },
    { path: '/games', icon: Trophy, label: 'Oyunlar' },
    { path: '/tasks', icon: Zap, label: 'Görevler' },
    { path: '/store', icon: ShoppingBag, label: 'Mağaza' },
    { path: '/profile', icon: User, label: 'Profil' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-t border-emerald-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all",
                  isActive 
                    ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30" 
                    : "hover:bg-emerald-500/10"
                )}
              >
                <Icon 
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isActive ? "text-emerald-400" : "text-gray-400"
                  )} 
                />
                <span 
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-emerald-300" : "text-gray-500"
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BottomNav
