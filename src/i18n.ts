import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['ar', 'fr', 'en'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`../public/locales/${locale}/common.json`)).default,
  };
});
