<template>
  <input class="field-input"
         :value="value"
         :placeholder="placeholder"
         :type="type"
         :disabled="disabled"
         :readonly="readonly"
         :class="{
              'field-input--lg': size === 'large',
              'field-input--md': size === 'medium',
              'field-input--sm': size === 'small',
              'field-input--dark-charcoal': variant === 'dark-charcoal',
              'field-input--rounded': rounded,
              'field-input--square': square,
              'field-input--error': error,
              'field-input--disabled': disabled,
             }"
         @input="$emit('input', $event.target.value)"
  />
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      validator: (value) => ['text', 'number', 'email', 'tel'].includes(value),
      default: 'text'
    },
    error: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
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
.field-input {
  appearance: none;

  @apply block w-full min-w-[20px] bg-transparent border-none border-transparent rounded-none py-0 px-[12px] leading-none text-base outline-none text-left rounded-[6px] placeholder-ghost-white;
}

.field-input--lg {
  @apply h-[56px] text-base font-normal;

  &.field-input--square {
    @apply w-[56px] min-w-[56px];
  }
}

.field-input--md {
  @apply h-[42px] text-xs font-normal;

  &.field-input--square {
    @apply w-[42px] min-w-[42px];
  }
}

.field-input--sm {
  @apply h-[30px] text-xs font-normal;

  &.field-input--square {
    @apply w-[30px] min-w-[30px];
  }
}

.field-input--rounded {
  @apply rounded-full;
}

.field-input--dark-charcoal {
  @apply bg-dark-charcoal;
}

.field-input--error {
  @apply ring-1 ring-inset ring-electric-red;
}

.field-input--disabled {
  @apply pointer-events-none opacity-50;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
