import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { assets } from '@/data/assets';
import { events } from '@/data/events';
import { PageHeader } from '@/components/ui/PageHeader';
import { ArticleCard } from '@/components/sections/shared/ArticleCard';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.events' });
  return buildMetadata({ locale, title: t('title'), description: t('description'), path: '/events' });
}

export default async function EventsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.events' });

  return (
    <>
      <PageHeader
        image={assets.pageHeaders.events}
        label={t('label')}
        title={t('heading')}
        text={t('text')}
        crumbs={[{ label: t('heading') }]}
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <ArticleCard key={event.slug} item={event} kind="event" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
