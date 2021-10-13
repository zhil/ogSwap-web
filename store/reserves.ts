import Vue from 'vue'
import { cloneDeep, isEmpty } from 'lodash-es'
import Vuex from 'vuex'
import { EvmChains } from '~/components/utils'
import {
  PriceData,
  getPoolReserves,
  calculatePrice,
  pools,
} from '~/utils/reserves'

type State = {
  prices: Prices
}
type Prices = {
  [key in EvmChains]: PriceData
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prices: {
      [EvmChains.Avax]: {} as PriceData,
      [EvmChains.Ethereum]: {} as PriceData,
      [EvmChains.Fantom]: {} as PriceData,
      [EvmChains.Binance]: {} as PriceData,
      [EvmChains.Xdai]: {} as PriceData,
      [EvmChains.Heco]: {} as PriceData,
      [EvmChains.Polygon]: {} as PriceData,
    },
  },
  actions: {
    async setReserves({ commit }) {
      for (const pool of pools) {
        const stablePool = await getPoolReserves(
          pool.provider,
          pool.stablePoolContract
        )
        const gtonPool = await getPoolReserves(
          pool.provider,
          pool.mainPoolContract
        )
        const price = calculatePrice(
          stablePool.nativeReserve,
          stablePool.gtonReserve
        )
        commit('updatePrice', {
          chain: pool.chain,
          body: { gtonPool, dexGtonPrice: price },
        })
      }
    },
  },
  mutations: {
    setPrices(state: State, body: Prices) {
      state.prices = cloneDeep(body) // I'am not sure this is necessary
    },
    updatePrice(
      state: State,
      { chain, body }: { chain: EvmChains; body: PriceData }
    ) {
      state.prices[chain] = cloneDeep(body) // I'am not sure this is necessary
    },
  },
  // getters: {
  //   getReserveData: (state: State) => (chain: EvmChains) => {
  //     return isEmpty(state.prices[chain]) ? state.prices[chain] : null
  //   },
  // },
})
