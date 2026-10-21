import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { assets } from '@/data/assets';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowLink } from '@/components/ui/ArrowLink';

/**
 * About intro — editorial two-column: text + large offset-framed image
 * with a floating "29+ Years" card.
 */
export function AboutIntro() {
  const t = useTranslations('about');

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="bg-blueprint absolute inset-0" aria-hidden />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Text */}
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel>{t('label')}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading className="mt-6">{t('heading')}</SectionHeading>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 text-base leading-[1.85] text-textc-muted">{t('body')}</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-9">
            <ArrowLink href="/about">{t('continueReading')}</ArrowLink>
          </Reveal>
        </div>

        {/* Image with offset outline frame */}
        <Reveal variant="scale" className="relative lg:col-span-7">
          <div className="relative">
            {/* Offset architectural outline */}
            <div
              className="absolute -bottom-4 end-4 top-8 w-[calc(100%-2rem)] border border-steel/40 sm:-bottom-6 sm:end-6"
              aria-hidden
            />
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
              <Image
                src={assets.about.main}
                alt={t('imageAlt')}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Floating years card */}
            <div className="absolute -bottom-8 start-4 bg-ink px-7 py-6 shadow-lift sm:start-8">
              <p className="font-display text-4xl font-medium text-white">{t('yearsCard')}</p>
              <p className="mt-1 text-[11px] uppercase tracking-label text-steel-tint">
                {t('yearsCardSub')}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
