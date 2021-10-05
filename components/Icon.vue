<template>
  <svg-icon :name="name" :class="customSize?'':'icon-inline'"/>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    },
    customSize: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="postcss">
.icon {
  overflow: hidden;
  display: inline-block;
  flex-shrink: 0;
  pointer-events: none;
}
.icon-inline {
  width: 1em;
  height: 1em;
  vertical-align: -0.1em;
}
</style>
