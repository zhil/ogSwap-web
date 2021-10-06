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
        index:
          'linear-gradient(180deg, #5800AF -3.87%, #A442EA 62.96%, #5800AF 100%)',
        button:
          'linear-gradient(180deg, #FFFFFF 0%, #FFDA16 14.99%, #FF00E1 78.27%, #D100B8 87.41%)',
        'button-hover':
          ' linear-gradient(180deg, #FFFFFF 0%, #FF00E1 42.76%, #950183 87.41%)',
        window:
          'linear-gradient(152.73deg, rgba(255, 255, 255, 0.0688) 7.82%, rgba(255, 255, 255, 0.0736) 94.08%)',
        wall: "url('~/assets/img/layout-bg.png')",
        modal: "url('~/assets/img/modal-bg.png')",
        blood: "url('~/assets/img/blood.svg')",
      },
      colors: {
        magenta: '#FF0097',
        input: '#313030',
        active: '#DF1205',
        icon: '#F9F9FD',
        white: '#FFFFFF',
        border: '#46414F',
        wrap: '#1C1C1C',
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
