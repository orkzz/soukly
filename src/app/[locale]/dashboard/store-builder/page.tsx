'use client';

import { useState } from 'react';
import { Sparkles, Monitor, Tablet, Smartphone, Eye, Save, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

type ViewMode = 'desktop' | 'tablet' | 'mobile';

const templates = [
  { id: 'modern', name: 'Moderne', color: 'from-violet-500 to-purple-600' },
  { id: 'classic', name: 'Classique', color: 'from-amber-500 to-orange-600' },
  { id: 'minimal', name: 'Minimaliste', color: 'from-gray-500 to-gray-700' },
  { id: 'bold', name: 'Audacieux', color: 'from-rose-500 to-red-600' },
  { id: 'nature', name: 'Nature', color: 'from-green-500 to-emerald-600' },
  { id: 'tech', name: 'Tech', color: 'from-blue-500 to-cyan-600' },
];

export default function StoreBuilderPage() {
  const [prompt, setPrompt] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/generate-landing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: prompt }),
      });
      const data = await response.json();
      setGeneratedHtml(data.html || '<p>Erreur lors de la génération</p>');
      toast('success', 'Landing page générée !');
    } catch {
      toast('error', 'Erreur de génération');
    } finally {
      setIsGenerating(false);
    }
  };

  const viewWidths = { desktop: '100%', tablet: '768px', mobile: '375px' };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            Constructeur de boutique
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Créez votre landing page avec l&apos;IA ou choisissez un template
          </p>
        </div>
        {generatedHtml && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {([
                { mode: 'desktop' as ViewMode, icon: Monitor },
                { mode: 'tablet' as ViewMode, icon: Tablet },
                { mode: 'mobile' as ViewMode, icon: Smartphone },
              ]).map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    'p-1.5 rounded-md transition-colors',
                    viewMode === mode
                      ? 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500'
                  )}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <Button variant="primary" leftIcon={<Save size={14} />} size="sm">
              Sauvegarder
            </Button>
          </div>
        )}
      </div>

      {!generatedHtml ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* AI Generator */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Wand2 size={18} className="text-primary" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Générer avec l&apos;IA
                </h3>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Décrivez votre boutique ou produit...&#10;&#10;Exemple: Je vends des robes kabyles traditionnelles faites à la main. Ma clientèle est principalement des femmes de 25-45 ans en Algérie. Je veux une landing page qui met en avant la qualité artisanale et les broderies dorées."
                rows={8}
                className="w-full px-4 py-3 text-sm bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <Button
                className="w-full mt-4"
                size="lg"
                onClick={handleGenerate}
                isLoading={isGenerating}
                leftIcon={<Sparkles size={16} />}
              >
                Générer la landing page
              </Button>
            </CardContent>
          </Card>

          {/* Templates */}
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ou choisissez un template
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setGeneratedHtml(`<div class="text-center py-20"><h1 class="text-3xl font-bold">Template: ${template.name}</h1><p class="mt-4 text-gray-500">Preview du template ${template.name}</p></div>`);
                    }}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-primary transition-all"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Eye size={24} className="mx-auto text-gray-400 group-hover:text-primary transition-colors" />
                        <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{template.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Preview */
        <div className="flex justify-center">
          <div
            className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 shadow-lg"
            style={{ width: viewWidths[viewMode], maxWidth: '100%' }}
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4">
                <div className="h-6 bg-white dark:bg-gray-700 rounded-md px-3 flex items-center text-xs text-gray-400">
                  maboutique.soukly.com
                </div>
              </div>
            </div>
            <div
              className="p-4 min-h-[400px]"
              dangerouslySetInnerHTML={{ __html: generatedHtml }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
