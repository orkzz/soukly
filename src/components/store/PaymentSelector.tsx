'use client';

import { generatePaymentInstructions, type CCPPaymentInfo } from '@/lib/payments/baridimob';
import { cn } from '@/lib/utils';

interface PaymentSelectorProps {
  selectedMethod: string;
  onChange: (method: string) => void;
  amount: number;
  orderNumber: string;
}

const methods = [
  { value: 'COD', label: 'Paiement à la livraison', icon: '💵' },
  { value: 'CCP', label: 'Compte CCP', icon: '🏦' },
  { value: 'BARIDIMOB', label: 'BaridiMob', icon: '📱' },
  { value: 'CHARGILY', label: 'Carte Edahabia / CIB', icon: '💳' },
];

const storePaymentInfo: CCPPaymentInfo = {
  ccpNumber: '0012345678',
  ccpKey: '90',
  accountHolder: 'BOUTIQUE EXAMPLE',
};

export default function PaymentSelector({
  selectedMethod,
  onChange,
  amount,
  orderNumber,
}: PaymentSelectorProps) {
  const showInstructions = selectedMethod === 'CCP' || selectedMethod === 'BARIDIMOB';

  const instructions = showInstructions
    ? generatePaymentInstructions(
        selectedMethod as 'CCP' | 'BARIDIMOB',
        storePaymentInfo,
        amount,
        orderNumber
      )
    : null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {methods.map((method) => (
          <button
            key={method.value}
            type="button"
            onClick={() => onChange(method.value)}
            className={cn(
              'w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-start',
              selectedMethod === method.value
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
            )}
          >
            <span className="text-xl">{method.icon}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{method.label}</span>
          </button>
        ))}
      </div>

      {instructions && (
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-3">
            {instructions.title}
          </h4>
          <ol className="space-y-2">
            {instructions.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-400">
                <span className="font-bold text-amber-600 shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
