import { useLocale, useTranslations } from 'next-intl';
import {
  Compass,
  Users,
  Hammer,
  PenTool,
  type LucideIcon
} from 'lucide-react';
import { services } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowLink } from '@/components/ui/ArrowLink';

const icons: Record<string, LucideIcon> = {
  planning: Compass,
  'expert-engineers': Users,
  renovation: Hammer,
  'designing-supervision': PenTool
};

/**
 * Services — 4 thin-bordered cards with line icons + numbers 01–04.
 * Hover: lift + gold accent line draws.
 */
export function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="bg-blueprint-light absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel light>{t('label')}</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading light className="mt-6">
                {t('heading')}
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-lg text-base leading-[1.85] text-white/70">{t('text')}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-9">
              <ArrowLink href="/services" light>
                {t('exploreAll')}
              </ArrowLink>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {services.map((service, i) => {
              const Icon = icons[service.id];
              return (
                <Reveal key={service.id} delay={i * 0.07}>
                  <article className="group relative h-full border border-white/12 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-steel/40 hover:bg-white/[0.06]">
                    <div className="flex items-start justify-between">
                      <Icon className="h-8 w-8 text-steel" strokeWidth={1.2} aria-hidden />
                      <span className="font-display text-2xl text-white/25">{service.number}</span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-medium text-white">
                      {locale === 'ar' ? service.title.ar : service.title.en}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {locale === 'ar' ? service.description.ar : service.description.en}
                    </p>
                    {/* Accent line on hover */}
                    <div className="absolute inset-x-0 bottom-0 h-px w-0 bg-gold transition-all duration-500 ease-out-expo group-hover:w-full" aria-hidden />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
