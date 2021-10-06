<template>
<button class="border-[1px] bg-blood text-white rounded-md  bg-no-repeat bg-right-top">{{ text }}</button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        text: {
            type: String,
            default: ''
        }
    }
})
</script>