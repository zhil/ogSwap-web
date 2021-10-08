<template>
  <div class="w-[167px] relative">
    <btn variant="black" block :readonly="signed" class="h-[40px] leading-[40px] relative"
         @click="signed ? $emit('click') : $emit('login')">
      <img v-if="img"
           :src="img"
           alt=""
           class="w-[22px] h-[22px] left-[12px] absolute top-1/2 -translate-y-1/2 transition-all">
      <span class="absolute text-xs leading-none transition-all"
            :class="{
          'left-10 font-semibold top-2': signed && network,
          'left-10 font-semibold top-3.5': signed && !network,
          'left-[57px] top-3.5': !signed
         }">{{ signed ? address : 'Connect' }}</span>
      <span v-show="network" class="absolute left-10 bottom-2 text-[10px] font-normal leading-none"
            :class="{'pointer-events-none opacity-0': !signed}">
        <span class="w-[7px] h-[7px] inline-block rounded-full transition"
        :class="{
          'bg-[#07DA9E]': connected,
          'bg-electric-red': !connected,
        }"
        />
        {{ network }}
      </span>
    </btn>
    <btn variant="black" square rounded size="small"
         class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center"
         :class="{'pointer-events-none opacity-0': !signed}"
         @click="$emit('logout')">
      <icon name="mono/logout" class="fill-current relative left-[1px]"/>
    </btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    img: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    network: {
      type: String,
      default: ''
    },
    connected: {
      type: Boolean,
      default: false
    },
    signed: {
      type: Boolean,
      default: false
    },
  },
})
</script>
