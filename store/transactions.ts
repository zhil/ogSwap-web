import { Commit, GetterTree, ActionTree } from 'vuex'
import { Chains } from '~/components/constants'
import { TokenAmount } from '~/utils/safe-math'
import { Transaction } from '~/utils/transactions'

type State = {
  transactions: Transaction[],
  preview: Transaction
}

const emptyPreview = {
  id: 0,
  firstTxnHash: null,
  secondTxnHash: null,
  lastBalance: 0,
  lastBlock: 0, //might not necessary
  chainFrom:  Chains.Eth,
  chainTo: Chains.Ftm,
  fromAddress: "",
  toAddress: "",
  amountFrom: 0,
  amountTo: 0
}
export const state = () => {
  return {
    transactions: [],
    preview: emptyPreview
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
  setPreview(
    state: State,
    data: Transaction
  ) {
    // merging both of the bodies
    state.preview = data
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
  getPreview(state: State) {
    return state.preview
  }
}
