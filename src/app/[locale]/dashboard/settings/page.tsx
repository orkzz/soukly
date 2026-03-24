'use client';

import { useState } from 'react';
import { Store, Globe, CreditCard, Truck, Users, Receipt, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

type SettingsTab = 'general' | 'domain' | 'payment' | 'shipping' | 'team' | 'billing';

const tabs: { key: SettingsTab; label: string; icon: typeof Store }[] = [
  { key: 'general', label: 'Général', icon: Store },
  { key: 'domain', label: 'Domaine', icon: Globe },
  { key: 'payment', label: 'Paiement', icon: CreditCard },
  { key: 'shipping', label: 'Livraison', icon: Truck },
  { key: 'team', label: 'Équipe', icon: Users },
  { key: 'billing', label: 'Facturation', icon: Receipt },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Paramètres</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configurez votre boutique</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <nav className="lg:w-56 shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                    activeTab === tab.key
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'general' && (
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Informations générales</h3>
                <div className="space-y-4 max-w-lg">
                  <Input label="Nom de la boutique" defaultValue="Mode DZ" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                    <textarea rows={3} defaultValue="Vêtements et accessoires traditionnels algériens" className="w-full px-4 py-3 text-sm bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                  </div>
                  <Input label="Téléphone" defaultValue="0555 12 34 56" />
                  <Input label="WhatsApp" defaultValue="+213555123456" />
                  <Input label="Email" defaultValue="contact@modedz.com" />
                  <Input label="Adresse" defaultValue="15 Rue Didouche Mourad, Alger" />
                  <Button onClick={() => toast('success', 'Paramètres sauvegardés')} leftIcon={<Save size={14} />}>Enregistrer</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'domain' && (
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Domaine</h3>
                <div className="space-y-6 max-w-lg">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Sous-domaine gratuit</p>
                    <p className="text-primary font-mono font-bold mt-1">modedz.soukly.com</p>
                    <Badge variant="success" size="sm" className="mt-2">Actif</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Domaine personnalisé</p>
                    <Input placeholder="www.mondomaine.com" hint="Disponible à partir du plan Pro" />
                    <Button variant="secondary" className="mt-3" size="sm">Connecter un domaine</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'payment' && (
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Méthodes de paiement</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Paiement à la livraison (COD)', icon: '💵', active: true },
                    { name: 'CCP / BaridiMob', icon: '📱', active: true },
                    { name: 'Chargily Pay (Edahabia/CIB)', icon: '💳', active: false },
                    { name: 'Stripe (International)', icon: '🌍', active: false },
                    { name: 'Virement bancaire', icon: '🏦', active: false },
                    { name: 'Flexy', icon: '📶', active: false },
                  ].map((method) => (
                    <div key={method.name} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{method.icon}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{method.name}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={method.active} className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'shipping' && (
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Configuration livraison</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Yalidine', active: true, desc: 'Connecté' },
                    { name: 'ZR Express', active: false, desc: 'Non connecté' },
                    { name: 'Ecotrack', active: false, desc: 'Non connecté' },
                    { name: 'Procolis', active: false, desc: 'Non connecté' },
                  ].map((provider) => (
                    <div key={provider.name} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{provider.name}</p>
                        <p className="text-xs text-gray-500">{provider.desc}</p>
                      </div>
                      <Button variant={provider.active ? 'secondary' : 'primary'} size="sm">
                        {provider.active ? 'Configurer' : 'Connecter'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'team' && (
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Équipe</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">AK</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Ahmed Khelifi</p>
                        <p className="text-xs text-gray-500">ahmed@email.com</p>
                      </div>
                    </div>
                    <Badge variant="default">Admin</Badge>
                  </div>
                </div>
                <Button variant="secondary" className="mt-4" leftIcon={<Users size={14} />} size="sm">Inviter un membre</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'billing' && (
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Facturation</h3>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Plan actuel</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">Free</p>
                      <p className="text-xs text-gray-500 mt-1">50 produits · 100 commandes/mois</p>
                    </div>
                    <Button size="sm">Upgrader</Button>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Historique des factures</h4>
                <p className="text-sm text-gray-500">Aucune facture pour le moment.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
