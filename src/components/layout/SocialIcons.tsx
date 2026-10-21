import { Youtube, Twitter, Linkedin, Instagram, type LucideIcon } from 'lucide-react';
import { site, type SocialId } from '@/data/site';
import { cn } from '@/lib/utils';

/** Pinterest is not in lucide — lightweight inline icon keeps the set consistent. */
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 20.5 12 12m0 0c-.6-1.3-.2-3 1.2-3 1.6 0 2.3 1.4 2 3.2-.4 2.3-1.6 4-3 4-1 0-1.8-.7-1.8-1.7" />
    </svg>
  );
}

const icons: Record<SocialId, LucideIcon | typeof PinterestIcon> = {
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  pinterest: PinterestIcon
};

const ariaKeys: Record<SocialId, string> = {
  youtube: 'YouTube',
  twitter: 'X',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  pinterest: 'Pinterest'
};

export function SocialIcons({
  size = 16,
  className,
  hoverClassName = 'hover:text-steel',
  inverse
}: {
  size?: number;
  className?: string;
  hoverClassName?: string;
  inverse?: boolean;
}) {
  return (
    <ul className={cn('flex items-center gap-4', className)}>
      {site.socials.map((s) => {
        const Icon = icons[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaKeys[s.id]}
              className={cn('inline-flex transition-colors', hoverClassName)}
            >
              <Icon className={cn(inverse && 'logo-on-dark')} style={{ width: size, height: size }} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
