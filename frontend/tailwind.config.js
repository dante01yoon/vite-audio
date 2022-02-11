module.exports = {
  content: ['./src/**/*.{js,jsx,tsx,html}', './*.html'],
  theme: {
    fontSize: {
      T: ['36px', '36px']
    },
    fontFamily: {
      notoSans: ['"Noto Sans KR"', 'Roboto', 'sans-serif']
    },
    extend: {
      gap: {
        46: '46px'
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1200px',
          height: '100%'
        }
      });
    }
  ]
};
