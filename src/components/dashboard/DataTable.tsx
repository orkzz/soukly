'use client';

import { useState, useMemo, type ReactNode } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
  render?: (item: T, index: number) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  actions?: ReactNode;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchKey,
  searchPlaceholder = 'Rechercher...',
  pageSize = 10,
  actions,
  onRowClick,
  emptyMessage = 'Aucun résultat',
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let result = [...data];

    if (search && searchKey) {
      const q = search.toLowerCase();
      result = result.filter((item) => {
        const val = item[searchKey];
        return typeof val === 'string' && val.toLowerCase().includes(q);
      });
    }

    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
        }
        return 0;
      });
    }

    return result;
  }, [data, search, searchKey, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
        {searchKey && (
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 w-full sm:w-64">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              placeholder={searchPlaceholder}
              className="bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none w-full"
            />
          </div>
        )}
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                    col.sortable && 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 select-none',
                    col.className
                  )}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-primary">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((item, index) => (
                <tr
                  key={index}
                  className={cn(
                    'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn('px-4 py-3 text-sm', col.className)}>
                      {col.render
                        ? col.render(item, page * pageSize + index)
                        : (item[col.key] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {page * pageSize + 1}-{Math.min((page + 1) * pageSize, filtered.length)} sur {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(0)}
              disabled={page === 0}
              className="p-1.5 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              className="p-1.5 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => setPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
