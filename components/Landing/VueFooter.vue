<template>
  <footer
    class="
      relative
      pt-[52px]
      pb-[36px]
      lg:pt-[140px] lg:pb-[70px]
      overflow-hidden
    "
  >
    <img
      src="~/assets/img/landing/footer-bg.png"
      alt=""
      class="
        hidden
        lg:block
        absolute
        left-[50%]
        top-[13px]
        translate-x-[-50%]
        max-w-none
      "
    />

    <div class="relative container flex flex-col items-center">
      <nuxt-link to="/">
        <img
          src="~/assets/img/logo.svg"
          class="w-[229px] h-[135px] lg:w-[282px] lg:h-[166px]"
          alt="Candy Shop"
          width="229"
          height="135"
        />
      </nuxt-link>

      <div class="hidden xl:flex mt-[38px]">
        <component-link
          v-for="(item, key) in navigation"
          :key="key"
          :route="item.route"
          :href="item.href"
          :class="{
            'no-underline hover:underline': $route.name !== item.route,
          }"
          class="px-[31px] font-bold"
        >
          {{ item.label }}
        </component-link>
      </div>

      <p class="mt-[13px] xl:mt-[31px] text-[13px] leading-[21px]">
        ©2021 Candyshop
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import ComponentLink from '~/components/ComponentLink.vue'

export default Vue.extend({
  components: { ComponentLink },
  computed: {
    navigation() {
      return this.$store.getters['app/menu'].landingNavigation
    },
  },
})
</script>
