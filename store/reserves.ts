import Vue from 'vue'
import { cloneDeep, isEmpty } from 'lodash-es'
import { Commit } from 'vuex'
import Vuex from 'vuex'
import { TokenAmount } from '~/utils/safe-math'
import { EvmChains } from '~/components/utils'

type State = {
  prices: Prices
}
type Prices = {
  [key in EvmChains]: PriceData
}
type PriceData = {
  gtonReserve: TokenAmount
  nativeREserve: TokenAmount
  dexGtonPrice: string
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
  mutations: {
    setPrices(state: State, body: Prices) {
      state.prices = cloneDeep(body)
    },
  },
  getters: {
    getReserveData: (state: State) => (chain: EvmChains) => {
      return isEmpty(state.prices[chain]) ? state.prices[chain] : null
    },
  },
})
