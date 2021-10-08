<template>
  <header class="flex-shrink-0 pt-[30px] pb-[4px]">
    <div class="container-1440 flex flex-row items-center justify-between">
      <div class="lg:w-[350px]">
        <nuxt-link to="/">
          <img src="~/assets/img/logo.svg" class="w-[63px] h-[38px]" alt="OG Swap" width="63" height="38">
        </nuxt-link>
      </div>

      <div class="lg:flex-grow flex justify-center mr-auto lg:mr-0">
        <component-link v-for="(item, key) in navigation"
                        :key="key"
                        :route="item.route"
                        :href="item.href"
                        class="px-[14px] mx-[11px] font-poppins text-[13px] font-light whitespace-nowrap no-underline hover:underline">
          {{ item.label }}
        </component-link>
      </div>

      <div class="flex lg:w-[350px]">
        <btn variant="black" class="w-[167px] h-[40px] leading-[40px] relative">
          <img class="w-[24px] h-[24px] object-contain object-center absolute left-[10px] top-[8px]" src="~/assets/img/icons/phantom.svg" alt="">
          Connect
        </btn>
        <btn variant="black" class="w-[167px] h-[40px] leading-[40px] relative ml-[12px]">
          <img class="w-[24px] h-[24px] object-contain object-center absolute left-[10px] top-[8px]" src="~/assets/img/icons/metamask.svg" alt="">
          Connect
        </btn>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    open(){
      return this.$store.getters["app/menu"].open;
    },
    navigation(){
      return this.$store.getters["app/menu"].navigation;
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit('app/TOGGLE_MENU');
    }
  }
})
</script>
