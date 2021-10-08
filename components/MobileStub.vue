<template>
  <div class="flex-grow md:hidden flex flex-col">
    <div class="mb-4 px-[24px] pt-[24px] w-full">
      <nuxt-link to="/">
        <img src="~/assets/img/logo.svg" class="w-[63px] h-[38px]" alt="OG Swap" width="63" height="38">
      </nuxt-link>
    </div>
    <div class="my-auto w-full">
      <aspect class="w-full mb-[21px]" :aspect="(560/1125 * 100) + '%'">
        <img class="w-full h-full object-cover object-top" src="~/assets/img/sorry.jpg" alt="" loading="lazy">
      </aspect>
      <div class="px-[44px] w-full text-left flex flex-col items-center">
        <div class="mb-[10px]">
          OG Swap is only available on Desktop
        </div>
        <btn class="max-w-[288px] w-full mx-auto" variant="blood" @click="$router.replace('/')">
          Home page
        </btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>
