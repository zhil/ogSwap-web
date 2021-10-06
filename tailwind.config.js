const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        'red-rose': ['Red Rose', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        body: 'linear-gradient(180deg, #FFFFFF 0%, #F3FFFB 90.48%)',
        solana2: 'linear-gradient(269.45deg, #00FFA3 10.33%, #DC1FFF 97.14%)',
        solana: 'linear-gradient(181.16deg, #FFA9DC 1.06%, #FF0097 98.05%)',
        'section-shadow':
          'linear-gradient(90deg, #0A0A0A 25.49%, rgba(10, 10, 10, 0) 57.31%)',
        'btn-bg-left': 'url(~/assets/img/btn-bg-left.svg)',
        'btn-bg-right': 'url(~/assets/img/btn-bg-right.svg)',
      },
      colors: {
        dark: '#0A0A0A',
        secondary: '#A6A3A3',
        primary: '#FF1405',
        magenta: '#FF0097',
        'desaturated-cyan': '#73979C',
        'maastricht-blue': '#001A34',
      },
      transitionProperty: {
        visibility: 'visibility',
        'visibility-and-transform': 'visibility, transform',
      },
      transitionDelay: {
        0: '0ms',
      },
      transitionDuration: {
        0: '0ms',
      },
    },
  },
}
