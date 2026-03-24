import { NextRequest, NextResponse } from 'next/server';
import { createCheckout as chargilyCheckout } from '@/lib/payments/chargily';
import { createCheckoutSession as stripeCheckout } from '@/lib/payments/stripe';
import { generatePaymentInstructions } from '@/lib/payments/baridimob';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, amount, orderId, orderNumber, successUrl, cancelUrl } = body;

    if (!method || !amount || !orderId) {
      return NextResponse.json(
        { error: 'method, amount, and orderId are required' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    switch (method) {
      case 'CHARGILY':
      case 'EDAHABIA':
      case 'CIB': {
        const checkout = await chargilyCheckout({
          amount,
          description: `Commande ${orderNumber}`,
          successUrl: successUrl || `${appUrl}/order-success`,
          failureUrl: cancelUrl || `${appUrl}/order-failed`,
          webhookUrl: `${appUrl}/api/webhooks/chargily`,
          metadata: { order_id: orderId, order_number: orderNumber },
        });

        return NextResponse.json({
          type: 'redirect',
          url: checkout.checkout_url,
          checkoutId: checkout.id,
        });
      }

      case 'STRIPE': {
        const session = await stripeCheckout({
          amount,
          description: `Commande ${orderNumber}`,
          successUrl: successUrl || `${appUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: cancelUrl || `${appUrl}/order-failed`,
          metadata: { order_id: orderId, order_number: orderNumber },
        });

        return NextResponse.json({
          type: 'redirect',
          url: session.url,
          sessionId: session.id,
        });
      }

      case 'CCP':
      case 'BARIDIMOB': {
        const instructions = generatePaymentInstructions(
          method as 'CCP' | 'BARIDIMOB',
          {
            ccpNumber: '0012345678',
            ccpKey: '90',
            accountHolder: 'SOUKLY SARL',
          },
          amount,
          orderNumber
        );

        return NextResponse.json({
          type: 'instructions',
          instructions,
        });
      }

      case 'COD': {
        return NextResponse.json({
          type: 'cod',
          message: 'Paiement à la livraison confirmé',
        });
      }

      default:
        return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 });
    }
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
  }
}
