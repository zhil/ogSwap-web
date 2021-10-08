<template>
  <div class="flex-grow flex flex-col justify-center">
    <div class="rounded-[18px] bg-black w-full max-w-[645px] h-[600px] mx-auto pt-[20px] pb-[24px] px-[40px] ring-[#9A9A9A] ring-1 ring-inset">
      <div class="font-red-rose text-center text-[22px] mb-[19px]">
        Swap
      </div>

      <div class="bg-[#1C1C1C] py-4 px-[28px] rounded-[4px]">

        <div class="-mx-[6px] flex mb-[14px]">
          <div class="px-[6px] w-[154px]">
            <field-label>Send</field-label>
            <field-dropdown size="large" block>
              <template #default>
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" />
              </template>
              <template #list>
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" class="hover:font-bold" />
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold" />
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" class="hover:font-bold" />
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold" />
                <coin-item label="ETH" :img="require('~/assets/img/icons/ethereum.svg')" class="hover:font-bold" />
                <coin-item label="MATIC" :img="require('~/assets/img/icons/matik.svg')" class="hover:font-bold" />
              </template>
            </field-dropdown>
          </div>
          <div class="px-[6px] flex-grow">
            <field-label><span class="font-normal">Balance:</span> 0 ETH</field-label>
            <div class="w-full bg-white h-[56px]"></div>
          </div>
        </div>

        <div class="-mx-[6px] flex">
          <div class="px-[6px] flex-grow">
            <field-label>From address</field-label>
            <div class="w-full bg-white h-[42px]"></div>
          </div>
          <div class="px-[6px] w-[162px] flex items-end">
            <btn variant="blood" block>
              Connect wallet
            </btn>
          </div>
        </div>

      </div>
      <div class="h-[18px] w-full text-[18px] text-[#8D9EB5] text-center">
        <icon name="mono/arrow-wide-2" class="fill-current" />
      </div>
      <div class="bg-[#1C1C1C]">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>
