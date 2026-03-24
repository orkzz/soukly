'use client';

import StoreLayout from '@/components/store/StoreLayout';
import CartDrawer from '@/components/store/CartDrawer';

export default function CartPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  return (
    <StoreLayout storeName="Mode DZ" storeSlug={slug} locale={locale}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">
          Mon panier
        </h1>
        <CartDrawer storeSlug={slug} locale={locale} />
      </div>
    </StoreLayout>
  );
}
