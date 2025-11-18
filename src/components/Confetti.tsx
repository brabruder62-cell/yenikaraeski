import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

export default function Confetti({ show, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ['#10b981', '#14b8a6', '#22c55e', '#84cc16'][Math.floor(Math.random() * 4)],
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-0 w-2 h-2 rounded-full animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
