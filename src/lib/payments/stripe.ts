import crypto from 'crypto';

interface StripeCheckoutParams {
  amount: number;
  currency?: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

interface StripeSession {
  id: string;
  url: string;
  status: string;
  payment_status: string;
}

function getStripeHeaders(): HeadersInit {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is not set');

  return {
    'Authorization': `Bearer ${secretKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
}

export async function createCheckoutSession(
  params: StripeCheckoutParams
): Promise<StripeSession> {
  const body = new URLSearchParams({
    'mode': 'payment',
    'line_items[0][price_data][currency]': params.currency || 'dzd',
    'line_items[0][price_data][product_data][name]': params.description,
    'line_items[0][price_data][unit_amount]': String(params.amount * 100),
    'line_items[0][quantity]': '1',
    'success_url': params.successUrl,
    'cancel_url': params.cancelUrl,
  });

  if (params.customerEmail) {
    body.set('customer_email', params.customerEmail);
  }

  if (params.metadata) {
    Object.entries(params.metadata).forEach(([key, value]) => {
      body.set(`metadata[${key}]`, value);
    });
  }

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: getStripeHeaders(),
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Stripe session error: ${error}`);
  }

  return response.json();
}

export async function getSession(sessionId: string): Promise<StripeSession> {
  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
    { headers: getStripeHeaders() }
  );

  if (!response.ok) {
    throw new Error(`Stripe get session error: ${response.statusText}`);
  }

  return response.json();
}

export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return false;

  const elements = signature.split(',');
  const timestampStr = elements.find((e: string) => e.startsWith('t='))?.slice(2);
  const signatureStr = elements.find((e: string) => e.startsWith('v1='))?.slice(3);

  if (!timestampStr || !signatureStr) return false;

  const signedPayload = `${timestampStr}.${payload}`;
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  return expectedSig === signatureStr;
}
