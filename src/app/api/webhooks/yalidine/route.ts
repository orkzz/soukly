import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tracking, new_status, order_id } = body;

    const statusMap: Record<string, string> = {
      'EN_PREPARATION': 'PROCESSING',
      'EXPEDIEE': 'SHIPPED',
      'EN_WILAYA': 'IN_TRANSIT',
      'LIVREE': 'DELIVERED',
      'RETOUR': 'RETURNED',
      'TENTATIVE_ECHOUEE': 'OUT_FOR_DELIVERY',
    };

    const mappedStatus = statusMap[new_status] || new_status;

    if (order_id) {
      // Update order status and add timeline entry
      // await prisma.order.update({ where: { id: order_id }, data: { status: mappedStatus } });
      // await prisma.orderTimeline.create({ data: { orderId: order_id, status: mappedStatus, note: `Yalidine: ${new_status}` } });
      console.log(`Yalidine tracking ${tracking}: ${new_status} -> ${mappedStatus} for order ${order_id}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Yalidine webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
