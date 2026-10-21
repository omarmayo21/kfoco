import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { Playfair_Display, Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { buildMetadata, organizationJsonLd } from '@/lib/seo';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { AccessibilityWidget } from '@/components/layout/AccessibilityWidget';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import '@/app/globals.css';

/* ------------------------------------------------------------------ */
/* Fonts: Playfair Display (EN display) · Inter (EN body) ·            */
/* IBM Plex Sans Arabic (AR). Arabic remapping happens in globals.css. */
/* ------------------------------------------------------------------ */
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-arabic'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return {
    ...buildMetadata({
      locale,
      title: t('title'),
      description: t('description'),
      path: '/'
    }),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kfoco.com'),
    robots: { index: true, follow: true }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as 'en' | 'ar')) notFound();

  // Enable static rendering
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${playfair.variable} ${inter.variable} ${plexArabic.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              />
              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                      page_path: window.location.pathname,
                    });
                  `
                }}
              />
            </>
          )}
          {/* JSON-LD: Organization + LocalBusiness */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
          />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
          >
            {t('skipToContent')}
          </a>
          <ScrollProgress />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingActions />
          <AccessibilityWidget />
          <SmoothScroll />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
