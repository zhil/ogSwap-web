import Vue from 'vue'
import { Token } from '~/components/utils'
import { Commit } from 'vuex'
import Vuex from 'vuex'
type State = {
  transactions: Transaction[]
}

type Transaction = {
  id: number
  firstTxnHash: string | null
  secondTxnHash: string | null
  lastBalance: boolean
  lastBlock: boolean //might not necessary
  tokenFrom: Token
  tokenTo: Token
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transactions: [],
  },
  actions: {
    deleteTransaction(
      { commit }: { commit: Commit },
      { txnIndex }: { txnIndex: number }
    ) {
      commit('delete', {
        txnIndex,
      })
    },
  },
  mutations: {
    updateTransaction(
      state: State,
      { txnIndex, body }: { txnIndex: number; body: Transaction }
    ) {
      // merging both of the bodies
      state.transactions[txnIndex] = {
        ...state.transactions[txnIndex],
        ...body,
      }
    },
    delete(state: State, { txnIndex }: {txnIndex: number}) {
      state.transactions.splice(txnIndex, 1);
    },
    create(state: State, { txn }: {txn: Transaction}) {
      state.transactions.push(txn);
    },
  },
  // getters: {
  //   getTransactionHistory(state: State) {
  //     return state.transactions;
  //   },
  // },
})
