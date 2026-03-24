'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Store, CreditCard, Truck, Bot, Palette, MessageSquare,
  BarChart3, Globe, Zap,
} from 'lucide-react';
import Footer from '@/components/landing/Footer';

const detailedFeatures = [
  {
    icon: Store,
    titleKey: 'store',
    descKey: 'storeDesc',
    color: 'from-violet-500 to-purple-600',
    details: [
      'Création de boutique en quelques clics',
      'Personnalisation complète (couleurs, fonts, logo)',
      'Templates professionnels pré-faits',
      'Sous-domaine gratuit votreboutique.soukly.com',
      'Domaine personnalisé (Pro+)',
    ],
  },
  {
    icon: CreditCard,
    titleKey: 'payment',
    descKey: 'paymentDesc',
    color: 'from-amber-500 to-orange-600',
    details: [
      'Paiement à la livraison (COD)',
      'CCP / BaridiMob',
      'Chargily Pay (Edahabia + CIB)',
      'Stripe pour les paiements internationaux',
      'Virement bancaire & Flexy',
    ],
  },
  {
    icon: Truck,
    titleKey: 'shipping',
    descKey: 'shippingDesc',
    color: 'from-blue-500 to-cyan-600',
    details: [
      'Yalidine, ZR Express, Ecotrack, Procolis',
      'Calcul automatique des frais par wilaya',
      'Création de colis en un clic',
      'Suivi en temps réel',
      'Comparaison de tarifs entre transporteurs',
    ],
  },
  {
    icon: Bot,
    titleKey: 'ai',
    descKey: 'aiDesc',
    color: 'from-purple-500 to-pink-600',
    details: [
      'Assistant IA avec accès à vos données',
      'Génération de descriptions produits',
      'Analyse des ventes et suggestions',
      'Exécution d\'actions sur commande',
      'Powered by Claude (Anthropic)',
    ],
  },
  {
    icon: Palette,
    titleKey: 'landing',
    descKey: 'landingDesc',
    color: 'from-rose-500 to-red-600',
    details: [
      'Génération par IA en un prompt',
      'Editor drag & drop',
      'Templates optimisés conversion',
      'Preview mobile/tablet/desktop',
      'Copie persuasive automatique',
    ],
  },
  {
    icon: MessageSquare,
    titleKey: 'sms',
    descKey: 'smsDesc',
    color: 'from-green-500 to-emerald-600',
    details: [
      'SMS en masse vers numéros +213',
      'Ciblage par wilaya, tags, dépenses',
      'Templates personnalisables',
      'Variables dynamiques',
      'Planification des envois',
    ],
  },
  {
    icon: BarChart3,
    titleKey: 'analytics',
    descKey: 'analyticsDesc',
    color: 'from-indigo-500 to-blue-600',
    details: [
      'Revenue, commandes, visiteurs en temps réel',
      'Carte d\'Algérie des ventes par wilaya',
      'Top produits et catégories',
      'Taux de conversion et retour',
      'Export CSV / PDF',
    ],
  },
  {
    icon: Globe,
    titleKey: 'multilang',
    descKey: 'multilangDesc',
    color: 'from-teal-500 to-cyan-600',
    details: [
      'Interface en Arabe (RTL complet)',
      'Interface en Français',
      'Interface en Anglais',
      'Descriptions produits multilingues',
      'SEO optimisé par langue',
    ],
  },
  {
    icon: Zap,
    titleKey: 'automation',
    descKey: 'automationDesc',
    color: 'from-yellow-500 to-amber-600',
    details: [
      'SMS auto à la confirmation de commande',
      'Alertes de stock faible',
      'Tagging VIP automatique',
      'Rappel panier abandonné',
      'Workflows personnalisables',
    ],
  },
];

export default function FeaturesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('features');
  const navT = useTranslations('nav');

  return (
    <main className="min-h-screen bg-background dark:bg-background-dark">
      {/* Header */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 text-gray-500" />
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold font-display text-gray-900 dark:text-white">Soukly</span>
          </Link>
          <Link
            href={`/${locale}/auth/register`}
            className="px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition-all"
          >
            {navT('register')}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Detailed features */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {detailedFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={feature.titleKey}
                className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:direction-rtl' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className={isReversed ? 'md:order-2' : ''}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">
                    {t(feature.titleKey as 'store')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {t(feature.descKey as 'storeDesc')}
                  </p>
                  <ul className="space-y-3">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-5 h-5 text-success shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Feature visual */}
                <div className={`${isReversed ? 'md:order-1' : ''}`}>
                  <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${feature.color} p-[2px]`}>
                    <div className="w-full h-full rounded-2xl bg-white dark:bg-surface-dark flex items-center justify-center">
                      <div className="text-center p-8">
                        <Icon className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                          Aperçu interactif
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Prêt à commencer ?
          </h2>
          <p className="mt-4 text-primary-200 text-lg">
            Créez votre boutique gratuitement en quelques minutes.
          </p>
          <Link
            href={`/${locale}/auth/register`}
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
          >
            Commencer maintenant
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
