'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Filter,
  Download,
  Phone,
  Eye,
  Printer,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import DataTable from '@/components/dashboard/DataTable';
import OrderStatusBadge from '@/components/dashboard/OrderStatusBadge';
import { formatPrice, formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  shippingWilaya: string;
  total: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  [key: string]: unknown;
}

const sampleOrders: Order[] = [
  { id: '1', orderNumber: 'SOK-A4B2C1', customerName: 'Ahmed Benali', customerPhone: '0555123456', shippingWilaya: 'Alger', total: 8500, status: 'PENDING', paymentMethod: 'COD', paymentStatus: 'UNPAID', createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: '2', orderNumber: 'SOK-D7E3F2', customerName: 'Fatima Zerrouki', customerPhone: '0661234567', shippingWilaya: 'Oran', total: 12000, status: 'CONFIRMED', paymentMethod: 'BARIDIMOB', paymentStatus: 'PAID', createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: '3', orderNumber: 'SOK-G8H4I5', customerName: 'Karim Hadj', customerPhone: '0770123456', shippingWilaya: 'Constantine', total: 3500, status: 'SHIPPED', paymentMethod: 'COD', paymentStatus: 'UNPAID', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '4', orderNumber: 'SOK-J9K5L6', customerName: 'Nadia Boudiaf', customerPhone: '0555987654', shippingWilaya: 'Sétif', total: 25000, status: 'DELIVERED', paymentMethod: 'CHARGILY', paymentStatus: 'PAID', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '5', orderNumber: 'SOK-M1N6O7', customerName: 'Youcef Mebarki', customerPhone: '0661987654', shippingWilaya: 'Tizi Ouzou', total: 6800, status: 'PROCESSING', paymentMethod: 'CCP', paymentStatus: 'PAID', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '6', orderNumber: 'SOK-P2Q7R8', customerName: 'Amira Haddad', customerPhone: '0770987654', shippingWilaya: 'Blida', total: 4200, status: 'CANCELLED', paymentMethod: 'COD', paymentStatus: 'UNPAID', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: '7', orderNumber: 'SOK-S3T8U9', customerName: 'Mohamed Kaci', customerPhone: '0555111222', shippingWilaya: 'Bejaia', total: 18500, status: 'IN_TRANSIT', paymentMethod: 'BARIDIMOB', paymentStatus: 'PAID', createdAt: new Date(Date.now() - 43200000).toISOString() },
  { id: '8', orderNumber: 'SOK-V4W9X0', customerName: 'Samia Belkaid', customerPhone: '0661333444', shippingWilaya: 'Annaba', total: 9200, status: 'RETURNED', paymentMethod: 'COD', paymentStatus: 'UNPAID', createdAt: new Date(Date.now() - 259200000).toISOString() },
];

const statusFilters = [
  { key: 'all', label: 'Tout' },
  { key: 'PENDING', label: 'En attente' },
  { key: 'CONFIRMED', label: 'Confirmé' },
  { key: 'PROCESSING', label: 'En préparation' },
  { key: 'SHIPPED', label: 'Expédié' },
  { key: 'DELIVERED', label: 'Livré' },
  { key: 'RETURNED', label: 'Retourné' },
  { key: 'CANCELLED', label: 'Annulé' },
];

const paymentLabels: Record<string, string> = {
  COD: 'COD',
  CCP: 'CCP',
  BARIDIMOB: 'BaridiMob',
  CHARGILY: 'Chargily',
  EDAHABIA: 'Edahabia',
  CIB: 'CIB',
  STRIPE: 'Carte',
  BANK_TRANSFER: 'Virement',
  FLEXY: 'Flexy',
};

export default function OrdersPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = statusFilter === 'all'
    ? sampleOrders
    : sampleOrders.filter((o) => o.status === statusFilter);

  const columns = [
    {
      key: 'orderNumber',
      label: 'Commande',
      sortable: true,
      render: (item: Order) => (
        <span className="font-mono font-medium text-primary">{item.orderNumber}</span>
      ),
    },
    {
      key: 'customerName',
      label: 'Client',
      sortable: true,
      render: (item: Order) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{item.customerName}</p>
          <p className="text-xs text-gray-500">{item.customerPhone}</p>
        </div>
      ),
    },
    {
      key: 'shippingWilaya',
      label: 'Wilaya',
      sortable: true,
      className: 'hidden sm:table-cell',
      render: (item: Order) => (
        <span className="text-gray-600 dark:text-gray-400">{item.shippingWilaya}</span>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (item: Order) => (
        <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(item.total)}</span>
      ),
    },
    {
      key: 'paymentMethod',
      label: 'Paiement',
      className: 'hidden md:table-cell',
      render: (item: Order) => (
        <span className="text-gray-600 dark:text-gray-400 text-xs">
          {paymentLabels[item.paymentMethod] || item.paymentMethod}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Order) => <OrderStatusBadge status={item.status} />,
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      className: 'hidden lg:table-cell',
      render: (item: Order) => (
        <span className="text-gray-500 text-xs">{formatRelativeTime(item.createdAt)}</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      className: 'w-10',
      render: (item: Order) => (
        <Dropdown
          trigger={
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <MoreVertical size={16} />
            </button>
          }
        >
          <DropdownItem icon={<Eye size={14} />} onClick={() => router.push(`/${locale}/dashboard/orders/${item.id}`)}>
            Voir détails
          </DropdownItem>
          <DropdownItem icon={<Phone size={14} />}>
            Appeler client
          </DropdownItem>
          <DropdownItem icon={<Printer size={14} />}>
            Imprimer facture
          </DropdownItem>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            {t('orders')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {sampleOrders.length} commandes au total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leftIcon={<Filter size={14} />} size="sm">
            Filtrer
          </Button>
          <Button variant="secondary" leftIcon={<Download size={14} />} size="sm">
            Exporter
          </Button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {statusFilters.map((filter) => {
          const count = filter.key === 'all'
            ? sampleOrders.length
            : sampleOrders.filter((o) => o.status === filter.key).length;
          return (
            <button
              key={filter.key}
              onClick={() => setStatusFilter(filter.key)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                statusFilter === filter.key
                  ? 'bg-primary/10 text-primary dark:bg-primary/20'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {filter.label}
              {count > 0 && (
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full',
                  statusFilter === filter.key
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <DataTable
        data={filteredOrders}
        columns={columns}
        searchKey="customerName"
        searchPlaceholder="Rechercher un client..."
        onRowClick={(item) => router.push(`/${locale}/dashboard/orders/${item.id}`)}
      />
    </div>
  );
}
