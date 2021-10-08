<template>
  <div
    class="flex flex-col items-center md:flex-row md:items-end"
    :class="{ 'justify-end': isRight }"
  >
    <button
      class="
        inline-flex
        text-lg
        leading-[27px]
        tracking-[1px]
        font-bold
        bg-blood-left-bottom bg-no-repeat bg-left-bottom
        border border-candy-apple-red
        rounded-[6px]
        group
      "
    >
      <span
        class="
          p-[14px]
          pb-[21px]
          min-w-[288px]
          md:min-w-[232px]
          transition
          group-hover:bg-candy-apple-red
        "
      >
        Try
      </span>
    </button>

    <div
      class="mt-[36px] md:mt-0"
      :class="isRight ? 'md:ml-[28px]' : 'md:ml-[100px]'"
    >
      <nuxt-link
        to="/"
        class="flex justify-center items-center mb-[13px] text-sm md:text-lg"
      >
        <span
          class="
            flex
            justify-center
            items-center
            mr-[13px]
            w-[34px]
            h-[34px]
            bg-white
            rounded-full
          "
        >
          <icon name="sogs" />
        </span>
        <span>$OGS waitlist</span>
      </nuxt-link>

      <button
        class="
          inline-flex
          text-lg
          leading-[27px]
          tracking-[1px]
          font-bold
          bg-blood-top-right bg-no-repeat bg-right-top
          border border-candy-apple-red
          rounded-[6px]
          group
        "
      >
        <span
          class="
            p-[14px]
            pb-[21px]
            min-w-[288px]
            md:min-w-[232px]
            transition
            group-hover:bg-candy-apple-red
          "
        >
          Sign up
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Icon from '~/components/Icon.vue'

export default Vue.extend({
  components: { Icon },
  props: {
    isRight: { type: Boolean, default: false },
  },
})
</script>
