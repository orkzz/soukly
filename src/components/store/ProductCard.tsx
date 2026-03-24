'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/components/ui/Toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  image?: string;
  storeSlug: string;
  locale: string;
}

export default function ProductCard({
  id,
  name,
  price,
  compareAtPrice,
  image,
  storeSlug,
  locale,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: id,
      name,
      price,
      image: image || '',
      quantity: 1,
    });
    toast('success', 'Ajouté au panier', name);
  };

  return (
    <Link
      href={`/${locale}/store/${storeSlug}/product/${id}`}
      className="group block bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {image ? (
          <img src={image} alt={name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={32} className="text-gray-300 dark:text-gray-600" />
          </div>
        )}

        {discount && (
          <span className="absolute top-2 start-2 px-2 py-1 bg-danger text-white text-xs font-bold rounded-md">
            -{discount}%
          </span>
        )}

        {/* Quick add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 end-2 p-2.5 bg-primary text-white rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-dark shadow-lg"
        >
          <ShoppingBag size={16} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-base font-bold text-primary">{formatPrice(price)}</span>
          {compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(compareAtPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
