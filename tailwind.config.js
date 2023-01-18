/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({nocompatible: true}),
    require('tailwind-scrollbar-hide'),
  ],
};
