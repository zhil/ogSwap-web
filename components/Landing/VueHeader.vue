<template>
  <header class="py-[16px] xl:pt-[53px] xl:pb-[78px]">
    <div class="relative container xl:flex justify-center items-center">
      <div class="relative xl:static flex justify-center items-center">
        <nuxt-link to="/" class="2xl:absolute left-[-60px] top-[-24px]">
          <img
            src="~/assets/img/logo.svg"
            class="w-[134px] h-[79px]"
            alt="Candy Shop"
            width="134"
            height="79"
          />
        </nuxt-link>

        <button
          type="button"
          class="
            absolute
            top-[19px]
            right-0
            bg-transparent
            border-none
            text-white
            hover:text-maastricht-blue
            xl:hidden
            -my-1
          "
          :class="{ 'opacity-0': open }"
          @click="toggleMenu"
        >
          <icon
            name="mono/menu"
            class="text-[40px] fill-current stroke-current"
          />
        </button>
      </div>

      <div class="hidden xl:flex">
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
  },
  methods: {
    toggleMenu() {
      this.$store.commit('app/TOGGLE_MENU')
    },
  },
})
</script>
