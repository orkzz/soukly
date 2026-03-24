import { Badge } from '@/components/ui/Badge';

const statusConfig: Record<string, { label: string; variant: 'default' | 'success' | 'danger' | 'warning' | 'info' }> = {
  PENDING: { label: 'En attente', variant: 'warning' },
  CONFIRMED: { label: 'Confirmé', variant: 'info' },
  PROCESSING: { label: 'En préparation', variant: 'default' },
  SHIPPED: { label: 'Expédié', variant: 'default' },
  IN_TRANSIT: { label: 'En transit', variant: 'info' },
  OUT_FOR_DELIVERY: { label: 'En livraison', variant: 'info' },
  DELIVERED: { label: 'Livré', variant: 'success' },
  RETURNED: { label: 'Retourné', variant: 'danger' },
  CANCELLED: { label: 'Annulé', variant: 'danger' },
};

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: 'default' as const };
  return (
    <Badge variant={config.variant} dot size="sm">
      {config.label}
    </Badge>
  );
}
