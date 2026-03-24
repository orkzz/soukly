export const APP_NAME = 'Soukly';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const LOCALES = ['ar', 'fr', 'en'] as const;
export const DEFAULT_LOCALE = 'fr';

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    maxProducts: 50,
    maxOrders: 100,
    features: ['50 produits', '100 commandes/mois', 'Boutique en ligne', 'Paiement COD'],
  },
  STARTER: {
    name: 'Starter',
    price: 2900,
    maxProducts: 500,
    maxOrders: -1,
    features: [
      '500 produits',
      'Commandes illimitées',
      'Tous les paiements',
      'Livraison auto',
      'SMS Marketing (500/mois)',
      'Analytics de base',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 5900,
    maxProducts: -1,
    maxOrders: -1,
    features: [
      'Produits illimités',
      'Commandes illimitées',
      'IA Assistant',
      'Landing Page Builder IA',
      'Automatisations',
      'SMS illimités',
      'Analytics avancés',
      'Domaine personnalisé',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 14900,
    maxProducts: -1,
    maxOrders: -1,
    features: [
      'Tout dans Pro',
      'API access',
      'Support dédié',
      'Multi-boutiques',
      'White label',
      'SLA garanti',
      'Intégrations custom',
      'Formation équipe',
    ],
  },
} as const;

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  CONFIRMED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  PROCESSING: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  SHIPPED: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  IN_TRANSIT: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  RETURNED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  CANCELLED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

export const ORDER_STATUS_LABELS: Record<string, Record<string, string>> = {
  PENDING: { fr: 'En attente', ar: 'قيد الانتظار', en: 'Pending' },
  CONFIRMED: { fr: 'Confirmé', ar: 'مؤكد', en: 'Confirmed' },
  PROCESSING: { fr: 'En préparation', ar: 'قيد التحضير', en: 'Processing' },
  SHIPPED: { fr: 'Expédié', ar: 'تم الشحن', en: 'Shipped' },
  IN_TRANSIT: { fr: 'En transit', ar: 'في الطريق', en: 'In Transit' },
  OUT_FOR_DELIVERY: { fr: 'En livraison', ar: 'قيد التوصيل', en: 'Out for Delivery' },
  DELIVERED: { fr: 'Livré', ar: 'تم التوصيل', en: 'Delivered' },
  RETURNED: { fr: 'Retourné', ar: 'مرتجع', en: 'Returned' },
  CANCELLED: { fr: 'Annulé', ar: 'ملغى', en: 'Cancelled' },
};

export const PAYMENT_METHOD_LABELS: Record<string, Record<string, string>> = {
  COD: { fr: 'Paiement à la livraison', ar: 'الدفع عند الاستلام', en: 'Cash on Delivery' },
  CCP: { fr: 'Compte CCP', ar: 'حساب CCP', en: 'CCP Account' },
  BARIDIMOB: { fr: 'BaridiMob', ar: 'بريدي موب', en: 'BaridiMob' },
  CHARGILY: { fr: 'Chargily Pay', ar: 'شارجيلي', en: 'Chargily Pay' },
  EDAHABIA: { fr: 'Carte Edahabia', ar: 'بطاقة الذهبية', en: 'Edahabia Card' },
  CIB: { fr: 'Carte CIB', ar: 'بطاقة CIB', en: 'CIB Card' },
  STRIPE: { fr: 'Carte bancaire', ar: 'بطاقة بنكية', en: 'Credit Card' },
  BANK_TRANSFER: { fr: 'Virement bancaire', ar: 'تحويل بنكي', en: 'Bank Transfer' },
  FLEXY: { fr: 'Recharge Flexy', ar: 'فليكسي', en: 'Flexy Recharge' },
};
