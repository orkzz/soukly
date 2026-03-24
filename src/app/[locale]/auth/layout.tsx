import type { ReactNode } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default function AuthLayout({ children, params: { locale } }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left: Form area */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto">
          <Link href={`/${locale}`} className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              Soukly
            </span>
          </Link>
          {children}
        </div>
      </div>

      {/* Right: Branded panel */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 start-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 end-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <blockquote className="space-y-6">
            <p className="text-2xl font-display font-bold text-white leading-relaxed">
              &ldquo;Soukly m&apos;a permis de lancer ma boutique en ligne en une journée. Les paiements BaridiMob et la livraison Yalidine marchent parfaitement.&rdquo;
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                AK
              </div>
              <div>
                <p className="text-white font-medium">Ahmed Khelifi</p>
                <p className="text-primary-200 text-sm">Propriétaire, Mode DZ — Alger</p>
              </div>
            </footer>
          </blockquote>

          <div className="mt-16 grid grid-cols-3 gap-6">
            {[
              { value: '2,500+', label: 'Boutiques' },
              { value: '1M+', label: 'Commandes' },
              { value: '58', label: 'Wilayas' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-primary-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
