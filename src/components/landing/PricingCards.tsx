'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    key: 'free',
    price: 0,
    features: ['50 produits', '100 commandes/mois', 'Boutique en ligne', 'Paiement COD', 'Sous-domaine .soukly.com'],
    highlighted: false,
  },
  {
    key: 'starter',
    price: 2900,
    features: ['500 produits', 'Commandes illimitées', 'Tous les paiements', 'Livraison auto', 'SMS Marketing (500/mois)', 'Analytics de base', 'Support email'],
    highlighted: false,
  },
  {
    key: 'pro',
    price: 5900,
    features: ['Produits illimités', 'Commandes illimitées', 'IA Assistant', 'Landing Builder IA', 'Automatisations', 'SMS illimités', 'Analytics avancés', 'Domaine personnalisé', 'Support prioritaire'],
    highlighted: true,
  },
  {
    key: 'enterprise',
    price: 14900,
    features: ['Tout dans Pro', 'API access', 'Support dédié 24/7', 'Multi-boutiques', 'White label', 'SLA garanti', 'Intégrations custom', 'Formation équipe'],
    highlighted: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface PricingCardsProps {
  locale: string;
}

export default function PricingCards({ locale }: PricingCardsProps) {
  const t = useTranslations('pricing');
  const [isYearly, setIsYearly] = useState(false);

  const getPrice = (monthly: number) => {
    if (monthly === 0) return '0';
    const price = isYearly ? Math.round(monthly * 0.8) : monthly;
    return price.toLocaleString('fr-DZ');
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>

          {/* Monthly/Yearly toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white dark:bg-surface-dark rounded-full p-1.5 border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              {t('monthly')}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              {t('yearly')}
              <span className="text-xs bg-accent/20 text-accent-dark dark:text-accent-light px-2 py-0.5 rounded-full font-semibold">
                {t('yearlyDiscount')}
              </span>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.key}
              variants={item}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-white dark:bg-surface-dark border-2 border-primary shadow-lg shadow-primary/10 lg:scale-105 lg:-my-4 lg:py-10'
                  : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:shadow-md'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 start-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1.5 text-xs font-bold bg-primary text-white rounded-full shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('popular')}
                </span>
              )}

              <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                {t(plan.key as 'free' | 'starter' | 'pro' | 'enterprise')}
              </h3>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold font-display text-gray-900 dark:text-white">
                  {getPrice(plan.price)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.price > 0 ? `DZD${t('perMonth')}` : 'DZD'}
                </span>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.key === 'enterprise' ? '#contact' : `/${locale}/auth/register`}
                className={`mt-8 w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md hover:-translate-y-0.5'
                    : 'border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary'
                }`}
              >
                {plan.price === 0
                  ? t('startFree')
                  : plan.key === 'enterprise'
                  ? t('contactUs')
                  : t('choosePlan')}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
