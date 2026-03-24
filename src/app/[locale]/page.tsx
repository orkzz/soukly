'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import StatsCounter from '@/components/landing/StatsCounter';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import IntegrationShowcase from '@/components/landing/IntegrationShowcase';
import PricingCards from '@/components/landing/PricingCards';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const Hero3DPhone = dynamic(() => import('@/components/landing/Hero3DPhone'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <section className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="h-16 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            <div className="h-6 w-2/3 bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse" />
            <div className="flex gap-4">
              <div className="h-12 w-40 bg-primary/20 rounded-xl animate-pulse" />
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            </div>
          </div>
          <div className="h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-3xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-background dark:bg-background-dark">
      {/* Navbar */}
      <Navbar locale={locale} />

      {/* Hero with 3D Phone */}
      <Hero3DPhone locale={locale} />

      {/* Stats Counter */}
      <StatsCounter />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* How It Works */}
      <HowItWorks />

      {/* Integrations */}
      <IntegrationShowcase />

      {/* Pricing */}
      <PricingCards locale={locale} />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer locale={locale} />
    </main>
  );
}

function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold font-display text-gray-900 dark:text-white">
              Soukly
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors">
              {t('features')}
            </Link>
            <Link href="#pricing" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors">
              {t('pricing')}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} className="hidden sm:flex" />
            <Link
              href={`/${locale}/auth/login`}
              className="text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 transition-colors"
            >
              {t('login')}
            </Link>
            <Link
              href={`/${locale}/auth/register`}
              className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              {t('register')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FAQSection() {
  const t = useTranslations('faq');

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 dark:text-white">
            {t('title')}
          </h2>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <details
              key={i}
              className="group rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <span>{t(`q${i}` as `q1`)}</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-300 shrink-0 ms-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(`a${i}` as `a1`)}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
