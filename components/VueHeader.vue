<template>
  <header class="flex-shrink-0 py-4 xl:py-[30px]">
    <div class="grid grid-cols-12 block items-center">
      <div class="col-span-5 flex sm:block justify-between">
        <nuxt-link to="/" class="text-[46px] sm:text-[66px]">
          <img src="~/assets/img/logo.svg" class="w-[1em] h-[1em]" alt="Susy" width="62" height="37">
        </nuxt-link>
        <button type="button" class="
                        bg-transparent
                        border-none
                        text-magenta
                        hover:text-maastricht-blue
                        sm:hidden -my-1
                "
                :class="{'opacity-0': open}"
                @click="toggleMenu">
          <icon name="mono/menu" class="text-[52px] fill-current stroke-current" />
        </button>
      </div>
      <div class="col-span-7
                  text-center
                  flex
                  font-heading
                  font-light
                  sm:text-center
                  text-[44px]
                  leading-none
                  flex-grow mx-auto
                  hidden
                  sm:flex
                  mx-[-14px]
                  items-center
                  justify-between">
              <div class="links flex">
                  <component-link v-for="(item, key) in navigation"
                                  :key="key"
                                  :class="{ 'text-white hover:no-underline': $route.name !== item.route }"
                                  :route="item.route"
                                  :href="item.href"
                                  class="px-[14px] font-heading text-base whitespace-nowrap">
                      {{ item.label }}
                  </component-link>
              </div>
              <div class="buttons flex">
                  <div>
                      <div class="bg-black
                        flex
                        w-[167px]
                        items-center
                        h-[40px]
                        px-[10px]
                        py-[8px]
                        rounded-lg
                        border-border
                        border-[1px]
                        mx-[12px]">
                          <img
                                  class="w-[24px] h-[24px] mr-[22px]"
                                  src="~/assets/img/icons/phantom.svg"
                                  alt=""
                          >
                          <span class="text-white text-[12px] leading-[14px]">Connect</span>
                      </div>
                  </div>
                  <div>
                      <div class="bg-black
                        flex
                        w-[167px]
                        items-center
                        h-[40px]
                        px-[10px]
                        py-[8px]
                        rounded-lg
                        border-border
                        border-[1px]">
                          <img
                                  class="w-[24px] h-[24px] mr-[22px]"
                                  src="~/assets/img/icons/metamask.svg"
                                  alt=""
                          >
                          <span class="text-white text-[12px] leading-[14px]">Connect</span>
                      </div>
                  </div>
              </div>
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
