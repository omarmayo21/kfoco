import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next.js internals, metadata images/manifests, and static files
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|manifest|.*\\..*).*)'
  ]
};
