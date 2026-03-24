import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/components/ui/Toast';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Soukly — La plateforme e-commerce algérienne',
    template: '%s | Soukly',
  },
  description:
    'Créez votre boutique en ligne en 5 minutes. Paiement CCP, BaridiMob, livraison Yalidine, et IA assistant. La plateforme pensée pour l\'Algérie.',
  keywords: [
    'e-commerce',
    'algérie',
    'boutique en ligne',
    'CCP',
    'BaridiMob',
    'Yalidine',
    'vente en ligne',
  ],
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? 'font-arabic' : 'font-body';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${fontClass} antialiased min-h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <ToastProvider>
              {children}
            </ToastProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
