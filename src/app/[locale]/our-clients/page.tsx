import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { assets } from '@/data/assets';
import { clients } from '@/data/clients';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/sections/home/CtaBanner';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.clients' });
  return buildMetadata({ locale, title: t('title'), description: t('description'), path: '/our-clients' });
}

export default async function OurClientsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.clients' });

  return (
    <>
      <PageHeader
        image={assets.pageHeaders.clients}
        label={t('label')}
        title={t('heading')}
        text={t('text')}
        crumbs={[{ label: t('heading') }]}
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <Reveal>
            <SectionLabel>{t('label')}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading className="mt-5">{t('heading')}</SectionHeading>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {clients.map((client, i) => (
              <Reveal key={client.id} delay={(i % 10) * 0.04}>
                <div className="flex h-28 items-center justify-center rounded-[3px] border border-ink/8 bg-white p-5 transition-all duration-500 hover:border-steel/40 hover:shadow-card">
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={160}
                    height={64}
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
                    className="logo-blend max-h-16 w-auto max-w-full object-contain opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
