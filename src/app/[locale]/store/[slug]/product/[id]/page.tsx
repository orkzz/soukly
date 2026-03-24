'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Heart, Star, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import StoreLayout from '@/components/store/StoreLayout';
import ProductCard from '@/components/store/ProductCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/components/ui/Toast';
import { formatPrice } from '@/lib/utils';

const product = {
  id: '1',
  name: 'Robe Kabyle Traditionnelle',
  description: 'Magnifique robe kabyle traditionnelle faite à la main avec des broderies dorées authentiques. Tissu de haute qualité, parfaite pour les mariages, fêtes et occasions spéciales. Disponible en plusieurs tailles.',
  price: 8500,
  compareAtPrice: 12000,
  images: [] as string[],
  variants: [
    { name: 'S', available: true },
    { name: 'M', available: true },
    { name: 'L', available: true },
    { name: 'XL', available: false },
  ],
  rating: 4.8,
  reviewCount: 24,
  stock: 15,
};

const reviews = [
  { id: '1', author: 'Samia B.', rating: 5, text: 'Magnifique qualité, les broderies sont superbes !', date: '2024-03-10' },
  { id: '2', author: 'Nadia K.', rating: 5, text: 'Parfaite pour le mariage de ma fille. Livraison rapide à Oran.', date: '2024-03-05' },
  { id: '3', author: 'Amira H.', rating: 4, text: 'Très belle robe, juste un peu grande. Prendre une taille en dessous.', date: '2024-02-28' },
];

const relatedProducts = [
  { id: '2', name: 'Caftan Algérien Moderne', price: 12000, compareAtPrice: null },
  { id: '5', name: 'Foulard Soie Brodé', price: 3500, compareAtPrice: 5000 },
  { id: '4', name: 'Bijoux Berbères Argent', price: 15000, compareAtPrice: null },
  { id: '6', name: 'Babouches Artisanales', price: 2800, compareAtPrice: null },
];

export default function ProductPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string; id: string };
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('M');
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: '',
      quantity,
      variantName: selectedVariant,
    });
    toast('success', 'Ajouté au panier', `${product.name} (${selectedVariant}) x${quantity}`);
  };

  return (
    <StoreLayout storeName="Mode DZ" storeSlug={slug} locale={locale}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <Link
          href={`/${locale}/store/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          Retour aux produits
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
              <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600" />
              {discount && (
                <Badge variant="danger" className="absolute top-4 start-4 text-sm">
                  -{discount}%
                </Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewCount} avis)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Taille</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => v.available && setSelectedVariant(v.name)}
                    disabled={!v.available}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                      selectedVariant === v.name
                        ? 'border-primary bg-primary/5 text-primary'
                        : v.available
                        ? 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                        : 'border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed line-through'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quantité</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white border-x border-gray-200 dark:border-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">{product.stock} en stock</span>
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-8 flex gap-3">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} leftIcon={<ShoppingBag size={18} />}>
                Ajouter au panier — {formatPrice(product.price * quantity)}
              </Button>
              <Button size="lg" variant="outline" className="px-4">
                <Heart size={18} />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              {[
                { icon: Truck, label: 'Livraison rapide' },
                { icon: Shield, label: 'Paiement sécurisé' },
                { icon: RotateCcw, label: 'Retour 7 jours' },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="text-center">
                    <Icon size={20} className="text-primary mx-auto" />
                    <p className="text-xs text-gray-500 mt-1">{badge.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16">
          <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-6">
            Avis clients ({product.reviewCount})
          </h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{review.author}</span>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-16 pb-8">
          <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-6">
            Produits similaires
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} compareAtPrice={p.compareAtPrice} storeSlug={slug} locale={locale} />
            ))}
          </div>
        </section>
      </div>
    </StoreLayout>
  );
}
