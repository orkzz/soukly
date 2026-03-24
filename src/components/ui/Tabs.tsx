'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  className?: string;
}

function Tabs({ tabs, defaultTab, onChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const handleChange = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={className}>
      <div className="flex border-b border-gray-200 dark:border-gray-800 gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'text-primary'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            )}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="mt-4">{activeContent}</div>
    </div>
  );
}

export { Tabs, type Tab };
