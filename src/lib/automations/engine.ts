import { prisma } from '@/lib/prisma';

export interface AutomationTrigger {
  type: 'order_created' | 'order_confirmed' | 'payment_received' | 'low_stock' | 'new_customer' | 'order_delivered' | 'order_returned' | 'new_review';
  conditions?: Record<string, unknown>;
}

export interface AutomationAction {
  type: 'send_sms' | 'send_email' | 'send_whatsapp' | 'update_stock' | 'add_customer_tag' | 'create_shipment' | 'notify_merchant' | 'change_order_status' | 'send_webhook';
  config: Record<string, unknown>;
}

export interface AutomationExecution {
  automationId: string;
  triggeredBy: string;
  status: 'success' | 'failed' | 'skipped';
  actionsExecuted: number;
  error?: string;
  executedAt: Date;
}

export async function evaluateTrigger(
  trigger: AutomationTrigger,
  eventData: Record<string, unknown>
): Promise<boolean> {
  if (!trigger.conditions) return true;

  return Object.entries(trigger.conditions).every(([key, expected]) => {
    const actual = eventData[key];
    if (typeof expected === 'string' && expected.startsWith('>')) {
      return Number(actual) > Number(expected.slice(1));
    }
    if (typeof expected === 'string' && expected.startsWith('<')) {
      return Number(actual) < Number(expected.slice(1));
    }
    return actual === expected;
  });
}

export async function executeAction(
  action: AutomationAction,
  eventData: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  try {
    switch (action.type) {
      case 'send_sms': {
        const phone = interpolate(action.config.phone as string, eventData);
        const message = interpolate(action.config.message as string, eventData);
        console.log(`[Automation] SMS to ${phone}: ${message}`);
        return { success: true };
      }
      case 'send_email': {
        const to = interpolate(action.config.to as string, eventData);
        const subject = interpolate(action.config.subject as string, eventData);
        console.log(`[Automation] Email to ${to}: ${subject}`);
        return { success: true };
      }
      case 'notify_merchant': {
        const title = interpolate(action.config.title as string, eventData);
        const message = interpolate(action.config.message as string, eventData);
        console.log(`[Automation] Notification: ${title} - ${message}`);
        return { success: true };
      }
      case 'add_customer_tag': {
        const tag = action.config.tag as string;
        console.log(`[Automation] Add tag "${tag}" to customer ${eventData.customerId}`);
        return { success: true };
      }
      case 'change_order_status': {
        const newStatus = action.config.status as string;
        console.log(`[Automation] Change order ${eventData.orderId} to ${newStatus}`);
        return { success: true };
      }
      case 'send_webhook': {
        const url = action.config.url as string;
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        });
        return { success: true };
      }
      default:
        return { success: false, error: `Unknown action type: ${action.type}` };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function processEvent(
  storeId: string,
  eventType: AutomationTrigger['type'],
  eventData: Record<string, unknown>
): Promise<AutomationExecution[]> {
  const automations = await prisma.automation.findMany({
    where: { storeId, isActive: true },
  });

  const executions: AutomationExecution[] = [];

  for (const automation of automations) {
    const trigger = automation.trigger as unknown as AutomationTrigger;

    if (trigger.type !== eventType) continue;

    const shouldTrigger = await evaluateTrigger(trigger, eventData);
    if (!shouldTrigger) {
      executions.push({
        automationId: automation.id,
        triggeredBy: eventType,
        status: 'skipped',
        actionsExecuted: 0,
        executedAt: new Date(),
      });
      continue;
    }

    const actions = automation.actions as unknown as AutomationAction[];
    let actionsExecuted = 0;
    let lastError: string | undefined;

    for (const action of actions) {
      const result = await executeAction(action, eventData);
      if (result.success) {
        actionsExecuted++;
      } else {
        lastError = result.error;
        break;
      }
    }

    await prisma.automation.update({
      where: { id: automation.id },
      data: {
        executionCount: { increment: 1 },
        lastExecuted: new Date(),
      },
    });

    executions.push({
      automationId: automation.id,
      triggeredBy: eventType,
      status: lastError ? 'failed' : 'success',
      actionsExecuted,
      error: lastError,
      executedAt: new Date(),
    });
  }

  return executions;
}

function interpolate(template: string, data: Record<string, unknown>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(data[key] || ''));
}
