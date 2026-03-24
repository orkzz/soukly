'use client';

import Link from 'next/link';
import { ArrowLeft, Phone, MessageCircle, Truck, Printer, Check, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import OrderStatusBadge from '@/components/dashboard/OrderStatusBadge';
import { formatPrice } from '@/lib/utils';

const order = {
  id: '1',
  orderNumber: 'SOK-A4B2C1',
  status: 'CONFIRMED',
  paymentStatus: 'UNPAID',
  paymentMethod: 'COD',
  customerName: 'Ahmed Benali',
  customerPhone: '0555123456',
  customerEmail: 'ahmed@email.com',
  shippingWilaya: 'Alger',
  shippingCommune: 'Bab El Oued',
  shippingAddress: '15 Rue Didouche Mourad, Bab El Oued',
  subtotal: 8500,
  shippingCost: 600,
  discount: 0,
  total: 9100,
  createdAt: '2024-03-15T10:30:00',
  confirmedAt: '2024-03-15T11:00:00',
  items: [
    { name: 'Robe Kabyle Traditionnelle', quantity: 1, unitPrice: 8500, total: 8500 },
  ],
  timeline: [
    { status: 'PENDING', note: 'Commande reçue', date: '2024-03-15T10:30:00' },
    { status: 'CONFIRMED', note: 'Confirmée par téléphone', date: '2024-03-15T11:00:00' },
  ],
  notes: 'Livraison le matin SVP',
};

export default function OrderDetailPage({
  params: { locale },
}: {
  params: { locale: string; id: string };
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/dashboard/orders`}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-display font-mono text-gray-900 dark:text-white">
                {order.orderNumber}
              </h1>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {new Date(order.createdAt).toLocaleDateString('fr-DZ', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leftIcon={<Printer size={14} />} size="sm">
            Imprimer
          </Button>
          <Button variant="primary" leftIcon={<Truck size={14} />} size="sm">
            Créer expédition
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Produits commandés
              </h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500">Qté: {item.quantity} x {formatPrice(item.unitPrice)}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatPrice(item.total)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sous-total</span>
                  <span className="text-gray-700 dark:text-gray-300">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Livraison</span>
                  <span className="text-gray-700 dark:text-gray-300">{formatPrice(order.shippingCost)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Réduction</span>
                    <span className="text-danger">-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Historique
              </h3>
              <div className="space-y-4">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
                      {index < order.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-800 mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{event.note}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(event.date).toLocaleString('fr-DZ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {order.notes && (
            <Card>
              <CardContent>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Notes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Client</h3>
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{order.customerName}</p>
                <p className="text-sm text-gray-500">{order.customerPhone}</p>
                {order.customerEmail && (
                  <p className="text-sm text-gray-500">{order.customerEmail}</p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" size="sm" leftIcon={<Phone size={12} />} className="flex-1">
                    Appeler
                  </Button>
                  <Button variant="secondary" size="sm" leftIcon={<MessageCircle size={12} />} className="flex-1">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Livraison</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Wilaya</span>
                  <span className="text-gray-900 dark:text-white font-medium">{order.shippingWilaya}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Commune</span>
                  <span className="text-gray-700 dark:text-gray-300">{order.shippingCommune}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 pt-1">{order.shippingAddress}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Paiement</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Méthode</span>
                  <span className="text-gray-900 dark:text-white">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <Badge variant={order.paymentStatus === 'PAID' ? 'success' : 'warning'} size="sm">
                    {order.paymentStatus === 'PAID' ? 'Payé' : 'Non payé'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Actions</h3>
              <div className="space-y-2">
                <Button variant="primary" className="w-full" size="sm" leftIcon={<Check size={14} />}>
                  Confirmer la commande
                </Button>
                <Button variant="danger" className="w-full" size="sm" leftIcon={<XIcon size={14} />}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
