import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';
import { getCategory } from '@/data/categories';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TodoText } from '@/components/ui/TodoText';

/**
 * Featured projects — large image cards with hover zoom + overlay,
 * meta line (location / category / year), title slide-up and arrow reveal.
 */
export function FeaturedProjects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const projects = getFeaturedProjects();

  return (
    <section className="relative bg-offwhite py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <SectionLabel>{t('label')}</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading className="mt-5">{t('heading')}</SectionHeading>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-textc-muted">{t('text')}</p>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2.5 border-b border-ink/20 pb-1.5 text-[13px] font-medium uppercase tracking-widest text-ink transition-colors hover:border-gold hover:text-steel-shade"
            >
              {t('browseAll')}
              <Arrow className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const cat = getCategory(project.category);
            return (
              <Reveal key={project.slug} delay={i * 0.08} className={i === 0 ? 'lg:col-span-1' : ''}>
                <Link
                  href={`/projects/${project.slug}` as never}
                  className="group block h-full overflow-hidden bg-white shadow-card transition-shadow duration-500 hover:shadow-lift"
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

                  <div className="p-7">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-wider text-textc-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-steel" aria-hidden />
                        <TodoText value={locale === 'ar' ? project.location.ar : project.location.en} />
                      </span>
                      <span className="h-1 w-1 rounded-full bg-warmgrey" aria-hidden />
                      <TodoText value={locale === 'ar' ? project.year.ar : project.year.en} />
                    </p>

                    <h3 className="mt-3 font-display text-2xl font-medium leading-snug text-ink transition-colors group-hover:text-steel-shade">
                      {locale === 'ar' ? project.title.ar : project.title.en}
                    </h3>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-ink">
                        {t('readMore')}
                        <Arrow className="h-4 w-4 text-steel transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" aria-hidden />
                      </span>
                      <span className="h-px w-10 bg-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
