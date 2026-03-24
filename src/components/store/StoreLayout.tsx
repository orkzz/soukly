'use client';

import { type ReactNode, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

interface StoreLayoutProps {
  children: ReactNode;
  storeName: string;
  storeSlug: string;
  locale: string;
}

export default function StoreLayout({ children, storeName, storeSlug, locale }: StoreLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const basePath = `/${locale}/store/${storeSlug}`;

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 -ms-2 text-gray-500 hover:text-gray-700"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link href={basePath} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">{storeName.charAt(0)}</span>
              </div>
              <span className="text-lg font-bold font-display text-gray-900 dark:text-white hidden sm:block">
                {storeName}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href={basePath} className="text-sm text-gray-600 hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link href={`${basePath}#products`} className="text-sm text-gray-600 hover:text-primary transition-colors">
                Produits
              </Link>
              <Link href={`${basePath}#about`} className="text-sm text-gray-600 hover:text-primary transition-colors">
                À propos
              </Link>
              <Link href={`${basePath}#contact`} className="text-sm text-gray-600 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <Search size={20} />
              </button>
              <Link
                href={`${basePath}/cart`}
                className="relative p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <div className="relative">
                <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  autoFocus
                  className="w-full h-10 ps-10 pe-4 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark">
            <nav className="px-4 py-3 space-y-1">
              {['Accueil', 'Produits', 'À propos', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={basePath}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} {storeName}. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link href={`${basePath}/tracking`} className="hover:text-gray-700 transition-colors">
                Suivre ma commande
              </Link>
              <span className="text-gray-300">·</span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                Propulsé par <span className="font-semibold text-primary">Soukly</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
