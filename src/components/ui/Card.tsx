import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

function Card({ className, glass, hover, padding = 'md', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 dark:border-gray-800',
        paddingMap[padding],
        glass
          ? 'bg-white/70 dark:bg-surface-dark/70 backdrop-blur-xl'
          : 'bg-white dark:bg-surface-dark',
        hover && 'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-900 dark:text-white', className)} {...props}>
      {children}
    </h3>
  );
}

function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props}>
      {children}
    </p>
  );
}

function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
