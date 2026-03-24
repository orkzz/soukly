import type { ShippingZone } from '@prisma/client';

export interface ShippingRate {
  wilayaCode: string;
  wilayaName: string;
  homeDelivery: number;
  deskDelivery: number;
  freeAbove: number | null;
  estimatedDays: number;
}

const DEFAULT_RATES: ShippingRate[] = [
  { wilayaCode: '16', wilayaName: 'Alger', homeDelivery: 400, deskDelivery: 250, freeAbove: 5000, estimatedDays: 1 },
  { wilayaCode: '31', wilayaName: 'Oran', homeDelivery: 600, deskDelivery: 400, freeAbove: 8000, estimatedDays: 2 },
  { wilayaCode: '25', wilayaName: 'Constantine', homeDelivery: 600, deskDelivery: 400, freeAbove: 8000, estimatedDays: 2 },
  { wilayaCode: '09', wilayaName: 'Blida', homeDelivery: 450, deskDelivery: 300, freeAbove: 5000, estimatedDays: 1 },
  { wilayaCode: '19', wilayaName: 'Sétif', homeDelivery: 600, deskDelivery: 400, freeAbove: null, estimatedDays: 2 },
  { wilayaCode: '15', wilayaName: 'Tizi Ouzou', homeDelivery: 550, deskDelivery: 350, freeAbove: null, estimatedDays: 2 },
  { wilayaCode: '06', wilayaName: 'Béjaïa', homeDelivery: 600, deskDelivery: 400, freeAbove: null, estimatedDays: 2 },
  { wilayaCode: '23', wilayaName: 'Annaba', homeDelivery: 650, deskDelivery: 450, freeAbove: null, estimatedDays: 3 },
];

const FALLBACK_HOME_RATE = 700;
const FALLBACK_DESK_RATE = 500;
const FALLBACK_DAYS = 3;

export function calculateShippingFee(params: {
  wilayaCode: string;
  deliveryType: 'home' | 'desk';
  orderTotal: number;
  customRates?: ShippingRate[];
  storeZones?: ShippingZone[];
}): { fee: number; estimatedDays: number; isFree: boolean } {
  const { wilayaCode, deliveryType, orderTotal, customRates, storeZones } = params;

  // Check store-specific zones first
  if (storeZones) {
    const zone = storeZones.find((z) => z.wilayaCode === wilayaCode);
    if (zone) {
      const fee = deliveryType === 'home'
        ? Number(zone.homeDelivery)
        : Number(zone.deskDelivery);
      const freeAbove = zone.freeAbove ? Number(zone.freeAbove) : null;
      const isFree = freeAbove !== null && orderTotal >= freeAbove;

      return {
        fee: isFree ? 0 : fee,
        estimatedDays: zone.estimatedDays,
        isFree,
      };
    }
  }

  // Check custom rates
  const rates = customRates || DEFAULT_RATES;
  const rate = rates.find((r) => r.wilayaCode === wilayaCode);

  if (rate) {
    const fee = deliveryType === 'home' ? rate.homeDelivery : rate.deskDelivery;
    const isFree = rate.freeAbove !== null && orderTotal >= rate.freeAbove;

    return {
      fee: isFree ? 0 : fee,
      estimatedDays: rate.estimatedDays,
      isFree,
    };
  }

  // Fallback
  return {
    fee: deliveryType === 'home' ? FALLBACK_HOME_RATE : FALLBACK_DESK_RATE,
    estimatedDays: FALLBACK_DAYS,
    isFree: false,
  };
}

export function compareProviders(wilayaCode: string, deliveryType: 'home' | 'desk'): {
  provider: string;
  fee: number;
  estimatedDays: number;
}[] {
  const rate = DEFAULT_RATES.find((r) => r.wilayaCode === wilayaCode);
  const baseFee = rate
    ? (deliveryType === 'home' ? rate.homeDelivery : rate.deskDelivery)
    : (deliveryType === 'home' ? FALLBACK_HOME_RATE : FALLBACK_DESK_RATE);
  const days = rate?.estimatedDays || FALLBACK_DAYS;

  return [
    { provider: 'Yalidine', fee: baseFee, estimatedDays: days },
    { provider: 'ZR Express', fee: Math.round(baseFee * 1.05), estimatedDays: days },
    { provider: 'Ecotrack', fee: Math.round(baseFee * 0.95), estimatedDays: days + 1 },
    { provider: 'Procolis', fee: Math.round(baseFee * 1.1), estimatedDays: days },
  ].sort((a, b) => a.fee - b.fee);
}

export function getAllRates(): ShippingRate[] {
  return DEFAULT_RATES;
}
