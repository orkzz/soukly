'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md',
        secondary: 'bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50',
        ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
        danger: 'bg-danger text-white hover:bg-red-600 shadow-sm',
        accent: 'bg-accent text-white hover:bg-accent-dark shadow-sm hover:shadow-md',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-primary-400 dark:text-primary-400',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-sm gap-1.5',
        md: 'h-10 px-5 text-sm rounded-md gap-2',
        lg: 'h-12 px-8 text-base rounded-md gap-2.5',
        xl: 'h-14 px-10 text-lg rounded-lg gap-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading ? <span className="shrink-0">{rightIcon}</span> : null}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
