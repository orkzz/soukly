import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
        success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
        danger: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
        info: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        outline: 'border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded',
        md: 'text-xs px-2.5 py-1 rounded-md',
        lg: 'text-sm px-3 py-1 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full me-1.5',
            variant === 'success' && 'bg-emerald-500',
            variant === 'danger' && 'bg-red-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'info' && 'bg-blue-500',
            (!variant || variant === 'default') && 'bg-primary',
            variant === 'outline' && 'bg-gray-500'
          )}
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
