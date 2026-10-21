'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  Contrast,
  Droplets,
  Underline,
  Type,
  RotateCcw,
  X
} from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Lightweight accessibility panel (the old site had one — kept simple):
 * text size, high contrast, grayscale, underline links, readable font, reset.
 * Preferences persist in localStorage on the <html> element.
 */
type A11yKey = 'a11y-text-lg' | 'a11y-text-sm' | 'a11y-contrast' | 'a11y-gray' | 'a11y-underline' | 'a11y-readable';

const STORAGE_KEY = 'kfo-a11y';

export function AccessibilityWidget() {
  const t = useTranslations('a11y');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Set<A11yKey>>(new Set());

  // Load saved preferences
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as A11yKey[];
      const set = new Set(saved);
      setActive(set);
      apply(set);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = (set: Set<A11yKey>) => {
    const classes: A11yKey[] = [
      'a11y-text-lg',
      'a11y-text-sm',
      'a11y-contrast',
      'a11y-gray',
      'a11y-underline',
      'a11y-readable'
    ];
    for (const c of classes) document.documentElement.classList.toggle(c, set.has(c));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  };

  const toggle = (key: A11yKey, mutuallyExclusive?: A11yKey) => {
    const next = new Set(active);
    if (next.has(key)) next.delete(key);
    else {
      next.add(key);
      if (mutuallyExclusive) next.delete(mutuallyExclusive);
    }
    setActive(next);
    apply(next);
  };

  const reset = () => {
    const empty = new Set<A11yKey>();
    setActive(empty);
    apply(empty);
  };

  const items = [
    { key: 'a11y-text-lg' as const, icon: ZoomIn, label: t('increaseText') },
    { key: 'a11y-text-sm' as const, icon: ZoomOut, label: t('decreaseText') },
    { key: 'a11y-contrast' as const, icon: Contrast, label: t('highContrast') },
    { key: 'a11y-gray' as const, icon: Droplets, label: t('grayscale') },
    { key: 'a11y-underline' as const, icon: Underline, label: t('underlineLinks') },
    { key: 'a11y-readable' as const, icon: Type, label: t('readableFont') }
  ];

  return (
    <div className="fixed bottom-5 start-5 z-[66]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="mb-3 w-64 rounded-[4px] border border-ink/10 bg-white p-4 shadow-lift"
            role="dialog"
            aria-label={t('title')}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">{t('title')}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('reset')}
                className="text-textc-muted hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {items.map(({ key, icon: Icon, label }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => toggle(key, key === 'a11y-text-lg' ? 'a11y-text-sm' : key === 'a11y-text-sm' ? 'a11y-text-lg' : undefined)}
                    aria-pressed={active.has(key)}
                    className={`flex w-full flex-col items-center gap-1.5 rounded-[3px] border px-2 py-2.5 text-[10px] leading-tight transition-colors ${
                      active.has(key)
                        ? 'border-steel bg-steel/10 text-ink'
                        : 'border-ink/10 text-textc-muted hover:border-steel/50 hover:text-ink'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={reset}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-[3px] border border-ink/10 py-2 text-[11px] text-textc-muted transition-colors hover:border-ink/30 hover:text-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              {t('reset')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('open')}
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-card transition-colors hover:bg-ink hover:text-white"
      >
        <Accessibility className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
