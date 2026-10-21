import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ArrowLeft, MapPin, Building2, Calendar, Ruler, User, ClipboardCheck, CircleDot } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { projects, getProject, getAdjacentProjects } from '@/data/projects';
import { getCategory } from '@/data/categories';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TodoText } from '@/components/ui/TodoText';
import { ProjectGallery } from '@/components/sections/shared/ProjectGallery';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const project = getProject(slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: 'meta.project' });
  const title = locale === 'ar' ? project.title.ar : project.title.en;
  const description = locale === 'ar' ? project.excerpt.ar : project.excerpt.en;
  return buildMetadata({
    locale,
    title: `${t('title')} — ${title}`,
    description,
    path: `/projects/${slug}`,
    image: project.images[0]
  });
}

export default async function ProjectPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: 'projects' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const cat = getCategory(project.category);
  const { prev, next } = getAdjacentProjects(slug);
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const meta = [
    { icon: User, label: t('meta.client'), value: locale === 'ar' ? project.client.ar : project.client.en },
    { icon: MapPin, label: t('meta.location'), value: locale === 'ar' ? project.location.ar : project.location.en },
    { icon: Ruler, label: t('meta.area'), value: locale === 'ar' ? project.area.ar : project.area.en },
    { icon: Calendar, label: t('meta.year'), value: locale === 'ar' ? project.year.ar : project.year.en },
    { icon: Building2, label: t('meta.category'), value: locale === 'ar' ? (cat?.title.ar ?? '') : (cat?.title.en ?? '') },
    { icon: ClipboardCheck, label: t('meta.services'), value: locale === 'ar' ? project.services.ar : project.services.en },
    { icon: CircleDot, label: t('meta.status'), value: locale === 'ar' ? project.status.ar : project.status.en }
  ];

  return (
    <>
      <PageHeader
        image={project.images[0]}
        label={locale === 'ar' ? cat?.title.ar ?? '' : cat?.title.en ?? ''}
        title={locale === 'ar' ? project.title.ar : project.title.en}
        crumbs={[{ label: t('heading'), href: '/projects' }, { label: locale === 'ar' ? project.title.ar : project.title.en }]}
      />

      <section className="bg-white py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Body + gallery */}
          <div className="lg:col-span-8">
            <Reveal>
              <SectionHeading size="md">{locale === 'ar' ? project.title.ar : project.title.en}</SectionHeading>
            </Reveal>
            <Reveal delay={0.08}>
              {project.body[locale === 'ar' ? 'ar' : 'en'].map((para, i) => (
                <p key={i} className="mt-5 text-base leading-[1.85] text-textc-muted">
                  <TodoText value={para} />
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.12} className="mt-12">
              <SectionLabel>{t('gallery')}</SectionLabel>
              <ProjectGallery images={project.images} projectTitle={locale === 'ar' ? project.title.ar : project.title.en} />
            </Reveal>
          </div>

          {/* Meta sidebar */}
          <aside className="lg:col-span-4">
            <Reveal>
              <div className="border border-ink/10 bg-offwhite p-7">
                <h2 className="text-[12px] font-medium uppercase tracking-label text-steel-shade">
                  {locale === 'ar' ? 'بيانات المشروع' : 'Project Details'}
                </h2>
                <dl className="mt-6 space-y-5">
                  {meta.map((m) => (
                    <div key={m.label} className="flex items-start gap-3.5 border-b border-ink/8 pb-4 last:border-0 last:pb-0">
                      <m.icon className="mt-0.5 h-4 w-4 shrink-0 text-steel" aria-hidden />
                      <div>
                        <dt className="text-[11px] uppercase tracking-wider text-textc-muted">{m.label}</dt>
                        <dd className="mt-1 text-sm text-ink">
                          <TodoText value={m.value} />
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                href="/projects"
                className="group mt-6 inline-flex items-center gap-2.5 border-b border-ink/20 pb-1.5 text-[12px] font-medium uppercase tracking-widest text-ink transition-colors hover:border-gold"
              >
                {t('backToProjects')}
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Prev / next */}
      <nav className="bg-offwhite" aria-label={t('related')}>
        <div className="container-x grid grid-cols-1 border-t border-ink/10 sm:grid-cols-2">
          {(
            [
              ['prevProject', prev, 'start'],
              ['nextProject', next, 'end']
            ] as const
          ).map(([key, item, align]) => (
            <Link
              key={key}
              href={`/projects/${item.slug}` as never}
              className={`group relative flex flex-col justify-center gap-2 border-ink/10 p-10 transition-colors hover:bg-white ${
                align === 'end' ? 'sm:border-s sm:text-end' : 'sm:border-e'
              }`}
            >
              <span className="text-[11px] uppercase tracking-label text-steel-shade">
                {t(key as never)}
              </span>
              <span className="font-display text-xl text-ink transition-colors group-hover:text-steel-shade">
                {locale === 'ar' ? item.title.ar : item.title.en}
              </span>
              <Arrow
                className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-steel opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                  align === 'end' ? 'end-6' : 'start-6'
                }`}
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
