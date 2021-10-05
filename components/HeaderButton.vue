<template>

</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    props: {
        text: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
    },

});
</script>
