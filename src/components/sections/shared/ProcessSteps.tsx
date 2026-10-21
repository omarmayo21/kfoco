import { useLocale, useTranslations } from 'next-intl';
import { processSteps } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Services page process: Planning → Design → Supervision → Handover */
export function ProcessSteps() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <section className="relative bg-white py-24 lg:py-28">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <SectionLabel className="justify-center">{t('processLabel')}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading className="mx-auto mt-6 max-w-3xl">{t('processHeading')}</SectionHeading>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.id} delay={i * 0.08}>
              <div className="relative">
                {/* Connecting rule between steps (desktop) */}
                {i < processSteps.length - 1 && (
                  <span
                    className="absolute top-6 hidden h-px w-full bg-ink/10 lg:block"
                    style={{ insetInlineStart: 'calc(50% + 2.5rem)', width: 'calc(100% - 5rem)' }}
                    aria-hidden
                  />
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-steel/40 bg-white font-display text-lg text-steel-shade">
                  {step.number}
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-ink">
                  {locale === 'ar' ? step.title.ar : step.title.en}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-textc-muted">
                  {locale === 'ar' ? step.description.ar : step.description.en}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
