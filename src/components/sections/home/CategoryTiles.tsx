'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { categories, getCategory } from '@/data/categories';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Project categories — 8 tiles in a 12-col grid. HEALTHCARE (core specialty)
 * is emphasized as the large tile. Hover: image zoom + darkens, title lifts,
 * gold underline draws, arrow appears.
 */
export function CategoryTiles() {
  const t = useTranslations('categories');
  const locale = useLocale();

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <SectionLabel>{t('label')}</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading className="mt-5">{t('heading')}</SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-md text-base leading-relaxed text-textc-muted">{t('text')}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.slug}
              delay={i * 0.05}
              className={cat.emphasis ? 'sm:col-span-2 lg:row-span-2' : ''}
            >
              <Link
                href={`/${cat.slug}` as never}
                className="group relative block h-full min-h-[220px] overflow-hidden bg-ink"
                aria-label={locale === 'ar' ? cat.title.ar : cat.title.en}
              >
                <Image
                  src={cat.image}
                  alt={t('imageAlt', { name: locale === 'ar' ? cat.title.ar : cat.title.en })}
                  fill
                  sizes={
                    cat.emphasis
                      ? '(min-width: 1024px) 50vw, 100vw'
                      : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
                  }
                  className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.05]"
                />
                <div className="overlay-ink-soft absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3
                    className={`font-display font-medium text-white ${
                      cat.emphasis ? 'text-3xl lg:text-[2.6rem]' : 'text-xl lg:text-2xl'
                    }`}
                  >
                    {locale === 'ar' ? cat.title.ar : cat.title.en}
                  </h3>

                  <div className="mt-2 h-px w-0 bg-gold transition-all duration-500 ease-out-expo group-hover:w-14" aria-hidden />

                  <p
                    className={`overflow-hidden text-white/0 transition-all duration-500 group-hover:text-white/75 ${
                      cat.emphasis ? 'mt-3 max-w-sm text-sm leading-relaxed' : 'mt-2 text-xs'
                    }`}
                  >
                    {locale === 'ar' ? cat.caption.ar : cat.caption.en}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-white/0 transition-colors duration-500 group-hover:text-steel-tint">
                    {t('viewProjects')}
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
