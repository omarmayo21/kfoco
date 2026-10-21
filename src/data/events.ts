/**
 * Events / blog — mock content.
 * TODO: replace with real events and news from the client.
 */
export interface EventPost {
  slug: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  body: { en: string[]; ar: string[] };
  date: string; // ISO
  place: { en: string; ar: string };
  image: string;
}

export const events: EventPost[] = [
  {
    slug: 'healthcare-design-forum',
    title: {
      en: 'Healthcare Design Forum',
      ar: 'منتدى تصميم المرافق الصحية'
    },
    excerpt: {
      en: 'TODO: replace with the real event summary — KFO at the Healthcare Design Forum.',
      ar: 'TODO: استبدال بملخص الحدث الحقيقي — مكتب خالد الفقيه في منتدى تصميم المرافق الصحية.'
    },
    body: {
      en: [
        'TODO: replace this placeholder with the official event write-up (agenda, speakers, outcomes).',
        'This template demonstrates the single-event layout: hero, meta, body and related content.'
      ],
      ar: [
        'TODO: استبدال هذا النص المبدئي بتقرير الحدث الرسمي (الأجندة، المتحدثون، النتائج).',
        'يعرض هذا القالب شكل صفحة الحدث: الصورة الرئيسية، المعلومات، المحتوى، والمحتوى المرتبط.'
      ]
    },
    date: '2025-10-15',
    place: { en: 'TODO: confirm venue', ar: 'TODO: تأكيد المكان' },
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80'
  },
  {
    slug: 'riyadh-build-expo',
    title: {
      en: 'Riyadh Building & Construction Week',
      ar: 'أسبوع الرياض للبناء والتشييد'
    },
    excerpt: {
      en: 'TODO: replace with the real event summary — meeting clients and partners at the exhibition.',
      ar: 'TODO: استبدال بملخص الحدث الحقيقي — لقاء العملاء والشركاء في المعرض.'
    },
    body: {
      en: [
        'TODO: replace this placeholder with the official event write-up.',
        'This template demonstrates the single-event layout.'
      ],
      ar: [
        'TODO: استبدال هذا النص المبدئي بتقرير الحدث الرسمي.',
        'يعرض هذا القالب شكل صفحة الحدث.'
      ]
    },
    date: '2025-05-20',
    place: { en: 'TODO: confirm venue', ar: 'TODO: تأكيد المكان' },
    image:
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1800&q=80'
  }
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
