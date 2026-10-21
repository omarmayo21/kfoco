/**
 * 29-year company timeline (About page).
 * TODO: confirm exact years and milestones with the client — these are
 * structural placeholders, not verified facts.
 */
export interface Milestone {
  year: string;
  title: { en: string; ar: string };
  text: { en: string; ar: string };
}

export const timeline: Milestone[] = [
  {
    year: '1996',
    title: { en: 'Foundation', ar: 'التأسيس' },
    text: {
      en: 'TODO: confirm founding year — KFO begins practising engineering consultancy in Riyadh, KSA.',
      ar: 'TODO: تأكيد سنة التأسيس — انطلاق مكتب خالد الفقيه للاستشارات الهندسية في الرياض.'
    }
  },
  {
    year: '2005',
    title: { en: 'Healthcare focus', ar: 'التركيز على المرافق الصحية' },
    text: {
      en: 'TODO: confirm milestone — specialization in healthcare planning & design takes shape.',
      ar: 'TODO: تأكيد المحطة — تبلور التخصص في تخطيط وتصميم المرافق الصحية.'
    }
  },
  {
    year: '2015',
    title: { en: 'Growing portfolio', ar: 'توسع المحفظة' },
    text: {
      en: 'TODO: confirm milestone — expansion across healthcare, education and building projects.',
      ar: 'TODO: تأكيد المحطة — التوسع في مشاريع الرعاية الصحية والتعليم والمباني.'
    }
  },
  {
    year: '2025',
    title: { en: '29+ years of experience', ar: 'أكثر من 29 عاماً من الخبرة' },
    text: {
      en: 'More than 29 years of experience in engineering consultancy, with over 50 projects and 35+ satisfied clients.',
      ar: 'أكثر من 29 عاماً من الخبرة في الاستشارات الهندسية، مع أكثر من 50 مشروعاً وأكثر من 35 عميلاً.'
    }
  }
];
