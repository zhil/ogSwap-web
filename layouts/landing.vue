<template>
  <div
    class="relative flex flex-col min-h-screen font-poppins text-white bg-vampire-black"
  >
    <landing-vue-header />
    <mobile-menu is-landing />

    <main class="flex-grow">
      <nuxt />
    </main>

    <landing-vue-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
