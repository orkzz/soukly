'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { EmptyState } from '@/components/ui/EmptyState';

interface CartDrawerProps {
  storeSlug: string;
  locale: string;
}

export default function CartDrawer({ storeSlug, locale }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();
  const basePath = `/${locale}/store/${storeSlug}`;

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag size={32} />}
        title="Votre panier est vide"
        description="Parcourez nos produits et ajoutez-les à votre panier"
        action={
          <Link href={basePath}>
            <Button variant="primary">Voir les produits</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.variantName || ''}`}
            className="flex gap-4 p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800"
          >
            {/* Image */}
            <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 overflow-hidden">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <ShoppingBag size={20} className="text-gray-300" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {item.name}
              </h3>
              {item.variantName && (
                <p className="text-xs text-gray-500 mt-0.5">{item.variantName}</p>
              )}
              <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.price)}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantName)}
                    className="w-7 h-7 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantName)}
                    className="w-7 h-7 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.productId, item.variantName)}
                  className="p-1.5 text-gray-400 hover:text-danger transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total + CTA */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">Sous-total</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Frais de livraison calculés à l&apos;étape suivante
        </p>
        <Link href={`${basePath}/checkout`}>
          <Button className="w-full" size="lg">
            Passer la commande
          </Button>
        </Link>
        <Link
          href={basePath}
          className="block text-center mt-3 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Continuer les achats
        </Link>
      </div>
    </div>
  );
}
