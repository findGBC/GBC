const themes = require('./src/styles/themes/index')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [{ ...themes }],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
