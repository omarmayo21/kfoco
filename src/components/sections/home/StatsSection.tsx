import { useLocale, useTranslations } from 'next-intl';
import { stats } from '@/data/stats';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CountUp } from '@/components/ui/CountUp';
import { QualificationsGallery } from './QualificationsGallery';

/**
 * Stats — "Our Achievements & Story in numbers" with count-up on enter,
 * followed by the qualifications ("Updated Profile") gallery strip.
 */
export function StatsSection() {
  const t = useTranslations('stats');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="bg-blueprint absolute inset-0" aria-hidden />

      <div className="container-x relative">
        <div className="text-center">
          <Reveal>
            <SectionLabel className="justify-center">{t('label')}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading className="mx-auto mt-6 max-w-3xl">{t('title')}</SectionHeading>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.08}>
              <div className="relative text-center">
                {/* Thin rule above each figure */}
                <div className="mx-auto h-px w-12 bg-gold" aria-hidden />
                <dt className="sr-only">{locale === 'ar' ? stat.label.ar : stat.label.en}</dt>
                <dd>
                  <p className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-none text-ink">
                    {stat.isOrdinal ? (
                      <span dir="ltr">
                        <CountUp value={stat.value} />
                        <span className="text-steel">{locale === 'ar' ? stat.suffix.ar : stat.suffix.en}</span>
                      </span>
                    ) : (
                      <span dir="ltr">
                        <CountUp value={stat.value} />
                        <span className="text-steel">{stat.suffix.en}</span>
                      </span>
                    )}
                  </p>
                  <p className="mt-4 text-[12px] uppercase tracking-label text-textc-muted">
                    {locale === 'ar' ? stat.label.ar : stat.label.en}
                  </p>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <div className="mt-24">
          <QualificationsGallery />
        </div>
      </div>
    </section>
  );
}
