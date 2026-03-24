'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'end';
  className?: string;
}

function Dropdown({ trigger, children, align = 'end', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 mt-2 min-w-[200px] bg-white dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden',
              align === 'end' ? 'end-0' : 'start-0',
              className
            )}
            onClick={() => setIsOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  danger?: boolean;
  className?: string;
}

function DropdownItem({ children, onClick, icon, danger, className }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-start',
        danger
          ? 'text-danger hover:bg-red-50 dark:hover:bg-red-900/20'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
        className
      )}
    >
      {icon && <span className="shrink-0 w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
}

function DropdownSeparator() {
  return <div className="border-t border-gray-200 dark:border-gray-800 my-1" />;
}

export { Dropdown, DropdownItem, DropdownSeparator };
