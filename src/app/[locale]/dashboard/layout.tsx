'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/stores/dashboardStore';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';

interface DashboardLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default function DashboardLayout({ children, params: { locale } }: DashboardLayoutProps) {
  const { sidebarCollapsed } = useDashboardStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <Sidebar locale={locale} />
      <TopBar locale={locale} />

      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'lg:ps-[72px]' : 'lg:ps-64'
        )}
      >
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
