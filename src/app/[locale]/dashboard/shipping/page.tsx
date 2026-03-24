'use client';

import { Truck, Package, MapPin, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import DataTable from '@/components/dashboard/DataTable';
import { formatRelativeTime } from '@/lib/utils';

interface Shipment {
  id: string;
  orderNumber: string;
  customer: string;
  wilaya: string;
  provider: string;
  trackingNumber: string;
  status: string;
  createdAt: string;
  [key: string]: unknown;
}

const providerColors: Record<string, string> = {
  'Yalidine': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'ZR Express': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Ecotrack': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Procolis': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

const shippingStatuses: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'info' | 'danger' }> = {
  PROCESSING: { label: 'En préparation', variant: 'default' },
  PICKED_UP: { label: 'Récupéré', variant: 'info' },
  IN_TRANSIT: { label: 'En transit', variant: 'info' },
  OUT_FOR_DELIVERY: { label: 'En livraison', variant: 'warning' },
  DELIVERED: { label: 'Livré', variant: 'success' },
  RETURNED: { label: 'Retourné', variant: 'danger' },
  FAILED: { label: 'Échec', variant: 'danger' },
};

const sampleShipments: Shipment[] = [
  { id: '1', orderNumber: 'SOK-A4B2C1', customer: 'Ahmed Benali', wilaya: 'Alger', provider: 'Yalidine', trackingNumber: 'YAL-123456', status: 'IN_TRANSIT', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '2', orderNumber: 'SOK-D7E3F2', customer: 'Fatima Zerrouki', wilaya: 'Oran', provider: 'ZR Express', trackingNumber: 'ZR-789012', status: 'DELIVERED', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: '3', orderNumber: 'SOK-G8H4I5', customer: 'Karim Hadj', wilaya: 'Constantine', provider: 'Yalidine', trackingNumber: 'YAL-345678', status: 'OUT_FOR_DELIVERY', createdAt: new Date(Date.now() - 43200000).toISOString() },
  { id: '4', orderNumber: 'SOK-J9K5L6', customer: 'Nadia Boudiaf', wilaya: 'Sétif', provider: 'Ecotrack', trackingNumber: 'ECO-567890', status: 'PROCESSING', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '5', orderNumber: 'SOK-M1N6O7', customer: 'Youcef Mebarki', wilaya: 'Tizi Ouzou', provider: 'Yalidine', trackingNumber: 'YAL-901234', status: 'RETURNED', createdAt: new Date(Date.now() - 259200000).toISOString() },
];

export default function ShippingPage() {
  const stats = [
    { label: 'En transit', value: '12', icon: Truck, color: 'text-info bg-info/10' },
    { label: 'Livrés (30j)', value: '156', icon: Package, color: 'text-success bg-success/10' },
    { label: 'Taux livraison', value: '94.2%', icon: MapPin, color: 'text-primary bg-primary/10' },
    { label: 'Retours', value: '8', icon: AlertTriangle, color: 'text-danger bg-danger/10' },
  ];

  const columns = [
    {
      key: 'orderNumber',
      label: 'Commande',
      render: (item: Shipment) => (
        <span className="font-mono font-medium text-primary">{item.orderNumber}</span>
      ),
    },
    {
      key: 'customer',
      label: 'Client',
      render: (item: Shipment) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{item.customer}</p>
          <p className="text-xs text-gray-500">{item.wilaya}</p>
        </div>
      ),
    },
    {
      key: 'provider',
      label: 'Transporteur',
      render: (item: Shipment) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-md ${providerColors[item.provider] || 'bg-gray-100 text-gray-700'}`}>
          {item.provider}
        </span>
      ),
    },
    {
      key: 'trackingNumber',
      label: 'Tracking',
      render: (item: Shipment) => (
        <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{item.trackingNumber}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Shipment) => {
        const config = shippingStatuses[item.status] || { label: item.status, variant: 'default' as const };
        return <Badge variant={config.variant} dot size="sm">{config.label}</Badge>;
      },
    },
    {
      key: 'createdAt',
      label: 'Date',
      className: 'hidden md:table-cell',
      render: (item: Shipment) => (
        <span className="text-xs text-gray-500">{formatRelativeTime(item.createdAt)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Livraison</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez vos expéditions et suivez les colis
          </p>
        </div>
        <Button leftIcon={<Plus size={16} />}>Créer une expédition</Button>
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
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Shipments table */}
      <DataTable
        data={sampleShipments}
        columns={columns}
        searchKey="customer"
        searchPlaceholder="Rechercher par client..."
      />
    </div>
  );
}
