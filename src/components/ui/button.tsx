import { ForwardedRef, forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/20 border border-transparent',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300',
  ghost: 'bg-transparent text-slate-900 hover:bg-slate-100 border border-transparent',
  destructive: 'bg-rose-500 text-white hover:bg-rose-400 shadow-lg shadow-rose-500/20 border border-transparent',
  outline: 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-2xl',
  md: 'h-10 px-4 text-sm gap-2 rounded-2xl',
  lg: 'h-12 px-5 text-sm gap-2 rounded-3xl',
  icon: 'h-10 w-10 rounded-2xl',
};

export const Button = forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-950',
          'disabled:cursor-not-allowed disabled:opacity-60',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
            <span className="sr-only">Loading</span>
            {typeof children === 'string' ? children : null}
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
