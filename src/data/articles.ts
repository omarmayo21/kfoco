/**
 * Knowledge Center — articles & downloadable resources (mock content).
 * TODO: replace with real technical papers, guides and downloads.
 */
export interface Article {
  slug: string;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  date: string; // ISO
  readTime: { en: string; ar: string };
  type: 'article' | 'download';
}

export const articles: Article[] = [
  {
    slug: 'healthcare-planning-basics',
    title: {
      en: 'Principles of Healthcare Facility Planning',
      ar: 'مبادئ تخطيط المرافق الصحية'
    },
    category: { en: 'Healthcare', ar: 'الرعاية الصحية' },
    excerpt: {
      en: 'TODO: replace with a real Knowledge Center article summary. Key considerations for planning hospitals that serve patients, staff and operations.',
      ar: 'TODO: استبدال بملخص حقيقي من مركز المعرفة. أبرز الاعتبارات في تخطيط المستشفيات التي تخدم المرضى والكوادر والتشغيل.'
    },
    date: '2025-11-12',
    readTime: { en: '6 min read', ar: 'قراءة 6 دقائق' },
    type: 'article'
  },
  {
    slug: 'design-supervision-checklist',
    title: {
      en: 'Execution Supervision: A Practical Checklist',
      ar: 'الإشراف على التنفيذ: قائمة عملية'
    },
    category: { en: 'Supervision', ar: 'الإشراف' },
    excerpt: {
      en: 'TODO: replace with a real article. What to inspect at each stage of construction to protect design intent and quality.',
      ar: 'TODO: استبدال بمقال حقيقي. ما ينبغي فحصه في كل مرحلة من مراحل التنفيذ للحفاظ على جودة التصميم.'
    },
    date: '2025-09-30',
    readTime: { en: '5 min read', ar: 'قراءة 5 دقائق' },
    type: 'article'
  },
  {
    slug: 'company-profile-2025',
    title: {
      en: 'Company Profile 2025 (PDF)',
      ar: 'الملف التعريفي للشركة 2025 (PDF)'
    },
    category: { en: 'Downloads', ar: 'التحميلات' },
    excerpt: {
      en: 'Download the official KFO company profile — experience, qualifications and selected projects.',
      ar: 'تحميل الملف التعريفي الرسمي للمكتب — الخبرة والتأهيلات ومشاريع مختارة.'
    },
    date: '2025-02-01',
    readTime: { en: 'PDF', ar: 'PDF' },
    type: 'download'
  },
  {
    slug: 'knowledge-transfer-in-consultancy',
    title: {
      en: 'Knowledge Transfer in Engineering Consultancy',
      ar: 'نقل المعرفة في الاستشارات الهندسية'
    },
    category: { en: 'Practice', ar: 'الممارسة المهنية' },
    excerpt: {
      en: 'TODO: replace with a real article. How structured knowledge transfer strengthens project teams and client relationships.',
      ar: 'TODO: استبدال بمقال حقيقي. كيف يعزز نقل المعرفة المنظم قدرات فرق المشروع وعلاقات العملاء.'
    },
    date: '2025-06-18',
    readTime: { en: '7 min read', ar: 'قراءة 7 دقائق' },
    type: 'article'
  }
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
