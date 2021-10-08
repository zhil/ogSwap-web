<template>
  <footer class="flex-shrink-0 relative py-[30px]">

    <div class="container-1440 flex flex-col sm:flex-row justify-between items-center font-heading">
      <div class="text-[13px] font-poppins font-light order-3 sm:order-1">
        © 2021 OGSwap
      </div>
      <div class="flex order-2 mb-2 sm:mb-0">
        <div v-for="(social, socialKey) in socials" :key="socialKey" class="text-2xl px-5">
          <social-link :href="social.href" :icon="social.icon" class="text-[#7A7A7A] hover:text-candy-apple-red" />
        </div>
      </div>
    </div>

  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    socials() {
      return this.$store.getters["app/menu"].socials;
    }
  }
})
</script>
