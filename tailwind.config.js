const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',

  important: '#__nuxt',

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
        'section-shadow': 'linear-gradient(90deg, #0A0A0A 25.49%, rgba(10, 10, 10, 0) 57.31%)',
        'blood-left-bottom': 'url(~/assets/img/blood-left-bottom.svg)',
        'blood-top-right': 'url(~/assets/img/blood-top-right.svg)',
      },
      colors: {
        'ghost-white': '#F9F9FD',
        'dark-charcoal': '#313030',
        'vampire-black': '#0A0A0A',
        'quick-silver': '#A6A3A3',
        'candy-apple-red': '#FF1405',
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
