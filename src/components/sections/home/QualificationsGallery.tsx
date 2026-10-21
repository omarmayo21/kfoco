'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { qualifications } from '@/data/qualifications';
import { Reveal } from '@/components/ui/Reveal';
import { Lightbox } from '@/components/ui/Lightbox';

/**
 * Qualifications gallery ("Updated Profile" on the old site) — 8 items,
 * lightbox on click. TODO: replace placeholders with real certificates.
 */
export function QualificationsGallery() {
  const t = useTranslations('stats');
  const locale = useLocale();
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-14">
          <div>
            <h3 className="font-display text-2xl font-medium text-ink sm:text-3xl">
              {t('qualificationsHeading')}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-textc-muted">
              {t('qualificationsText')}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {qualifications.map((q, i) => (
          <Reveal key={q.id} delay={i * 0.04}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative aspect-[3/4] w-full overflow-hidden border border-ink/8 bg-warmgrey"
              aria-label={t('openLightbox', { n: i + 1 })}
            >
              <Image
                src={q.image}
                alt={t('qualificationsAlt', { n: i + 1 })}
                fill
                sizes="(min-width: 1024px) 12vw, (min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" aria-hidden />
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        images={qualifications.map((q) => q.image)}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
        alt={(i) => (locale === 'ar' ? qualifications[i].title.ar : qualifications[i].title.en)}
      />
    </div>
  );
}
