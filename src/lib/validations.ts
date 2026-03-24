import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z
    .string()
    .regex(/^(\+213|0)(5|6|7)[0-9]{8}$/, 'Numéro de téléphone algérien invalide')
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email invalide'),
});

export const productSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  nameAr: z.string().optional(),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  price: z.number().positive('Le prix doit être positif'),
  compareAtPrice: z.number().positive().optional().nullable(),
  costPrice: z.number().positive().optional().nullable(),
  sku: z.string().optional(),
  weight: z.number().positive().optional().nullable(),
  stock: z.number().int().min(0, 'Le stock ne peut pas être négatif'),
  lowStockAlert: z.number().int().min(0).default(5),
  categoryId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const orderSchema = z.object({
  customerName: z.string().min(2, 'Nom requis'),
  customerPhone: z
    .string()
    .regex(/^(\+213|0)(5|6|7)[0-9]{8}$/, 'Numéro invalide'),
  customerEmail: z.string().email().optional().or(z.literal('')),
  shippingWilaya: z.string().min(1, 'Wilaya requise'),
  shippingCommune: z.string().min(1, 'Commune requise'),
  shippingAddress: z.string().min(5, 'Adresse requise'),
  paymentMethod: z.enum([
    'COD', 'CCP', 'BARIDIMOB', 'CHARGILY', 'EDAHABIA', 'CIB', 'STRIPE', 'BANK_TRANSFER', 'FLEXY',
  ]),
  notes: z.string().optional(),
});

export const storeSettingsSchema = z.object({
  name: z.string().min(2, 'Nom de boutique requis'),
  description: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  wilaya: z.string().optional(),
  commune: z.string().optional(),
  facebook: z.string().url().optional().or(z.literal('')),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const couponSchema = z.object({
  code: z.string().min(3, 'Code trop court').max(20, 'Code trop long'),
  type: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING']),
  value: z.number().positive('La valeur doit être positive'),
  minOrder: z.number().positive().optional().nullable(),
  maxUses: z.number().int().positive().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export const campaignSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  type: z.enum(['SMS', 'EMAIL', 'WHATSAPP']),
  content: z.string().min(10, 'Contenu trop court'),
  audience: z.object({
    type: z.enum(['all', 'wilaya', 'tags', 'custom']),
    filters: z.record(z.string(), z.unknown()).optional(),
  }),
  scheduledAt: z.string().optional().nullable(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type OrderFormData = z.infer<typeof orderSchema>;
export type StoreSettingsFormData = z.infer<typeof storeSettingsSchema>;
export type CouponFormData = z.infer<typeof couponSchema>;
export type CampaignFormData = z.infer<typeof campaignSchema>;
