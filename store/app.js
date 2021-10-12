export const state = () => ({
  exampleModals: {
    connectWallet: {
      index: '1', // Индекс для перерисовки одного и того же модального окна
      name: 'connect-wallet', // Уникальное название модального окна
      data: [
        {
          label: 'MetaMask',
          img: require('~/assets/img/icons/metamask.svg'),
        }, // Данные помещаемые в модальное окно
        {
          label: 'Phantom',
          img: require('~/assets/img/icons/metamask.svg'),
        },
      ],
    },
  },
  modals: [],
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
      {
        href: '/',
        label: 'Logs',
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
  PUSH_MODAL(state, modal) {
    state.modals.push(modal)
  },
  PUSH_MODALS(state, modals) {
    state.modals = [...state.modals, ...modals]
  },
  CLOSE_ALL_MODALS(state) {
    state.modals = []
  },
  CLOSE_MODAL(state) {
    state.modals.pop()
  },
  SET_DATA_MODAL(state, { name, index, data }) {
    const modals = state.modals
    for (let i = 0; i < modals.length; i++) {
      const modal = modals[i]
      if (modal.name === name && modal.index === index) {
        modal.data = data
      }
    }
  },
}

export const getters = {
  exampleModals: (state) => state.exampleModals,
  modals: (state) => state.modals,
  menu: (state) => state.menu,
}
