/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aubergine': '#120912',
        'glass': 'rgba(255, 255, 255, 0.05)',
        'text': '#fff4f1',
        'text-muted': '#c9afb8',
        'accent-start': '#ff7a9c',
        'accent-end': '#ffb38a',
        'phase': {
          'menstruation': '#e8587a',
          'follicular': '#ffb38a',
          'ovulation': '#9fe0c4',
          'luteal': '#b79cff',
        },
      },
      fontFamily: {
        'heading': ['Fraunces', 'serif'],
        'body': ['Figtree', 'sans-serif'],
      },
      screens: {
        'xs': '360px',
      },
      ringWidth: {
        'focus': '2px',
      },
      ringColor: {
        'focus': '#ff7a9c',
      },
    },
  },
  plugins: [],
}
