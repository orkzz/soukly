interface SMSParams {
  to: string;
  message: string;
}

interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

function formatAlgerianPhone(phone: string): string {
  let cleaned = phone.replace(/\s/g, '').replace(/-/g, '');

  if (cleaned.startsWith('0')) {
    cleaned = '+213' + cleaned.slice(1);
  } else if (cleaned.startsWith('213')) {
    cleaned = '+' + cleaned;
  } else if (!cleaned.startsWith('+213')) {
    cleaned = '+213' + cleaned;
  }

  return cleaned;
}

export async function sendSMS(params: SMSParams): Promise<SMSResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    return { success: false, error: 'Twilio credentials not configured' };
  }

  const to = formatAlgerianPhone(params.to);

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: to,
          From: fromNumber,
          Body: params.message,
        }).toString(),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `Twilio error: ${error}` };
    }

    const data = await response.json();
    return { success: true, messageId: data.sid };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'SMS send failed',
    };
  }
}

export async function sendBulkSMS(
  recipients: { phone: string; variables: Record<string, string> }[],
  template: string
): Promise<{ total: number; sent: number; failed: number; errors: string[] }> {
  const results = { total: recipients.length, sent: 0, failed: 0, errors: [] as string[] };

  for (const recipient of recipients) {
    let message = template;
    Object.entries(recipient.variables).forEach(([key, value]) => {
      message = message.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });

    const result = await sendSMS({ to: recipient.phone, message });
    if (result.success) {
      results.sent++;
    } else {
      results.failed++;
      results.errors.push(`${recipient.phone}: ${result.error}`);
    }
  }

  return results;
}

export function validateAlgerianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, '').replace(/-/g, '');
  return /^(\+213|0)(5|6|7)\d{8}$/.test(cleaned);
}

export function estimateSMSCount(message: string): number {
  return message.length <= 160 ? 1 : Math.ceil(message.length / 153);
}
