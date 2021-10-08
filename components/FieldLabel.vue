<template>
  <div class="field-label">
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="postcss">
.field-label {
  @apply text-xs font-semibold mb-2;
}
</style>
