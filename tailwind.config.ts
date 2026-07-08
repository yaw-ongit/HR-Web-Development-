import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
        },
        indogold: {
          500: 'var(--color-indogold-500)',
          600: 'var(--color-indogold-600)',
          700: 'var(--color-indogold-700)',
        },
        accent: {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          900: 'var(--color-accent-900)',
        },
      },
      boxShadow: {
        soft: '0 22px 48px rgba(15, 23, 42, 0.08)',
        card: '0 20px 60px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at top, rgba(96, 173, 255, 0.18), transparent 42%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
