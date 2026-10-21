/**
 * Navigation structure shared by header, mobile menu and footer.
 * Labels live in messages (nav.*) — this file holds structure/hrefs only.
 */
export interface NavItem {
  key: string; // translation key under `nav.`
  href: string;
}

export const mainNav: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'projects', href: '/projects' },
  { key: 'clients', href: '/our-clients' },
  { key: 'knowledge', href: '/knowledge-center' },
  { key: 'events', href: '/events' },
  { key: 'contact', href: '/contact' }
];

export const footerCompanyLinks: NavItem[] = [
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'projects', href: '/projects' },
  { key: 'knowledge', href: '/knowledge-center' },
  { key: 'events', href: '/events' },
  { key: 'contact', href: '/contact' }
];
