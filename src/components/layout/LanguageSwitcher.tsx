'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

/**
 * EN ⇄ AR switcher. Keeps the current path when switching locales and
 * points to the hreflang alternate.
 */
export function LanguageSwitcher({
  variant = 'header'
}: {
  variant?: 'header' | 'topbar' | 'menu';
}) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const target = locale === 'en' ? 'ar' : 'en';

  const switchLocale = () => {
    router.replace(pathname, { locale: target });
  };

  return (
    <button
      type="button"
      onClick={switchLocale}
      lang={target}
      dir={target === 'ar' ? 'rtl' : 'ltr'}
      aria-label={`Switch language to ${target === 'ar' ? 'Arabic' : 'English'}`}
      className={cn(
        'inline-flex items-center gap-2 font-medium transition-colors',
        variant === 'topbar' && 'text-[12.5px] text-white/80 hover:text-steel-tint',
        variant === 'menu' && 'text-lg text-white/90 hover:text-gold',
        variant === 'header' && 'text-[13px] text-ink hover:text-steel-shade'
      )}
    >
      {t('language')}
    </button>
  );
}
