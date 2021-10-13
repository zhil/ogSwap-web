<template>
  <coin-account
    class="ml-[12px]"
    :address="currentAddress"
    :img="img"
    :signed="signed"
    :network="currentChainName"
    :connected="connected"
    :bus="metamaskBus"
    @login="handleConnectWallet()"
    @logout="handleLogout()"
  />
</template>

<script lang="ts">
// eslint-disable-next-line
import Vue, { PropType } from 'vue'
import { WalletProvider } from './utils'
import { WalletBody } from '~/store/types'

export default Vue.extend({
  props: {
    val: {
      type: Number as PropType<WalletProvider>,
      default: WalletProvider.Metamask,
    },
    img: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    connected: false,
    WalletProvider,
    metamaskBus: new Vue(),
    signed: false,
  }),
  computed: {
    currentWallet(): WalletBody {
      const wallet = this.$store.getters['wallet/walletByName'](this.val)
      this.$emit('getdata', wallet)
      return wallet
    },
    currentChainName(): string {
      if (!this.currentWallet) return ''
      return String(this.currentWallet.wallet.label)
    },
    currentAddress(): string {
      return `${this.currentWallet.address.slice(
        0,
        3
      )}...${this.currentWallet.address.slice(-6)}`
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
      this.signed = true
    },
    handleLogout() {
      this.metamaskBus.$emit('logout')
    },
  },
})
</script>
