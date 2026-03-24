'use client';

import { Star, ArrowRight } from 'lucide-react';
import StoreLayout from '@/components/store/StoreLayout';
import ProductCard from '@/components/store/ProductCard';
import { Button } from '@/components/ui/Button';

const storeData = {
  name: 'Mode DZ',
  slug: 'mode-dz',
  description: 'Vêtements et accessoires traditionnels algériens. Qualité premium, livraison dans les 58 wilayas.',
  banner: null,
};

const featuredProducts = [
  { id: '1', name: 'Robe Kabyle Traditionnelle', price: 8500, compareAtPrice: 12000 },
  { id: '2', name: 'Caftan Algérien Moderne', price: 12000, compareAtPrice: null },
  { id: '3', name: 'Gandoura Homme Premium', price: 6500, compareAtPrice: 9000 },
  { id: '4', name: 'Bijoux Berbères Argent', price: 15000, compareAtPrice: null },
  { id: '5', name: 'Foulard Soie Brodé', price: 3500, compareAtPrice: 5000 },
  { id: '6', name: 'Babouches Artisanales', price: 2800, compareAtPrice: null },
  { id: '7', name: 'Ceinture Cuir Kabyle', price: 4200, compareAtPrice: null },
  { id: '8', name: 'Sac Tissé Traditionnel', price: 5500, compareAtPrice: 7000 },
];

const categories = [
  { name: 'Robes', count: 24, emoji: '👗' },
  { name: 'Bijoux', count: 18, emoji: '💍' },
  { name: 'Accessoires', count: 32, emoji: '👜' },
  { name: 'Homme', count: 15, emoji: '👔' },
];

export default function StorePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  return (
    <StoreLayout storeName={storeData.name} storeSlug={slug} locale={locale}>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 dark:text-white">
              {storeData.name}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {storeData.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Button size="lg" rightIcon={<ArrowRight size={16} />}>
                Voir les produits
              </Button>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-medium">4.8</span>
                <span>(124 avis)</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-surface-dark rounded-full border border-gray-200 dark:border-gray-800">
                🚚 Livraison 58 wilayas
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-surface-dark rounded-full border border-gray-200 dark:border-gray-800">
                💰 Paiement à la livraison
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-surface-dark rounded-full border border-gray-200 dark:border-gray-800">
                📱 BaridiMob accepté
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
            Catégories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="flex items-center gap-3 p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <div className="text-start">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.count} produits</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-12 bg-gray-50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              Nos produits
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                storeSlug={slug}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🚚', title: 'Livraison rapide', desc: '58 wilayas couvertes' },
              { icon: '💰', title: 'Paiement flexible', desc: 'COD, CCP, BaridiMob' },
              { icon: '🔄', title: 'Retour facile', desc: 'Retour sous 7 jours' },
              { icon: '📞', title: 'Support client', desc: 'Réponse en 24h' },
            ].map((badge) => (
              <div key={badge.title} className="p-4">
                <span className="text-3xl">{badge.icon}</span>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{badge.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}
