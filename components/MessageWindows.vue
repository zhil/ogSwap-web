<template>
  <div class="message-windows">
    <message-window
      v-for="i in messages"
      :key="i"
      :collapsed="i !== indexOpen"
      @collapse="handleCollapse(i)"
      :completed="i%2 === 1"
      @close="messages = messages - 1"
    >
      123
    </message-window>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    messages: 40,
    indexOpen: 1
  }),
  methods: {
    handleCollapse(i) {
      this.indexOpen = i === this.indexOpen ? null : i;
    }
  }
})
</script>

<style lang="postcss">
.message-windows {
  @apply fixed right-0 pr-[20px] top-[90px] bottom-[90px] z-20 overflow-y-auto overflow-x-hidden;
}

@media (hover: hover) {
  .message-windows::-webkit-scrollbar-track {
    border-radius: 0;

    @apply bg-dark-charcoal bg-opacity-0;
  }

  .message-windows::-webkit-scrollbar-thumb {
    border-radius: 0;

    @apply bg-dark-charcoal bg-opacity-0;
  }

  .message-windows::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
