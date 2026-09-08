/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fcfcfc',
        surface: '#ffffff',
        primary: '#2f3b2f',
        secondary: '#f2f2f2',
        accent: '#4ade80',
        text: '#111827',
        subtext: '#6b7280',
        border: '#e5e7eb'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
