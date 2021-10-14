<template>
  <coin-account
    class="ml-[12px]"
    :address="currentAddress"
    :img="img"
    :signed="signed"
    :network="currentChainName"
    :connected="connected"
    @login="handleConnectWallet()"
    @logout="handleLogout()"
  />
</template>

<script lang="ts">
// eslint-disable-next-line
import Vue, { PropType } from 'vue'
//@ts-ignore
import { WalletProvider } from './utils'
import { metamaskBus } from './metamaskBus'
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
    open(): boolean {
      return this.$store.getters['app/menu'].open
    },
    navigation(): Array<{ href: string; label: string }> {
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
    currentAddress(): string | null {
      if (!this.currentWallet) return null
      let address = this.$store.getters['wallet/walletByName'](this.val).address
      return `${address.slice(0, 4)}...${address.slice(38)}`
    },
  },
  mounted() {},
  methods: {
    handleConnectWallet() {
      // Deep copy object

      const modal = JSON.parse(
        JSON.stringify(this.$store.getters['app/getModal'](this.val))
      )

      modal.data.callbackConnect = () => {
        this.connected = true
        this.$store.commit('app/CLOSE_MODAL')
      }
      this.$store.commit('app/PUSH_MODAL', modal)
      this.signed = true
    },
    handleLogout() {
      this.signed = false
      metamaskBus.$emit('logout', this.val)
      this.signed = false
    },
  },
})
</script>
