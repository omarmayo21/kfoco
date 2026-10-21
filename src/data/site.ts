/**
 * Global site/company data (contact channels, social links).
 * TODO: confirm the physical address with the client.
 */
const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+966 50 651 5861';
const cleanWhatsappDigits = rawWhatsapp.replace(/\D/g, '');

export const site = {
  name: {
    en: 'Khaled Alfagih Engineering Consultancy Company',
    ar: 'شركة خالد الفقيه للاستشارات الهندسية'
  },
  shortName: { en: 'KFO', ar: 'KFO' },
  phone: '+966 11 232 1519',
  phoneHref: 'tel:+966112321519',
  whatsapp: rawWhatsapp,
  whatsappHref: `https://wa.me/${cleanWhatsappDigits}`,
  email: 'info@kfoco.com',
  emailHref: 'mailto:info@kfoco.com',
  // TODO: confirm the full official address (building, street, district, zip)
  address: {
    en: 'Riyadh, Saudi Arabia — TODO: confirm full address',
    ar: 'الرياض، المملكة العربية السعودية — TODO: تأكيد العنوان الكامل'
  },
  city: { en: 'Riyadh, KSA', ar: 'الرياض، السعودية' },
  socials: [
    { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@kfoffices' },
    { id: 'twitter', label: 'X (Twitter)', href: 'https://twitter.com/kfoffice' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/kfoco' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/kfo_consultancy/' },
    { id: 'pinterest', label: 'Pinterest', href: 'https://www.pinterest.com/KFOconsultancy/' }
  ] as const
} as const;

export type SocialId = (typeof site.socials)[number]['id'];
