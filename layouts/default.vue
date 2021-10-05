<template>
  <div class="min-h-screen font-sans bg-body relative flex flex-col text-maastricht-blue">
    <vue-header />
    <mobile-menu />

    <main class="flex-grow relative z-[1]">
      <div class="w-full h-full z-[-1] absolute left-0 top-0">
        <div class="container h-full pb-40">
          <img src="~/assets/img/spiral.svg" class="w-full h-full object-center object-contain" alt="">
        </div>
      </div>

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
