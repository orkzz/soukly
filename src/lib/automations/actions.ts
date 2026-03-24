export interface ActionDefinition {
  type: string;
  label: string;
  description: string;
  icon: string;
  configFields: {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'number';
    placeholder?: string;
    required?: boolean;
  }[];
}

export const ACTIONS: ActionDefinition[] = [
  {
    type: 'send_sms',
    label: 'Envoyer un SMS',
    description: 'Envoie un SMS au client ou au marchand',
    icon: '📱',
    configFields: [
      { key: 'phone', label: 'Téléphone', type: 'text', placeholder: '{customerPhone}', required: true },
      { key: 'message', label: 'Message', type: 'textarea', placeholder: 'Bonjour {customerName}, votre commande {orderNumber}...', required: true },
    ],
  },
  {
    type: 'send_email',
    label: 'Envoyer un email',
    description: 'Envoie un email de notification',
    icon: '📧',
    configFields: [
      { key: 'to', label: 'Destinataire', type: 'text', placeholder: '{customerEmail}', required: true },
      { key: 'subject', label: 'Objet', type: 'text', placeholder: 'Confirmation commande {orderNumber}', required: true },
      { key: 'body', label: 'Contenu', type: 'textarea', placeholder: 'Contenu de l\'email...', required: true },
    ],
  },
  {
    type: 'notify_merchant',
    label: 'Notifier le marchand',
    description: 'Crée une notification dans le tableau de bord',
    icon: '🔔',
    configFields: [
      { key: 'title', label: 'Titre', type: 'text', placeholder: 'Nouvelle commande reçue', required: true },
      { key: 'message', label: 'Message', type: 'textarea', placeholder: '{customerName} a passé une commande de {total} DZD', required: true },
    ],
  },
  {
    type: 'add_customer_tag',
    label: 'Ajouter un tag client',
    description: 'Ajoute un tag au profil client',
    icon: '🏷️',
    configFields: [
      { key: 'tag', label: 'Tag', type: 'text', placeholder: 'VIP', required: true },
    ],
  },
  {
    type: 'change_order_status',
    label: 'Changer le status',
    description: 'Change le status de la commande',
    icon: '🔄',
    configFields: [
      {
        key: 'status',
        label: 'Nouveau status',
        type: 'select',
        required: true,
      },
    ],
  },
  {
    type: 'send_webhook',
    label: 'Envoyer un webhook',
    description: 'Envoie les données à une URL externe',
    icon: '🔗',
    configFields: [
      { key: 'url', label: 'URL', type: 'text', placeholder: 'https://...', required: true },
    ],
  },
];

export interface AutomationTemplate {
  name: string;
  description: string;
  icon: string;
  trigger: { type: string; conditions?: Record<string, unknown> };
  actions: { type: string; config: Record<string, string> }[];
}

export const TEMPLATES: AutomationTemplate[] = [
  {
    name: 'Confirmation SMS auto',
    description: 'Envoie un SMS de confirmation au client à chaque nouvelle commande',
    icon: '📱',
    trigger: { type: 'order_created' },
    actions: [
      {
        type: 'send_sms',
        config: {
          phone: '{customerPhone}',
          message: 'Merci {customerName}! Votre commande {orderNumber} de {total} DZD est bien reçue. Nous vous contacterons pour la confirmation.',
        },
      },
    ],
  },
  {
    name: 'Remerciement livraison',
    description: 'Envoie un SMS de remerciement après la livraison avec demande d\'avis',
    icon: '📬',
    trigger: { type: 'order_delivered' },
    actions: [
      {
        type: 'send_sms',
        config: {
          phone: '{customerPhone}',
          message: 'Merci {customerName}! Votre commande a ete livree. Laissez-nous un avis sur notre boutique!',
        },
      },
    ],
  },
  {
    name: 'Alerte stock faible',
    description: 'Notifie le marchand quand un produit passe sous le seuil de stock',
    icon: '📦',
    trigger: { type: 'low_stock', conditions: { threshold: 5 } },
    actions: [
      {
        type: 'notify_merchant',
        config: {
          title: 'Stock faible: {productName}',
          message: 'Le produit {productName} n\'a plus que {stock} unités en stock. Pensez à le réapprovisionner.',
        },
      },
    ],
  },
  {
    name: 'Tag VIP automatique',
    description: 'Tague automatiquement les clients qui dépensent plus de 50,000 DZD',
    icon: '⭐',
    trigger: { type: 'order_delivered', conditions: { customerTotalSpent: '>50000' } },
    actions: [
      {
        type: 'add_customer_tag',
        config: { tag: 'VIP' },
      },
      {
        type: 'send_sms',
        config: {
          phone: '{customerPhone}',
          message: 'Felicitations {customerName}! Vous etes maintenant client VIP. Profitez de -10% sur votre prochaine commande avec le code VIP10.',
        },
      },
    ],
  },
  {
    name: 'Notification retour',
    description: 'Alerte le marchand quand une commande est retournée',
    icon: '🔄',
    trigger: { type: 'order_returned' },
    actions: [
      {
        type: 'notify_merchant',
        config: {
          title: 'Commande retournée',
          message: 'La commande {orderNumber} de {customerName} ({total} DZD) a été retournée. Raison: à vérifier.',
        },
      },
    ],
  },
];
