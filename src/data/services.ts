/**
 * Services — the 4 service lines from the live site.
 * TODO: expand descriptions with the client's official scope of services.
 */
export interface Service {
  id: string;
  number: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

export const services: Service[] = [
  {
    id: 'planning',
    number: '01',
    title: { en: 'Planning', ar: 'التخطيط' },
    description: {
      en: 'Feasibility studies, master planning and functional briefs that translate the client vision into a clear, buildable framework.',
      ar: 'دراسات الجدوى والتخطيط العام والبرامج الوظيفية التي تحوّل رؤية العميل إلى إطار عملي واضح قابل للتنفيذ.'
    }
  },
  {
    id: 'expert-engineers',
    number: '02',
    title: { en: 'Expert Engineers', ar: 'المهندسون الخبراء' },
    description: {
      en: 'A multidisciplinary team of senior engineers with deep healthcare and building expertise, working as one integrated unit.',
      ar: 'فريق متعدد التخصصات من المهندسين ذوي الخبرة العميقة في المرافق الصحية والمباني، يعمل كوحدة متكاملة.'
    }
  },
  {
    id: 'renovation',
    number: '03',
    title: { en: 'Renovation', ar: 'التجديد والتطوير' },
    description: {
      en: 'Expansion, rehabilitation and modernization of existing facilities — planned to keep operations running and value growing.',
      ar: 'التوسعة والتأهيل وتحديث المرافق القائمة — بتخطيط يحافظ على استمرارية التشغيل ويضيف قيمة للمستثمر.'
    }
  },
  {
    id: 'designing-supervision',
    number: '04',
    title: { en: 'Designing & Supervision', ar: 'التصميم والإشراف' },
    description: {
      en: 'Architecture and engineering design, execution supervision and project management — from first sketch to handover.',
      ar: 'التصميم المعماري والهندسي، والإشراف على التنفيذ، وإدارة المشاريع — من الرسم الأول حتى التسليم.'
    }
  }
];

/** Process steps for the Services page */
export interface ProcessStep {
  id: string;
  number: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

export const processSteps: ProcessStep[] = [
  {
    id: 'plan',
    number: '01',
    title: { en: 'Planning', ar: 'التخطيط' },
    description: {
      en: 'Understanding requirements, studying the site and defining the functional program.',
      ar: 'فهم المتطلبات، ودراسة الموقع، وتحديد البرنامج الوظيفي.'
    }
  },
  {
    id: 'design',
    number: '02',
    title: { en: 'Design', ar: 'التصميم' },
    description: {
      en: 'Concept through detailed design, coordinated across all engineering disciplines.',
      ar: 'من الفكرة إلى التصميم التفصيلي، بتنسيق كامل بين التخصصات الهندسية.'
    }
  },
  {
    id: 'supervision',
    number: '03',
    title: { en: 'Supervision', ar: 'الإشراف' },
    description: {
      en: 'Execution supervision that protects design quality on site, step by step.',
      ar: 'إشراف على التنفيذ يحافظ على جودة التصميم في الموقع، خطوة بخطوة.'
    }
  },
  {
    id: 'handover',
    number: '04',
    title: { en: 'Handover', ar: 'التسليم' },
    description: {
      en: 'Closing out documentation and delivering a project ready for operation.',
      ar: 'استكمال الوثائق وتسليم مشروع جاهز للتشغيل.'
    }
  }
];
