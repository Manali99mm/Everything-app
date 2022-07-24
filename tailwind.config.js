/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'everyblue': '#0d67b5'
      },
      maxWidth: {
        cu: '240px',
        rt: '280px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
