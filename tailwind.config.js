/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'dark-red': '#ff0000',
        'clr-white': '#ffffff',
        'main-yellow': '#ffc727',
        'dark-yellow': '#f4ae00',
      },
    },
  },
  plugins: [],
}
