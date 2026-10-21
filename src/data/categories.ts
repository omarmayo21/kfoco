import { assets } from './assets';

export interface Category {
  slug: string;
  title: { en: string; ar: string };
  /** Short descriptor shown under the tile title */
  caption: { en: string; ar: string };
  image: string;
  /** Healthcare is the core specialty → rendered as the large tile */
  emphasis?: boolean;
}

/** The 8 project categories from the live site (same slugs as the old URLs). */
export const categories: Category[] = [
  {
    slug: 'healthcare',
    title: { en: 'Healthcare', ar: 'الرعاية الصحية' },
    caption: {
      en: 'Hospitals & medical complexes — our core specialty',
      ar: 'المستشفيات والمجمعات الطبية — تخصصنا الأساسي'
    },
    image: assets.categories.healthcare,
    emphasis: true
  },
  {
    slug: 'education',
    title: { en: 'Education', ar: 'التعليمي' },
    caption: { en: 'Schools, universities & training centers', ar: 'المدارس والجامعات ومراكز التدريب' },
    image: assets.categories.education
  },
  {
    slug: 'residential',
    title: { en: 'Residential', ar: 'السكني' },
    caption: { en: 'Compounds, villas & housing projects', ar: 'المجمعات والفلل والمشاريع السكنية' },
    image: assets.categories.residential
  },
  {
    slug: 'industrial',
    title: { en: 'Industrial', ar: 'الصناعي' },
    caption: { en: 'Facilities & industrial buildings', ar: 'المنشآت والمباني الصناعية' },
    image: assets.categories.industrial
  },
  {
    slug: 'hospitality',
    title: { en: 'Hospitality', ar: 'الفندقي' },
    caption: { en: 'Hotels & hospitality developments', ar: 'الفنادق ومشروعات الضيافة' },
    image: assets.categories.hospitality
  },
  {
    slug: 'offices-building',
    title: { en: 'Offices Building', ar: 'المباني المكتبية' },
    caption: { en: 'Headquarters & commercial offices', ar: 'المقار الرئيسية والمكاتب التجارية' },
    image: assets.categories.offices
  },
  {
    slug: 'transportation',
    title: { en: 'Transportation', ar: 'النقل والمواصلات' },
    caption: { en: 'Transport & mobility facilities', ar: 'منشآت النقل والتنقل' },
    image: assets.categories.transportation
  },
  {
    slug: 'interior',
    title: { en: 'Interior', ar: 'التصميم الداخلي' },
    caption: { en: 'Interior architecture & fit-out', ar: 'العمارة الداخلية والتشطيبات' },
    image: assets.categories.interior
  }
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
