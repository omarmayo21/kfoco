import { cn, isTodo } from '@/lib/utils';

/**
 * Renders a data string. TODO placeholders get a dashed gold underline so the
 * client can see exactly what must be replaced — never silently invented facts.
 */
export function TodoText({ value, className }: { value: string; className?: string }) {
  if (isTodo(value)) {
    return (
      <span className={cn('todo-mark', className)} title="TODO: replace with verified content">
        {value}
      </span>
    );
  }
  return <span className={className}>{value}</span>;
}
