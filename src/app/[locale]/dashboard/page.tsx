'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Plus,
  ShoppingBag,
  Megaphone,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Package,
  AlertTriangle,
} from 'lucide-react';
import StatsCards from '@/components/dashboard/StatsCards';
import RevenueChart from '@/components/dashboard/RevenueChart';
import RecentOrders from '@/components/dashboard/RecentOrders';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('dashboard');
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Utilisateur';

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            {t('welcome')} {firstName} 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString('fr-DZ', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <Link
          href={`/${locale}/dashboard/products/new`}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg shadow-sm transition-all hover:shadow-md"
        >
          <Plus size={16} />
          {t('addProduct')}
        </Link>
      </motion.div>

      {/* Stats */}
      <StatsCards />

      {/* Chart + Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              {t('quickActions')}
            </h3>
            <div className="space-y-2">
              {[
                { icon: Plus, label: t('addProduct'), href: `/${locale}/dashboard/products/new`, color: 'text-primary bg-primary/10' },
                { icon: ShoppingBag, label: t('viewOrders'), href: `/${locale}/dashboard/orders`, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
                { icon: Megaphone, label: t('launchCampaign'), href: `/${locale}/dashboard/marketing`, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {action.label}
                    </span>
                    <ArrowRight size={14} className="ms-auto text-gray-300 dark:text-gray-600 group-hover:text-gray-500" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-xl border border-primary/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-primary" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {t('aiSuggestions')}
              </h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: AlertTriangle,
                  text: '15 produits à faible stock — réapprovisionnez avant la rupture',
                  color: 'text-amber-500',
                },
                {
                  icon: TrendingUp,
                  text: 'Vos ventes à Oran ont augmenté de 45% — lancez une campagne ciblée',
                  color: 'text-success',
                },
                {
                  icon: Package,
                  text: '3 commandes en attente depuis 48h — confirmez-les rapidement',
                  color: 'text-primary',
                },
              ].map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-2.5 p-3 bg-white/60 dark:bg-surface-dark/60 rounded-lg backdrop-blur-sm"
                  >
                    <Icon size={16} className={`${suggestion.color} shrink-0 mt-0.5`} />
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                      {suggestion.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders locale={locale} />
    </div>
  );
}
