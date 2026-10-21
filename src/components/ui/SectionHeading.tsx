import { cn } from '@/lib/utils';

/** Editorial section heading — large serif display type */
export function SectionHeading({
  children,
  as: Tag = 'h2',
  size = 'lg',
  light,
  className
}: {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'xl' | 'lg' | 'md';
  light?: boolean;
  className?: string;
}) {
  const sizes = {
    xl: 'text-[2.25rem] leading-[1.12] sm:text-5xl lg:text-[3.75rem]',
    lg: 'text-[1.875rem] leading-[1.18] sm:text-4xl lg:text-[2.75rem]',
    md: 'text-2xl leading-snug sm:text-[1.75rem]'
  };
  return (
    <Tag className={cn('font-display font-medium tracking-tight', sizes[size], light && 'text-white', className)}>
      {children}
    </Tag>
  );
}
