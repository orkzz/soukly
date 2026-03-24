'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingNotif {
  id: number;
  icon: string;
  text: string;
  detail: string;
  color: string;
  position: string;
}

const notifications: Omit<FloatingNotif, 'id'>[] = [
  {
    icon: '🛒',
    text: 'Nouvelle commande #SOK-4521',
    detail: '3,500 DZD',
    color: 'border-s-primary',
    position: 'top-0 end-0 md:-end-4',
  },
  {
    icon: '📦',
    text: 'Yalidine: Colis livré',
    detail: 'Oran',
    color: 'border-s-success',
    position: 'top-1/4 -start-8 md:-start-16',
  },
  {
    icon: '💰',
    text: 'Paiement BaridiMob reçu',
    detail: '12,000 DZD',
    color: 'border-s-accent',
    position: 'top-1/2 end-0 md:-end-8',
  },
  {
    icon: '🔥',
    text: '+23 visiteurs en ligne',
    detail: 'maintenant',
    color: 'border-s-danger',
    position: 'bottom-1/3 -start-4 md:-start-12',
  },
  {
    icon: '⭐',
    text: 'Nouvel avis 5 étoiles',
    detail: 'Robe Kabyle',
    color: 'border-s-warning',
    position: 'bottom-1/4 end-0 md:-end-6',
  },
  {
    icon: '🤖',
    text: 'IA: Landing page générée',
    detail: 'avec succès',
    color: 'border-s-info',
    position: 'top-1/3 end-0 md:-end-12',
  },
  {
    icon: '📱',
    text: 'SMS envoyé',
    detail: '450 clients',
    color: 'border-s-emerald-500',
    position: 'bottom-1/2 -start-6 md:-start-14',
  },
  {
    icon: '📈',
    text: 'Chiffre d\'affaires',
    detail: '+34% cette semaine',
    color: 'border-s-violet-500',
    position: 'bottom-12 end-4 md:-end-2',
  },
];

export default function FloatingNotifications() {
  const [visibleNotifs, setVisibleNotifs] = useState<FloatingNotif[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = counterRef.current % notifications.length;
      counterRef.current += 1;
      const notif = notifications[nextIndex];
      const newNotif: FloatingNotif = { ...notif, id: Date.now() + nextIndex };

      setVisibleNotifs((current) => {
        const updated = [...current, newNotif];
        if (updated.length > 3) {
          return updated.slice(-3);
        }
        return updated;
      });

      setTimeout(() => {
        setVisibleNotifs((current) => current.filter((n) => n.id !== newNotif.id));
      }, 3500);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <AnimatePresence>
        {visibleNotifs.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className={cn(
              'absolute max-w-[220px]',
              notif.position
            )}
          >
            <div
              className={cn(
                'flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg',
                'bg-white/90 dark:bg-surface-dark/90 backdrop-blur-xl',
                'border border-white/50 dark:border-gray-700/50',
                'shadow-lg border-s-[3px]',
                notif.color
              )}
            >
              <span className="text-xl shrink-0">{notif.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                  {notif.text}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                  {notif.detail}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
