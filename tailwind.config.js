/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pedal-pink': '#C875A3',
        'pedal-maroon': '#480015',
        'pedal-light': '#f8f8f8',
        'pedal-purple': '#E1D9EE',
      },
      fontFamily: {
        'racing': ['RacingSansOne-Regular', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

