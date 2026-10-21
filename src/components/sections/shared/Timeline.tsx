import { useLocale, useTranslations } from 'next-intl';
import { timeline } from '@/data/timeline';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TodoText } from '@/components/ui/TodoText';

/** About page — 29-year journey timeline (placeholder milestones marked TODO). */
export function Timeline() {
  const t = useTranslations('pages.about');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-28">
      <div className="bg-blueprint-light absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel light>{t('timelineLabel')}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading light className="mt-6">
              {t('timelineHeading')}
            </SectionHeading>
          </Reveal>
        </div>

        <ol className="mt-14 space-y-0">
          {timeline.map((item, i) => (
            <Reveal as="li" key={item.year} delay={i * 0.08}>
              <div className="relative grid gap-4 border-t border-white/12 py-9 sm:grid-cols-12 sm:gap-8">
                <div className="sm:col-span-3">
                  <p className="font-display text-3xl text-steel">{item.year}</p>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="font-display text-xl font-medium text-white">
                    {locale === 'ar' ? item.title.ar : item.title.en}
                  </h3>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-white/65">
                    <TodoText value={locale === 'ar' ? item.text.ar : item.text.en} />
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
