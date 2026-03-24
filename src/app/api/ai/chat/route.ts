import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/lib/ai/claude';
import { buildChatContext } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history, storeContext } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const systemPrompt = buildChatContext(
      storeContext || {
        storeName: 'Ma Boutique',
        totalProducts: 45,
        totalOrders: 230,
        monthlyRevenue: 450000,
        topProducts: ['Robe Kabyle', 'Bijoux Berbères', 'Caftan Moderne'],
        recentOrders: ['SOK-A4B2C1 (8,500 DZD)', 'SOK-D7E3F2 (12,000 DZD)'],
        lowStockProducts: ['Poterie de Mila (0)', 'Tapis Ghardaia (3)'],
      }
    );

    const messages = [
      ...(history || []).map((h: { role: string; content: string }) => ({
        role: h.role as 'user' | 'assistant',
        content: h.content,
      })),
      { role: 'user' as const, content: message },
    ];

    const response = await sendMessage({
      system: systemPrompt,
      messages,
      maxTokens: 2048,
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'AI chat failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
