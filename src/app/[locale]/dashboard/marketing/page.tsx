'use client';

import { useState } from 'react';
import { Megaphone, MessageSquare, Tag, Send, Users, BarChart3, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

interface Campaign {
  id: string;
  name: string;
  type: 'SMS' | 'EMAIL' | 'WHATSAPP';
  status: 'DRAFT' | 'SENT' | 'SCHEDULED';
  sentCount: number;
  scheduledAt: string | null;
  createdAt: string;
}

const sampleCampaigns: Campaign[] = [
  { id: '1', name: 'Soldes d\'été -30%', type: 'SMS', status: 'SENT', sentCount: 450, scheduledAt: null, createdAt: '2024-03-10' },
  { id: '2', name: 'Nouveaux arrivages', type: 'SMS', status: 'SENT', sentCount: 320, scheduledAt: null, createdAt: '2024-03-05' },
  { id: '3', name: 'Rappel panier', type: 'WHATSAPP', status: 'SCHEDULED', sentCount: 0, scheduledAt: '2024-03-25', createdAt: '2024-03-15' },
  { id: '4', name: 'Fête des mères', type: 'SMS', status: 'DRAFT', sentCount: 0, scheduledAt: null, createdAt: '2024-03-20' },
];

interface Coupon {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  value: number;
  usedCount: number;
  maxUses: number | null;
  isActive: boolean;
}

const sampleCoupons: Coupon[] = [
  { id: '1', code: 'BIENVENUE10', type: 'PERCENTAGE', value: 10, usedCount: 45, maxUses: null, isActive: true },
  { id: '2', code: 'ETE2024', type: 'PERCENTAGE', value: 30, usedCount: 120, maxUses: 200, isActive: true },
  { id: '3', code: 'LIVGRATUITE', type: 'FIXED_AMOUNT', value: 600, usedCount: 35, maxUses: 100, isActive: true },
  { id: '4', code: 'VIP20', type: 'PERCENTAGE', value: 20, usedCount: 8, maxUses: 50, isActive: false },
];

const statusColors: Record<string, 'success' | 'warning' | 'default' | 'info'> = {
  SENT: 'success',
  SCHEDULED: 'info',
  DRAFT: 'default',
};

export default function MarketingPage() {
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsMessage, setSmsMessage] = useState('');
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Marketing</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Campagnes, promotions et coupons</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leftIcon={<Tag size={14} />} size="sm">Nouveau coupon</Button>
          <Button leftIcon={<Megaphone size={14} />} onClick={() => setShowSmsModal(true)}>Nouvelle campagne</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'SMS envoyés', value: '770', icon: Send, color: 'text-primary bg-primary/10' },
          { label: 'Taux ouverture', value: '68%', icon: BarChart3, color: 'text-success bg-success/10' },
          { label: 'Coupons actifs', value: '3', icon: Tag, color: 'text-accent bg-accent/10' },
          { label: 'Campagnes', value: String(sampleCampaigns.length), icon: Megaphone, color: 'text-info bg-info/10' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} padding="sm" hover>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${stat.color}`}><Icon size={18} /></div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Campaigns */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campagnes</h3>
          <div className="space-y-3">
            {sampleCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', campaign.type === 'SMS' ? 'bg-primary/10 text-primary' : campaign.type === 'WHATSAPP' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600')}>
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" size="sm">{campaign.type}</Badge>
                      {campaign.sentCount > 0 && <span className="text-xs text-gray-500"><Users size={10} className="inline me-1" />{campaign.sentCount} destinataires</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {campaign.scheduledAt && <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10} />{campaign.scheduledAt}</span>}
                  <Badge variant={statusColors[campaign.status]} size="sm" dot>
                    {campaign.status === 'SENT' ? 'Envoyée' : campaign.status === 'SCHEDULED' ? 'Planifiée' : 'Brouillon'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Coupons */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Coupons & Promotions</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {sampleCoupons.map((coupon) => (
              <div key={coupon.id} className={cn('p-4 rounded-lg border', coupon.isActive ? 'border-gray-200 dark:border-gray-800' : 'border-gray-200 dark:border-gray-800 opacity-50')}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-primary text-lg">{coupon.code}</span>
                  <Badge variant={coupon.isActive ? 'success' : 'outline'} size="sm" dot>{coupon.isActive ? 'Actif' : 'Inactif'}</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {coupon.type === 'PERCENTAGE' ? `-${coupon.value}%` : `-${coupon.value} DZD`}
                  {coupon.maxUses && ` · Max ${coupon.maxUses} utilisations`}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${coupon.maxUses ? (coupon.usedCount / coupon.maxUses) * 100 : 50}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{coupon.usedCount}{coupon.maxUses ? `/${coupon.maxUses}` : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SMS Modal */}
      <Modal isOpen={showSmsModal} onClose={() => setShowSmsModal(false)} title="Nouvelle campagne SMS" size="lg">
        <div className="space-y-4">
          <Input label="Nom de la campagne" placeholder="Ex: Soldes d'été" />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message SMS</label>
            <textarea
              rows={4}
              maxLength={160}
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder="Bonjour {nom}! Profitez de -30% sur tout le site avec le code ETE30. Offre valable 48h! {boutique}"
              className="w-full px-4 py-3 text-sm bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1 text-end">{smsMessage.length}/160 caractères</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Audience</label>
            <select className="w-full h-10 px-3 text-sm bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-md">
              <option>Tous les clients</option>
              <option>Clients Alger</option>
              <option>Clients Oran</option>
              <option>Clients VIP</option>
              <option>Nouveaux clients (30j)</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowSmsModal(false)}>Annuler</Button>
            <Button variant="secondary" leftIcon={<Clock size={14} />}>Planifier</Button>
            <Button leftIcon={<Send size={14} />} onClick={() => { setShowSmsModal(false); toast('success', 'Campagne envoyée !'); }}>
              Envoyer maintenant
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
