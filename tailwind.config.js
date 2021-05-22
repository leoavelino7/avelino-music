module.exports = {
  purge: ['./src/**/**.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customBlack: '#181818',
        customGreen: '#4ca387'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      opacity: ['disabled']
    }
  },
  plugins: []
}
