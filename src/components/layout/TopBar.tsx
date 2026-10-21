import { Phone, Mail, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { site } from '@/data/site';
import { SocialIcons } from './SocialIcons';
import { LanguageSwitcher } from './LanguageSwitcher';

/** Slim desktop-only utility bar with contact channels + socials + language. */
export function TopBar() {
  const t = useTranslations('topbar');

  return (
    <div className="relative z-50 hidden bg-ink text-white lg:block">
      <div className="container-x flex h-11 items-center justify-between text-[12.5px]">
        <div className="flex items-center gap-7">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-steel-tint"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            <span dir="ltr">{t('phone')}</span>
          </a>
          <span className="h-3.5 w-px bg-white/15" aria-hidden />
          <a
            href={site.emailHref}
            className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-steel-tint"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            <span dir="ltr">{t('email')}</span>
          </a>
          <span className="h-3.5 w-px bg-white/15" aria-hidden />
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-steel-tint"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            <span dir="ltr">{t('whatsapp')}</span>
          </a>
        </div>

        <div className="flex items-center gap-6">
          <SocialIcons size={14} className="text-white/70" hoverClassName="hover:text-steel-tint" />
          <span className="h-3.5 w-px bg-white/15" aria-hidden />
          <LanguageSwitcher variant="topbar" />
        </div>
      </div>
    </div>
  );
}
