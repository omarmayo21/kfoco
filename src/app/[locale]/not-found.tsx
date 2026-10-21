import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-24 text-center">
      <div>
        <p className="font-display text-[7rem] font-medium leading-none text-steel-tint">404</p>
        <h1 className="mt-4 font-display text-3xl text-ink">{t('title')}</h1>
        <p className="mx-auto mt-4 max-w-md text-textc-muted">{t('text')}</p>
        <Link
          href="/"
          className="btn btn-primary group mt-10 inline-flex"
        >
          <span>{t('backHome')}</span>
        </Link>
      </div>
    </section>
  );
}
