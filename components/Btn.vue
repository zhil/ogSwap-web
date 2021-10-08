<template>
  <component :is="tag"
             class="btn"
             :class="{
              'btn--lg': size === 'large',
              'btn--md': size === 'medium',
              'btn--sm': size === 'small',
              'btn--blood': variant === 'blood',
              'btn--black': variant === 'black',
              'btn--underline': variant === 'underline',
              'btn--text': variant === 'text',
              'btn--rounded': rounded,
              'btn--square': square,
              'btn--block': block,
             }"
  >
    <slot/>
  </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    rounded: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: (value) => ['large', 'medium', 'small'].includes(value),
      default: 'medium'
    },
    variant: {
      type: String,
      validator: (value) => ['blood', 'black', 'underline', 'text'].includes(value),
      default: 'blood'
    },
  }
})
</script>

<style lang="postcss">
.btn {
  @apply inline-block text-center rounded-[6px] ring-1 ring-inset text-xs align-middle transition-all;

}

.btn--lg {
  @apply h-[56px] leading-[56px];

  &.btn--square {
    @apply w-[56px] min-w-[56px];
  }
}

.btn--md {
  @apply h-[42px] leading-[42px];

  &.btn--square {
    @apply w-[42px] min-w-[42px];
  }
}

.btn--sm {
  @apply h-[30px] leading-[30px];

  &.btn--square {
    @apply w-[30px] min-w-[30px];
  }
}

.btn--blood {
  @apply bg-blood-top-right text-white bg-vampire-black ring-[#EBE4E4] bg-no-repeat bg-right-top font-semibold;

  background-size: auto 30px;

  &:hover{
    @apply ring-candy-apple-red bg-candy-apple-red bg-none;
  }
}

.btn--black {
  @apply text-white bg-vampire-black;
}

.btn--underline {
  @apply text-white underline hover:no-underline;
}

.btn--text {
  @apply no-underline hover:underline;
}

.btn--rounded {
  @apply rounded-full;
}

.btn--block {
  @apply w-full block;
}

</style>
