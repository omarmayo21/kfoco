import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { events, getEvent } from '@/data/events';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { TodoText } from '@/components/ui/TodoText';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const event = getEvent(slug);
  if (!event) return {};
  const t = await getTranslations({ locale, namespace: 'meta.event' });
  return buildMetadata({
    locale,
    title: `${t('title')} — ${locale === 'ar' ? event.title.ar : event.title.en}`,
    description: locale === 'ar' ? event.excerpt.ar : event.excerpt.en,
    path: `/events/${slug}`,
    image: event.image
  });
}

export default async function EventPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}) {
  const event = getEvent(slug);
  if (!event) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.events' });
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <>
      <PageHeader
        image={event.image}
        label={t('label')}
        title={locale === 'ar' ? event.title.ar : event.title.en}
        crumbs={[{ label: t('heading'), href: '/events' }, { label: locale === 'ar' ? event.title.ar : event.title.en }]}
      />

      <article className="bg-white py-20">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] uppercase tracking-wider text-textc-muted">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-steel" aria-hidden />
                <time dateTime={event.date}>{formatDate(event.date, locale)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-steel" aria-hidden />
                <TodoText value={locale === 'ar' ? event.place.ar : event.place.en} />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-[1.85] text-textc">
              <TodoText value={locale === 'ar' ? event.excerpt.ar : event.excerpt.en} />
            </p>
          </Reveal>

          <Reveal delay={0.14} className="relative mt-10 aspect-[16/9] overflow-hidden">
            <Image
              src={event.image}
              alt={locale === 'ar' ? event.title.ar : event.title.en}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 space-y-5 border-t border-ink/10 pt-8">
              {event.body[locale === 'ar' ? 'ar' : 'en'].map((para, i) => (
                <p key={i} className="text-base leading-[1.85] text-textc-muted">
                  <TodoText value={para} />
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.24} className="mt-12">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2.5 border-b border-ink/20 pb-1.5 text-[12px] font-medium uppercase tracking-widest text-ink transition-colors hover:border-gold"
            >
              <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" aria-hidden />
              {t('backToEvents')}
            </Link>
          </Reveal>
        </div>
      </article>
    </>
  );
}
