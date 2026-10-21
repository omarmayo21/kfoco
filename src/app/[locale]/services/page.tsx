import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { assets } from '@/data/assets';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ServicesSection } from '@/components/sections/home/ServicesSection';
import { ProcessSteps } from '@/components/sections/shared/ProcessSteps';
import { CtaBanner } from '@/components/sections/home/CtaBanner';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.services' });
  return buildMetadata({ locale, title: t('title'), description: t('description'), path: '/services' });
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.services' });
  const ts = await getTranslations({ locale, namespace: 'services' });

  return (
    <>
      <PageHeader
        image={assets.pageHeaders.services}
        label={t('label')}
        title={t('heading')}
        text={t('text')}
        crumbs={[{ label: t('label') }]}
      />

      {/* Reuse the services grid (dark section) */}
      <ServicesSection />
      <ProcessSteps />

      {/* Closing CTA */}
      <section className="bg-offwhite py-24 text-center">
        <div className="container-x">
          <Reveal>
            <SectionHeading className="mx-auto max-w-2xl">{ts('ctaHeading')}</SectionHeading>
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
            <Button href="/contact" variant="primary">
              {ts('exploreAll')}
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
