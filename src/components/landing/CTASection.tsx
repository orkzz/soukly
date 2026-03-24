'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#3B0764]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>+2,500 marchands nous font confiance</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-primary-200">
            {t('subtitle')}
          </p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="email"
              placeholder={t('placeholder')}
              className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 backdrop-blur-sm transition-all"
            />
            <button className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap">
              {t('button')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <p className="mt-4 text-sm text-white/40">
            Gratuit pour commencer. Aucune carte requise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
