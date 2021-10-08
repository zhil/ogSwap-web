<template>
  <div class="flex-grow flex flex-col justify-center">
    <div
      class="rounded-[18px] bg-black w-full max-w-[645px] h-[600px] mx-auto pt-[20px] pb-[24px] px-[40px] ring-[#9A9A9A] ring-1 ring-inset">

      <div class="-mb-7 pt-2">
        <nuxt-link to="/home" class="underline hover:no-underline text-xs"><icon name="mono/arrow-back" class="fill-current w-[19px] h-[8px] mr-[4px] relative top-[-1px]" />Back</nuxt-link>
      </div>

      <div class="font-red-rose text-center text-[22px] mb-[19px]">
        Review details and approve swap
      </div>

      <div class="rounded-[4px] bg-[#1C1C1C] pt-[22px] px-[28px] pb-[28px]">

        <div class="mb-[10px] flex justify-center">
          <div class="w-[140px] flex justify-end items-center">
            <img class="max-w-full h-auto" src="~/assets/img/logotypes/fantom.svg" alt="">
          </div>
          <div class="w-[70px] flex justify-center items-center">
            <div class="text-black bg-ghost-white rounded-full w-[33px] h-[33px] flex justify-center items-center">
              <icon name="mono/arrow-back" class="fill-current w-[15px] rotate-180 mr-[4px] relative left-[1px]" />
            </div>
          </div>
          <div class="w-[140px] flex justify-start items-center">
            <img class="max-w-full h-auto" src="~/assets/img/logotypes/binance.svg" alt="">
          </div>
        </div>

        <div class="mb-[16px]">
          <field-label>Send</field-label>
          <div class="relative">
            <coin-item class="absolute left-[12px] top-1/2 -translate-y-1/2" label="ETH" :img="require('~/assets/img/icons/ethereum.svg')"/>
            <field-input readonly value="10.0000 | $10,00.3469" class="text-right rounded-[10px] text-[18px]" />
          </div>
        </div>

        <div class="mb-[16px]">
          <field-label class="mb-[5px]">From address</field-label>
          0xEA3ed91a668B6a56751729016EBafc214dFBeB65
        </div>

        <div class="mb-[16px]">
          <field-label>Receive</field-label>
          <div class="relative">
            <coin-item class="absolute left-[12px] top-1/2 -translate-y-1/2" label="MATIC" :img="require('~/assets/img/icons/matik.svg')"/>
            <field-input readonly value="10.0000 | $10,00.3469" class="text-right rounded-[10px] text-[18px]" />
          </div>
        </div>

        <div class="mb-[16px]">
          <field-label class="mb-[5px]">To address</field-label>
          0xEA3ed91a668B6a56751729016EBafc214dFBeB65
        </div>

      </div>

      <div class="mt-4 text-[11px]">
          <div class="flex justify-between">
            <div class="">
              Estemated transaction time:
            </div>
            <div class="">
              ~ 5 minutes
            </div>
          </div>
          <div class="flex justify-between mt-[8px]">
            <div class="">
              Estemated transaction fee:
            </div>
            <div class="">
              the standard fee of the outbound network
            </div>
          </div>
      </div>

      <btn class="mt-4" block :disabled="isError || Number(amount || 0) === 0"
           @click="$router.push('/review')">
        Approve
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
