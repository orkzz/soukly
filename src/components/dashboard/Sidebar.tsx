'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Palette,
  Truck,
  CreditCard,
  Megaphone,
  Bot,
  Zap,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  X,
  Store,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/stores/dashboardStore';

interface SidebarProps {
  locale: string;
}

const navItems = [
  { key: 'overview', icon: LayoutDashboard, href: '' },
  { key: 'orders', icon: ShoppingBag, href: '/orders' },
  { key: 'products', icon: Package, href: '/products' },
  { key: 'customers', icon: Users, href: '/customers' },
  { key: 'analytics', icon: BarChart3, href: '/analytics' },
  { key: 'storeBuilder', icon: Palette, href: '/store-builder' },
  { key: 'shipping', icon: Truck, href: '/shipping' },
  { key: 'payments', icon: CreditCard, href: '/payments' },
  { key: 'marketing', icon: Megaphone, href: '/marketing' },
  { key: 'aiChat', icon: Bot, href: '/ai-chat' },
  { key: 'automations', icon: Zap, href: '/automations' },
] as const;

const bottomItems = [
  { key: 'notifications', icon: Bell, href: '/notifications' },
  { key: 'settings', icon: Settings, href: '/settings' },
] as const;

export default function Sidebar({ locale }: SidebarProps) {
  const t = useTranslations('dashboard');
  const pathname = usePathname();
  const { sidebarOpen, sidebarCollapsed, setSidebarOpen, toggleSidebarCollapsed } = useDashboardStore();

  const basePath = `/${locale}/dashboard`;

  const isActive = (href: string) => {
    const fullPath = `${basePath}${href}`;
    if (href === '') return pathname === basePath || pathname === `${basePath}/`;
    return pathname.startsWith(fullPath);
  };

  const NavLink = ({ item }: { item: { key: string; icon: typeof LayoutDashboard; href: string } }) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <Link
        href={`${basePath}${item.href}`}
        onClick={() => setSidebarOpen(false)}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          active
            ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
          sidebarCollapsed && 'justify-center px-2'
        )}
        title={sidebarCollapsed ? t(item.key as never) : undefined}
      >
        <Icon className={cn('shrink-0', active ? 'text-primary' : '')} size={20} />
        {!sidebarCollapsed && (
          <span className="truncate">{t(item.key as never)}</span>
        )}
        {active && !sidebarCollapsed && (
          <div className="ms-auto w-1.5 h-1.5 rounded-full bg-primary" />
        )}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        'flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800 shrink-0',
        sidebarCollapsed ? 'justify-center' : 'gap-3'
      )}>
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <span className="text-white font-bold">S</span>
          </div>
          {!sidebarCollapsed && (
            <span className="text-lg font-bold font-display text-gray-900 dark:text-white">
              Soukly
            </span>
          )}
        </Link>
      </div>

      {/* Store selector (collapsed shows icon only) */}
      {!sidebarCollapsed && (
        <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-800">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-start">
            <Store size={16} className="text-gray-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 dark:text-white truncate">Ma Boutique</p>
              <p className="text-[10px] text-gray-500 truncate">maboutique.soukly.com</p>
            </div>
          </button>
        </div>
      )}

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-hide">
        {navItems.map((item) => (
          <NavLink key={item.key} item={item} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-800 space-y-1 shrink-0">
        {bottomItems.map((item) => (
          <NavLink key={item.key} item={item} />
        ))}
      </div>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:block px-3 pb-3 shrink-0">
        <button
          onClick={toggleSidebarCollapsed}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!sidebarCollapsed && <span>Réduire</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed inset-y-0 start-0 z-30 bg-white dark:bg-surface-dark border-e border-gray-200 dark:border-gray-800 transition-all duration-300',
          sidebarCollapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 start-0 z-50 w-72 bg-white dark:bg-surface-dark border-e border-gray-200 dark:border-gray-800 lg:hidden"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 end-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
