'use client';

import { DollarSign, CreditCard, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import DataTable from '@/components/dashboard/DataTable';
import { formatPrice, formatRelativeTime } from '@/lib/utils';

interface Payment {
  id: string;
  orderNumber: string;
  customer: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
  [key: string]: unknown;
}

const methodLabels: Record<string, string> = {
  COD: 'Paiement livraison',
  CCP: 'CCP',
  BARIDIMOB: 'BaridiMob',
  CHARGILY: 'Chargily',
  EDAHABIA: 'Edahabia',
  CIB: 'CIB',
  STRIPE: 'Carte bancaire',
  BANK_TRANSFER: 'Virement',
  FLEXY: 'Flexy',
};

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' }> = {
  PAID: { label: 'Payé', variant: 'success' },
  UNPAID: { label: 'Non payé', variant: 'warning' },
  PARTIALLY_PAID: { label: 'Partiel', variant: 'info' },
  REFUNDED: { label: 'Remboursé', variant: 'danger' },
};

const samplePayments: Payment[] = [
  { id: '1', orderNumber: 'SOK-A4B2C1', customer: 'Ahmed Benali', amount: 9100, method: 'COD', status: 'UNPAID', createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: '2', orderNumber: 'SOK-D7E3F2', customer: 'Fatima Zerrouki', amount: 12600, method: 'BARIDIMOB', status: 'PAID', createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: '3', orderNumber: 'SOK-G8H4I5', customer: 'Karim Hadj', amount: 4100, method: 'COD', status: 'UNPAID', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '4', orderNumber: 'SOK-J9K5L6', customer: 'Nadia Boudiaf', amount: 25600, method: 'CHARGILY', status: 'PAID', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '5', orderNumber: 'SOK-M1N6O7', customer: 'Youcef Mebarki', amount: 7400, method: 'CCP', status: 'PAID', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '6', orderNumber: 'SOK-P2Q7R8', customer: 'Amira Haddad', amount: 4800, method: 'EDAHABIA', status: 'REFUNDED', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export default function PaymentsPage() {
  const totalRevenue = samplePayments.filter((p) => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0);
  const unpaidTotal = samplePayments.filter((p) => p.status === 'UNPAID').reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    { label: 'Revenue totale', value: formatPrice(totalRevenue), icon: DollarSign, color: 'text-success bg-success/10' },
    { label: 'En attente', value: formatPrice(unpaidTotal), icon: Clock, color: 'text-warning bg-warning/10' },
    { label: 'Transactions', value: String(samplePayments.length), icon: CreditCard, color: 'text-primary bg-primary/10' },
    { label: 'Taux encaissement', value: '68%', icon: TrendingUp, color: 'text-info bg-info/10' },
  ];

  const columns = [
    {
      key: 'orderNumber',
      label: 'Commande',
      render: (item: Payment) => (
        <span className="font-mono font-medium text-primary">{item.orderNumber}</span>
      ),
    },
    {
      key: 'customer',
      label: 'Client',
      sortable: true,
      render: (item: Payment) => (
        <span className="text-gray-900 dark:text-white">{item.customer}</span>
      ),
    },
    {
      key: 'amount',
      label: 'Montant',
      sortable: true,
      render: (item: Payment) => (
        <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(item.amount)}</span>
      ),
    },
    {
      key: 'method',
      label: 'Méthode',
      render: (item: Payment) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {methodLabels[item.method] || item.method}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Payment) => {
        const config = statusConfig[item.status] || { label: item.status, variant: 'default' as const };
        return <Badge variant={config.variant} dot size="sm">{config.label}</Badge>;
      },
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      className: 'hidden md:table-cell',
      render: (item: Payment) => (
        <span className="text-xs text-gray-500">{formatRelativeTime(item.createdAt)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Paiements</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Suivez les paiements et encaissements
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} padding="sm" hover>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${stat.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Payment methods breakdown */}
      <Card>
        <CardContent>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Répartition par méthode de paiement
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { method: 'COD', count: 2, percentage: 33, color: 'bg-amber-500' },
              { method: 'BaridiMob', count: 1, percentage: 17, color: 'bg-orange-500' },
              { method: 'Chargily', count: 1, percentage: 17, color: 'bg-purple-500' },
              { method: 'CCP', count: 1, percentage: 17, color: 'bg-blue-500' },
            ].map((item) => (
              <div key={item.method} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="3" className="dark:stroke-gray-700" />
                    <circle
                      cx="18" cy="18" r="14" fill="none" strokeWidth="3"
                      strokeDasharray={`${item.percentage} ${100 - item.percentage}`}
                      className={item.color.replace('bg-', 'stroke-')}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
                    {item.percentage}%
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.method}</p>
                <p className="text-xs text-gray-500">{item.count} transactions</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payments table */}
      <DataTable
        data={samplePayments}
        columns={columns}
        searchKey="customer"
        searchPlaceholder="Rechercher un paiement..."
      />
    </div>
  );
}
