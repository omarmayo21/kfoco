import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { assets } from '@/data/assets';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

/**
 * CTA banner — parallax-feel full-bleed background (slow fixed cover),
 * navy overlay, editorial heading and a single clear action.
 */
export function CtaBanner() {
  const t = useTranslations('cta');

  return (
    <section className="relative isolate overflow-hidden py-28 lg:py-36">
      {/* Background with subtle parallax (fixed attachment on large screens) */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={assets.cta.background}
          alt=""
          fill
          sizes="100vw"
          className="object-cover lg:fixed lg:inset-0 lg:-z-10 lg:h-full lg:w-full"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="bg-blueprint-light absolute inset-0" />
      </div>

      <div className="container-x relative z-10 text-center">
        <Reveal>
          <SectionLabel light className="justify-center">
            {t('label')}
          </SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading light size="xl" className="mx-auto mt-7 max-w-4xl">
            {t('heading')}
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Button href="/contact" variant="outline">
            {t('button')}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
