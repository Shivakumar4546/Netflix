/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#e50914',
        'netflix-black': '#000000',
        'netflix-dark': '#141414',
        'netflix-gray': '#808080',
        'netflix-light-gray': '#b3b3b3',
      },
    },
  },
  plugins: [],
}
