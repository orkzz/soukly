'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, wrapperClassName, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full h-10 px-4 text-sm bg-white dark:bg-surface-dark border rounded-md transition-colors duration-200',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
              'disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900',
              error
                ? 'border-danger focus:ring-danger/30 focus:border-danger'
                : 'border-gray-200 dark:border-gray-700',
              leftIcon && 'ps-10',
              rightIcon && 'pe-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
        {hint && !error && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
