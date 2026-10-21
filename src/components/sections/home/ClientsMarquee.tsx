import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { clientsRowA, clientsRowB } from '@/data/clients';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowLink } from '@/components/ui/ArrowLink';

/**
 * Clients marquee — 2 rows scrolling in opposite directions, pausing on hover,
 * grayscale → color on hover. Logo JPGs have white backgrounds → mix-blend-multiply
 * on the light surface. Directions flip automatically in RTL (see globals.css).
 */
export function ClientsMarquee() {
  const t = useTranslations('clients');

  const row = (items: typeof clientsRowA, reverse: boolean) => (
    <div className="marquee-row overflow-hidden">
      <div className={`marquee-track gap-14 py-6 ${reverse ? 'marquee-track-slow' : ''}`}>
        {/* Duplicate the set for a seamless loop */}
        {[...items, ...items].map((client, i) => (
          <div
            key={`${client.id}-${i}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center sm:w-44"
          >
            <Image
              src={client.src}
              alt={client.name}
              width={144}
              height={56}
              sizes="(min-width: 640px) 176px, 144px"
              className="logo-blend max-h-14 w-auto max-w-full object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-warmgrey/50 py-24 lg:py-28">
      <div className="container-x text-center">
        <Reveal>
          <SectionLabel className="justify-center">{t('label')}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHeading className="mx-auto mt-6 max-w-3xl">{t('title')}</SectionHeading>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-textc-muted">
            {t('text')}
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-20 bg-gradient-to-r from-warmgrey/90 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-20 bg-gradient-to-l from-warmgrey/90 to-transparent" aria-hidden />

        {row(clientsRowA, false)}
        {row(clientsRowB, true)}
      </div>

      <div className="mt-12 text-center">
        <Reveal>
          <ArrowLink href="/our-clients">{t('button')}</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
