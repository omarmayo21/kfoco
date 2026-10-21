import Image from 'next/image';
import { Reveal } from './Reveal';
import { Breadcrumb, type Crumb } from './Breadcrumb';
import { SectionLabel } from './SectionLabel';

/**
 * Shared inner-page header banner: full-bleed image + navy overlay,
 * breadcrumb + eyebrow label + large title.
 */
export function PageHeader({
  image,
  label,
  title,
  text,
  crumbs
}: {
  image: string;
  label: string;
  title: string;
  text?: string;
  crumbs: Crumb[];
}) {
  return (
    <header className="relative isolate flex min-h-[52vh] items-end overflow-hidden bg-ink pt-28 sm:min-h-[58vh] sm:pt-32">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 overlay-ink" aria-hidden />
      <div className="container-x relative z-10 pb-14 pt-24 sm:pb-20">
        <Reveal>
          <Breadcrumb items={crumbs} light />
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <SectionLabel light>{label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.18}>
          <h1 className="mt-5 max-w-4xl font-display text-[2.25rem] font-medium leading-[1.1] text-white sm:text-5xl lg:text-[3.75rem]">
            {title}
          </h1>
        </Reveal>
        {text && (
          <Reveal delay={0.26}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">{text}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
