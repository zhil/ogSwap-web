<template>
  <div class="flex justify-center">
    <div
      class="
        relative
        flex
        justify-center
        items-center
        mr-[31px]
        lg:mr-[39px]
        p-[14px]
        lg:p-[16px]
        min-w-[140px]
        lg:min-w-[158px]
        border-white border
        rounded-[26px]
      "
    >
      <img
        src="~/assets/img/landing/coming-soon.svg"
        alt="coming soon"
        class="
          absolute
          left-[50%]
          top-0
          translate-x-[-50%] translate-y-[-50%]
          w-[72px]
          h-[18px]
        "
      />
      <span
        class="
          text-[13px]
          lg:text-base
          leading-[15px]
          lg:leading-[19px]
          font-bold
          opacity-50
        "
        >LAUNCH APP</span
      >
    </div>

    <button
      class="
        relative
        flex
        justify-center
        items-center
        p-[14px]
        lg:p-[16px]
        min-w-[140px]
        lg:min-w-[158px]
        bg-button
        hover:bg-button-hover
        rounded-[26px]
      "
    >
      <span
        class="
          absolute
          left-[50%]
          top-[-2px]
          lg:top-[-4px]
          translate-x-[-50%] translate-y-[-100%]
          w-[72px]
          h-[18px]
          text-[12px]
          whitespace-nowrap
        "
      >
        Candy waitlist
      </span>
      <span
        class="
          text-[13px]
          lg:text-base
          leading-[15px]
          lg:leading-[19px]
          font-bold
        "
        >SIGN UP</span
      >
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
