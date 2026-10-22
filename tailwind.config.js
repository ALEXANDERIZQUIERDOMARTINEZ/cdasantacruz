// Estilos del sitio. Después de cambiar clases en index.html, regenera tailwind.css con:
//   npx tailwindcss@3.4.17 -i tailwind.input.css -o tailwind.css --minify
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        // Dorado del logo: color de acento principal
        gold: {
          50: '#faf7ef', 100: '#f3ecd6', 200: '#e7d8ab', 300: '#d9c07c', 400: '#c9a85a',
          500: '#b8924a', 600: '#a8833f', 700: '#84652f', 800: '#6b5129', 900: '#574325', 950: '#2f2413',
        },
        // Plateado/acero del logo: acento secundario
        steel: {
          50: '#f6f7f8', 100: '#e9ecef', 200: '#d3d8dd', 300: '#b0b8c1', 400: '#87929e',
          500: '#6a7682', 600: '#55606b', 700: '#464f58', 800: '#3c434a', 900: '#353a40', 950: '#1f2226',
        },
        // Grises neutros (los de Tailwind tiran a azul y chocan con el dorado)
        gray: colors.neutral,
        slate: colors.neutral,
      },
    },
  },
  plugins: [],
};
