'use client';

import { useState } from 'react';
import { Bell, CheckCheck, ShoppingBag, Package, CreditCard, Star, Bot, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn, formatRelativeTime } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

const iconMap: Record<string, typeof ShoppingBag> = {
  ORDER_NEW: ShoppingBag,
  ORDER_STATUS: Package,
  PAYMENT_RECEIVED: CreditCard,
  LOW_STOCK: AlertTriangle,
  REVIEW_NEW: Star,
  AI_SUGGESTION: Bot,
  SYSTEM: Bell,
};

const colorMap: Record<string, string> = {
  ORDER_NEW: 'bg-primary/10 text-primary',
  ORDER_STATUS: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  PAYMENT_RECEIVED: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  LOW_STOCK: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  REVIEW_NEW: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  AI_SUGGESTION: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  SYSTEM: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const sampleNotifications: Notification[] = [
  { id: '1', title: 'Nouvelle commande SOK-A4B2C1', message: 'Ahmed Benali a passé une commande de 8,500 DZD', type: 'ORDER_NEW', isRead: false, createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: '2', title: 'Paiement BaridiMob reçu', message: '12,000 DZD reçus pour la commande SOK-D7E3F2', type: 'PAYMENT_RECEIVED', isRead: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: '3', title: 'Stock faible: Poterie de Mila', message: 'Il ne reste que 2 unités en stock', type: 'LOW_STOCK', isRead: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: '4', title: 'Nouvel avis 5 étoiles', message: 'Samia B. a laissé un avis sur "Robe Kabyle"', type: 'REVIEW_NEW', isRead: true, createdAt: new Date(Date.now() - 43200000).toISOString() },
  { id: '5', title: 'Suggestion IA', message: 'Vos ventes à Oran ont augmenté de 45%. Lancez une campagne ciblée !', type: 'AI_SUGGESTION', isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '6', title: 'Commande livrée', message: 'La commande SOK-J9K5L6 a été livrée avec succès à Sétif', type: 'ORDER_STATUS', isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const unread = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Notifications</h1>
          {unread > 0 && <p className="text-sm text-gray-500 mt-1">{unread} non lue{unread > 1 ? 's' : ''}</p>}
        </div>
        {unread > 0 && (
          <Button variant="ghost" size="sm" leftIcon={<CheckCheck size={14} />} onClick={markAllRead}>
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((notif) => {
          const Icon = iconMap[notif.type] || Bell;
          return (
            <button
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={cn(
                'w-full flex items-start gap-3 p-4 rounded-xl text-start transition-all',
                notif.isRead
                  ? 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800'
                  : 'bg-primary/5 dark:bg-primary/10 border border-primary/20'
              )}
            >
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', colorMap[notif.type] || colorMap.SYSTEM)}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn('text-sm font-medium', notif.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white')}>
                    {notif.title}
                  </p>
                  {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(notif.createdAt)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
