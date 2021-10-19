import { cloneDeep } from 'lodash'
import { Commit, GetterTree, ActionTree } from 'vuex'
import { Chains } from '~/components/constants'
import { TokenAmount } from '~/utils/safe-math'
import { Transaction, emptyPreview } from '~/utils/transactions'

type State = {
  transactions: Transaction[],
  preview: Transaction
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
  startSwap({ commit, state }) {
    return new Promise((resolve) => {
      commit('create', {txn: cloneDeep(state.preview)});
      const id = state.transactions.length - 1
      resolve(id); // resolve undefined
    });
    // return commit("create", {txn: cloneDeep(state.preview)})
  }
}

export const mutations = {
  update(
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
    state.transactions.push(txn);
    return state.transactions.length - 1;
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
