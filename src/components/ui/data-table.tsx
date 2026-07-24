'use client';

import { flexRender, Table } from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData> {
  table: Table<TData>;
  /** Called when export button is clicked — defaults to a no-op that could be wired later */
  onExport?: () => void;
  /** Optional caption for accessibility */
  caption?: string;
  /** Show or hide the footer toolbar */
  showFooter?: boolean;
  /** Empty state content — shown when no rows are present */
  emptyContent?: React.ReactNode;
}

export function DataTable<TData>({
  table,
  onExport,
  caption,
  showFooter = true,
  emptyContent,
}: DataTableProps<TData>) {
  const selectedCount = table.getSelectedRowModel().rows.length;
  const totalCount = table.getRowModel().rows.length;

  return (
    <div className="overflow-hidden rounded-[28px] border border-border/70 bg-card/80 shadow-[0_18px_48px_rgba(2,34,74,0.16)]">
      <div className="overflow-x-auto" role="region" aria-label={caption ?? 'Data table'} tabIndex={0}>
        <table
          className="min-w-full border-separate border-spacing-0 text-left text-sm text-foreground"
          aria-label={caption}
        >
          {caption && (
            <caption className="sr-only">{caption}</caption>
          )}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      scope="col"
                      aria-sort={
                        sortDir === 'asc'
                          ? 'ascending'
                          : sortDir === 'desc'
                          ? 'descending'
                          : canSort
                          ? 'none'
                          : undefined
                      }
                      className={cn(
                        'sticky top-0 z-10 border-b border-border/60 bg-surface/80 px-4 py-4',
                        'text-xs uppercase tracking-[0.24em] text-muted-foreground whitespace-nowrap',
                        header.column.id === 'actions' && 'text-right',
                        header.column.id === 'select' && 'w-12',
                        canSort && 'cursor-pointer select-none',
                      )}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      onKeyDown={
                        canSort
                          ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                header.column.getToggleSortingHandler()?.(e as unknown as React.MouseEvent);
                              }
                            }
                          : undefined
                      }
                      tabIndex={canSort ? 0 : undefined}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-1.5">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <span aria-hidden="true" className="text-muted">
                              {sortDir === 'asc' ? (
                                <ArrowUp className="h-3.5 w-3.5 text-primary" />
                              ) : sortDir === 'desc' ? (
                                <ArrowDown className="h-3.5 w-3.5 text-primary" />
                              ) : (
                                <ArrowUpDown className="h-3.5 w-3.5" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  aria-selected={row.getIsSelected()}
                  className={cn(
                    'border-b border-border/60 transition-colors last:border-0',
                    row.getIsSelected()
                      ? 'bg-primary/10'
                      : 'hover:bg-surface/60',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'px-4 py-4 align-middle',
                        cell.column.id === 'actions' ? 'text-right' : 'text-sm text-muted-foreground',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="px-4 py-16 text-center"
                >
                  {emptyContent ?? (
                    <p className="text-sm text-muted">Tidak ada data yang ditemukan.</p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showFooter && (
        <div className="flex flex-col gap-3 border-t border-border/60 bg-surface/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Selection info */}
          <p className="text-xs text-muted" aria-live="polite">
            {selectedCount > 0
              ? `${selectedCount} dari ${totalCount} baris dipilih`
              : `${totalCount} baris`}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {/* Export */}
            {onExport && (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Download className="h-3.5 w-3.5" />}
                onClick={onExport}
                aria-label="Ekspor data tabel"
              >
                Ekspor
              </Button>
            )}

            {/* Column visibility */}
            <div className="flex flex-wrap items-center gap-1.5">
              {table
                .getAllLeafColumns()
                .filter((col) => col.id !== 'select' && col.id !== 'actions')
                .map((col) => (
                  <label
                    key={col.id}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-surface/70 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition"
                  >
                    <input
                      type="checkbox"
                      checked={col.getIsVisible()}
                      onChange={col.getToggleVisibilityHandler()}
                      className="h-3 w-3 cursor-pointer rounded border-border bg-surface text-primary focus:ring-ring"
                      aria-label={`Toggle ${col.id} column`}
                    />
                    {col.id}
                  </label>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
