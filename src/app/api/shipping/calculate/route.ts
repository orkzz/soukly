import { NextRequest, NextResponse } from 'next/server';
import { calculateShippingFee, compareProviders } from '@/lib/shipping/calculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wilayaCode, deliveryType, orderTotal, compare } = body;

    if (!wilayaCode || !deliveryType) {
      return NextResponse.json(
        { error: 'wilayaCode and deliveryType are required' },
        { status: 400 }
      );
    }

    if (compare) {
      const providers = compareProviders(wilayaCode, deliveryType);
      return NextResponse.json({ providers });
    }

    const result = calculateShippingFee({
      wilayaCode,
      deliveryType,
      orderTotal: orderTotal || 0,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Shipping calculate error:', error);
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}
