'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Menu, Search, Sun, Moon, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown';
import { Settings, LogOut, User, Store } from 'lucide-react';

interface TopBarProps {
  locale: string;
}

export default function TopBar({}: TopBarProps) {
  const t = useTranslations('common');
  const dashT = useTranslations('dashboard');
  const { theme, setTheme } = useTheme();
  const { toggleSidebar, sidebarCollapsed } = useDashboardStore();
  const { unreadCount } = useNotificationStore();
  const { user, signOut } = useAuth();

  return (
    <header
      className={cn(
        'fixed top-0 end-0 z-20 h-16 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300',
        sidebarCollapsed ? 'lg:start-[72px]' : 'lg:start-64',
        'start-0'
      )}
    >
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 w-64 lg:w-80">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder={t('search')}
              className="bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 end-1 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* User menu */}
          <Dropdown
            trigger={
              <button className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Avatar
                  name={user?.user_metadata?.full_name || 'User'}
                  src={user?.user_metadata?.avatar_url}
                  size="sm"
                />
                <div className="hidden md:block text-start">
                  <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
                    {user?.user_metadata?.full_name || 'Utilisateur'}
                  </p>
                  <p className="text-xs text-gray-500 leading-tight truncate max-w-[120px]">
                    {user?.email || ''}
                  </p>
                </div>
              </button>
            }
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.user_metadata?.full_name || 'Utilisateur'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <DropdownItem icon={<User size={16} />}>Mon profil</DropdownItem>
            <DropdownItem icon={<Store size={16} />}>Ma boutique</DropdownItem>
            <DropdownItem icon={<Settings size={16} />}>
              {dashT('settings')}
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={<LogOut size={16} />} danger onClick={signOut}>
              Déconnexion
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
