'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, CreditCard, Phone, User, Mail, Home } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import WilayaSelector from '@/components/dashboard/WilayaSelector';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/components/ui/Toast';
import { orderSchema, type OrderFormData } from '@/lib/validations';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

const paymentMethods = [
  { value: 'COD', label: 'Paiement à la livraison', icon: '💵', desc: 'Payez en espèces à la réception' },
  { value: 'CCP', label: 'Compte CCP', icon: '🏦', desc: 'Virement vers notre compte CCP' },
  { value: 'BARIDIMOB', label: 'BaridiMob', icon: '📱', desc: 'Paiement via l\'app BaridiMob' },
  { value: 'CHARGILY', label: 'Carte Edahabia / CIB', icon: '💳', desc: 'Paiement par carte bancaire' },
] as const;

interface CheckoutFormProps {
  storeSlug: string;
  locale: string;
}

export default function CheckoutForm({}: CheckoutFormProps) {
  const { items, getTotal, clearCart } = useCartStore();
  const { toast } = useToast();
  const [deliveryType, setDeliveryType] = useState<'home' | 'desk'>('home');
  const [wilaya, setWilaya] = useState('');
  const [commune, setCommune] = useState('');
  const [shippingFee, setShippingFee] = useState(600);

  const subtotal = getTotal();
  const total = subtotal + shippingFee;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema) as never,
    defaultValues: {
      paymentMethod: 'COD',
    },
  });

  const handleWilayaChange = (code: string) => {
    setWilaya(code);
    setValue('shippingWilaya', code);
    // Simulate fee calculation
    const fees: Record<string, number> = { '16': 400, '31': 600, '25': 600 };
    setShippingFee(fees[code] || 700);
  };

  const handleCommuneChange = (c: string) => {
    setCommune(c);
    setValue('shippingCommune', c);
  };

  const onSubmit = async () => {
    toast('success', 'Commande confirmée !', 'Vous recevrez un SMS de confirmation.');
    clearCart();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer Info */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User size={18} className="text-primary" />
            Informations de contact
          </h3>
          <div className="space-y-4">
            <Input
              label="Nom complet"
              placeholder="Ahmed Benali"
              leftIcon={<User size={14} />}
              error={errors.customerName?.message}
              {...register('customerName')}
            />
            <Input
              label="Téléphone"
              type="tel"
              placeholder="0555 12 34 56"
              leftIcon={<Phone size={14} />}
              error={errors.customerPhone?.message}
              {...register('customerPhone')}
            />
            <Input
              label="Email (optionnel)"
              type="email"
              placeholder="email@exemple.com"
              leftIcon={<Mail size={14} />}
              error={errors.customerEmail?.message}
              {...register('customerEmail')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Adresse de livraison
          </h3>

          <WilayaSelector
            selectedWilaya={wilaya}
            selectedCommune={commune}
            onWilayaChange={handleWilayaChange}
            onCommuneChange={handleCommuneChange}
            error={errors.shippingWilaya?.message}
          />

          <Input
            label="Adresse complète"
            placeholder="Rue, quartier, numéro..."
            leftIcon={<Home size={14} />}
            error={errors.shippingAddress?.message}
            wrapperClassName="mt-4"
            {...register('shippingAddress')}
          />

          {/* Delivery type */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type de livraison
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'home' as const, label: 'À domicile', price: shippingFee, icon: Home },
                { type: 'desk' as const, label: 'Point relais', price: Math.round(shippingFee * 0.7), icon: MapPin },
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() => {
                      setDeliveryType(option.type);
                      setShippingFee(option.price);
                    }}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-start',
                      deliveryType === option.type
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    )}
                  >
                    <Icon size={18} className={deliveryType === option.type ? 'text-primary' : 'text-gray-400'} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{option.label}</p>
                      <p className="text-xs text-gray-500">{formatPrice(option.price)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment method */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-primary" />
            Mode de paiement
          </h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <label
                key={method.value}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                  'hover:border-gray-300 dark:hover:border-gray-600',
                  'has-[:checked]:border-primary has-[:checked]:bg-primary/5'
                )}
              >
                <input
                  type="radio"
                  value={method.value}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  {...register('paymentMethod')}
                />
                <span className="text-xl">{method.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{method.label}</p>
                  <p className="text-xs text-gray-500">{method.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order summary */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Récapitulatif
          </h3>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {item.name} x{item.quantity}
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500">Livraison</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between font-bold text-base">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
          </div>

          <Button type="submit" isLoading={isSubmitting} className="w-full mt-6" size="lg">
            Confirmer la commande — {formatPrice(total)}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
