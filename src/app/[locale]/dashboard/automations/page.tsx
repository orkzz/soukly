'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, Play, Pause, MoreVertical, Clock, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown';
import { TEMPLATES } from '@/lib/automations/actions';
import { TRIGGERS } from '@/lib/automations/triggers';
import { cn } from '@/lib/utils';

interface ActiveAutomation {
  id: string;
  name: string;
  trigger: string;
  isActive: boolean;
  executionCount: number;
  lastExecuted: string | null;
}

const sampleAutomations: ActiveAutomation[] = [
  { id: '1', name: 'Confirmation SMS auto', trigger: 'order_created', isActive: true, executionCount: 234, lastExecuted: new Date(Date.now() - 1800000).toISOString() },
  { id: '2', name: 'Remerciement livraison', trigger: 'order_delivered', isActive: true, executionCount: 156, lastExecuted: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', name: 'Alerte stock faible', trigger: 'low_stock', isActive: true, executionCount: 12, lastExecuted: new Date(Date.now() - 172800000).toISOString() },
  { id: '4', name: 'Tag VIP automatique', trigger: 'order_delivered', isActive: false, executionCount: 8, lastExecuted: null },
];

export default function AutomationsPage() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [automations, setAutomations] = useState(sampleAutomations);

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const getTriggerInfo = (type: string) => {
    return TRIGGERS.find((t) => t.type === type);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            Automatisations
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Automatisez vos tâches répétitives
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setShowTemplates(true)} leftIcon={<Zap size={14} />}>
            Templates
          </Button>
          <Button leftIcon={<Plus size={14} />}>
            Nouvelle automation
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card padding="sm" hover>
          <CardContent>
            <p className="text-xs text-gray-500 mb-1">Actives</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {automations.filter((a) => a.isActive).length}
            </p>
          </CardContent>
        </Card>
        <Card padding="sm" hover>
          <CardContent>
            <p className="text-xs text-gray-500 mb-1">Exécutions totales</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {automations.reduce((sum, a) => sum + a.executionCount, 0)}
            </p>
          </CardContent>
        </Card>
        <Card padding="sm" hover>
          <CardContent>
            <p className="text-xs text-gray-500 mb-1">Templates disponibles</p>
            <p className="text-2xl font-bold text-primary">{TEMPLATES.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Automations list */}
      <div className="space-y-3">
        {automations.map((automation, index) => {
          const triggerInfo = getTriggerInfo(automation.trigger);
          return (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'flex items-center gap-4 p-4 bg-white dark:bg-surface-dark rounded-xl border transition-all',
                automation.isActive
                  ? 'border-gray-200 dark:border-gray-800'
                  : 'border-gray-200 dark:border-gray-800 opacity-60'
              )}
            >
              <div className="text-2xl">{triggerInfo?.icon || '⚡'}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {automation.name}
                  </p>
                  <Badge
                    variant={automation.isActive ? 'success' : 'outline'}
                    size="sm"
                    dot
                  >
                    {automation.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Déclencheur: {triggerInfo?.label || automation.trigger}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} />
                  {automation.executionCount} exécutions
                </span>
                {automation.lastExecuted && (
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(automation.lastExecuted).toLocaleDateString('fr-DZ')}
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleAutomation(automation.id)}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  automation.isActive
                    ? 'text-success hover:bg-success/10'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {automation.isActive ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <Dropdown
                trigger={
                  <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                }
              >
                <DropdownItem icon={<Edit size={14} />}>Modifier</DropdownItem>
                <DropdownSeparator />
                <DropdownItem icon={<Trash2 size={14} />} danger>Supprimer</DropdownItem>
              </Dropdown>
            </motion.div>
          );
        })}
      </div>

      {/* Templates Modal */}
      <Modal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        title="Templates d'automatisations"
        description="Commencez rapidement avec un template pré-configuré"
        size="lg"
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {TEMPLATES.map((template) => (
            <button
              key={template.name}
              className="w-full text-start p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary/30 hover:bg-primary/5 transition-all"
              onClick={() => setShowTemplates(false)}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{template.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default" size="sm">
                      {TRIGGERS.find((t) => t.type === template.trigger.type)?.label || template.trigger.type}
                    </Badge>
                    <span className="text-xs text-gray-400">→</span>
                    <Badge variant="outline" size="sm">
                      {template.actions.length} action{template.actions.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
