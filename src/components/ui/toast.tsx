'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const variantStyles: Record<ToastVariant, string> = {
  success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  warning: 'border-amber-500/20 bg-amber-500/10 text-amber-500',
  danger: 'border-rose-500/20 bg-rose-500/10 text-rose-500',
  info: 'border-blue-500/20 bg-blue-500/10 text-blue-500',
};

const variantIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  danger: AlertOctagon,
  info: Info,
};

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[100] m-4 flex flex-col gap-3 sm:left-auto sm:right-0 sm:m-6"
    >
      {toasts.map((toast) => {
        const variant = toast.variant || 'info';
        const Icon = variantIcons[variant];

        return (
          <div
            key={toast.id}
            role="alert"
            className={cn(
              'pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-[28px] border p-4 shadow-card transition-all',
              'bg-[linear-gradient(135deg,#1e293b_0%,#0f172a_100%)]',
              variantStyles[variant]
            )}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">{toast.title}</h3>
              {toast.description && (
                <p className="mt-1 text-sm text-foreground/80">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded-full p-1 opacity-70 transition hover:bg-white/10 hover:opacity-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
