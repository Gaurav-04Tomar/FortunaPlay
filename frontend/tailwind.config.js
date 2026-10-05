/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-blue': '#1d5072',
      },
      backgroundImage: {
        'mines': "url('/src/assets/mine.jpg')",
        'diamond': "url('/src/assets/diamond.avif')",
        'gamef': "url('/src/assets/Designer.jpeg')"
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
}