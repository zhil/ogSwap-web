<template>
  <component :is="route ? ($route.name === route ? 'span' : 'nuxt-link') : 'a'"
             v-bind="{ [route? 'to' : 'href']: route ? ({name: route}) : href }"
  ><slot /></component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    route: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
  }
})
</script>
