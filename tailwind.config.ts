import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D3040',
          900: '#08222E',
          700: '#0D3040',
          500: '#1A4B61',
        },
        teal: {
          DEFAULT: '#2E6D82',
          700: '#245665',
          500: '#2E6D82',
          300: '#6FA3B4',
        },
        mist: {
          DEFAULT: '#EFF5F7',
          200: '#F7FAFB',
          400: '#DDE8EC',
          600: '#B9CBD3',
        },
        gold: {
          DEFAULT: '#E8C167',
          600: '#C9A248',
        },
        ink: {
          DEFAULT: '#12262F',
          muted: '#4A5F68',
        },
        // SquishyWorld quiz funnel palette (app/(quiz)).
        cream: {
          DEFAULT: '#FFF8EE',
          50: '#FFFCF7',
          200: '#FBF0DF',
          300: '#F1E2CB',
        },
        mint: {
          100: '#E9F8F1',
          200: '#CFEFE0',
          400: '#86D3B2',
          600: '#2E8F6C',
          700: '#226E53',
        },
        lavender: {
          100: '#F4F0FE',
          200: '#E5DCFB',
          400: '#B7A2F1',
          600: '#7757D6',
          700: '#5B3FB4',
        },
        peach: {
          100: '#FFF1E9',
          200: '#FFDCCB',
          500: '#EE8A63',
        },
        sky: {
          100: '#EDF5FF',
          200: '#D4E7FF',
          500: '#4F8FE0',
        },
        plum: {
          DEFAULT: '#241B35',
          muted: '#6E6480',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-rounded', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '68rem',
        prose: '42rem',
      },
      borderRadius: {
        card: '0.75rem',
      },
      keyframes: {
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        squish: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '40%': { transform: 'scale(1.18, 0.82)' },
          '70%': { transform: 'scale(0.94, 1.06)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'rise-in': 'rise-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        squish: 'squish 1.1s ease-in-out infinite',
        shimmer: 'shimmer 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
