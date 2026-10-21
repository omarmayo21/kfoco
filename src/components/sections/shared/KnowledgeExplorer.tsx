'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import type { Article } from '@/data/articles';
import { ArticleCard } from './ArticleCard';
import { cn } from '@/lib/utils';

/**
 * Knowledge Center — category chips + client-side search (mock, no backend).
 */
export function KnowledgeExplorer({ articles }: { articles: Article[] }) {
  const t = useTranslations('pages.knowledge');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    const map = new Map<string, { en: string; ar: string }>();
    articles.forEach((a) => map.set(a.category.en, a.category));
    return Array.from(map.entries());
  }, [articles]);

  const filtered = articles.filter((a) => {
    const inCategory = category === 'all' || a.category.en === category;
    const q = query.trim().toLowerCase();
    const inQuery =
      !q ||
      a.title.en.toLowerCase().includes(q) ||
      a.title.ar.includes(query) ||
      a.excerpt.en.toLowerCase().includes(q) ||
      a.excerpt.ar.includes(query);
    return inCategory && inQuery;
  });

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-x">
        {/* Search */}
        <div className="relative max-w-xl">
          <label htmlFor="kc-search" className="sr-only">
            {t('searchLabel')}
          </label>
          <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-textc-muted" aria-hidden />
          <input
            id="kc-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search')}
            className="w-full rounded-full border border-ink/12 bg-offwhite py-3.5 pe-5 ps-11 text-sm text-textc outline-none transition-colors placeholder:text-textc-muted/60 focus:border-steel"
          />
        </div>

        {/* Category chips */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setCategory('all')}
            aria-pressed={category === 'all'}
            className={cn(
              'rounded-full border px-5 py-2 text-[12px] font-medium uppercase tracking-wider transition-colors',
              category === 'all'
                ? 'border-ink bg-ink text-white'
                : 'border-ink/12 text-textc-muted hover:border-steel hover:text-ink'
            )}
          >
            {t('allCategories')}
          </button>
          {categories.map(([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              aria-pressed={category === key}
              className={cn(
                'rounded-full border px-5 py-2 text-[12px] font-medium uppercase tracking-wider transition-colors',
                category === key
                  ? 'border-ink bg-ink text-white'
                  : 'border-ink/12 text-textc-muted hover:border-steel hover:text-ink'
              )}
            >
              {locale === 'ar' ? value.ar : value.en}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <ArticleCard key={article.slug} item={article} kind="article" />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-textc-muted">{t('noResults')}</p>
        )}
      </div>
    </section>
  );
}
