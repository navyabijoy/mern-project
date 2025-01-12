/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#FE828C',   // Blush Pink
        burgundy: '#800020',
        burg: { // Burgundy
          50: '#fdf2f4', 
          100: '#ffe4e8',
          500: '#9b2c3f',
          600: '#8b1929',
          700: '#771425',
        },
        gold: '#FFD700',     // Gold
        taupe: '#9E9E9E',   // Taupe
        coral: '#f2cfcb',    // Coral
        mint: '#A3D5D3'     // Mint
      },
    },
  },
  plugins: [],
};
