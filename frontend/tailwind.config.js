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
      },
      colors: {
        cardText: '#756d6d',
        cardBorder: '#153dca',
        // text1: '#000000',
        text2: '#756D6D',
        // border1: '#153DCA',
        border2: '#153DCA30',
        background1: '#ffffff',
        button1: '#000000'
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
