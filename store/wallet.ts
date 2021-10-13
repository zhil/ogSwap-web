// import { ActionContext } from "vuex";
import _ from 'lodash'
import Vue from 'vue';
import { WalletProvider } from '~/components/utils'
import { Commit, GetterTree } from "vuex";
import Vuex from 'vuex';
type State = {
  [key in WalletProvider]: Wallet
}

type Wallet = {
  provider: WalletProvider | null,
  checked: boolean,
  isConnected: boolean,
}

export function isWalletEqual(walletA: Wallet, walletB: Wallet) {
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

export const buildWallet = (provider = null): Wallet => {
  return {
    provider,
    checked: false,
    isConnected: false,
  }
}

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     [WalletProvider.Metamask]: buildWallet(),
//     [WalletProvider.Phantom]: buildWallet(),
//   },
//   actions: {
//     disconnectWallet({ commit }: {commit: Commit}, { provider }: {provider: WalletProvider}) {
//       const metamask = buildWallet()
  
//       commit('updateWalletData', {
//         provider,
//         body: metamask,
//       })
//     },
//   },
//   mutations: {
//     updateWalletData(state: State, { provider, body }: {provider: WalletProvider, body: Wallet}) {
//       state[provider].checked = false
  
//       state[provider] = {
//         ...state[provider],
//         ...body,
//       }
//       console.log('update-wallet')
  
//       console.log(state[provider])
//     },
//   },
//   getters: {
//     walletByName: (state: State) => (name: WalletProvider) => {
//       return state[name] && state[name].checked ? state[name] : null
//     },
//     currentWallet: (state: State) => {
//       // we look through available wallets and take the first one that is logged
//       for (const wallet of Object.keys(state)) {
//         //@ts-ignore
//         if (state[wallet] && state[wallet].checked) {
//         //@ts-ignore
//           return state[wallet]
//         }
//       }
//       return null
//     },
//     isWalletAvailableByName: (_, getters) => (name: WalletProvider) => {
//       return Boolean(getters.walletByName(name))
//     },
//     isWalletAvailable: (_, getters) => Boolean(getters.currentWallet),
//   }

// })

export const state = () => {
  return {
    [WalletProvider.Metamask]: buildWallet(),
    [WalletProvider.Phantom]: buildWallet(),
  }
}

export const actions = {
  disconnectWallet({ commit }: {commit: Commit}, { provider }: {provider: WalletProvider}) {
    const metamask = buildWallet()

    commit('updateWalletData', {
      provider,
      body: metamask,
    })
  },
}

export const mutations = {
  updateWalletData(state: State, { provider, body }: {provider: WalletProvider, body: Wallet}) {
    state[provider].checked = false

    state[provider] = {
      ...state[provider],
      ...body,
    }
    console.log('update-wallet')

    console.log(state[provider])
  },
}

export const getters: GetterTree<State, any> = {
  walletByName: (state: State) => (name: WalletProvider) => {
    return state[name] && state[name].checked ? state[name] : null
  },
  currentWallet: (state: State) => {
    // we look through available wallets and take the first one that is logged
    for (const wallet of Object.keys(state)) {
       //@ts-ignore
      if (state[wallet] && state[wallet].checked) {
       //@ts-ignore
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
