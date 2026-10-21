import { cn } from '@/lib/utils';

/** Small uppercase letter-spaced label with a thin gold rule ("01 — ABOUT") */
export function SectionLabel({
  children,
  index,
  light,
  className
}: {
  children: React.ReactNode;
  index?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <p className={cn('label-eyebrow', light && 'label-eyebrow-light', className)}>
      {index && <span className="tabular-nums">{index} —</span>}
      {children}
    </p>
  );
}
