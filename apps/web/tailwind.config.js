/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    path.join(path.dirname(require.resolve("ui")), '**/*.{js,ts,jsx,tsx}')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

