<template>
  <div class="flex items-start justify-center inset-0 h-full w-full z-50 py-4 fixed overflow-auto"
        :class="{
          'opacity-1 visible pointer-events-auto': modal && modal.name === name,
          'pointer-events-none opacity-0 invisible': !modal || modal.name !== name,
        }">

    <div class="fixed inset-0 w-full h-full bg-[#080808] bg-opacity-80"
         aria-label="Close the modal window"
    @click="$emit('close')"/>

    <transition name="fade">
      <div v-if="modal" :key="name+'-'+modal.index"
           class="relative p-[1.5rem] z-[1] m-auto">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    },
    boxClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    modals() {
      return this.$store.getters['app/modals'];
    },
    modal() {
      return this.modals[this.modals.length - 1];
    }
  }
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
