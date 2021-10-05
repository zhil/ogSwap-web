<template>
  <div class="relative">
    <div :style="{ paddingTop: aspect }"></div>
    <div class="absolute inset-0"><slot /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    aspect: {
      type: String,
      default: '100%'
    }
  }
})
</script>
