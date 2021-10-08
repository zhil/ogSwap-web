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

      <div class="flex lg:w-[350px] justify-end">
        <coin-account class="ml-[12px]" :img="require('~/assets/img/icons/phantom.svg')"
                      address="0xtest...test"
                      network=""
                      :signed="signed1"
                      :connected="connected1"
                      @click="connected1 = !connected1"
                      @login="signed1 = true"
                      @logout="signed1 = false"
        />
        <coin-account class="ml-[12px]" :img="require('~/assets/img/icons/metamask.svg')"
                      network="Mainnet"
                      address="0xtest...test"
                      :signed="signed2"
                      :connected="connected2"
                      @click="connected2 = !connected2"
                      @login="signed2 = true"
                      @logout="signed2 = false"
        />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    connected1: false,
    connected2: true,
    signed1: false,
    signed2: false,
  }),
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
