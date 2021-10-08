<template>
  <div class="field-dropdown group"
       :class="{
              'field-dropdown--lg': size === 'large',
              'field-dropdown--md': size === 'medium',
              'field-dropdown--sm': size === 'small',
              'field-dropdown--dark-charcoal': variant === 'dark-charcoal',
              'field-dropdown--rounded': rounded,
              'field-dropdown--square': square,
              'field-dropdown--block': block,
              'field-dropdown--error': error,
             }">
    <div class="group-hover:block hidden absolute z-20 top-full pt-[6px] left-0 min-w-full max-w-[280px]">
      <div class="field-dropdown__list"
           :class="{
              'field-dropdown__list--lg': size === 'large',
              'field-dropdown__list--md': size === 'medium',
              'field-dropdown__list--sm': size === 'small',
              'field-dropdown__list--dark-charcoal': variant === 'dark-charcoal',
             }">
        <slot name="list"/>
      </div>
    </div>
    <div class="w-full h-full flex-grow flex items-center" tabindex="-1" role="button">
      <slot/>
      <div class="pl-[6px]"></div>
      <icon name="mono/iconmonstr-arrow-63"
            class="rotate-90 group-hover:-rotate-90 fill-current text-[10px] text-desaturated-cyan ml-auto"/>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
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
    error: {
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
      validator: (value) => ['dark-charcoal'].includes(value),
      default: 'dark-charcoal'
    },
  }
})
</script>

<style lang="postcss">
.field-dropdown {
  @apply relative cursor-pointer inline-block rounded-[6px];

  @media (hover: hover) {
    ::-webkit-scrollbar-track {
      border-radius: 8px;

      @apply bg-dark-charcoal bg-opacity-50;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 8px;

      @apply bg-dark-charcoal;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
  }
}

.field-dropdown--lg {
  @apply h-[56px] leading-[56px] px-[12px];

  &.field-dropdown--square {
    @apply w-[56px] min-w-[56px] px-0;
  }
}

.field-dropdown--md {
  @apply h-[42px] leading-[42px] px-[12px];

  &.field-dropdown--square {
    @apply w-[42px] min-w-[42px] px-0;
  }
}

.field-dropdown--sm {
  @apply h-[30px] leading-[30px] px-[12px];

  &.field-dropdown--square {
    @apply w-[30px] min-w-[30px] px-0;
  }
}

.field-dropdown--rounded {
  @apply rounded-full;
}

.field-dropdown--block {
  @apply w-full block;
}

.field-dropdown--dark-charcoal, .field-dropdown__list--dark-charcoal {
  @apply bg-dark-charcoal;

  @media (hover: hover) {
    ::-webkit-scrollbar-track {
      border-radius: 8px;

      @apply bg-ghost-white bg-opacity-50;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 8px;

      @apply bg-ghost-white;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
  }
}

.field-dropdown__list {
  @apply rounded-[6px] py-[6px] overflow-x-hidden overflow-y-auto flex flex-col leading-none;
  > * {
    @apply w-full leading-none;
  }
  &--lg{
    @apply max-h-[180px];
    > * {
      @apply min-h-[42px] px-[12px];
    }
  }
  &--md{
    @apply max-h-[132px];
    > * {
      @apply min-h-[30px] px-[12px];
    }
  }
  &--sm{
    @apply max-h-[116px];
    > * {
      @apply min-h-[26px] px-[12px];
    }
  }
}

.field-dropdown--error {
  @apply ring-1 ring-inset ring-electric-red;
}
</style>
