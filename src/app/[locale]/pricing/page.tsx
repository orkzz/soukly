'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PricingCards from '@/components/landing/PricingCards';
import Footer from '@/components/landing/Footer';

export default function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background dark:bg-background-dark">
      {/* Simple header */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 text-gray-500" />
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold font-display text-gray-900 dark:text-white">Soukly</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/auth/login`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {t('nav.login')}
            </Link>
            <Link
              href={`/${locale}/auth/register`}
              className="px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition-all"
            >
              {t('nav.register')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Pricing section */}
      <PricingCards locale={locale} />

      {/* FAQ quick section */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold font-display text-center text-gray-900 dark:text-white mb-8">
          {t('faq.title')}
        </h2>
        <div className="space-y-3">
          {[1, 2, 8].map((i) => (
            <details
              key={i}
              className="group rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-medium text-gray-900 dark:text-white">
                <span>{t(`faq.q${i}` as `faq.q1`)}</span>
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ms-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400">
                {t(`faq.a${i}` as `faq.a1`)}
              </p>
            </details>
          ))}
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
