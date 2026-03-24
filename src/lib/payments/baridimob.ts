export interface CCPPaymentInfo {
  ccpNumber: string;
  ccpKey: string;
  accountHolder: string;
}

export interface PaymentProof {
  orderId: string;
  imageUrl: string;
  amount: number;
  senderName: string;
  referenceNumber?: string;
  submittedAt: Date;
}

export interface BaridiMobPaymentConfig {
  ripNumber: string;
  accountHolder: string;
  bankName: string;
}

export function formatCCPNumber(number: string): string {
  const cleaned = number.replace(/\s/g, '');
  if (cleaned.length <= 10) return cleaned;
  return `${cleaned.slice(0, -2)} clé ${cleaned.slice(-2)}`;
}

export function generatePaymentInstructions(
  method: 'CCP' | 'BARIDIMOB',
  config: CCPPaymentInfo,
  amount: number,
  orderNumber: string
): { title: string; steps: string[] } {
  if (method === 'CCP') {
    return {
      title: 'Paiement par CCP',
      steps: [
        `Effectuez un virement de ${amount.toLocaleString()} DZD vers :`,
        `Numéro CCP : ${config.ccpNumber}`,
        `Clé : ${config.ccpKey}`,
        `Titulaire : ${config.accountHolder}`,
        `Motif : ${orderNumber}`,
        'Prenez une capture d\'écran du reçu de paiement',
        'Uploadez la preuve de paiement ci-dessous',
      ],
    };
  }

  return {
    title: 'Paiement par BaridiMob',
    steps: [
      'Ouvrez l\'application BaridiMob',
      'Allez dans "Paiement"',
      `Envoyez ${amount.toLocaleString()} DZD à :`,
      `RIP : ${config.ccpNumber}`,
      `Titulaire : ${config.accountHolder}`,
      `Motif : ${orderNumber}`,
      'Prenez une capture d\'écran de la confirmation',
      'Uploadez la preuve de paiement ci-dessous',
    ],
  };
}

export function validatePaymentProof(proof: PaymentProof): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!proof.imageUrl) {
    errors.push('La preuve de paiement est requise');
  }

  if (!proof.senderName || proof.senderName.length < 2) {
    errors.push('Le nom de l\'expéditeur est requis');
  }

  if (proof.amount <= 0) {
    errors.push('Le montant doit être positif');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
