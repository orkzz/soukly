import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
};

function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        className={cn('rounded-full object-cover', sizeMap[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium flex items-center justify-center',
        sizeMap[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}

export { Avatar };
