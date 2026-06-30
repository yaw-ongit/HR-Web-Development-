'use client';

import { flexRender, Table } from '@tanstack/react-table';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData> {
  table: Table<TData>;
}

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/90 shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-200">
          <thead className="bg-slate-950/95">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={clsx(
                      'sticky top-0 z-10 border-b border-white/10 bg-slate-950/95 px-4 py-4 text-xs uppercase tracking-[0.24em] text-slate-500',
                      header.column.id === 'actions' && 'text-right',
                      header.column.id === 'select' && 'w-12'
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 transition hover:bg-slate-950/80">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={clsx('px-4 py-4 align-top', cell.column.id === 'actions' ? 'text-right' : 'text-sm')}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={table.getAllColumns().length} className="px-4 py-16 text-center text-sm text-slate-500">
                  No matching employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-white/10 bg-slate-950/95 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-slate-400">
          {table.getRowModel().rows.filter((row) => row.getIsSelected()).length} of {table.getRowModel().rows.length} rows selected
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" className="rounded-full px-4 py-2 text-xs">
            Bulk export
          </Button>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Columns</span>
            {table.getAllLeafColumns().filter((column) => column.id !== 'select' && column.id !== 'actions').map((column) => (
              <label key={column.id} className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1">
                <input
                  type="checkbox"
                  {...{
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                  className="h-3 w-3 rounded border-slate-700 bg-slate-800 text-sky-400 focus:ring-sky-400"
                />
                <span>{column.id}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
