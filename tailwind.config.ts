import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
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
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '68rem',
        prose: '42rem',
      },
      borderRadius: {
        card: '0.75rem',
      },
    },
  },
  plugins: [],
};

export default config;
