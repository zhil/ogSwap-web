<template>
  <div
    class="flex items-center"
    :class="{
      'text-[13px]': size === 'medium',
      'text-[12px]': size === 'small',
      'btn--disabled': blocking && selected == chain,
    }"
    @click="$emit('select', index, chain)"
  >
    <div
      class="
        rounded-full
        bg-ghost-white
        flex
        justify-center
        items-center
        mr-[6px]
      "
      :class="{
        'min-w-[30px] w-[30px] h-[30px]': size === 'medium',
        'min-w-[20px] w-[20px] h-[20px]': size === 'small',
      }"
    >
      <img
        v-if="img"
        class="h-[22px] w-[22px] object-center object-contain"
        :class="{
          'h-[22px] w-[22px]': size === 'medium',
          'h-[11px] w-[11px]': size === 'small',
        }"
        :src="img"
        alt=""
      />
    </div>
    {{ label }}
    <slot />
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import Vue, { PropType } from 'vue'
import { Chains } from './constants'

export default Vue.extend({
  props: {
    size: {
      type: String,
      validator: (value) => ['medium', 'small'].includes(value),
      default: 'medium',
    },
    img: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    chain: {
      type: String as PropType<Chains>,
      default: '',
    },
    blocking: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      default: "0",
    },
  },
})
</script>
