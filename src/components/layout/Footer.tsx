import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { assets } from '@/data/assets';
import { site } from '@/data/site';
import { footerCompanyLinks } from '@/data/nav';
import { SocialIcons } from './SocialIcons';
import { TodoText } from '@/components/ui/TodoText';

/** Dark navy footer — about, quick links, contact, socials, copyright. */
export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <div className="bg-blueprint-light absolute inset-0" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />

      <div className="container-x relative z-10 grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        {/* Brand + about */}
        <div className="lg:col-span-4">
          <Image
            src={assets.logo}
            alt={site.name.en}
            width={180}
            height={60}
            className="logo-on-dark h-auto w-[160px] object-contain"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{t('about')}</p>
          <div className="mt-7">
            <SocialIcons className="text-white/70" hoverClassName="hover:text-steel-tint" />
          </div>
        </div>

        {/* Company links */}
        <nav className="lg:col-span-3" aria-label={t('aboutCompany')}>
          <h3 className="text-[12px] font-medium uppercase tracking-label text-steel-tint">
            {t('aboutCompany')}
          </h3>
          <ul className="mt-6 space-y-3.5">
            {footerCompanyLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" aria-hidden />
                  {tn(item.key as never)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="text-[12px] font-medium uppercase tracking-label text-steel-tint">
            {t('getInTouch')}
          </h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-start gap-3 text-white/70 transition-colors hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-steel" aria-hidden />
                <span dir="ltr">{site.phone}</span>
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="flex items-start gap-3 text-white/70 transition-colors hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-steel" aria-hidden />
                <span dir="ltr">{site.email}</span>
              </a>
            </li>
            <li>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/70 transition-colors hover:text-white"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-steel" aria-hidden />
                <span dir="ltr">{site.whatsapp}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-steel" aria-hidden />
              <TodoText value={site.address.en} className="text-white/70" />
            </li>
          </ul>
        </div>

        {/* Map placeholder */}
        <div className="lg:col-span-2">
          <h3 className="text-[12px] font-medium uppercase tracking-label text-steel-tint">
            {t('addressLabel')}
          </h3>
          {/* TODO: replace with an embedded Google Map of the confirmed address */}
          <div className="mt-6 flex aspect-[4/3] w-full items-center justify-center rounded-[3px] border border-dashed border-white/20 bg-white/5 p-4 text-center">
            <p className="text-xs leading-relaxed text-white/50">{t('mapPlaceholder')}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-center text-[12.5px] text-white/55 sm:flex-row sm:text-start">
          <p>{t('rights')}</p>
          <SocialIcons size={15} className="text-white/50" hoverClassName="hover:text-steel-tint" />
        </div>
      </div>
    </footer>
  );
}
