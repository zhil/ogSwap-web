<template>
  <div class="flex-grow flex flex-col justify-center">
    <angle-card
      class="w-full max-w-[645px] mx-auto pt-[20px] pb-[24px] px-[40px]"
    >
      <div class="font-red-rose text-center text-[22px] mb-[19px]">Swap</div>

      <div class="bg-[#1C1C1C] py-4 px-[28px] rounded-[4px]">
        <div class="-mx-[6px] flex mb-[14px]">
          <div class="px-[6px] w-[154px]">
            <field-label>Send</field-label>
            <field-dropdown size="large" block :error="isError">
              <template #default>
                <coin-item
                  :label="currentTokenSend.title"
                  :img="currentTokenSend.img"
                />
              </template>
              <template #list>
                <coin-item
                  v-for="(token, index) of originTokens"
                  v-bind:key="token.title"
                  :label="token.title"
                  :img="token.img"
                  :index="index"
                  :chain="token.chain"
                  :blocking="false"
                  :selected="receiveTokenChain"
                  class="hover:font-bold"
                  @select="chooseCurrentChainSend"
                />
              </template>
            </field-dropdown>
          </div>
          <div class="px-[6px] flex-grow">
            <field-label class="text-right">
              <field-error-text v-show="isError" class="float-left">
                Insufficient balance
              </field-error-text>
              <span class="font-normal">Balance:</span>
              {{ currentChainTokenBalance }} {{ currentChainTokenName }}
            </field-label>
            <div class="relative">
              <label class="block">
                <field-input
                  v-model="amount"
                  :error="isError"
                  size="large"
                  class="font-medium pb-[22px]"
                  type="number"
                  @input="inputChange"
                />
              </label>
              <div class="absolute left-[12px] top-[31px] text-xs">
                ${{ fromTokenPrice }}
              </div>
              <btn
                square
                variant="black"
                class="
                  absolute
                  right-[12px]
                  top-[8px]
                  font-red-rose
                  underline
                  hover:no-underline
                "
                @click="setMax()"
              >
                MAX
              </btn>
            </div>
          </div>
        </div>

        <div class="-mx-[6px] flex">
          <div class="px-[6px] flex-grow">
            <field-label>From address</field-label>
            <label class="relative block">
              <img
                class="w-[24px] h-[24px] left-[12px] top-[9px] absolute"
                src="~/assets/img/icons/metamask.svg"
                alt=""
              />
              <field-input
                v-model="addressFrom"
                readonly
                placeholder="Address"
                class="pl-[42px]"
              />
            </label>
          </div>
          <div class="px-[6px] w-[162px] flex items-end">
            <btn
              v-if="!isFromSolana && isMetamaskAvailable && !connected"
              :variant="connected ? 'dark-charcoal' : 'blood'"
              @click="connected ? false : handleConnectWallet()"
            >
              <span> Connect Metamask </span>
            </btn>
            <btn
              v-else-if="isFromSolana && isPhantomAvailable && !connected"
              :variant="connected ? 'dark-charcoal' : 'blood'"
              @click="connected ? false : handleConnectWallet()"
            >
              <span> Connect Phantom </span>
            </btn>
            <btn
              v-else-if="!isFromSolana && sendTokenChain != currentChain"
              :variant="connected ? 'dark-charcoal' : 'blood'"
              @click="switchChain()"
            >
              <span class="font-medium"> Switch to {{ chainIndexName }} </span>
            </btn>
            <span v-else class="font-medium">
              <icon
                name="mono/check"
                class="
                  fill-current
                  text-medium-spring-green
                  ring-1 ring-inset ring-current
                  text-[24px]
                  rounded-full
                  mr-[6px]
                  relative
                  top-[5px]
                "
              />
              Connected
            </span>
          </div>
        </div>
      </div>

      <div class="h-[18px] w-full text-[18px] text-[#8D9EB5] text-center">
        <icon name="mono/arrow-wide-2" class="fill-current" />
      </div>

      <div class="bg-[#1C1C1C] py-4 px-[28px] rounded-[4px]">
        <div class="-mx-[6px] flex mb-[14px]">
          <div class="px-[6px] w-[154px]">
            <field-label>Receive</field-label>
            <field-dropdown size="large" block :error="isError">
              <template #default>
                <coin-item
                  :label="currentTokenReceive.title"
                  :img="currentTokenReceive.img"
                  class="hover:font-bold"
                />
              </template>
              <template #list>
                <coin-item
                  v-for="(token, index) of destinationTokens"
                  v-bind:key="token.title"
                  :label="token.title"
                  :img="token.img"
                  :index="index"
                  :chain="token.chain"
                  :selected="sendTokenChain"
                  :blocking="true"
                  class="hover:font-bold"
                  @select="chooseCurrentChainReceive"
                />
              </template>
            </field-dropdown>
          </div>
          <div class="px-[6px] flex-grow flex flex-col justify-end">
            <div class="relative">
              <label class="block">
                <field-input
                  v-model="amountReceive"
                  size="large"
                  class="font-medium pb-[22px]"
                  type="number"
                  readonly
                />
              </label>
              <div class="absolute left-[12px] top-[31px] text-xs">
                ${{ toTokenPrice }}
              </div>
            </div>
          </div>
        </div>

        <div class="-mx-[6px] flex">
          <div class="px-[6px] flex-grow">
            <field-label>To address</field-label>
            <label class="relative block">
              <img
                class="w-[24px] h-[24px] left-[12px] top-[9px] absolute"
                src="~/assets/img/icons/metamask.svg"
                alt=""
              />
              <field-input
                v-model="addressTo"
                placeholder="Enter address"
                class="pl-[42px]"
              />
            </label>
          </div>
          <div class="px-[6px] w-[162px] flex items-end">
            <btn variant="blood" block @click="addressTo = addressFrom">
              Use the same address
            </btn>
          </div>
        </div>
      </div>

      <btn
        class="mt-4"
        block
        :disabled="isError || Number(amount || 0) === 0"
        @click="switchToPreview()"
      >
        Next
      </btn>
    </angle-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TokenAmount } from '~/utils/safe-math'
