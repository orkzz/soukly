import crypto from 'crypto';

const CHARGILY_API_URL = 'https://pay.chargily.net/test/api/v2';

interface ChargilyCheckout {
  id: string;
  status: string;
  amount: number;
  currency: string;
  checkout_url: string;
}

interface CreateCheckoutParams {
  amount: number;
  currency?: string;
  description: string;
  successUrl: string;
  failureUrl: string;
  webhookUrl: string;
  customerName?: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

function getHeaders(): HeadersInit {
  const apiKey = process.env.CHARGILY_API_KEY;
  if (!apiKey) throw new Error('CHARGILY_API_KEY is not set');

  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
}

export async function createCheckout(params: CreateCheckoutParams): Promise<ChargilyCheckout> {
  const response = await fetch(`${CHARGILY_API_URL}/checkouts`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency || 'dzd',
      description: params.description,
      success_url: params.successUrl,
      failure_url: params.failureUrl,
      webhook_endpoint: params.webhookUrl,
      locale: 'fr',
      customer_name: params.customerName,
      customer_email: params.customerEmail,
      metadata: params.metadata,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Chargily checkout error: ${error}`);
  }

  return response.json();
}

export async function getCheckout(checkoutId: string): Promise<ChargilyCheckout> {
  const response = await fetch(`${CHARGILY_API_URL}/checkouts/${checkoutId}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Chargily get checkout error: ${response.statusText}`);
  }

  return response.json();
}

export function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.CHARGILY_WEBHOOK_SECRET;
  if (!secret) return false;

  const computed = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return computed === signature;
}
