<template>
  <coin-account
    class="ml-[12px]"
    address="0xtest...test"
    :img="img"
    :network="currentChainName"
    :connected="connected"
    @login="handleConnectWallet()"
    @logout="handleLogout"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { WalletBody } from '~/store/types'

export default Vue.extend({
  props: {
    val: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    connected: false,
    metamaskBus: new Vue(),
  }),
  computed: {
    open(): boolean {
      return this.$store.getters['app/menu'].open
    },
    navigation(): Array<{href: string, label: string}> {
      return this.$store.getters['app/menu'].navigation
    },
    currentWallet(): WalletBody {
      const wallet = this.$store.getters['wallet/walletByName'](this.val)
      this.$emit('getdata', wallet)
      return wallet
    },
    currentChainName(): string {
      if (!this.currentWallet) return ''
      return String(this.currentWallet.wallet.label)
    },
  },
  methods: {
    handleConnectWallet() {
      // Deep copy object
      const modal = JSON.parse(
        JSON.stringify(this.$store.getters['app/exampleModals'].connectWallet)
      )

      modal.data.callbackConnect = () => {
        this.connected = true
        this.$store.commit('app/CLOSE_MODAL')
      }
      this.$store.commit('app/PUSH_MODAL', modal)
    },
    handleLogout() {
      this.metamaskBus.$emit('logout')
    },
  },
})
</script>
