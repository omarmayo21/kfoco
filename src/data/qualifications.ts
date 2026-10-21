import { assets } from './assets';

/**
 * Qualifications / certificates gallery ("Updated Profile" on the old site).
 * TODO: replace the 8 placeholder images with real scanned certificates and
 * give each one its real title.
 */
export interface Qualification {
  id: string;
  image: string;
  title: { en: string; ar: string };
}

export const qualifications: Qualification[] = assets.qualifications.items.map(
  (image, i) => ({
    id: `qualification-${i + 1}`,
    image,
    title: {
      en: `TODO: Certificate title ${i + 1}`,
      ar: `TODO: عنوان الشهادة ${i + 1}`
    }
  })
);
