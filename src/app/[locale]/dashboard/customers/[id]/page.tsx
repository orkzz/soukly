'use client';

import Link from 'next/link';
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, ShoppingBag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import OrderStatusBadge from '@/components/dashboard/OrderStatusBadge';
import { formatPrice, formatDate } from '@/lib/utils';

const customer = {
  id: '1',
  fullName: 'Ahmed Benali',
  phone: '0555123456',
  email: 'ahmed@email.com',
  wilaya: 'Alger',
  commune: 'Bab El Oued',
  address: '15 Rue Didouche Mourad',
  totalOrders: 12,
  totalSpent: 95000,
  tags: ['VIP', 'fidèle'],
  createdAt: '2024-01-15',
  notes: 'Client régulier, préfère la livraison le matin.',
  orders: [
    { id: '1', orderNumber: 'SOK-A4B2C1', total: 8500, status: 'DELIVERED', date: '2024-03-15' },
    { id: '2', orderNumber: 'SOK-X7Y3Z2', total: 12000, status: 'SHIPPED', date: '2024-03-10' },
    { id: '3', orderNumber: 'SOK-M5N2P1', total: 15000, status: 'DELIVERED', date: '2024-02-28' },
    { id: '4', orderNumber: 'SOK-Q8R4S3', total: 6500, status: 'DELIVERED', date: '2024-02-15' },
    { id: '5', orderNumber: 'SOK-T6U1V5', total: 22000, status: 'DELIVERED', date: '2024-01-20' },
  ],
};

export default function CustomerDetailPage({
  params: { locale },
}: {
  params: { locale: string; id: string };
}
) {
  const avgOrder = customer.totalSpent / customer.totalOrders;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/dashboard/customers`}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center">
              {customer.fullName.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                {customer.fullName}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {customer.tags.map((tag) => (
                  <Badge key={tag} variant={tag === 'VIP' ? 'warning' : 'outline'} size="sm">
                    {tag}
                  </Badge>
                ))}
                <span className="text-xs text-gray-500">
                  Client depuis {formatDate(customer.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" leftIcon={<Phone size={14} />}>
            Appeler
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<MessageCircle size={14} />}>
            WhatsApp
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Commandes', value: String(customer.totalOrders), icon: ShoppingBag },
              { label: 'Total dépensé', value: formatPrice(customer.totalSpent), icon: ShoppingBag },
              { label: 'Panier moyen', value: formatPrice(Math.round(avgOrder)), icon: ShoppingBag },
            ].map((stat) => (
              <Card key={stat.label} padding="sm">
                <CardContent>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order history */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Historique des commandes
              </h3>
              <div className="space-y-3">
                {customer.orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/${locale}/dashboard/orders/${order.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <ShoppingBag size={16} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-mono font-medium text-primary">{order.orderNumber}</p>
                        <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatPrice(order.total)}
                      </span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{customer.phone}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2.5 text-sm">
                    <Mail size={14} className="text-gray-400 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{customer.email}</span>
                  </div>
                )}
                <div className="flex items-start gap-2.5 text-sm">
                  <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>{customer.address}</p>
                    <p>{customer.commune}, {customer.wilaya}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Calendar size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-500">Client depuis {formatDate(customer.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Notes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{customer.notes}</p>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {customer.tags.map((tag) => (
                  <Badge key={tag} variant={tag === 'VIP' ? 'warning' : 'outline'} size="md">
                    {tag}
                  </Badge>
                ))}
              </div>
              <button className="mt-3 text-xs text-primary hover:text-primary-dark font-medium transition-colors">
                + Ajouter un tag
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
