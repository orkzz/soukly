'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Grid3X3, List, Package, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown';
import DataTable from '@/components/dashboard/DataTable';
import { cn, formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  isActive: boolean;
  image: string;
  [key: string]: unknown;
}

const sampleProducts: Product[] = [
  { id: '1', name: 'Robe Kabyle Traditionnelle', price: 8500, stock: 23, category: 'Vêtements', isActive: true, image: '' },
  { id: '2', name: 'Huile d\'olive de Kabylie', price: 2800, stock: 45, category: 'Alimentation', isActive: true, image: '' },
  { id: '3', name: 'Bijoux berbères en argent', price: 15000, stock: 8, category: 'Bijoux', isActive: true, image: '' },
  { id: '4', name: 'Tapis de Ghardaia', price: 35000, stock: 3, category: 'Décoration', isActive: true, image: '' },
  { id: '5', name: 'Poterie de Mila', price: 4500, stock: 0, category: 'Artisanat', isActive: false, image: '' },
  { id: '6', name: 'Caftan algérien moderne', price: 12000, stock: 15, category: 'Vêtements', isActive: true, image: '' },
  { id: '7', name: 'Dattes Deglet Nour', price: 1200, stock: 100, category: 'Alimentation', isActive: true, image: '' },
  { id: '8', name: 'Gandoura homme', price: 6500, stock: 18, category: 'Vêtements', isActive: true, image: '' },
];

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const [view, setView] = useState<'grid' | 'list'>('list');

  const columns = [
    {
      key: 'name',
      label: 'Produit',
      sortable: true,
      render: (item: Product) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
            <Package size={16} className="text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
            <p className="text-xs text-gray-500">{item.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Prix',
      sortable: true,
      render: (item: Product) => (
        <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(item.price)}</span>
      ),
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (item: Product) => (
        <Badge
          variant={item.stock === 0 ? 'danger' : item.stock < 10 ? 'warning' : 'success'}
          dot
          size="sm"
        >
          {item.stock === 0 ? 'Rupture' : `${item.stock} unités`}
        </Badge>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (item: Product) => (
        <Badge variant={item.isActive ? 'success' : 'outline'} size="sm">
          {item.isActive ? 'Actif' : 'Inactif'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      className: 'w-10',
      render: (item: Product) => (
        <Dropdown
          trigger={
            <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <MoreVertical size={16} />
            </button>
          }
        >
          <DropdownItem
            icon={<Eye size={14} />}
            onClick={() => router.push(`/${locale}/dashboard/products/${item.id}`)}
          >
            Voir
          </DropdownItem>
          <DropdownItem
            icon={<Edit size={14} />}
            onClick={() => router.push(`/${locale}/dashboard/products/${item.id}`)}
          >
            Modifier
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<Trash2 size={14} />} danger>
            Supprimer
          </DropdownItem>
        </Dropdown>
      ),
    },
  ];

  if (view === 'grid') {
    return (
      <div className="space-y-6">
        <Header locale={locale} view={view} setView={setView} t={t} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sampleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                href={`/${locale}/dashboard/products/${product.id}`}
                className="block bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Package size={32} className="text-gray-300 dark:text-gray-600" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                    {product.name}
                  </p>
                  <p className="text-sm font-bold text-primary mt-1">{formatPrice(product.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge
                      variant={product.stock === 0 ? 'danger' : product.stock < 10 ? 'warning' : 'success'}
                      size="sm"
                    >
                      {product.stock} en stock
                    </Badge>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header locale={locale} view={view} setView={setView} t={t} />
      <DataTable
        data={sampleProducts}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Rechercher un produit..."
        onRowClick={(item) => router.push(`/${locale}/dashboard/products/${item.id}`)}
      />
    </div>
  );
}

function Header({
  locale,
  view,
  setView,
  t,
}: {
  locale: string;
  view: 'grid' | 'list';
  setView: (v: 'grid' | 'list') => void;
  t: ReturnType<typeof useTranslations<'dashboard'>>;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
          {t('products')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Gérez votre catalogue de produits
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setView('list')}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              view === 'list'
                ? 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500'
            )}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setView('grid')}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              view === 'grid'
                ? 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500'
            )}
          >
            <Grid3X3 size={16} />
          </button>
        </div>
        <Link href={`/${locale}/dashboard/products/new`}>
          <Button leftIcon={<Plus size={16} />}>
            {t('addProduct')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
