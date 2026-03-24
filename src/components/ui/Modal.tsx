'use client';

import { Fragment, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

function Modal({ isOpen, onClose, title, description, children, size = 'md', className }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className={cn(
                'w-full bg-white dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden',
                sizeMap[size],
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {(title || description) && (
                <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                  <div>
                    {title && (
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
                    )}
                    {description && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

export { Modal };
