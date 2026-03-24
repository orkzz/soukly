'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const integrations = [
  { name: 'BaridiMob', color: '#FF6B00', initials: 'BM' },
  { name: 'CCP', color: '#2563EB', initials: 'CCP' },
  { name: 'Chargily', color: '#7C3AED', initials: 'CH' },
  { name: 'Edahabia', color: '#D97706', initials: 'ED' },
  { name: 'Yalidine', color: '#059669', initials: 'YL' },
  { name: 'ZR Express', color: '#DC2626', initials: 'ZR' },
  { name: 'Ecotrack', color: '#0891B2', initials: 'ET' },
  { name: 'Procolis', color: '#7C3AED', initials: 'PC' },
  { name: 'Flexy', color: '#F59E0B', initials: 'FX' },
  { name: 'WhatsApp', color: '#25D366', initials: 'WA' },
  { name: 'Facebook', color: '#1877F2', initials: 'FB' },
  { name: 'Instagram', color: '#E4405F', initials: 'IG' },
  { name: 'TikTok', color: '#000000', initials: 'TT' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 200 } },
};

export default function IntegrationShowcase() {
  const t = useTranslations('integrations');

  return (
    <section className="py-24">
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
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {integrations.map((integration) => (
            <motion.div
              key={integration.name}
              variants={item}
              whileHover={{ scale: 1.1 }}
              className="group relative"
            >
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: integration.color + '20' }}
                />
                <div
                  className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                  style={{ backgroundColor: integration.color }}
                >
                  {integration.initials}
                </div>
                <span className="relative mt-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {integration.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
