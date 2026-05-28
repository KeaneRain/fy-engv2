import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1a3050',
          800: '#1e3a5f',
          900: '#0f1f3d',
          950: '#0a1628',
        },
        blueprint: {
          300: '#93c5fd',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gold: {
          500: '#f0a500',
        },
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config

