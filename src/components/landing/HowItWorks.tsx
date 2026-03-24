'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Store, Package, Rocket } from 'lucide-react';

const steps = [
  { key: 'step1', icon: Store, color: 'from-violet-500 to-purple-600' },
  { key: 'step2', icon: Package, color: 'from-amber-500 to-orange-600' },
  { key: 'step3', icon: Rocket, color: 'from-green-500 to-emerald-600' },
] as const;

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  return (
    <section className="py-24 bg-gray-50/80 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
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
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 start-[20%] end-[20%] h-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="relative inline-block mb-8">
                  <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-10 flex items-center justify-center shadow-lg`}>
                    <div className="w-24 h-24 rounded-xl bg-white dark:bg-surface-dark flex items-center justify-center">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <motion.span
                    className="absolute -top-3 -end-3 w-10 h-10 rounded-full bg-primary text-white text-lg font-bold flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: 0.4 + index * 0.2 }}
                  >
                    {index + 1}
                  </motion.span>
                </div>

                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">
                  {t(`${step.key}Title` as `${typeof step.key}Title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                  {t(`${step.key}Desc` as `${typeof step.key}Desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
