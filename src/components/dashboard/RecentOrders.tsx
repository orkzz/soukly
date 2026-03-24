'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatRelativeTime } from '@/lib/utils';

interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  wilaya: string;
  total: number;
  status: string;
  createdAt: string;
}

const statusVariants: Record<string, 'default' | 'success' | 'danger' | 'warning' | 'info'> = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  PROCESSING: 'default',
  SHIPPED: 'default',
  DELIVERED: 'success',
  RETURNED: 'danger',
  CANCELLED: 'danger',
};

const statusLabels: Record<string, string> = {
  PENDING: 'En attente',
  CONFIRMED: 'Confirmé',
  PROCESSING: 'En préparation',
  SHIPPED: 'Expédié',
  IN_TRANSIT: 'En transit',
  DELIVERED: 'Livré',
  RETURNED: 'Retourné',
  CANCELLED: 'Annulé',
};

const sampleOrders: RecentOrder[] = [
  { id: '1', orderNumber: 'SOK-A4B2C1', customer: 'Ahmed Benali', wilaya: 'Alger', total: 8500, status: 'PENDING', createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: '2', orderNumber: 'SOK-D7E3F2', customer: 'Fatima Zerrouki', wilaya: 'Oran', total: 12000, status: 'CONFIRMED', createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: '3', orderNumber: 'SOK-G8H4I5', customer: 'Karim Hadj', wilaya: 'Constantine', total: 3500, status: 'SHIPPED', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '4', orderNumber: 'SOK-J9K5L6', customer: 'Nadia Boudiaf', wilaya: 'Sétif', total: 25000, status: 'DELIVERED', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '5', orderNumber: 'SOK-M1N6O7', customer: 'Youcef Mebarki', wilaya: 'Tizi Ouzou', total: 6800, status: 'PROCESSING', createdAt: new Date(Date.now() - 3600000).toISOString() },
];

interface RecentOrdersProps {
  locale: string;
  orders?: RecentOrder[];
}

export default function RecentOrders({ locale, orders = sampleOrders }: RecentOrdersProps) {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Commandes récentes
        </h3>
        <Link
          href={`/${locale}/dashboard/orders`}
          className="text-sm text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors"
        >
          Voir tout
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Commande
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Client
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Wilaya
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-5 py-3">
                  <Link
                    href={`/${locale}/dashboard/orders/${order.id}`}
                    className="text-sm font-mono font-medium text-primary hover:underline"
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-5 py-3 text-sm text-gray-900 dark:text-white">
                  {order.customer}
                </td>
                <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                  {order.wilaya}
                </td>
                <td className="px-5 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                  {formatPrice(order.total)}
                </td>
                <td className="px-5 py-3">
                  <Badge variant={statusVariants[order.status] || 'default'} dot size="sm">
                    {statusLabels[order.status] || order.status}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                  {formatRelativeTime(order.createdAt)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
