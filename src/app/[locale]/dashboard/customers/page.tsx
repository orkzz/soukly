'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Phone, MapPin, MoreVertical, Eye, MessageCircle, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown';
import DataTable from '@/components/dashboard/DataTable';
import { formatPrice } from '@/lib/utils';

interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  wilaya: string;
  commune: string;
  totalOrders: number;
  totalSpent: number;
  tags: string[];
  createdAt: string;
  [key: string]: unknown;
}

const sampleCustomers: Customer[] = [
  { id: '1', fullName: 'Ahmed Benali', phone: '0555123456', email: 'ahmed@email.com', wilaya: 'Alger', commune: 'Bab El Oued', totalOrders: 12, totalSpent: 95000, tags: ['VIP', 'fidèle'], createdAt: '2024-01-15' },
  { id: '2', fullName: 'Fatima Zerrouki', phone: '0661234567', email: 'fatima@email.com', wilaya: 'Oran', commune: 'Es Senia', totalOrders: 8, totalSpent: 67000, tags: ['fidèle'], createdAt: '2024-02-10' },
  { id: '3', fullName: 'Karim Hadj', phone: '0770123456', email: '', wilaya: 'Constantine', commune: 'El Khroub', totalOrders: 3, totalSpent: 15000, tags: [], createdAt: '2024-03-01' },
  { id: '4', fullName: 'Nadia Boudiaf', phone: '0555987654', email: 'nadia@email.com', wilaya: 'Sétif', commune: 'Sétif Centre', totalOrders: 25, totalSpent: 180000, tags: ['VIP', 'influenceur'], createdAt: '2023-11-20' },
  { id: '5', fullName: 'Youcef Mebarki', phone: '0661987654', email: '', wilaya: 'Tizi Ouzou', commune: 'Azazga', totalOrders: 5, totalSpent: 32000, tags: [], createdAt: '2024-02-28' },
  { id: '6', fullName: 'Amira Haddad', phone: '0770987654', email: 'amira@email.com', wilaya: 'Blida', commune: 'Blida Centre', totalOrders: 15, totalSpent: 120000, tags: ['VIP'], createdAt: '2023-12-05' },
  { id: '7', fullName: 'Mohamed Kaci', phone: '0555111222', email: '', wilaya: 'Bejaia', commune: 'Bejaia Centre', totalOrders: 2, totalSpent: 8500, tags: ['nouveau'], createdAt: '2024-03-10' },
  { id: '8', fullName: 'Samia Belkaid', phone: '0661333444', email: 'samia@email.com', wilaya: 'Annaba', commune: 'Annaba Centre', totalOrders: 7, totalSpent: 52000, tags: [], createdAt: '2024-01-25' },
];

export default function CustomersPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('dashboard');
  const router = useRouter();

  const columns = [
    {
      key: 'fullName',
      label: 'Client',
      sortable: true,
      render: (item: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
            {item.fullName.split(' ').map((n) => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{item.fullName}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{item.phone}</span>
              {item.email && (
                <>
                  <span className="text-gray-300">·</span>
                  <span>{item.email}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'wilaya',
      label: 'Localisation',
      sortable: true,
      className: 'hidden sm:table-cell',
      render: (item: Customer) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
          <MapPin size={12} className="shrink-0" />
          <span>{item.wilaya}, {item.commune}</span>
        </div>
      ),
    },
    {
      key: 'totalOrders',
      label: 'Commandes',
      sortable: true,
      render: (item: Customer) => (
        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.totalOrders}</span>
      ),
    },
    {
      key: 'totalSpent',
      label: 'Total dépensé',
      sortable: true,
      render: (item: Customer) => (
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatPrice(item.totalSpent)}
        </span>
      ),
    },
    {
      key: 'tags',
      label: 'Tags',
      className: 'hidden md:table-cell',
      render: (item: Customer) => (
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <Badge
              key={tag}
              variant={tag === 'VIP' ? 'warning' : tag === 'nouveau' ? 'info' : 'outline'}
              size="sm"
            >
              {tag}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'actions',
      label: '',
      className: 'w-10',
      render: (item: Customer) => (
        <Dropdown
          trigger={
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <MoreVertical size={16} />
            </button>
          }
        >
          <DropdownItem icon={<Eye size={14} />} onClick={() => router.push(`/${locale}/dashboard/customers/${item.id}`)}>
            Voir profil
          </DropdownItem>
          <DropdownItem icon={<Phone size={14} />}>
            Appeler
          </DropdownItem>
          <DropdownItem icon={<MessageCircle size={14} />}>
            WhatsApp
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<Tag size={14} />}>
            Ajouter tag
          </DropdownItem>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
          {t('customers')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {sampleCustomers.length} clients au total
        </p>
      </div>

      <DataTable
        data={sampleCustomers}
        columns={columns}
        searchKey="fullName"
        searchPlaceholder="Rechercher un client..."
        onRowClick={(item) => router.push(`/${locale}/dashboard/customers/${item.id}`)}
      />
    </div>
  );
}
