'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import StatsCounter from '@/components/landing/StatsCounter';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import IntegrationShowcase from '@/components/landing/IntegrationShowcase';
import PricingCards from '@/components/landing/PricingCards';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import FloatingNotifications from '@/components/landing/FloatingNotifications';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-background dark:bg-background-dark">
      <Navbar locale={locale} />
      <HeroSection locale={locale} />
      <StatsCounter />
      <FeaturesGrid />
      <HowItWorks />
      <IntegrationShowcase />
      <PricingCards locale={locale} />
      <TestimonialsCarousel />
      <FAQSection />
      <CTASection />
      <Footer locale={locale} />
    </main>
  );
}

function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-900/20 dark:via-background-dark dark:to-background-dark" />
      <div className="absolute top-0 start-0 w-[600px] h-[600px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 end-0 w-[500px] h-[500px] rounded-full bg-accent/5 dark:bg-accent/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Text */}
          <motion.div
            className="text-center lg:text-start order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-[1.1] text-gray-900 dark:text-white">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href={`/${locale}/auth/register`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
              >
                {t('hero.cta')}
                <svg className="ms-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary border-2 border-primary/20 hover:border-primary/40 rounded-xl transition-all duration-300 hover:bg-primary/5"
              >
                <svg className="me-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {t('hero.ctaSecondary')}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400">
              {[t('hero.badge1'), t('hero.badge2'), t('hero.badge3')].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Phone mockup + notifications */}
          <motion.div
            className="relative order-1 lg:order-2 flex items-center justify-center h-[500px] sm:h-[600px] lg:h-[700px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FloatingNotifications />

            {/* Phone mockup CSS */}
            <div className="relative w-72 h-[580px] animate-float">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/20 shadow-glow" />
              <div className="absolute inset-2 rounded-[2.5rem] bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 overflow-hidden">
                {/* Status bar */}
                <div className="h-10 bg-primary flex items-center px-5">
                  <span className="text-white text-xs font-bold">Soukly Store</span>
                </div>
                {/* Search */}
                <div className="px-3 py-2">
                  <div className="h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center px-3">
                    <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="ms-2 h-2.5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
                {/* Products grid */}
                <div className="px-3 grid grid-cols-2 gap-2">
                  {[
                    { color: 'bg-purple-100 dark:bg-purple-900/30', price: '3,500' },
                    { color: 'bg-amber-100 dark:bg-amber-900/30', price: '2,800' },
                    { color: 'bg-green-100 dark:bg-green-900/30', price: '5,200' },
                    { color: 'bg-pink-100 dark:bg-pink-900/30', price: '1,900' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-2">
                      <div className={`aspect-square rounded-md ${item.color} mb-1.5`} />
                      <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                      <div className="h-2.5 w-1/2 bg-primary/30 rounded font-mono text-[8px] text-primary" />
                    </div>
                  ))}
                </div>
                {/* Orders list */}
                <div className="px-3 mt-2 space-y-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 rounded-lg bg-gray-50 dark:bg-gray-800/30 flex items-center px-2.5 gap-2">
                      <div className="w-7 h-7 rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="flex-1">
                        <div className="h-2 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                        <div className="h-1.5 w-1/3 bg-gray-100 dark:bg-gray-800 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom nav */}
                <div className="absolute bottom-0 inset-x-0 h-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark flex items-center justify-around px-4">
                  {['🏠', '🔍', '🛒', '👤'].map((icon, i) => (
                    <span key={i} className="text-base opacity-60">{icon}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
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
