import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/lib/ai/claude';
import { PRODUCT_DESCRIPTION_PROMPT } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productName, category, price, features } = body;

    if (!productName) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    const prompt = PRODUCT_DESCRIPTION_PROMPT
      .replace('{product_name}', productName)
      .replace('{category}', category || 'Général')
      .replace('{price}', String(price || ''))
      .replace('{features}', features || 'Non spécifiées');

    const response = await sendMessage({
      system: 'Tu es un assistant qui répond uniquement en JSON valide.',
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 2048,
      temperature: 0.7,
    });

    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return NextResponse.json(parsed);
    }

    return NextResponse.json({ raw: response });
  } catch (error) {
    console.error('Product description error:', error);
    return NextResponse.json(
      { error: 'Description generation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
