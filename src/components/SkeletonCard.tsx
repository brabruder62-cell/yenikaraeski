import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-4 animate-pulse',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-5/6" />
      </div>
    </div>
  );
}
