import Link from 'next/link';
import { ArrowRight, ArrowLeft, Download, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

type Variant = 'primary' | 'outline' | 'dark' | 'ghost';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  icon?: LucideIcon;
  arrow?: boolean;
  download?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Primary CTA button with fill-sweep hover and an arrow that nudges
 * in the reading direction (mirrored automatically in RTL).
 */
export function Button({
  children,
  href,
  external,
  variant = 'primary',
  icon: Icon,
  arrow = true,
  download,
  className,
  type = 'button',
  disabled,
  onClick,
  ariaLabel
}: ButtonProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const DownloadIcon = Download;

  const variantClass =
    variant === 'outline'
      ? 'btn-outline'
      : variant === 'dark'
        ? 'btn-dark'
        : variant === 'ghost'
          ? 'text-ink hover:text-steel-shade'
          : 'btn-primary';

  const content = (
    <>
      <span className="inline-flex items-center gap-2.5">
        {Icon && <Icon className="h-4 w-4" aria-hidden />}
        {download && <DownloadIcon className="h-4 w-4" aria-hidden />}
        <span>{children}</span>
      </span>
      {arrow && (
        <Arrow
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          aria-hidden
        />
      )}
    </>
  );

  const classes = cn('group', variant !== 'ghost' ? 'btn' : 'inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest', variantClass, disabled && 'pointer-events-none opacity-60', className);

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          className={classes}
          target={external || href.startsWith('http') ? '_blank' : undefined}
          rel={external || href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={ariaLabel}
          download={download}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
