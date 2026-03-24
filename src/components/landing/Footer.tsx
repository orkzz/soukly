'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  const links = {
    product: [
      { label: t('features'), href: '#features' },
      { label: t('pricing'), href: '#pricing' },
      { label: t('integrations'), href: '#integrations' },
      { label: t('changelog'), href: '#' },
    ],
    resources: [
      { label: t('docs'), href: '#' },
      { label: t('blog'), href: '#' },
      { label: t('guides'), href: '#' },
      { label: t('support'), href: '#' },
    ],
    company: [
      { label: t('about'), href: '#' },
      { label: t('careers'), href: '#' },
      { label: t('contact'), href: '#' },
      { label: t('partners'), href: '#' },
    ],
    legal: [
      { label: t('privacy'), href: '#' },
      { label: t('terms'), href: '#' },
      { label: t('cookies'), href: '#' },
    ],
  };

  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold font-display text-white">Soukly</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              La plateforme e-commerce pensée pour l&apos;Algérie. Paiement local, livraison automatique, IA intégrée.
            </p>
            <div className="mt-6">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {t(title as keyof typeof links)}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm flex items-center gap-1.5">
            {t('madeIn')}{' '}
            <span className="text-lg">💜</span>{' '}
            {t('inAlgeria')}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {['facebook', 'instagram', 'twitter', 'linkedin'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-primary flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
              >
                <span className="text-xs font-bold uppercase">{social.charAt(0)}</span>
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Soukly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
