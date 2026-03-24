export type Locale = 'ar' | 'fr' | 'en';

export type Direction = 'ltr' | 'rtl';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface Notification {
  id: string;
  icon: string;
  text: string;
  amount?: string;
  color: string;
  timestamp: string;
}

export interface StatsCard {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
}

export type {
  User,
  Store,
  Product,
  Order,
  Customer,
  Category,
  Coupon,
  Review,
  Campaign,
  Automation,
  AIChat,
  Notification as DBNotification,
  Analytics,
} from '@prisma/client';
