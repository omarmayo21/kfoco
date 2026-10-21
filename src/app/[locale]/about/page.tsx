import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { assets } from '@/data/assets';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Timeline } from '@/components/sections/shared/Timeline';
import { StatsSection } from '@/components/sections/home/StatsSection';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return buildMetadata({ locale, title: t('title'), description: t('description'), path: '/about' });
}

const values = ['teamwork', 'client', 'knowledge'] as const;

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.about' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      <PageHeader
        image={assets.pageHeaders.about}
        label={t('storyLabel')}
        title={t('storyHeading')}
        crumbs={[{ label: t('storyLabel') }]}
      />

      {/* Story */}
      <section className="relative bg-white py-24">
        <div className="bg-blueprint absolute inset-0" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading>{t('storyHeading')}</SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-base leading-[1.85] text-textc-muted">{t('story1')}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-base leading-[1.85] text-textc-muted">{t('story2')}</p>
            </Reveal>
          </div>

          {/* Vision & mission */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <SectionLabel>{t('visionLabel')}</SectionLabel>
            </Reveal>
            {(
              [
                ['visionTitle', 'visionText'],
                ['missionTitle', 'missionText']
              ] as const
            ).map(([titleKey, textKey], i) => (
              <Reveal key={titleKey} delay={0.1 + i * 0.08}>
                <div className="border border-ink/10 bg-white p-7">
                  <h3 className="font-display text-xl font-medium text-ink">{t(titleKey)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-textc-muted">{t(textKey)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-offwhite py-24">
        <div className="container-x">
          <Reveal>
            <SectionLabel>{t('valuesLabel')}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading className="mt-5">{t('valuesHeading')}</SectionHeading>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v} delay={i * 0.08}>
                <div className="group h-full border border-ink/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-steel/40 hover:shadow-lift">
                  <div className="h-px w-10 bg-gold" aria-hidden />
                  <h3 className="mt-6 font-display text-xl font-medium text-ink">
                    {t(`values.${v}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-textc-muted">
                    {t(`values.${v}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Timeline />

      {/* Stats + profile download */}
      <section className="bg-white py-24">
        <div className="container-x text-center">
          <Reveal>
            <SectionLabel className="justify-center">{t('statsLabel')}</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-textc-muted">
              {t('profileCta')}
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-8">
            <Button href={assets.companyProfilePdf} external download variant="primary">
              {tc('download')}
            </Button>
          </Reveal>
        </div>
      </section>

      <StatsSection />
    </>
  );
}
