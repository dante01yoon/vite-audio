module.exports = {
  content: [
    "./src/**/*.{js,jsx,tsx,html}",
    "./*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({addComponents}) {
      addComponents({
        '.container': {
          maxWidth: '1200px',
          height: '100%',
        }
      })
    }
  ],
}
