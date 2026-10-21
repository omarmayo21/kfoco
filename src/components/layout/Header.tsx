'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { mainNav } from '@/data/nav';
import { assets } from '@/data/assets';
import { site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';

/**
 * Sticky header: transparent over the hero → solid/blurred after scroll.
 * Hides on scroll down, reveals on scroll up.
 */
export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  // Home hero is dark → header starts transparent with light content
  const isHome = pathname === '/';
  const overHero = isHome && !solid;

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolid(y > 40);
    // Hide on scroll down (past 120px), show on scroll up
    if (y > 120 && y > lastY.current + 4) setHidden(true);
    else if (y < lastY.current - 4 || y <= 120) setHidden(false);
    lastY.current = y;
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,backdrop-filter] duration-500',
          solid ? 'bg-white/90 shadow-header backdrop-blur-md' : 'bg-transparent',
          overHero ? 'text-white' : 'text-ink'
        )}
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
          {/* Logo — white version over dark hero via CSS filter */}
          <Link href="/" className="flex shrink-0 items-center" aria-label={site.name.en}>
            <Image
              src={assets.logo}
              alt={site.name.en}
              width={168}
              height={56}
              priority
              className={cn('h-auto w-[132px] object-contain lg:w-[152px]', overHero && 'logo-on-dark')}
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label={t('menu')} className="hidden items-center gap-7 xl:flex">
            {mainNav.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    'group relative py-1.5 text-[13px] font-medium uppercase tracking-wider transition-colors',
                    overHero ? 'text-white/85 hover:text-white' : 'text-textc hover:text-steel-shade',
                    active && (overHero ? 'text-white' : 'text-ink')
                  )}
                >
                  {t(item.key as never)}
                  <span
                    className={cn(
                      'absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out-expo group-hover:scale-x-100',
                      active && 'scale-x-100'
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher variant={overHero ? 'topbar' : 'header'} />
            <Button href="/contact" variant="primary" arrow={false} className="hidden px-5 py-2.5 sm:inline-flex">
              {t('getQuote')}
            </Button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center xl:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={menuOpen}
            >
              <Menu className={cn('h-6 w-6', overHero ? 'text-white' : 'text-ink')} aria-hidden />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
