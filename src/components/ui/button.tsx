import { ForwardedRef, forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
}

const variantStyles = {
  primary: 'bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/20',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700',
  ghost: 'bg-transparent text-slate-100 hover:bg-slate-800',
  destructive: 'bg-rose-500 text-white hover:bg-rose-400 shadow-lg shadow-rose-500/20',
  outline: 'bg-slate-950 text-slate-100 border border-slate-700 hover:bg-slate-900',
};

export const Button = forwardRef(
  (
    { className, variant = 'primary', children, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60',
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