import {
  originTokens,
  destinationTokens,
  RelayToken,
  Chains,
} from '~/components/constants'
import { WalletBody } from '~/store/types'
import { EvmChains, WalletProvider, ChainTypes } from '~/components/utils'
import { PriceData } from '~/utils/reserves'
import { Transaction } from '~/utils/transactions'
import { availableChains } from '~/web3/evm_chain'
const chainToTokenName: { [key in Chains]: string } = {
  [Chains.Eth]: 'ETH',
  [Chains.Pol]: 'MATIC',
  [Chains.Ftm]: 'FTM',
  [Chains.Bsc]: 'BNB',
  [Chains.Heco]: 'HT',
  [Chains.Xdai]: 'XDAI',
  [Chains.Sol]: 'SOL',
  [Chains.Avax]: 'AVAX',
}
const chainNames: { [key in Chains]: string } = {
  [Chains.Eth]: 'Ethereum',
  [Chains.Pol]: 'Polygon',
  [Chains.Ftm]: 'Fantom',
  [Chains.Bsc]: 'Binance',
  [Chains.Xdai]: 'xDai',
  [Chains.Heco]: 'Heco',
  [Chains.Avax]: 'Avalanche',
  [Chains.Sol]: 'Solana',
}
export default Vue.extend({
  data: () => ({
    amount: '0',
    addressTo: '',
    amountReceive: '0',
    connected: false,
    originTokens,
    destinationTokens,
    sendTokenIndex: 1,
    sendTokenChain: Chains.Eth as Chains,
    receiveTokenIndex: 3,
    receiveTokenChain: Chains.Bsc as Chains,
    isSelecting: false,
    balances: {} as { [key in Chains]: TokenAmount },
    availableChains,
    currentChain: null as Chains | null,
  }),
  computed: {
    fromTokenPrice(): string {
      if(!this.amount || this.reservesFrom == null) return "0";
      const currentChainTokenPrice = Number(this.reservesFrom.dexNativePrice)
      return (Number(this.amount) * currentChainTokenPrice).toFixed(2)
    },
    toTokenPrice(): string {
      if(!this.amountReceive || this.reservesTo == null ) return "0";
      const currentChainTokenPrice = Number(this.reservesTo.dexNativePrice)
      return (Number(this.amountReceive) * currentChainTokenPrice).toFixed(2)
    },
    reservesFrom(): PriceData {
      return this.$store.getters['reserves/getReserveData'](this.sendTokenChain) // should be passed evm chain
    },
    reservesTo(): PriceData {
      return this.$store.getters['reserves/getReserveData'](this.receiveTokenChain)
    },
    currentChainTokenBalance(): string {
      if (!this.balances[this.sendTokenChain]) return '0.0000'
      return this.balances[this.sendTokenChain].toEther().toFixed(4)
    },
    currentChainTokenName(): string {
      return chainToTokenName[this.sendTokenChain]
    },
    chainIndexName(): string {
      return chainNames[this.sendTokenChain]
    },
    isError(): boolean {
      return Number(this.amount || 0) > 1000 || Number(this.amount || 0) < 0
    },
    currentTokenSend(): RelayToken {
      return originTokens[this.sendTokenIndex]
    },
    currentTokenReceive(): RelayToken {
      return destinationTokens[this.receiveTokenIndex]
    },
    isFromSolana(): boolean {
      return this.currentTokenSend.chain === Chains.Sol
    },
    metamaskWallet(): WalletBody {
      return this.$store.getters['wallet/walletByName'](WalletProvider.Metamask)
    },
    phantomWallet(): WalletBody {
      return this.$store.getters['wallet/walletByName'](WalletProvider.Phantom)
    },
    currentWallet(): WalletBody {
      return this.isFromSolana ? this.phantomWallet : this.metamaskWallet
    },
    addressFrom(): string | null {
      if (!this.currentWallet) return null
      return this.currentWallet.address
    },
    isPhantomAvailable(): boolean {
      return this.$store.getters['wallet/isWalletAvailableByName'](
        WalletProvider.Phantom
      )
    },
    isMetamaskAvailable(): boolean {
      return this.$store.getters['wallet/isWalletAvailableByName'](
        WalletProvider.Metamask
      )
    },
  },
  async mounted() {
    await this.$store.dispatch('reserves/setReserves')
    // достаем все данные из стора и начинаем проверку данных по последним изменениям баланса
  },
  methods: {
    switchToPreview() {
      if (!this.addressFrom) return
      const data: Transaction = {
        id: 0,
        firstTxnHash: null,
        secondTxnHash: null,
        lastBalance: Number(this.currentChainTokenBalance),
        fromAddress: this.addressFrom,
        toAddress: this.addressTo,
        amountFrom: new TokenAmount(
          this.amount,
          this.currentTokenSend.decimals,
          false
        ),
        amountTo: new TokenAmount(
          this.amountReceive,
          this.currentTokenReceive.decimals,
          false
        ),
        lastBlock: 0, //might not necessary
        chainFrom: this.sendTokenChain,
        chainTo: this.receiveTokenChain,
      }
      this.$store.commit('transactions/setPreview', data)
      this.$router.push('/review')
    },
    setReceived(index: number, chain: any) {
      this.receiveTokenChain = chain
      this.receiveTokenIndex = index
      this.amountReceive = '0'
    },
    setSend(index: number, chain: any) {
      if (this.sendTokenChain == chain) {
        //@ts-ignore
        this.sendTokenIndex = 137 == Number(chain) ? Chains.Bsc : Chains.Pol
        this.receiveTokenIndex = 137 == Number(chain) ? 1 : 0
      }
      this.sendTokenChain = chain
      this.sendTokenIndex = index
      this.amountReceive = '0'
    },
    inputChange() {
      if(!this.reservesFrom || !this.reservesTo) return;
      const gtonAmount =
        this.reservesFrom.gtonReserve
          .toEther()
          .dividedBy(this.reservesFrom.nativeReserve.toEther())
          .toNumber() * Number(this.amount)
      this.amountReceive = (
        this.reservesTo.nativeReserve
          .toEther()
          .dividedBy(this.reservesTo.gtonReserve.toEther())
          .toNumber() * gtonAmount
      ).toFixed(2)
    },
    setMax() {
      this.amount = this.currentChainTokenBalance
    },
    handleConnectWallet() {
      const provider = this.isFromSolana
        ? WalletProvider.Phantom
        : WalletProvider.Metamask
      // Deep copy object
      const modal = JSON.parse(
        JSON.stringify(this.$store.getters['app/getModal'](provider))
      )

      modal.data.callbackConnect = () => {
        this.connected = true
        this.$store.commit('app/CLOSE_MODAL')
      }
      this.$store.commit('app/PUSH_MODAL', modal)
      this.connected = true
    },
    chooseCurrentChainSend(index: number, chain: any) {
      this.sendTokenIndex = index
      this.sendTokenChain = chain
      // this.isSelecting = false
      this.setSend(this.sendTokenIndex, this.sendTokenChain)
    },
    chooseCurrentChainReceive(index: number, chain: any) {
      this.receiveTokenIndex = index
      this.receiveTokenChain = chain
      // this.isSelecting = false
      this.setReceived(this.receiveTokenIndex, this.receiveTokenChain)
    },
    async setChain() {
      this.currentChain = await this.$web3
        .getNetworkVersion(ChainTypes.Evm)
        .call(this)
    },
    async switchChain() {
      const chain = availableChains[this.sendTokenChain]
      await this.$web3.switchNetwork(chain)
      await this.setChain()
    },
  },
})
</script>
