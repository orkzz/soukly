const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  id: string;
  content: { type: string; text: string }[];
  model: string;
  stop_reason: string;
  usage: { input_tokens: number; output_tokens: number };
}

export async function sendMessage(params: {
  system: string;
  messages: ClaudeMessage[];
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: params.maxTokens || 4096,
      temperature: params.temperature ?? 0.7,
      system: params.system,
      messages: params.messages,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${error}`);
  }

  const data: ClaudeResponse = await response.json();
  return data.content[0]?.text || '';
}

export async function streamMessage(params: {
  system: string;
  messages: ClaudeMessage[];
  maxTokens?: number;
  temperature?: number;
}): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: params.maxTokens || 4096,
      temperature: params.temperature ?? 0.7,
      system: params.system,
      messages: params.messages,
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API stream error: ${error}`);
  }

  return response.body!;
}
