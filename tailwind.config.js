/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pastel-orange': {
          light: '#FFD8A8',
          DEFAULT: '#FFAA5E',
          dark: '#FF8C1A',
        },
        'pastel-teal': {
          light: '#A8E6E2',
          DEFAULT: '#66D9D1',
          dark: '#37C5BA',
        },
        'card-bg': '#FFF8F0',
        'pistachio': {
          light: '#C5E8D5',
          DEFAULT: '#A9DFBF',
          dark: '#7DCEA0',
        },
        'fiery-red': {
          light: '#F7A6A4',
          DEFAULT: '#EF5350',
          dark: '#E53935',
        },
        'navy-blue': '#0A2463',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'flip': 'flip 0.6s ease-in-out',
        'bounce-subtle': 'bounce-subtle 2s infinite',
      },
      keyframes: {
        'flip': {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};