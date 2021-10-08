<template>
  <div class="flex-grow flex flex-col justify-center">
    <div
      class="rounded-[18px] bg-black w-full max-w-[645px] h-[600px] mx-auto pt-[20px] pb-[24px] px-[40px] ring-[#9A9A9A] ring-1 ring-inset">
      <div class="font-red-rose text-center text-[22px] mb-[19px]">
        Swap
      </div>

      <div class="bg-[#1C1C1C] py-4 px-[28px] rounded-[4px]">

        <div class="-mx-[6px] flex mb-[14px]">
          <div class="px-[6px] w-[154px]">
            <field-label>Send</field-label>
            <field-dropdown size="large" block :error="isError">
              <template #default>
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')"/>
              </template>
              <template #list>
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" class="hover:font-bold"/>
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold"/>
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" class="hover:font-bold"/>
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold"/>
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" class="hover:font-bold"/>
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold"/>
              </template>
            </field-dropdown>
          </div>
          <div class="px-[6px] flex-grow">
            <field-label class="text-right">
              <field-error-text v-show="isError" class="float-left">
                Insufficient balance
              </field-error-text>
              <span class="font-normal">Balance:</span> 1000 ETH
            </field-label>
            <div class="relative">
              <label class="block">
                <field-input v-model="amount" :error="isError" size="large" class="font-medium pb-[22px]"
                             type="number"/>
              </label>
              <div class="absolute left-[12px] top-[31px] text-xs">${{ Number(amount || 0) * 79 }}</div>
              <btn square variant="black"
                   class="absolute right-[12px] top-[8px] font-red-rose underline hover:no-underline"
                   @click="amount = '1000'">
                MAX
              </btn>
            </div>
          </div>
        </div>

        <div class="-mx-[6px] flex">
          <div class="px-[6px] flex-grow">
            <field-label>From address</field-label>
            <label class="relative block">
              <img class="w-[24px] h-[24px] left-[12px] top-[9px] absolute" src="~/assets/img/icons/metamask.svg"
                   alt="">
              <field-input v-model="address" placeholder="address" class="pl-[42px]"/>
            </label>
          </div>
          <div class="px-[6px] w-[162px] flex items-end">
            <btn
              :variant="connected ? 'dark-charcoal' : 'blood'" block
              :readonly="connected"
              @click="connected ? false : handleConnectWallet()">
              <span v-if="connected" class="font-medium">
              <icon name="mono/check"
                    class="fill-current text-[#00FFA3] ring-1 ring-inset ring-current text-[24px] rounded-full mr-[6px] relative top-[5px]"/>
                Connected
              </span>
              <span v-else>
                Connect wallet
              </span>
            </btn>
          </div>
        </div>

      </div>

      <div class="h-[18px] w-full text-[18px] text-[#8D9EB5] text-center">
        <icon name="mono/arrow-wide-2" class="fill-current"/>
      </div>

      <div class="bg-[#1C1C1C] py-4 px-[28px] rounded-[4px]">

        <div class="-mx-[6px] flex mb-[14px]">
          <div class="px-[6px] w-[154px]">
            <field-label>Receive</field-label>
            <field-dropdown size="large" block :error="isError">
              <template #default>
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold"/>
              </template>
              <template #list>
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" class="hover:font-bold"/>
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold"/>
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" class="hover:font-bold"/>
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold"/>
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" class="hover:font-bold"/>
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold"/>
              </template>
            </field-dropdown>
          </div>
          <div class="px-[6px] flex-grow flex flex-col justify-end">
            <div class="relative">
              <label class="block">
                <field-input v-model="amount" :error="isError" size="large" class="font-medium pb-[22px]"
                             type="number"/>
              </label>
              <div class="absolute left-[12px] top-[31px] text-xs">${{ Number(amount || 0) * 79 }}</div>
            </div>
          </div>
        </div>

        <div class="-mx-[6px] flex">
          <div class="px-[6px] flex-grow">
            <field-label>To address</field-label>
            <label class="relative block">
              <img class="w-[24px] h-[24px] left-[12px] top-[9px] absolute" src="~/assets/img/icons/metamask.svg"
                   alt="">
              <field-input v-model="address" placeholder="Enter address" class="pl-[42px]"/>
            </label>
          </div>
          <div class="px-[6px] w-[162px] flex items-end">
            <btn variant="blood" block>
              Use the same address
            </btn>
          </div>
        </div>
      </div>

      <btn class="mt-4" block :disabled="isError || Number(amount || 0) === 0">
        Next
      </btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    address: '',
    amount: '0',
    connected: false,
  }),
  computed: {
    isError() {
      return Number(this.amount || 0) > 1000 || Number(this.amount || 0) < 0;
    }
  },
  methods: {
    handleConnectWallet() {
      // Deep copy object
      const modal = JSON.parse(JSON.stringify(this.$store.getters["app/exampleModals"].connectWallet));

      modal.data.callbackConnect = () => {
        this.connected = true
        this.$store.commit('app/CLOSE_MODAL')
      }
      this.$store.commit('app/PUSH_MODAL', modal)
    }
  }
})
</script>
