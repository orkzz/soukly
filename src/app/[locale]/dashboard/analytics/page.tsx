'use client';

import { useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';
import { TrendingUp, ShoppingBag, Eye, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn, formatPrice } from '@/lib/utils';

type DateRange = '7d' | '30d' | '90d' | 'custom';

const revenueData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short' }),
  revenue: Math.floor(Math.random() * 200000) + 50000,
  orders: Math.floor(Math.random() * 40) + 10,
}));

const ordersByStatus = [
  { name: 'Livré', value: 156, color: '#10B981' },
  { name: 'En transit', value: 34, color: '#3B82F6' },
  { name: 'En attente', value: 18, color: '#F59E0B' },
  { name: 'Retourné', value: 8, color: '#EF4444' },
  { name: 'Annulé', value: 5, color: '#6B7280' },
];

const topProducts = [
  { name: 'Robe Kabyle', sales: 45, revenue: 382500 },
  { name: 'Bijoux Berbères', sales: 38, revenue: 570000 },
  { name: 'Caftan Moderne', sales: 32, revenue: 384000 },
  { name: 'Gandoura Homme', sales: 28, revenue: 182000 },
  { name: 'Foulard Brodé', sales: 24, revenue: 84000 },
];

const topWilayas = [
  { name: 'Alger', orders: 89, revenue: 890000, percentage: 35 },
  { name: 'Oran', orders: 45, revenue: 450000, percentage: 18 },
  { name: 'Constantine', orders: 32, revenue: 320000, percentage: 13 },
  { name: 'Sétif', orders: 28, revenue: 280000, percentage: 11 },
  { name: 'Tizi Ouzou', orders: 22, revenue: 220000, percentage: 9 },
  { name: 'Blida', orders: 18, revenue: 180000, percentage: 7 },
  { name: 'Béjaïa', orders: 15, revenue: 150000, percentage: 6 },
  { name: 'Annaba', orders: 12, revenue: 120000, percentage: 5 },
];

const trafficSources = [
  { source: 'Direct', visits: 2340, percentage: 40 },
  { source: 'Facebook', visits: 1560, percentage: 27 },
  { source: 'Instagram', visits: 980, percentage: 17 },
  { source: 'Google', visits: 520, percentage: 9 },
  { source: 'WhatsApp', visits: 410, percentage: 7 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  const kpis = [
    { label: 'Revenue', value: formatPrice(2450000), change: 12.5, icon: TrendingUp, color: 'text-success bg-success/10' },
    { label: 'Commandes', value: '221', change: 8.3, icon: ShoppingBag, color: 'text-primary bg-primary/10' },
    { label: 'Panier moyen', value: formatPrice(11086), change: -2.1, icon: ShoppingBag, color: 'text-accent bg-accent/10' },
    { label: 'Visiteurs', value: '5,810', change: 15.7, icon: Eye, color: 'text-info bg-info/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Analytiques</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Performances de votre boutique</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(['7d', '30d', '90d'] as DateRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                  dateRange === range
                    ? 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm" leftIcon={<Download size={14} />}>Exporter</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change >= 0;
          return (
            <Card key={kpi.label} padding="sm" hover>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${kpi.color}`}><Icon size={16} /></div>
                  <span className={cn('text-xs font-semibold flex items-center gap-0.5', isPositive ? 'text-success' : 'text-danger')}>
                    {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(kpi.change)}%
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:opacity-20" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)} />
                <Tooltip contentStyle={{ backgroundColor: '#1A1333', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} formatter={(value) => [`${Number(value).toLocaleString()} DZD`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2} fill="url(#analyticsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Orders by status */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Commandes par status</h3>
            <div className="flex items-center gap-6">
              <div className="w-40 h-40 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ordersByStatus} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                      {ordersByStatus.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 flex-1">
                {ordersByStatus.map((status) => (
                  <div key={status.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                      <span className="text-gray-600 dark:text-gray-400">{status.name}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{status.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top products */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Top produits</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A1333', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                  <Bar dataKey="sales" fill="#7C3AED" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales by wilaya */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Ventes par wilaya</h3>
            <div className="space-y-3">
              {topWilayas.map((wilaya) => (
                <div key={wilaya.name} className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300 w-24 shrink-0">{wilaya.name}</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${wilaya.percentage}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-16 text-end">{wilaya.orders} cmd</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-white w-20 text-end">{formatPrice(wilaya.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic sources */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Sources de trafic</h3>
            <div className="space-y-3">
              {trafficSources.map((source) => (
                <div key={source.source} className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300 w-24 shrink-0">{source.source}</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${source.percentage}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-16 text-end">{source.visits.toLocaleString()}</span>
                  <Badge variant="outline" size="sm">{source.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
