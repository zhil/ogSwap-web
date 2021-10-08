<template>
  <div class="flex items-center">
    <div class="min-w-[30px] w-[30px] h-[30px] rounded-full bg-ghost-white flex justify-center items-center mr-[6px]">
      <img v-if="img" class="h-[22px] w-[22px] object-center object-contain"
           :src="img" alt="">
    </div>
    {{ label }}
    <slot />
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
    label: {
      type: String,
      default: ''
    }
  }
})
</script>
