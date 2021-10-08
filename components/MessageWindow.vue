<template>
  <div class="message-window">
    <div class="h-[40px] flex items-center px-[20px]">
      <div class="w-[40px] flex items-center justify-start">
        <icon v-show="completed" name="mono/check-2" class="fill-current stroke-current text-[20px] text-[#00FFA3]" />
        <icon v-show="!completed" name="mono/clock" class="fill-current stroke-current text-[18px] relative left-[1px]" />
      </div>
      <div class="flex-grow text-[13px] font-medium text-center">
        Transaction is processing
      </div>
      <div class="w-[40px] flex items-center justify-end">
        <button v-show="!collapsed" type="button" class="flex items-center justify-center bg-transparent border-none outline-none text-white hover:text-candy-apple-red"
        @click="$emit('collapse')">
          <icon name="mono/line" class="stroke-current text-[15px]" />
        </button>
        <button v-show="collapsed" type="button" class="flex items-center justify-center bg-transparent border-none outline-none text-white hover:text-candy-apple-red"
                @click="$emit('collapse')">
          <icon name="mono/spread" class="fill-current text-[15px]" />
        </button>
        <button type="button" class="flex items-center justify-center bg-transparent border-none outline-none text-white ml-[10px] hover:text-candy-apple-red"
                @click="$emit('close')">
          <icon name="mono/close" class="fill-current text-[15px]" />
        </button>
      </div>
    </div>
    <div class="transition-all overflow-hidden"
    :class="{
      'h-[190px]': !collapsed,
      'h-0': collapsed,
    }">
      <div class="px-[20px]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
  }
})
</script>

<style lang="postcss">
.message-window{
  @apply mt-4 bg-black ring-inset ring-1 ring-white rounded-[10px] w-[330px];
}
</style>
