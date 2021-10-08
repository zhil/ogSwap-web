<template>
  <footer class="pt-[40px] pb-[28px] md:py-[70px] bg-vampire-black">
    <div
      class="container text-center md:flex md:justify-center md:items-center"
    >
      <nav class="flex flex-col md:flex-row">
        <component-link
          v-for="(item, key) in navigation"
          :key="key"
          :route="item.route"
          :href="item.href"
          :class="{
            'no-underline hover:underline': $route.name !== item.route,
          }"
          class="
            mb-[23px]
            text-[14px]
            leading-[16px]
            font-light
            md:mb-0 md:px-[17px] md:first:pl-0 md:first:pr-[28px]
          "
        >
          {{ item.label }}
        </component-link>
      </nav>

      <div class="flex flex-col md:flex-row">
        <div
          v-for="(social, socialKey) in socials"
          :key="socialKey"
          class="mb-[23px] md:mx-[17px] last:mb-0 md:mb-0 last:mr-0"
        >
          <social-link
            :href="social.href"
            :icon="social.icon"
            class="text-[20px] text-quick-silver hover:text-candy-apple-red"
          />
        </div>
      </div>
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
    socials() {
      return this.$store.getters['app/menu'].socials
    },
  },
})
</script>
