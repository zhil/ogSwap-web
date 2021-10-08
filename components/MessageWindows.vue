<template>
  <div class="message-windows">
    <message-window
      v-for="i in messages"
      :key="i"
      :collapsed="i !== indexOpen"
      @collapse="handleCollapse(i)"
      :completed="i%2 === 1"
      @close="messages.splice(messages.indexOf(i), 1)"
    >
      <div class="mb-[18px] flex justify-center pt-[5px]">
        <div class="w-[140px] flex justify-end items-center">
          <img class="max-w-full h-auto max-h-[20px]" src="~/assets/img/logotypes/fantom.svg" alt="">
        </div>
        <div class="w-[70px] flex justify-center items-center">
          <div class="text-black bg-ghost-white rounded-full w-[18px] h-[18px] flex justify-center items-center">
            <icon name="mono/arrow-back" class="fill-current w-[10px] h-[10px] rotate-180 mr-[4px] relative left-[1px]" />
          </div>
        </div>
        <div class="w-[140px] flex justify-start items-center">
          <img class="max-w-full h-auto max-h-[20px]" src="~/assets/img/logotypes/binance.svg" alt="">
        </div>
      </div>

      <div class="bg-dark-charcoal rounded-[10px] mb-[13px] flex py-[9px]">
        <div class="flex flex-col justify-center items-end flex-grow">

          <div class="flex flex-col justify-center items-center">
            <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" size="small" />
            <div class="text-sm whitespace-nowrap">
              10.0000
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center w-[57px]">
          <icon name="mono/arrow-wide-3" class="fill-current w-[29px] h-[8px]" />
        </div>
        <div class="flex flex-col justify-center items-start flex-grow">

          <div class="flex flex-col justify-center items-center">
            <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" size="small" />
            <div class="text-sm whitespace-nowrap">
              ~10.0000
            </div>
          </div>
        </div>
      </div>

      <div class="bg-dark-charcoal rounded-[10px] text-center text-[10px] min-h-[24px] mb-[10px] flex flex-col justify-center px-[42px] py-[4px] relative">
        <icon name="mono/check-2" class="absolute top-[3px] left-[18px] fill-current stroke-current text-[20px] text-[#00FFA3]" />

        Deposit transaction is complete

        <a href="/" target="_blank" class="absolute top-[1px] p-1 right-[10px] text-xs text-white hover:text-candy-apple-red">
          <icon name="mono/link" class="fill-current" />
        </a>
      </div>

      <div class="bg-dark-charcoal rounded-[10px] text-center text-[10px] min-h-[24px] flex flex-col justify-center px-[42px] py-[4px] relative">
        <icon name="mono/clock" class="absolute top-[3px] left-[19px]  fill-current stroke-current text-[18px]" />

        Swap transaction is pending

      </div>

    </message-window>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    messages: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    indexOpen: 1
  }),
  methods: {
    handleCollapse(i) {
      this.indexOpen = i === this.indexOpen ? null : i;
    }
  }
})
</script>

<style lang="postcss">
.message-windows {
  @apply fixed right-0 pr-[20px] top-[90px] bottom-[90px] z-20 overflow-y-auto overflow-x-hidden;
}

@media (hover: hover) {
  .message-windows::-webkit-scrollbar-track {
    border-radius: 0;

    @apply bg-dark-charcoal bg-opacity-0;
  }

  .message-windows::-webkit-scrollbar-thumb {
    border-radius: 0;

    @apply bg-dark-charcoal bg-opacity-0;
  }

  .message-windows::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
