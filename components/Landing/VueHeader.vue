<template>
  <header class="relative z-[1] pt-[25px] pb-[28px] lg:pt-[31px] bg-dark">
    <div
      class="container header-index lg:pl-[40px] lg:pr-[82px] lg:max-w-[1440px]"
    >
      <div class="relative flex items-center">
        <nuxt-link to="/">
          <img
            src="~/assets/img/logo.svg"
            class="mr-[54px] w-[62px] h-[38px]"
            alt="OG Swap"
            width="62"
            height="38"
          />
        </nuxt-link>

        <button
          type="button"
          class="flex ml-auto text-white lg:hidden"
          :class="{ 'opacity-0': open }"
          @click="toggleMenu"
        >
          <icon
            name="mono/menu"
            class="w-[42px] h-[30px] fill-current stroke-current"
            custom-size
          />
        </button>

        <nav class="hidden lg:flex lg:flex-wrap">
          <component-link
            v-for="(item, key) in navigation"
            :key="key"
            :route="item.route"
            :href="item.href"
            :class="{
              'no-underline hover:underline': $route.name !== item.route,
            }"
            class="
              px-[17px]
              text-[13px]
              leading-[16px]
              font-light
              first:pr-[28px]
            "
          >
            {{ item.label }}
          </component-link>
        </nav>

        <div class="hidden lg:block absolute top-[20px] right-0">
          <div
            v-for="(social, socialKey) in socials"
            :key="socialKey"
            class="block mb-[30px]"
          >
            <social-link
              :href="social.href"
              :icon="social.icon"
              class="text-[20px] text-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import ComponentLink from '~/components/ComponentLink.vue'

export default Vue.extend({
  components: { ComponentLink },
  computed: {
    open() {
      return this.$store.getters['app/menu'].open
    },
    navigation() {
      return this.$store.getters['app/menu'].landingNavigation
    },
    socials() {
      return this.$store.getters['app/menu'].socials
    },
  },
  methods: {
    toggleMenu() {
      this.$store.commit('app/TOGGLE_MENU')
    },
  },
})
</script>
