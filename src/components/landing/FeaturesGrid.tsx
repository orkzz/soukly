'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Store,
  CreditCard,
  Truck,
  Bot,
  Palette,
  MessageSquare,
  BarChart3,
  Globe,
  Zap,
} from 'lucide-react';

const featureIcons = [Store, CreditCard, Truck, Bot, Palette, MessageSquare, BarChart3, Globe, Zap];

const featureKeys = [
  'store', 'payment', 'shipping', 'ai', 'landing', 'sms', 'analytics', 'multilang', 'automation',
] as const;

const featureColors = [
  'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-600',
  'from-blue-500 to-cyan-600',
  'from-purple-500 to-pink-600',
  'from-rose-500 to-red-600',
  'from-green-500 to-emerald-600',
  'from-indigo-500 to-blue-600',
  'from-teal-500 to-cyan-600',
  'from-yellow-500 to-amber-600',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function FeaturesGrid() {
  const t = useTranslations('features');

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div
                key={key}
                variants={item}
                className="group relative p-6 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${featureColors[index]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t(key as `${typeof key}`)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t(`${key}Desc` as `${typeof key}Desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
