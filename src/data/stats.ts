/**
 * Stats — "Our Achievements & Story in numbers" (figures from the live site).
 * The experience figure is unified to 29+ years everywhere (the old site
 * wrongly said 25 in one place).
 */
export interface Stat {
  id: string;
  /** Numeric value for the count-up animation */
  value: number;
  /** Display suffix: "2nd", "+" etc. */
  suffix: { en: string; ar: string };
  label: { en: string; ar: string };
  /** "2nd" is an ordinal ranking, not a countable total */
  isOrdinal?: boolean;
}

export const stats: Stat[] = [
  {
    id: 'balady',
    value: 2,
    suffix: { en: 'nd', ar: '' },
    label: {
      en: 'Balady Classification',
      ar: 'تصنيف بلدي'
    },
    isOrdinal: true
  },
  {
    id: 'clients',
    value: 35,
    suffix: { en: '+', ar: '+' },
    label: { en: 'Satisfied Clients', ar: 'عميل راضٍ' }
  },
  {
    id: 'years',
    value: 29,
    suffix: { en: '+', ar: '+' },
    label: { en: 'Years of Experience', ar: 'عاماً من الخبرة' }
  },
  {
    id: 'projects',
    value: 50,
    suffix: { en: '+', ar: '+' },
    label: { en: 'Projects', ar: 'مشروع' }
  }
];
