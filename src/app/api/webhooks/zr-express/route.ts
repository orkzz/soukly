import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tracking_code, status, reference } = body;

    const statusMap: Record<string, string> = {
      'picked_up': 'SHIPPED',
      'in_transit': 'IN_TRANSIT',
      'out_for_delivery': 'OUT_FOR_DELIVERY',
      'delivered': 'DELIVERED',
      'returned': 'RETURNED',
      'failed_delivery': 'OUT_FOR_DELIVERY',
    };

    const mappedStatus = statusMap[status] || status;

    if (reference) {
      // Update order status
      // await prisma.order.update({ where: { orderNumber: reference }, data: { status: mappedStatus } });
      console.log(`ZR Express tracking ${tracking_code}: ${status} -> ${mappedStatus} for ref ${reference}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('ZR Express webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
