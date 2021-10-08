export const state = () => ({
  menu: {
    open: false,
    landingNavigation: [
      {
        route: 'home',
        label: 'Launch APP',
      },
      {
        href: '/',
        label: 'About',
      },
      {
        href: '/',
        label: 'Docs',
      },
      {
        href: '/',
        label: 'Blog',
      },
    ],
    navigation: [
      {
        href: '/',
        label: 'About',
      },
      {
        href: '/',
        label: 'Swap',
      },
    ],
    socials: [
      {
        href: '/',
        icon: 'mono/twitter',
      },
      // {
      //   href: '/',
      //   icon: 'mono/medium',
      // },
      {
        href: '/',
        icon: 'mono/github',
      },
      {
        href: '/',
        icon: 'mono/telegram',
      },
    ],
  },
})

export const mutations = {
  TOGGLE_MENU(state) {
    state.menu.open = !state.menu.open
  },
}

export const getters = {
  menu: (state) => state.menu,
}
