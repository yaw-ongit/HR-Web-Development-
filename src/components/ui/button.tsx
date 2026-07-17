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
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 border border-transparent',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent',
  ghost: 'bg-transparent text-foreground hover:bg-secondary border border-transparent',
  destructive: 'bg-danger text-white hover:bg-danger/90 shadow-lg shadow-danger/20 border border-transparent',
  outline: 'bg-transparent text-foreground border border-border hover:bg-secondary',
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
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        props.onClick(e);
      } else if (props.type !== 'submit') {
        alert("Fitur ini akan segera hadir.");
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
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
