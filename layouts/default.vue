<template>
  <div class="bg-wall bg-no-repeat bg-cover min-h-screen font-sans relative flex flex-col text-maastricht-blue">
    <vue-header />
    <mobile-menu />

    <main class=" flex-grow relative z-[1]">
      <nuxt />
    </main>

    <vue-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>
