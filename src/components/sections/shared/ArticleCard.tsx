import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ArrowLeft, Download, Calendar } from 'lucide-react';
import type { Article } from '@/data/articles';
import type { EventPost } from '@/data/events';
import { formatDate, cn } from '@/lib/utils';

/**
 * Shared card for Knowledge Center articles/downloads and Events posts.
 */
export function ArticleCard({
  item,
  kind
}: {
  item: Article | EventPost;
  kind: 'article' | 'event';
}) {
  const t = useTranslations(kind === 'article' ? 'pages.knowledge' : 'pages.events');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const href = (kind === 'article' ? '/knowledge-center/' : '/events/') + item.slug;

  const isDownload = kind === 'article' && (item as Article).type === 'download';
  const category = kind === 'article' ? (item as Article).category : null;

  return (
    <article className="group relative flex h-full flex-col border border-ink/8 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-steel/40 hover:shadow-lift">
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-textc-muted">
        <Calendar className="h-3.5 w-3.5 text-steel" aria-hidden />
        <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
        {category && (
          <>
            <span className="h-1 w-1 rounded-full bg-warmgrey" aria-hidden />
            <span className="text-steel-shade">{locale === 'ar' ? category.ar : category.en}</span>
          </>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-medium leading-snug text-ink transition-colors group-hover:text-steel-shade">
        <Link href={href as never} className="after:absolute after:inset-0">
          {locale === 'ar' ? item.title.ar : item.title.en}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-textc-muted">
        {locale === 'ar' ? item.excerpt.ar : item.excerpt.en}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-ink',
            isDownload && 'text-steel-shade'
          )}
        >
          {isDownload ? (
            <>
              <Download className="h-4 w-4" aria-hidden />
              {t('downloadNow')}
            </>
          ) : (
            <>
              {t('readMore')}
              <Arrow className="h-4 w-4 text-steel transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" aria-hidden />
            </>
          )}
        </span>
        <span className="h-px w-10 bg-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
      </div>
    </article>
  );
}
