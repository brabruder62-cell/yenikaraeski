import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoinAnimationProps {
  show: boolean;
  amount: number;
  className?: string;
}

export default function CoinAnimation({ show, amount, className }: CoinAnimationProps) {
  if (!show) return null;

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center pointer-events-none z-50',
        className
      )}
    >
      <div className="animate-coin-bounce">
        <div className="relative">
          <Coins className="h-16 w-16 text-primary drop-shadow-lg animate-spin-slow" />
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full animate-scale-in">
            +{amount}
          </div>
        </div>
      </div>
    </div>
  );
}
