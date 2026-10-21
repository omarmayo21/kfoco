import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kfoco.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL)
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
