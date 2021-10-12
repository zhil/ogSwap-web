// import { ActionContext } from "vuex";
import _ from 'lodash'
import { WalletProvider } from '~/components/utils'

interface State {}

export function isWalletEqual(walletA, walletB) {
  const props = ['address', 'provider', 'wallet.label']

  for (const prop of props) {
    const [valueA, valueB] = [_.get(walletA, prop), _.get(walletB, prop)]

    if (valueA !== valueB) {
      console.log({ valueA, valueB })
      return false
    }
  }

  return true
}

export const buildWallet = (provider = null) => {
  return {
    provider,
    checked: false,
    isConnected: false,
  }
}

export const state = () => {
  return {
    [WalletProvider.Metamask]: buildWallet(),
    [WalletProvider.Phantom]: buildWallet(),
  }
}

export const actions = {
  disconnectWallet({ commit }, { provider }) {
    const metamask = buildWallet()

    commit('updateWalletData', {
      provider,
      body: metamask,
    })
  },
}

export const mutations = {
  updateWalletData(state, { provider, body }) {
    state[provider].checked = false

    state[provider] = {
      ...state[provider],
      ...body,
    }
    console.log('update-wallet')

    console.log(state[provider])
  },
}

export const getters = {
  walletByName: (state) => (name: WalletProvider) => {
    return state[name].checked ? state[name] : null
  },
  currentWallet: (state) => {
    // we look through available wallets and take the first one that is logged
    for (const wallet of Object.keys(state)) {
      if (state[wallet].checked) {
        return state[wallet]
      }
    }
    return null
  },
  isWalletAvailableByName: (_, getters) => (name: WalletProvider) => {
    return Boolean(getters.walletByName(name))
  },
  isWalletAvailable: (_, getters) => Boolean(getters.currentWallet),
}
