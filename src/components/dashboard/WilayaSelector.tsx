'use client';

import { useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { WILAYAS, getCommunesByWilaya } from '@/lib/wilayas';

interface WilayaSelectorProps {
  selectedWilaya: string;
  selectedCommune: string;
  onWilayaChange: (wilayaCode: string) => void;
  onCommuneChange: (commune: string) => void;
  locale?: 'fr' | 'ar' | 'en';
  error?: string;
}

export default function WilayaSelector({
  selectedWilaya,
  selectedCommune,
  onWilayaChange,
  onCommuneChange,
  locale = 'fr',
  error,
}: WilayaSelectorProps) {
  const communes = useMemo(
    () => getCommunesByWilaya(selectedWilaya),
    [selectedWilaya]
  );

  const handleWilayaChange = (code: string) => {
    onWilayaChange(code);
    onCommuneChange('');
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            Wilaya
          </span>
        </label>
        <select
          value={selectedWilaya}
          onChange={(e) => handleWilayaChange(e.target.value)}
          className="w-full h-10 px-3 text-sm bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          <option value="">Sélectionnez une wilaya</option>
          {WILAYAS.map((w) => (
            <option key={w.code} value={w.code}>
              {w.code} - {locale === 'ar' ? w.nameAr : w.name}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Commune
        </label>
        <select
          value={selectedCommune}
          onChange={(e) => onCommuneChange(e.target.value)}
          disabled={!selectedWilaya}
          className="w-full h-10 px-3 text-sm bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900"
        >
          <option value="">Sélectionnez une commune</option>
          {communes.map((c) => (
            <option key={c.name} value={c.name}>
              {locale === 'ar' ? c.nameAr : c.name}
              {c.hasStopDesk ? ' (Point relais)' : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
