import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/payments/chargily';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('signature') || '';

    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    const { type, data } = event;

    switch (type) {
      case 'checkout.paid': {
        const checkoutId = data.id;
        const metadata = data.metadata || {};
        const orderId = metadata.order_id;

        if (orderId) {
          // Update order payment status to PAID
          // await prisma.order.update({ where: { id: orderId }, data: { paymentStatus: 'PAID' } });
          console.log(`Chargily payment received for order ${orderId}, checkout ${checkoutId}`);
        }
        break;
      }
      case 'checkout.failed': {
        const metadata = data.metadata || {};
        const orderId = metadata.order_id;
        console.log(`Chargily payment failed for order ${orderId}`);
        break;
      }
      default:
        console.log(`Unhandled Chargily event type: ${type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Chargily webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
