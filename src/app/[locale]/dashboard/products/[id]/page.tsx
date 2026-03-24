'use client';

import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';

const product = {
  id: '1',
  name: 'Robe Kabyle Traditionnelle',
  nameAr: 'فستان قبائلي تقليدي',
  description: 'Magnifique robe kabyle traditionnelle faite à la main avec des broderies dorées. Parfaite pour les mariages et occasions spéciales.',
  price: 8500,
  compareAtPrice: 12000,
  costPrice: 4000,
  stock: 23,
  lowStockAlert: 5,
  sku: 'RKT-001',
  weight: 0.8,
  category: 'Vêtements',
  isActive: true,
  isFeatured: true,
  tags: ['kabyle', 'traditionnel', 'mariage', 'broderie'],
  createdAt: '2024-01-15',
};

export default function ProductDetailPage({
  params: { locale },
}: {
  params: { locale: string; id: string };
}) {
  const margin = (((product.price - product.costPrice) / product.price) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/dashboard/products`}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={product.isActive ? 'success' : 'outline'} size="sm" dot>
                {product.isActive ? 'Actif' : 'Inactif'}
              </Badge>
              {product.isFeatured && (
                <Badge variant="warning" size="sm">En vedette</Badge>
              )}
              <span className="text-xs text-gray-400 font-mono">{product.sku}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" leftIcon={<ExternalLink size={14} />} size="sm">
            Voir en boutique
          </Button>
          <Button variant="secondary" leftIcon={<Edit size={14} />} size="sm">
            Modifier
          </Button>
          <Button variant="danger" leftIcon={<Trash2 size={14} />} size="sm">
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image placeholder */}
          <Card>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-400">Aucune image</p>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
              {product.nameAr && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-arabic leading-relaxed" dir="rtl">
                  {product.nameAr}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="md">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Prix</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Prix de vente</span>
                  <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                </div>
                {product.compareAtPrice && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Ancien prix</span>
                    <span className="text-sm text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Prix coûtant</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{formatPrice(product.costPrice)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Marge</span>
                  <Badge variant="success" size="sm">{margin}%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Inventaire</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Stock</span>
                  <Badge variant={product.stock < product.lowStockAlert ? 'warning' : 'success'} dot size="sm">
                    {product.stock} unités
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Alerte stock</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{product.lowStockAlert} unités</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Poids</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{product.weight} kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardContent>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Organisation</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Catégorie</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Créé le</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{product.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
