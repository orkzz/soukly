'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Dropdown, DropdownItem } from './Dropdown';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇩🇿' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

interface LanguageSwitcherProps {
  currentLocale: string;
  className?: string;
}

function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const current = languages.find((l) => l.code === currentLocale);

  return (
    <Dropdown
      trigger={
        <button
          className={cn(
            'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
            'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
            'dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800',
            className
          )}
        >
          <Globe className="h-4 w-4" />
          <span>{current?.flag} {current?.label}</span>
        </button>
      }
    >
      {languages.map((lang) => (
        <DropdownItem
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          className={currentLocale === lang.code ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
        >
          <span className="me-2">{lang.flag}</span>
          {lang.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

export { LanguageSwitcher };
