'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Project } from '@/data/projects';
import type { Category } from '@/data/categories';
import { TodoText } from '@/components/ui/TodoText';
import { cn } from '@/lib/utils';

/**
 * Filterable projects grid — animated filtering (fade/slide), category chips.
 * Used on the Projects index and category pages.
 */
export function ProjectsGrid({
  projects,
  categories,
  activeCategory
}: {
  projects: Project[];
  categories: Category[];
  activeCategory?: string;
}) {
  const t = useTranslations('projects');
  const locale = useLocale();
  const reduce = useReducedMotion();
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const [filter, setFilter] = useState<string>(activeCategory ?? 'all');

  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-x">
        {/* Filter bar */}
        <div role="group" aria-label={t('filterLabel')} className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
            className={cn(
              'rounded-full border px-5 py-2 text-[12px] font-medium uppercase tracking-wider transition-colors',
              filter === 'all'
                ? 'border-ink bg-ink text-white'
                : 'border-ink/12 text-textc-muted hover:border-steel hover:text-ink'
            )}
          >
            {t('filterAll')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setFilter(cat.slug)}
              aria-pressed={filter === cat.slug}
              className={cn(
                'rounded-full border px-5 py-2 text-[12px] font-medium uppercase tracking-wider transition-colors',
                filter === cat.slug
                  ? 'border-ink bg-ink text-white'
                  : 'border-ink/12 text-textc-muted hover:border-steel hover:text-ink'
              )}
            >
              {locale === 'ar' ? cat.title.ar : cat.title.en}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => {
              const cat = categories.find((c) => c.slug === project.category);
              return (
                <motion.div
                  key={project.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/projects/${project.slug}` as never}
                    className="group block h-full overflow-hidden border border-ink/8 bg-white transition-shadow duration-500 hover:shadow-lift"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.images[0]}
                        alt={project.title.en}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35" aria-hidden />
                      <span className="absolute top-4 start-4 bg-white/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-label text-ink">
                        {locale === 'ar' ? cat?.title.ar : cat?.title.en}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-textc-muted">
                        <MapPin className="h-3 w-3 text-steel" aria-hidden />
                        <TodoText value={locale === 'ar' ? project.location.ar : project.location.en} />
                      </p>
                      <h3 className="mt-2.5 font-display text-xl font-medium text-ink transition-colors group-hover:text-steel-shade">
                        {locale === 'ar' ? project.title.ar : project.title.en}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-textc-muted">
                        {locale === 'ar' ? project.excerpt.ar : project.excerpt.en}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-ink">
                        {t('readMore')}
                        <Arrow className="h-4 w-4 text-steel transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-textc-muted">{t('noProjects')}</p>
        )}
      </div>
    </section>
  );
}
