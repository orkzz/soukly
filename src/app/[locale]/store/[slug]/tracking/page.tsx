'use client';

import { useState } from 'react';
import { Search, Package, CheckCircle, Truck, MapPin, Clock } from 'lucide-react';
import StoreLayout from '@/components/store/StoreLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const sampleTracking = {
  orderNumber: 'SOK-A4B2C1',
  status: 'IN_TRANSIT',
  provider: 'Yalidine',
  trackingNumber: 'YAL-123456',
  estimatedDelivery: '26 Mars 2024',
  timeline: [
    { status: 'Commande reçue', date: '22 Mars 2024, 10:30', completed: true, icon: Package },
    { status: 'Commande confirmée', date: '22 Mars 2024, 11:00', completed: true, icon: CheckCircle },
    { status: 'Expédiée', date: '23 Mars 2024, 09:00', completed: true, icon: Truck },
    { status: 'En transit vers Oran', date: '24 Mars 2024, 14:30', completed: true, icon: MapPin },
    { status: 'En cours de livraison', date: '', completed: false, icon: Truck },
    { status: 'Livrée', date: '', completed: false, icon: CheckCircle },
  ],
};

export default function TrackingPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const [orderNumber, setOrderNumber] = useState('');
  const [tracking, setTracking] = useState<typeof sampleTracking | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!orderNumber.trim()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTracking(sampleTracking);
      setLoading(false);
    }, 800);
  };

  return (
    <StoreLayout storeName="Mode DZ" storeSlug={slug} locale={locale}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            Suivre ma commande
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Entrez votre numéro de commande pour suivre votre colis
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-8">
          <Input
            placeholder="SOK-XXXXXX"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            leftIcon={<Search size={14} />}
            wrapperClassName="flex-1"
          />
          <Button onClick={handleSearch} isLoading={loading}>
            Rechercher
          </Button>
        </div>

        {/* Results */}
        {tracking && (
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Commande</p>
                  <p className="text-lg font-mono font-bold text-primary">{tracking.orderNumber}</p>
                </div>
                <Badge variant="info" size="lg">En transit</Badge>
              </div>

              <div className="flex items-center gap-4 mb-6 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm">
                <div>
                  <span className="text-gray-500">Transporteur:</span>{' '}
                  <span className="font-medium text-gray-900 dark:text-white">{tracking.provider}</span>
                </div>
                <div>
                  <span className="text-gray-500">Tracking:</span>{' '}
                  <span className="font-mono text-gray-900 dark:text-white">{tracking.trackingNumber}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 text-sm">
                <Clock size={14} className="text-primary" />
                <span className="text-gray-600 dark:text-gray-400">
                  Livraison estimée: <span className="font-medium text-gray-900 dark:text-white">{tracking.estimatedDelivery}</span>
                </span>
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {tracking.timeline.map((event, index) => {
                  const Icon = event.icon;
                  const isLast = index === tracking.timeline.length - 1;

                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                            event.completed
                              ? 'bg-primary text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                          )}
                        >
                          <Icon size={14} />
                        </div>
                        {!isLast && (
                          <div
                            className={cn(
                              'w-0.5 h-12',
                              event.completed ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                            )}
                          />
                        )}
                      </div>
                      <div className="pb-8">
                        <p className={cn(
                          'text-sm font-medium',
                          event.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                        )}>
                          {event.status}
                        </p>
                        {event.date && (
                          <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </StoreLayout>
  );
}
