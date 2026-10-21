import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/home/Hero';
import { AboutIntro } from '@/components/sections/home/AboutIntro';
import { CategoryTiles } from '@/components/sections/home/CategoryTiles';
import { FeaturedProjects } from '@/components/sections/home/FeaturedProjects';
import { ServicesSection } from '@/components/sections/home/ServicesSection';
import { CtaBanner } from '@/components/sections/home/CtaBanner';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { ClientsMarquee } from '@/components/sections/home/ClientsMarquee';

/** HOME — sections in the order defined by the client. */
export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutIntro />
      <CategoryTiles />
      <FeaturedProjects />
      <ServicesSection />
      <CtaBanner />
      <StatsSection />
      <ClientsMarquee />
    </>
  );
}
