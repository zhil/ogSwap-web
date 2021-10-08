<template>
  <div class="bg-no-repeat relative z-10">
    <img class="absolute left-0 top-0 w-full z-[-1] h-[200px] object-cover object-left-top" src="~/assets/img/rounded-angle-bg.svg" alt="">
    <img class="absolute left-0 top-[180px] w-full z-[-1] h-[350px] object-cover object-center" src="~/assets/img/rounded-angle-bg.svg" alt="">
      <div class="h-[60px] w-full"></div>
      <slot />
      <div class="h-[70px] w-full"></div>
    <img class="absolute left-0 bottom-[180px] w-full z-[-1] h-[350px] object-cover object-center" src="~/assets/img/rounded-angle-bg.svg" alt="">
    <img class="absolute left-0 bottom-0 w-full z-[-1] h-[200px] object-cover object-left-bottom" src="~/assets/img/rounded-angle-bg.svg" alt="">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>
