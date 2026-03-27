/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#f5c842',
        'dark-bg': '#0f0f0f',
        'card-bg': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Lato', 'sans-serif'],
        mono: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
