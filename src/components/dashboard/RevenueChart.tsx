'use client';

import { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { cn } from '@/lib/utils';

const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short' }),
      revenue: Math.floor(Math.random() * 200000) + 50000,
      orders: Math.floor(Math.random() * 50) + 10,
    });
  }
  return data;
};

const data = generateData();

type Period = '7d' | '30d' | '90d';

export default function RevenueChart() {
  const [period, setPeriod] = useState<Period>('30d');

  const displayData =
    period === '7d' ? data.slice(-7) : period === '90d' ? data : data;

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Évolution des revenus en DZD
          </p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(['7d', '30d', '90d'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                period === p
                  ? 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:opacity-20" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value >= 1000 ? `${(value / 1000).toFixed(0)}k` : String(value)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1333',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(value) => [`${Number(value).toLocaleString()} DZD`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7C3AED"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
