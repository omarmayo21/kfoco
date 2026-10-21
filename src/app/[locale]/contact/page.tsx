import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { assets } from '@/data/assets';
import { site } from '@/data/site';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { TodoText } from '@/components/ui/TodoText';
import { ContactForm } from '@/components/sections/shared/ContactForm';
import { SocialIcons } from '@/components/layout/SocialIcons';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return buildMetadata({ locale, title: t('title'), description: t('description'), path: '/contact' });
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  const tf = await getTranslations({ locale, namespace: 'footer' });

  return (
    <>
      <PageHeader
        image={assets.pageHeaders.contact}
        label={t('label')}
        title={t('heading')}
        text={t('text')}
        crumbs={[{ label: t('label') }]}
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading size="md">{t('formHeading')}</SectionHeading>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <ContactForm />
            </Reveal>
          </div>

          {/* Details */}
          <aside className="lg:col-span-5">
            <Reveal>
              <SectionLabel>{t('detailsHeading')}</SectionLabel>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-5">
                {[
                  {
                    icon: Phone,
                    label: tf('phoneLabel'),
                    value: site.phone,
                    href: site.phoneHref,
                    ltr: true
                  },
                  {
                    icon: Mail,
                    label: tf('emailLabel'),
                    value: site.email,
                    href: site.emailHref,
                    ltr: true
                  },
                  {
                    icon: MessageCircle,
                    label: tf('whatsappLabel'),
                    value: site.whatsapp,
                    href: site.whatsappHref,
                    ltr: true
                  },
                  {
                    icon: Clock,
                    label: t('hoursLabel'),
                    value: t('hours'),
                    href: undefined,
                    ltr: false
                  }
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4 border-b border-ink/8 pb-5">
                    <item.icon className="mt-1 h-[18px] w-[18px] shrink-0 text-steel" aria-hidden />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-textc-muted">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          dir={item.ltr ? 'ltr' : undefined}
                          className="mt-1 inline-block text-base text-ink transition-colors hover:text-steel-shade"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-base text-ink">
                          <TodoText value={item.value} />
                        </p>
                      )}
                    </div>
                  </li>
                ))}

                <li className="flex items-start gap-4">
                  <MapPin className="mt-1 h-[18px] w-[18px] shrink-0 text-steel" aria-hidden />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-textc-muted">
                      {tf('addressLabel')}
                    </p>
                    <p className="mt-1 text-base text-ink">
                      <TodoText value={locale === 'ar' ? site.address.ar : site.address.en} />
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <Button href={site.whatsappHref} external variant="primary">
                {t('whatsappCta')}
              </Button>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <SocialIcons size={18} className="text-textc-muted" hoverClassName="hover:text-steel-shade" />
            </Reveal>

            {/* Map placeholder */}
            <Reveal delay={0.26} className="mt-10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] border border-dashed border-ink/15">
                <Image
                  src={assets.map.placeholder}
                  alt={tf('mapPlaceholder')}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 p-6 text-center">
                  <p className="text-sm text-textc-muted">{tf('mapPlaceholder')}</p>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
