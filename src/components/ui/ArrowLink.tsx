import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

/** Editorial text link with an underline draw + arrow nudge */
export function ArrowLink({
  href,
  children,
  light,
  className
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  const locale = useLocale();
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-widest',
        light ? 'text-white hover:text-steel-tint' : 'text-ink hover:text-steel-shade',
        className
      )}
    >
      <span className="relative">
        {children}
        <span
          className={cn(
            'absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 transition-transform duration-300 ease-out-expo group-hover:scale-x-100',
            light ? 'bg-gold' : 'bg-gold',
            'rtl:origin-right'
          )}
          aria-hidden
        />
      </span>
      <Arrow className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden />
    </Link>
  );
}
