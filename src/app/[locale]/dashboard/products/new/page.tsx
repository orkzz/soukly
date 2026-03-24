'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Upload, Sparkles, X, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { productSchema, type ProductFormData } from '@/lib/validations';

export default function NewProductPage({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as never,
    defaultValues: {
      stock: 0,
      lowStockAlert: 5,
      isActive: true,
      isFeatured: false,
      tags: [],
    },
  });

  const price = watch('price');
  const costPrice = watch('costPrice');
  const margin = price && costPrice ? (((price - costPrice) / price) * 100).toFixed(1) : null;

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setValue('tags', newTags);
  };

  const onSubmit = async () => {
    toast('success', 'Produit créé avec succès');
    router.push(`/${locale}/dashboard/products`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={`/${locale}/dashboard/products`}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            Nouveau produit
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Ajoutez un nouveau produit à votre catalogue
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Images */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-primary transition-colors"
              >
                <Upload size={24} />
                <span className="text-xs font-medium">Ajouter</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Basic info */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Informations</h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Nom du produit (Français)"
                  placeholder="Ex: Robe Kabyle Traditionnelle"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="Nom du produit (Arabe)"
                  placeholder="مثال: فستان قبائلي تقليدي"
                  {...register('nameAr')}
                  className="font-arabic"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Description (Français)
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre produit..."
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    {...register('description')}
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
                  >
                    <Sparkles size={12} />
                    Générer avec l&apos;IA
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Prix</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input
                label="Prix de vente (DZD)"
                type="number"
                placeholder="0"
                error={errors.price?.message}
                {...register('price', { valueAsNumber: true })}
              />
              <Input
                label="Ancien prix (DZD)"
                type="number"
                placeholder="0"
                hint="Prix barré"
                {...register('compareAtPrice', { valueAsNumber: true })}
              />
              <Input
                label="Prix coûtant (DZD)"
                type="number"
                placeholder="0"
                hint={margin ? `Marge: ${margin}%` : undefined}
                {...register('costPrice', { valueAsNumber: true })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Inventaire</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input
                label="Stock"
                type="number"
                placeholder="0"
                error={errors.stock?.message}
                {...register('stock', { valueAsNumber: true })}
              />
              <Input
                label="Alerte stock faible"
                type="number"
                placeholder="5"
                {...register('lowStockAlert', { valueAsNumber: true })}
              />
              <Input
                label="SKU"
                placeholder="Auto-généré"
                {...register('sku')}
              />
            </div>
            <Input
              label="Poids (kg)"
              type="number"
              step="0.01"
              placeholder="0.00"
              hint="Pour le calcul des frais de livraison"
              wrapperClassName="mt-4 max-w-xs"
              {...register('weight', { valueAsNumber: true })}
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="default" size="md">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ms-1.5">
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                wrapperClassName="flex-1"
              />
              <Button type="button" variant="secondary" onClick={addTag} leftIcon={<Plus size={14} />}>
                Ajouter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">SEO</h3>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
              >
                <Sparkles size={12} />
                Générer avec l&apos;IA
              </button>
            </div>
            <div className="space-y-4">
              <Input label="Titre SEO" placeholder="Titre pour les moteurs de recherche" {...register('seoTitle')} />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Description SEO
                </label>
                <textarea
                  rows={2}
                  placeholder="Description pour les moteurs de recherche"
                  className="w-full px-4 py-3 text-sm bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                  {...register('seoDescription')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Toggles */}
        <Card>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" {...register('isActive')} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Actif</p>
                  <p className="text-xs text-gray-500">Visible dans la boutique</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" {...register('isFeatured')} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">En vedette</p>
                  <p className="text-xs text-gray-500">Affiché en page d&apos;accueil</p>
                </div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pb-8">
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isSubmitting} size="lg">
            Créer le produit
          </Button>
        </div>
      </form>
    </div>
  );
}
