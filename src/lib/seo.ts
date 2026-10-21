import type { Metadata } from 'next';
import { site } from '@/data/site';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kfoco.com';

export const getSiteUrl = () => SITE_URL;

/** Per-page metadata with hreflang alternates for EN/AR + Open Graph */
export function buildMetadata({
  locale,
  title,
  description,
  path = '/',
  image
}: {
  locale: string;
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${locale === 'ar' ? '/ar' : ''}${path === '/' ? '' : path}`;
  const locales: Record<string, string> = {
    'en-SA': `${SITE_URL}${path === '/' ? '' : path}`,
    'ar-SA': `${SITE_URL}/ar${path === '/' ? '' : path}`,
    en: `${SITE_URL}${path === '/' ? '' : path}`,
    ar: `${SITE_URL}/ar${path === '/' ? '' : path}`,
    'x-default': `${SITE_URL}${path === '/' ? '' : path}`
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: locales
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name.en,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

/** JSON-LD: Organization + LocalBusiness for every page (injected in layout) */
export function organizationJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: locale === 'ar' ? 'شركة خالد الفقيه للاستشارات الهندسية' : site.name.en,
        alternateName: locale === 'ar' ? site.name.en : 'شركة خالد الفقيه للاستشارات الهندسية',
        url: SITE_URL,
        logo: site.email ? `${SITE_URL}/wp-content/uploads/2023/09/Khaled-Alfagih-Logo.png` : undefined,
        email: site.email,
        telephone: site.phone,
        sameAs: site.socials.map((s) => s.href),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Riyadh',
          addressCountry: 'SA'
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: locale === 'ar' ? 'شركة خالد الفقيه للاستشارات الهندسية' : site.name.en,
        image: `${SITE_URL}/wp-content/uploads/2023/09/img1.jpg`,
        url: SITE_URL,
        telephone: site.phone,
        email: site.email,
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Riyadh',
          addressCountry: 'SA'
        },
        geo: {
          '@type': 'GeoCoordinates',
          // TODO: confirm exact office coordinates
          latitude: 24.7136,
          longitude: 46.6753
        },
        openingHoursSpecification: {
          // TODO: confirm working hours
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '08:00',
          closes: '17:00'
        }
      }
    ]
  };
}
