import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { assets } from '@/data/assets';
import { articles } from '@/data/articles';
import { PageHeader } from '@/components/ui/PageHeader';
import { KnowledgeExplorer } from '@/components/sections/shared/KnowledgeExplorer';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.knowledge' });
  return buildMetadata({ locale, title: t('title'), description: t('description'), path: '/knowledge-center' });
}

export default async function KnowledgePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.knowledge' });

  return (
    <>
      <PageHeader
        image={assets.pageHeaders.knowledge}
        label={t('label')}
        title={t('heading')}
        text={t('text')}
        crumbs={[{ label: t('heading') }]}
      />
      <KnowledgeExplorer articles={articles} />
    </>
  );
}
