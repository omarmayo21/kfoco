import { assets } from './assets';

/**
 * Projects — 3 featured healthcare projects named on the live site.
 * Every field the client has not confirmed is an explicit TODO placeholder.
 * DO NOT invent project facts; replace the TODO strings with verified data.
 */
export interface Project {
  slug: string;
  title: { en: string; ar: string };
  category: string; // category slug from categories.ts
  location: { en: string; ar: string };
  year: { en: string; ar: string };
  client: { en: string; ar: string };
  area: { en: string; ar: string };
  services: { en: string; ar: string };
  status: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  body: { en: string[]; ar: string[] };
  images: string[];
  featured: boolean;
}

// TODO: replace placeholder meta values with verified project data.
const TODO = (en: string, ar: string) => ({ en: `TODO: ${en}`, ar: `TODO: ${ar}` });

export const projects: Project[] = [
  {
    slug: 'dallah-namar-hospital',
    title: { en: 'Dallah Namar Hospital', ar: 'مستشفى دله نمار' },
    category: 'healthcare',
    location: TODO('confirm location', 'تأكيد الموقع'),
    year: TODO('confirm year', 'تأكيد السنة'),
    client: TODO('confirm client name', 'تأكيد اسم الجهة'),
    area: TODO('confirm built-up area', 'تأكيد المساحة الإجمالية'),
    services: TODO('confirm services provided', 'تأكيد الخدمات المقدمة'),
    status: TODO('confirm status / completion', 'تأكيد الحالة / التسليم'),
    excerpt: {
      en: 'A healthcare project by KFO. — TODO: replace with the official project description.',
      ar: 'مشروع في مجال الرعاية الصحية من تنفيذ المكتب. — TODO: استبدال بالوصف الرسمي للمشروع.'
    },
    body: {
      en: [
        'TODO: replace this text with the official project description provided by the client (scope, beds, key departments, delivery role).',
        'KFO specializes in healthcare planning and design; project narrative will be added once verified material is received.'
      ],
      ar: [
        'TODO: استبدال هذا النص بالوصف الرسمي للمشروع المعتمد من العميل (النطاق، عدد الأسرة، الأقسام الرئيسية، دور التسليم).',
        'يتخصص المكتب في التخطيط والتصميم للمرافق الصحية؛ وسيتم إضافة تفاصيل المشروع فور استلام المواد الموثقة.'
      ]
    },
    images: [...assets.projects.dallahNamarHospital],
    featured: true
  },
  {
    slug: 'dr-mohammed-alfagih-hospital',
    title: { en: 'Dr. Mohamed Alfagih Hospital', ar: 'مستشفى الدكتور محمد الفقيه' },
    category: 'healthcare',
    location: TODO('confirm location', 'تأكيد الموقع'),
    year: TODO('confirm year', 'تأكيد السنة'),
    client: TODO('confirm client name', 'تأكيد اسم الجهة'),
    area: TODO('confirm built-up area', 'تأكيد المساحة الإجمالية'),
    services: TODO('confirm services provided', 'تأكيد الخدمات المقدمة'),
    status: TODO('confirm status / completion', 'تأكيد الحالة / التسليم'),
    excerpt: {
      en: 'A healthcare project by KFO. — TODO: replace with the official project description.',
      ar: 'مشروع في مجال الرعاية الصحية من تنفيذ المكتب. — TODO: استبدال بالوصف الرسمي للمشروع.'
    },
    body: {
      en: [
        'TODO: replace this text with the official project description provided by the client (scope, beds, key departments, delivery role).',
        'KFO specializes in healthcare planning and design; project narrative will be added once verified material is received.'
      ],
      ar: [
        'TODO: استبدال هذا النص بالوصف الرسمي للمشروع المعتمد من العميل (النطاق، عدد الأسرة، الأقسام الرئيسية، دور التسليم).',
        'يتخصص المكتب في التخطيط والتصميم للمرافق الصحية؛ وسيتم إضافة تفاصيل المشروع فور استلام المواد الموثقة.'
      ]
    },
    images: [...assets.projects.drMohammedAlfagihHospital],
    featured: true
  },
  {
    slug: 'al-hammadi-medical-complex',
    title: { en: 'Al Hammadi Medical Complex', ar: 'مجمع الحمادي الطبي' },
    category: 'healthcare',
    location: TODO('confirm location', 'تأكيد الموقع'),
    year: TODO('confirm year', 'تأكيد السنة'),
    client: TODO('confirm client name', 'تأكيد اسم الجهة'),
    area: TODO('confirm built-up area', 'تأكيد المساحة الإجمالية'),
    services: TODO('confirm services provided', 'تأكيد الخدمات المقدمة'),
    status: TODO('confirm status / completion', 'تأكيد الحالة / التسليم'),
    excerpt: {
      en: 'A healthcare project by KFO. — TODO: replace with the official project description.',
      ar: 'مشروع في مجال الرعاية الصحية من تنفيذ المكتب. — TODO: استبدال بالوصف الرسمي للمشروع.'
    },
    body: {
      en: [
        'TODO: replace this text with the official project description provided by the client (scope, beds, key departments, delivery role).',
        'KFO specializes in healthcare planning and design; project narrative will be added once verified material is received.'
      ],
      ar: [
        'TODO: استبدال هذا النص بالوصف الرسمي للمشروع المعتمد من العميل (النطاق، عدد الأسرة، الأقسام الرئيسية، دور التسليم).',
        'يتخصص المكتب في التخطيط والتصميم للمرافق الصحية؛ وسيتم إضافة تفاصيل المشروع فور استلام المواد الموثقة.'
      ]
    },
    images: [...assets.projects.alHammadiMedicalComplex],
    featured: true
  }
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectsByCategory = (category: string) =>
  projects.filter((p) => p.category === category);

/** Neighbouring projects for the single-project pagination */
export const getAdjacentProjects = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0]
  };
};
