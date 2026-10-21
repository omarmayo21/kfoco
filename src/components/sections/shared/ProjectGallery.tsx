'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Lightbox } from '@/components/ui/Lightbox';

/** Project image gallery with lightbox */
export function ProjectGallery({
  images,
  projectTitle
}: {
  images: string[];
  projectTitle: string;
}) {
  const t = useTranslations('projects');
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative overflow-hidden border border-ink/8 ${
              i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
            }`}
            aria-label={t('galleryImage', { n: i + 1 })}
          >
            <Image
              src={src}
              alt={`${projectTitle} — ${t('galleryImage', { n: i + 1 })}`}
              fill
              sizes={i === 0 ? '100vw' : '(min-width: 768px) 40vw, 50vw'}
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" aria-hidden />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
        alt={(i) => `${projectTitle} — ${t('galleryImage', { n: i + 1 })}`}
      />
    </div>
  );
}
