import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Download, Calendar, Clock } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { assets } from '@/data/assets';
import { articles, getArticle } from '@/data/articles';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { TodoText } from '@/components/ui/TodoText';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const article = getArticle(slug);
  if (!article) return {};
  const t = await getTranslations({ locale, namespace: 'meta.knowledge' });
  return buildMetadata({
    locale,
    title: locale === 'ar' ? article.title.ar : article.title.en,
    description: locale === 'ar' ? article.excerpt.ar : article.excerpt.en,
    path: `/knowledge-center/${slug}`
  });
}

export default async function ArticlePage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}) {
  const article = getArticle(slug);
  if (!article) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.knowledge' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const isDownload = article.type === 'download';

  return (
    <>
      <PageHeader
        image={assets.pageHeaders.knowledge}
        label={locale === 'ar' ? article.category.ar : article.category.en}
        title={locale === 'ar' ? article.title.ar : article.title.en}
        crumbs={[{ label: t('heading'), href: '/knowledge-center' }, { label: locale === 'ar' ? article.title.ar : article.title.en }]}
      />

      <article className="bg-white py-20">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] uppercase tracking-wider text-textc-muted">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-steel" aria-hidden />
                <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-steel" aria-hidden />
                {locale === 'ar' ? article.readTime.ar : article.readTime.en}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-[1.85] text-textc">
              <TodoText value={locale === 'ar' ? article.excerpt.ar : article.excerpt.en} />
            </p>
          </Reveal>

          {/* TODO: render the full article body once real content is supplied */}
          <Reveal delay={0.16}>
            <div className="mt-8 space-y-5 border-t border-ink/10 pt-8 text-base leading-[1.85] text-textc-muted">
              <p>
                <TodoText value={tc('placeholder')} /> — full article body goes here.
              </p>
            </div>
          </Reveal>

          {isDownload && (
            <Reveal delay={0.22} className="mt-10">
              <Button href={assets.companyProfilePdf} external download icon={Download}>
                {t('downloadNow')}
              </Button>
            </Reveal>
          )}

          <Reveal delay={0.28} className="mt-12">
            <Link
              href="/knowledge-center"
              className="group inline-flex items-center gap-2.5 border-b border-ink/20 pb-1.5 text-[12px] font-medium uppercase tracking-widest text-ink transition-colors hover:border-gold"
            >
              <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" aria-hidden />
              {t('heading')}
            </Link>
          </Reveal>
        </div>
      </article>
    </>
  );
}
