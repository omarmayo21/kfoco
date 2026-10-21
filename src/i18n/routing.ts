import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  // English lives at the root (/, /about), Arabic under /ar (/ar, /ar/about)
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];
