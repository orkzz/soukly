export interface TriggerDefinition {
  type: string;
  label: string;
  description: string;
  icon: string;
  availableConditions: {
    key: string;
    label: string;
    type: 'string' | 'number' | 'select';
    options?: { value: string; label: string }[];
  }[];
}

export const TRIGGERS: TriggerDefinition[] = [
  {
    type: 'order_created',
    label: 'Nouvelle commande',
    description: 'Se déclenche quand une nouvelle commande est reçue',
    icon: '🛒',
    availableConditions: [
      {
        key: 'paymentMethod',
        label: 'Méthode de paiement',
        type: 'select',
        options: [
          { value: 'COD', label: 'Paiement à la livraison' },
          { value: 'CCP', label: 'CCP' },
          { value: 'BARIDIMOB', label: 'BaridiMob' },
          { value: 'CHARGILY', label: 'Chargily' },
        ],
      },
      { key: 'total', label: 'Montant minimum (DZD)', type: 'number' },
    ],
  },
  {
    type: 'order_confirmed',
    label: 'Commande confirmée',
    description: 'Se déclenche quand une commande est confirmée',
    icon: '✅',
    availableConditions: [],
  },
  {
    type: 'payment_received',
    label: 'Paiement reçu',
    description: 'Se déclenche quand un paiement est confirmé',
    icon: '💰',
    availableConditions: [
      { key: 'amount', label: 'Montant minimum', type: 'number' },
    ],
  },
  {
    type: 'low_stock',
    label: 'Stock faible',
    description: 'Se déclenche quand le stock passe sous le seuil d\'alerte',
    icon: '📦',
    availableConditions: [
      { key: 'threshold', label: 'Seuil', type: 'number' },
    ],
  },
  {
    type: 'new_customer',
    label: 'Nouveau client',
    description: 'Se déclenche quand un nouveau client passe sa première commande',
    icon: '👤',
    availableConditions: [],
  },
  {
    type: 'order_delivered',
    label: 'Commande livrée',
    description: 'Se déclenche quand une commande est livrée',
    icon: '📬',
    availableConditions: [],
  },
  {
    type: 'order_returned',
    label: 'Commande retournée',
    description: 'Se déclenche quand une commande est retournée',
    icon: '🔄',
    availableConditions: [],
  },
  {
    type: 'new_review',
    label: 'Nouvel avis',
    description: 'Se déclenche quand un client laisse un avis',
    icon: '⭐',
    availableConditions: [
      { key: 'minRating', label: 'Note minimum', type: 'number' },
    ],
  },
];
