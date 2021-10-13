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
                  :key="token.title"
                  :label="token.title"
                  :img="token.img"
                  class="hover:font-bold"
                  @click="() => chooseCurrentChainSend(index, token.chain)"
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
                />
              </label>
              <div class="absolute left-[12px] top-[31px] text-xs">
                ${{ Number(amount || 0) * 79 }}
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
              :variant="connected ? 'dark-charcoal' : 'blood'"
              block
              :readonly="connected"
              @click="connected ? false : handleConnectWallet()"
            >
              <span v-if="connected" class="font-medium">
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
              <span v-else> Connect wallet </span>
            </btn>
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
                  :label="currentTokenSend.title"
                  :img="currentTokenSend.img"
                  class="hover:font-bold"
                />
              </template>
              <template #list>
                <coin-item
                  v-for="(token, index) of destinationTokens"
                  :key="token.title"
                  :label="token.title"
                  :img="token.img"
                  class="hover:font-bold"
                  @click="chooseDestChain(index, token.chain)"
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
                />
              </label>
              <div class="absolute left-[12px] top-[31px] text-xs">
                ${{ Number(amount || 0)  }}
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
            <btn variant="blood" block @click="addressTo = addressFrom" > Use the same address </btn>
          </div>
        </div>
      </div>

      <btn
        class="mt-4"
        block
        :disabled="isError || Number(amount || 0) === 0"
        @click="$router.push('/review')"
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
  Chains
} from '~/components/constants'
import { WalletBody } from '~/store/types'
import { WalletProvider } from '~/components/utils'
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
export default Vue.extend({
  data: () => ({
    amount: '0',
    addressTo: "",
    amountReceive: "",
    connected: false,
    originTokens,
    destinationTokens,
    sendTokenIndex: 1,
    sendTokenChain: Chains.Eth as Chains,
    receiveTokenIndex: 3,
    receiveTokenChain: Chains.Bsc as Chains,
    isSelecting: false,
    sendIndex: 2,
    receiveIndex: 1,
    balances: {} as { [key in Chains]: TokenAmount },
  }),
  computed: {
    currentChainTokenBalance(): string {
      if(!this.balances[this.sendTokenChain]) return "0.0000";
      return this.balances[this.sendTokenChain].toEther().toFixed(4)
    },
    currentChainTokenName(): string {
      return chainToTokenName[this.sendTokenChain]
    },
    isError(): boolean {
      return Number(this.amount || 0) > 1000 || Number(this.amount || 0) < 0
    },
    currentTokenSend(): RelayToken {
      return this.originTokens[this.sendIndex]
    },
    currentTokenReceive(): RelayToken {
      return this.destinationTokens[this.receiveIndex]
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
    addressFrom(): string {
      return this.isFromSolana
        ? this.metamaskWallet.address
        : this.phantomWallet.address
    },
  },
  methods: {
    setMax() {
      this.amount = this.currentChainTokenBalance
    },
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
    chooseCurrentChainSend(index: number, chain: any) {
      console.log(11111)

      this.sendTokenIndex = index
      this.sendTokenChain = chain
      // this.isSelecting = false
      this.$emit('chain', this.sendTokenIndex, this.sendTokenChain)
    },
    chooseCurrentChainReceive(index: number, chain: any) {
      console.log(11111)

      this.receiveTokenIndex = index
      this.receiveTokenChain = chain
      // this.isSelecting = false
      this.$emit('chain', this.receiveTokenIndex, this.receiveTokenChain)
    },
  },
  mounted() {
    // достаем все данные из стора и начинаем проверку данных по последним изменениям баланса
  },
})
</script>
