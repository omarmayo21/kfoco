'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { site } from '@/data/site';

/**
 * Floating utilities: WhatsApp button (corner, mirrored in RTL) + back-to-top.
 * Both are plain links/buttons — no gimmicks, generous tap targets.
 */
export function FloatingActions() {
  const t = useTranslations('common');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 end-5 z-[65] flex flex-col items-end gap-3">
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lift transition-transform duration-300 hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" aria-hidden />
      </a>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t('backToTop')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-card transition-colors hover:bg-ink hover:text-white"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
