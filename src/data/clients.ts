/**
 * Clients / partners logos — exact filenames from the current media library.
 * TODO: rename each entry's `name` with the real client name once confirmed,
 * and fix any broken filename against the live media library.
 */
export interface Client {
  id: string;
  src: string;
  /** TODO: replace with the real client/partner name for SEO + accessibility */
  name: string;
}

const WP = 'https://kfoco.com/wp-content/uploads';
const files09 = [
  'd3-8e4e-f4302b07017c-1-1.jpg',
  'd3-8e4e-f4302b0s7017c-1.jpg',
  'd3-8e4e-f4302sb07017c-1.jpg',
  'd3-8e4ez-f4302b07017c-1.jpg',
  'd3-8e4ess-f4302b07017c-1.jpg',
  'd3-8e4e-f4302db07017c-1.jpg',
  'd3-8e4e-f43s02b07017c-1.jpg',
  'd3-8e4e-f4302bs07017c-1.jpg',
  'd3-8e4es-f4302b07017c-1.jpg',
  'd3-8e4e-f430ss2b07017c-1.jpg',
  'd3-8e4e-df4302b07017c-1.jpg',
  '434.jpg',
  '3232.jpg',
  '323.jpg',
  '212.jpg',
  '221.jpg',
  '22221.jpg',
  '222.jpg',
  '111.jpg',
  '22.jpg',
  '11.jpg',
  '5.jpg',
  '4.jpg',
  '3.jpg',
  '1.jpg',
  'd3-8e4e-f4302b07017c-1-2.jpg'
];

const extra: Array<[string, string]> = [
  ['2023/10/WhatsApp-Image-2023-10-10-at-13.11.48.jpg', '2023/10/WhatsApp-Image-2023-10-10-at-13.11.48.jpg'],
  ['2023/11/d3-8e4e-f43s02b07017c-1.jpg', '2023/11/d3-8e4e-f43s02b07017c-1.jpg'],
  ['2023/11/ss.jpg', '2023/11/ss.jpg'],
  ['2025/02/sfile.jpg', '2025/02/sfile.jpg']
];

export const clients: Client[] = [
  ...files09.map((file, i) => ({
    id: `wp-09-${i}`,
    src: `${WP}/2023/09/${file}`,
    name: `TODO: Client logo ${i + 1}` // TODO: real client name + alt text
  })),
  ...extra.map(([id, path], i) => ({
    id: `wp-x-${id}`,
    src: `${WP}/${path}`,
    name: `TODO: Client logo ${files09.length + i + 1}` // TODO: real client name + alt text
  }))
];

/** Split the list into two rows for the dual marquee */
export const clientsRowA = clients.filter((_, i) => i % 2 === 0);
export const clientsRowB = clients.filter((_, i) => i % 2 === 1);
