import _ from 'lodash'
import { EvmChains } from '~/components/utils'
import { GetterTree, ActionTree } from 'vuex'
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

export const state = () => {
  return {
    prices: {
      [EvmChains.Avax]: {} as PriceData,
      [EvmChains.Ethereum]: {} as PriceData,
      [EvmChains.Fantom]: {} as PriceData,
      [EvmChains.Binance]: {} as PriceData,
      [EvmChains.Xdai]: {} as PriceData,
      [EvmChains.Heco]: {} as PriceData,
      [EvmChains.Polygon]: {} as PriceData,
    },
  }
}

export const actions: ActionTree<State, any> = {
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
}

export const mutations = {
  setPrices(state: State, body: Prices) {
    state.prices = _.cloneDeep(body) // I'am not sure this is necessary
  },
  updatePrice(
    state: State,
    { chain, body }: { chain: EvmChains; body: PriceData }
  ) {
    state.prices[chain] = _.cloneDeep(body) // I'am not sure this is necessary
  },
}

export const getters: GetterTree<State, any> = {
    getReserveData: (state: State) => (chain: EvmChains) => {
      return _.isEmpty(state.prices[chain]) ? state.prices[chain] : null
    },
}

