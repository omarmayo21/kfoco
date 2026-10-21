import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb trail — chevrons mirror automatically in RTL. */
export function Breadcrumb({ items, light }: { items: Crumb[]; light?: boolean }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const Chevron = locale === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] uppercase tracking-widest">
      <Link
        href="/"
        className={cn(
          'inline-flex items-center gap-1.5 transition-colors hover:text-gold',
          light ? 'text-white/70' : 'text-textc-muted'
        )}
      >
        <Home className="h-3.5 w-3.5" aria-hidden />
        {t('home')}
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <Chevron className={cn('h-3.5 w-3.5', light ? 'text-white/40' : 'text-textc-muted/60')} aria-hidden />
          {item.href ? (
            <Link
              href={item.href}
              className={cn('transition-colors hover:text-gold', light ? 'text-white/70' : 'text-textc-muted')}
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className={cn(light ? 'text-white' : 'text-ink')}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
