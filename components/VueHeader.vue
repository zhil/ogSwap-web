<template>
  <header class="flex-shrink-0 pt-[30px] pb-[4px]">
    <div class="container-1440 flex flex-row items-center justify-between">
      <div>
        <nuxt-link to="/">
          <img src="~/assets/img/logo.svg" class="w-[63px] h-[38px]" alt="OG Swap" width="63" height="38">
        </nuxt-link>
      </div>

      <div>
        <component-link v-for="(item, key) in navigation"
                        :key="key"
                        :route="item.route"
                        :href="item.href"
                        class="px-[14px] mx-[11px] font-poppins text-[13px] font-light whitespace-nowrap no-underline hover:underline">
          {{ item.label }}
        </component-link>
      </div>

      <div class="flex">
        <button class="">
          Connect
        </button>
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
