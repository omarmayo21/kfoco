/**
 * assets.ts — SINGLE source of truth for every remote image URL.
 * All URLs are hotlinked from the current kfoco.com WordPress media library
 * (or Unsplash placeholders marked with TODO). Replace with local /public
 * assets here and every component will pick them up automatically.
 */

const WP = 'https://kfoco.com/wp-content/uploads';

/** Unsplash helper — placeholder imagery until real photography is supplied. */
const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const assets = {
  logo: `${WP}/2023/09/Khaled-Alfagih-Logo.png`, // dark logo on light surfaces
  // White version for dark hero/footer: rendered via CSS filter (brightness-0 invert)
  // TODO: replace with a real white logo asset if the client provides one.
  companyProfilePdf: 'https://kfoco.com/wp-content/uploads/2025/02/KFO_2025.pdf',

  hero: {
    // Primary hero image from the live site
    slide1: `${WP}/2023/09/img1.jpg`,
    // TODO: replace the additional slides with real KFO project photography
    slide2: unsplash('1487958449943-2429e8be8625', 2000),
    slide3: unsplash('1486406146926-c627a92ad1ab', 2000)
  },

  about: {
    // TODO: replace with real KFO studio / project photography
    main: unsplash('1497366216548-37526070297c', 1600)
  },

  cta: {
    // TODO: replace with a real KFO project image (parallax background)
    background: unsplash('1503387762-592deb58ef4e', 2000)
  },

  pageHeaders: {
    // TODO: replace with real KFO photography per page
    about: unsplash('1449157291145-7efd050a4d0e', 2000),
    services: unsplash('1504307651254-35680f356dfd', 2000),
    projects: unsplash('1487958449943-2429e8be8625', 2000),
    clients: unsplash('1497215728101-856f4ea42174', 2000),
    knowledge: unsplash('1497366754035-f200968a6e72', 2000),
    events: unsplash('1523050854058-8df90110c9f1', 2000),
    contact: unsplash('1497366811353-6870744d04b2', 2000)
  },

  categories: {
    // TODO: replace each category image with real KFO project photography
    healthcare: unsplash('1586773860418-d37222d8fce3', 1600),
    education: unsplash('1562774053-701939374585', 1200),
    residential: unsplash('1600585154340-be6161a56a0c', 1200),
    industrial: unsplash('1581091226825-a6a2a5aee158', 1200),
    hospitality: unsplash('1566073771259-6a8506099945', 1200),
    offices: unsplash('1497366754035-f200968a6e72', 1200),
    transportation: unsplash('1436491865332-7a61a109cc05', 1200),
    interior: unsplash('1618221195710-dd6b41faaea6', 1200)
  },

  projects: {
    // TODO: replace with real project photography from the media library
    dallahNamarHospital: [
      unsplash('1519494026892-80bbd2d6fd0d', 1800),
      unsplash('1586773860418-d37222d8fce3', 1800),
      unsplash('1631815588090-d4bfec5b1ccb', 1800)
    ],
    drMohammedAlfagihHospital: [
      unsplash('1587351021759-3e566b6af7cc', 1800),
      unsplash('1519494026892-80bbd2d6fd0d', 1800),
      unsplash('1586773860418-d37222d8fce3', 1800)
    ],
    alHammadiMedicalComplex: [
      unsplash('1631217868264-e5b90bb7e133', 1800),
      unsplash('1587351021759-3e566b6af7cc', 1800),
      unsplash('1519494026892-80bbd2d6fd0d', 1800)
    ]
  },

  qualifications: {
    // TODO: replace the 8 placeholders with scanned certificates
    // (Balady classification, chamber membership, ISO, etc.)
    items: [
      unsplash('1606857521015-7f9fcf423740', 1000),
      unsplash('1589330694653-ded6df03f754', 1000),
      unsplash('1568667256549-094345857637', 1000),
      unsplash('1450101499163-c8848c66ca85', 1000),
      unsplash('1586281380349-632531db7ed4', 1000),
      unsplash('1517842645767-c639042777db', 1000),
      unsplash('1434030216411-0b793f4b4173', 1000),
      unsplash('1454165804606-c3d57bc86b40', 1000)
    ]
  },

  map: {
    // TODO: replace with an embedded Google Map of the confirmed office address
    placeholder: unsplash('1524661135-423995f22d0b', 1600)
  }
} as const;
