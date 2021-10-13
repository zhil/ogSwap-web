import { Token } from '~/components/utils'
import { Commit, GetterTree, ActionTree } from 'vuex'

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

export const state = () => {
  return {
    transactions: [],
  }
}

export const actions: ActionTree<State, any> = {
  deleteTransaction(
    { commit }: { commit: Commit },
    { txnIndex }: { txnIndex: number }
  ) {
    commit('delete', {
      txnIndex,
    })
  },
}

export const mutations = {
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
  delete(state: State, { txnIndex }: { txnIndex: number }) {
    state.transactions.splice(txnIndex, 1)
  },
  create(state: State, { txn }: { txn: Transaction }) {
    state.transactions.push(txn)
  },
}

export const getters: GetterTree<State, any> = {
  getTransactionHistory(state: State) {
    return state.transactions
  },
}
