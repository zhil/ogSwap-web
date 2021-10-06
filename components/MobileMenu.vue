<template>
  <div
    class="
      fixed
      inset-0
      w-full
      h-full
      z-40
      xl:hidden
      transition-visibility-and-transform
      duration-0
    "
    :class="{
      '-translate-x-full invisible delay-150': !open,
      'delay-0': open,
    }"
  >
    <button
      type="button"
      class="
        mobile-menu__backdrop
        rotate-180
        z-[-1]
        absolute
        inset-0
        w-full
        h-full
        border-none
        text-white
        transition-all
      "
      :class="{
        'opacity-0': !open,
        'bg-solana2': !isLanding,
        'bg-primary': isLanding,
      }"
      aria-label="Close"
      @click="toggleMenu"
    />

    <nav
      class="
        mobile-menu__nav
        flex flex-col
        absolute
        left-0
        top-0
        bottom-0
        h-full
        bg-dark
        container
        p-6
        transition-transform
      "
      :class="{
        '-translate-x-full': !open,
      }"
    >
      <div class="flex-shrink-0 flex justify-between">
        <nuxt-link to="/" class="text-[46px]" @click.native="toggleMenu">
          <img
            src="~/assets/img/logo.svg"
            class="w-[62px] h-[38px]"
            alt="OG Swap"
            width="62"
            height="38"
          />
        </nuxt-link>
        <button
          type="button"
          class="
            mobile-menu__close
            bg-transparent
            border-none
            w-[52px]
            h-[52px]
            flex
            justify-center
            items-center
            -my-1
          "
          @click="toggleMenu"
        >
          <icon
            name="mono/close2"
            class="text-[18px] fill-current stroke-current"
          />
        </button>
      </div>

      <div class="flex-grow flex flex-col overflow-auto">
        <div class="mb-auto w-full pt-[54px]">
          <div v-for="(item, key) in navigation" :key="key" class="mb-[42px]">
            <nuxt-link
              :to="item.route ? { name: item.route } : item.href"
              class="
                font-poppins
                text-[20px]
                leading-[32px]
                no-underline
                hover:underline
              "
              @click.native="toggleMenu"
            >
              {{ item.label }}
            </nuxt-link>
          </div>
        </div>

        <div
          v-for="(social, socialKey) in socials"
          :key="socialKey"
          class="mb-[28px]"
        >
          <social-link
            :href="social.href"
            :icon="social.icon"
            class="text-[36px] text-secondary"
          />
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isLanding: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    open() {
      // @ts-ignore
      return this.$store.getters['app/menu'].open
    },
    navigation() {
      // @ts-ignore
      return this.$store.getters['app/menu'].landingNavigation
    },
    partners() {
      // @ts-ignore
      return this.$store.getters['app/menu'].partners
    },
    socials() {
      // @ts-ignore
      return this.$store.getters['app/menu'].socials
    },
  },
  watch: {
    open() {
      if (typeof window !== 'undefined') {
        const html = document.querySelector('html')
        if (html) {
          if (this.open) {
            html.classList.add('overflow-hidden')
            html.classList.add('sm:overflow-auto')
          } else {
            html.classList.remove('overflow-hidden')
            html.classList.remove('sm:overflow-auto')
          }
        }
      }
    },
  },
  methods: {
    toggleMenu() {
      this.$store.commit('app/TOGGLE_MENU')
    },
  },
})
</script>

<style lang="postcss">
.mobile-menu__nav {
  @apply w-full;
}

.mobile-menu__close {
  @apply hover:text-magenta;
}

@media (min-width: 360px) {
  .mobile-menu__nav {
    @apply w-[300px];
  }

  .mobile-menu__close {
    @apply text-white fixed top-[0.9rem] right-6;
  }
}

@media (min-width: 430px) {
  .mobile-menu__backdrop {
    @apply opacity-70 bg-black bg-none;
  }
}
</style>
