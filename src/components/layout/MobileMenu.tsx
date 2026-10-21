'use client';

import { motion } from 'framer-motion';
import { X, Phone, Mail, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { mainNav } from '@/data/nav';
import { site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialIcons } from './SocialIcons';
import { cn } from '@/lib/utils';

/** Full-screen mobile overlay menu with staggered link reveal. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('nav');
  const tc = useTranslations('topbar');
  const pathname = usePathname();

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col bg-ink text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={t('menu')}
    >
      <div className="bg-blueprint-light absolute inset-0" aria-hidden />

      <div className="relative flex h-[72px] items-center justify-between px-5 sm:px-8">
        <span className="text-[12px] uppercase tracking-label text-steel-tint">{t('menu')}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('closeMenu')}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <nav className="relative flex-1 overflow-y-auto px-5 pb-10 pt-4 sm:px-8" aria-label={t('menu')}>
        <ul className="space-y-1">
          {mainNav.map((item, i) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-2xl transition-colors sm:text-3xl',
                    active ? 'text-gold' : 'text-white hover:text-steel-tint'
                  )}
                >
                  <span className="text-[11px] tabular-nums tracking-widest text-white/35">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{t(item.key as never)}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-10 space-y-6"
        >
          <Button href="/contact" variant="primary" className="w-full">
            {t('getQuote')}
          </Button>

          <div className="space-y-3 text-sm text-white/75">
            <a href={site.phoneHref} className="flex items-center gap-3 hover:text-steel-tint">
              <Phone className="h-4 w-4" aria-hidden />
              <span dir="ltr">{tc('phone')}</span>
            </a>
            <a href={site.emailHref} className="flex items-center gap-3 hover:text-steel-tint">
              <Mail className="h-4 w-4" aria-hidden />
              <span dir="ltr">{tc('email')}</span>
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-steel-tint"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              <span dir="ltr">{tc('whatsapp')}</span>
            </a>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <LanguageSwitcher variant="menu" />
            <SocialIcons className="text-white/70" hoverClassName="hover:text-steel-tint" />
          </div>
        </motion.div>
      </nav>
    </motion.div>
  );
}
