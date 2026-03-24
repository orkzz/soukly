'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, DollarSign, Eye, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';

interface StatCard {
  label: string;
  value: string;
  change: number;
  icon: typeof ShoppingBag;
  color: string;
  bgColor: string;
}

interface StatsCardsProps {
  stats?: StatCard[];
}

const defaultStats: StatCard[] = [
  {
    label: 'Commandes du jour',
    value: '24',
    change: 12.5,
    icon: ShoppingBag,
    color: 'text-primary',
    bgColor: 'bg-primary/10 dark:bg-primary/20',
  },
  {
    label: 'Revenue du jour',
    value: formatPrice(145000),
    change: 8.2,
    icon: DollarSign,
    color: 'text-success',
    bgColor: 'bg-success/10 dark:bg-success/20',
  },
  {
    label: 'Visiteurs',
    value: '1,234',
    change: -3.1,
    icon: Eye,
    color: 'text-info',
    bgColor: 'bg-info/10 dark:bg-info/20',
  },
  {
    label: 'Taux de conversion',
    value: '3.2%',
    change: 1.8,
    icon: TrendingUp,
    color: 'text-accent',
    bgColor: 'bg-accent/10 dark:bg-accent/20',
  },
];

function MiniSparkline({ positive }: { positive: boolean }) {
  const points = positive
    ? 'M0,20 L5,18 L10,15 L15,16 L20,12 L25,14 L30,8 L35,10 L40,5'
    : 'M0,5 L5,8 L10,6 L15,10 L20,12 L25,9 L30,15 L35,18 L40,20';

  return (
    <svg width="40" height="24" viewBox="0 0 40 24" className="shrink-0">
      <path
        d={points}
        fill="none"
        stroke={positive ? '#10B981' : '#EF4444'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StatsCards({ stats = defaultStats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change >= 0;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn('p-2.5 rounded-lg', stat.bgColor)}>
                <Icon size={20} className={stat.color} />
              </div>
              <MiniSparkline positive={isPositive} />
            </div>

            <p className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              {stat.value}
            </p>

            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 text-xs font-semibold',
                  isPositive ? 'text-success' : 'text-danger'
                )}
              >
                {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(stat.change)}%
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
