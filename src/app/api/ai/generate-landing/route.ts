import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/lib/ai/claude';
import { LANDING_GENERATOR_PROMPT } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, style, language } = body;

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const userMessage = `Crée une landing page pour :
${description}

Style souhaité : ${style || 'Moderne et professionnel'}
Langue principale : ${language || 'Français'}

Génère le code HTML + Tailwind CSS complet.`;

    const html = await sendMessage({
      system: LANDING_GENERATOR_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
      maxTokens: 8192,
      temperature: 0.8,
    });

    return NextResponse.json({ html });
  } catch (error) {
    console.error('Landing generation error:', error);
    return NextResponse.json(
      { error: 'Landing generation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
