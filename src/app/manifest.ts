import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Khaled Alfagih Engineering Consultancy Company | KFO',
    short_name: 'KFO',
    description: 'Iconic architectural engineering, healthcare planning, design, and site supervision consultancy in Riyadh, Saudi Arabia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e141b',
    theme_color: '#0e141b',
    icons: [
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  };
}
