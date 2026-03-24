const YALIDINE_API_URL = 'https://api.yalidine.app/v1';

function getHeaders(): Record<string, string> {
  const apiId = process.env.YALIDINE_API_ID;
  const apiToken = process.env.YALIDINE_API_TOKEN;
  if (!apiId || !apiToken) throw new Error('Yalidine API credentials not set');

  return {
    'X-API-ID': apiId,
    'X-API-TOKEN': apiToken,
    'Content-Type': 'application/json',
  };
}

export interface YalidineParcel {
  order_id: string;
  firstname: string;
  familyname: string;
  contact_phone: string;
  address: string;
  to_commune_name: string;
  to_wilaya_name: string;
  product_list: string;
  price: number;
  is_stopdesk: boolean;
  has_exchange: boolean;
  product_to_collect?: string;
}

export interface YalidineParcelResponse {
  id: string;
  tracking: string;
  label_url: string;
  status: string;
}

export interface YalidineWilaya {
  id: number;
  name: string;
  name_ar: string;
  code: string;
}

export interface YalidineCommune {
  id: number;
  name: string;
  name_ar: string;
  wilaya_id: number;
  has_stopdesk: boolean;
}

export interface YalidineRate {
  wilaya_id: number;
  home_delivery: number;
  stopdesk_delivery: number;
  return_price: number;
}

export async function getWilayas(): Promise<YalidineWilaya[]> {
  const response = await fetch(`${YALIDINE_API_URL}/wilayas/`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Yalidine wilayas error: ${response.statusText}`);
  return response.json();
}

export async function getCommunes(wilayaId: number): Promise<YalidineCommune[]> {
  const response = await fetch(`${YALIDINE_API_URL}/communes/?wilaya_id=${wilayaId}`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Yalidine communes error: ${response.statusText}`);
  return response.json();
}

export async function getRates(): Promise<YalidineRate[]> {
  const response = await fetch(`${YALIDINE_API_URL}/deliveryfees/`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Yalidine rates error: ${response.statusText}`);
  return response.json();
}

export async function createParcel(parcel: YalidineParcel): Promise<YalidineParcelResponse> {
  const response = await fetch(`${YALIDINE_API_URL}/parcels/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify([parcel]),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Yalidine create parcel error: ${error}`);
  }
  const result = await response.json();
  return result[0];
}

export async function getParcelTracking(tracking: string): Promise<{
  tracking: string;
  status: string;
  history: { date: string; status: string; note: string }[];
}> {
  const response = await fetch(`${YALIDINE_API_URL}/parcels/${tracking}`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Yalidine tracking error: ${response.statusText}`);
  return response.json();
}

export async function getLabel(tracking: string): Promise<string> {
  const response = await fetch(`${YALIDINE_API_URL}/parcels/${tracking}/label`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Yalidine label error: ${response.statusText}`);
  const data = await response.json();
  return data.label_url;
}
