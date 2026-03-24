const ZR_EXPRESS_API_URL = 'https://api.zrexpress.com';

function getHeaders(): HeadersInit {
  const apiKey = process.env.ZR_EXPRESS_API_KEY;
  const apiToken = process.env.ZR_EXPRESS_API_TOKEN;
  if (!apiKey || !apiToken) throw new Error('ZR Express API credentials not set');

  return {
    'Authorization': `Bearer ${apiToken}`,
    'X-API-Key': apiKey,
    'Content-Type': 'application/json',
  };
}

export interface ZRExpressParcel {
  reference: string;
  name: string;
  phone: string;
  address: string;
  commune: string;
  wilaya: string;
  product: string;
  price: number;
  delivery_type: 'home' | 'stopdesk';
  note?: string;
}

export interface ZRExpressParcelResponse {
  id: string;
  tracking_code: string;
  status: string;
  label_url: string;
}

export interface ZRExpressRate {
  wilaya_code: string;
  wilaya_name: string;
  home_fee: number;
  desk_fee: number;
  estimated_days: number;
}

export async function getRates(): Promise<ZRExpressRate[]> {
  const response = await fetch(`${ZR_EXPRESS_API_URL}/rates`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`ZR Express rates error: ${response.statusText}`);
  return response.json();
}

export async function createParcel(parcel: ZRExpressParcel): Promise<ZRExpressParcelResponse> {
  const response = await fetch(`${ZR_EXPRESS_API_URL}/parcels`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(parcel),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ZR Express create parcel error: ${error}`);
  }
  return response.json();
}

export async function getTracking(trackingCode: string): Promise<{
  tracking_code: string;
  status: string;
  events: { date: string; status: string; location: string }[];
}> {
  const response = await fetch(`${ZR_EXPRESS_API_URL}/tracking/${trackingCode}`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`ZR Express tracking error: ${response.statusText}`);
  return response.json();
}
