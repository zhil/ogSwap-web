<template>
            <div class="    text-sm
                            selector
                            bg-input
                            w-full
                            h-[56px]
                            p-[9px]
                            rounded-lg
                            text-white
                            mb-[5px]
                            border-[1px]
                            border-transparent
                            focus-within:border-[1px]
                            focus-within:border-gray-400
                            relative
                        ">
                <input value="0"  class="bg-input outline-none w-full ">
                <div class="max-button absolute right-[16px] top-[8px] w-[40px] h-[40px] flex items-center bg-black justify-center rounded-md border-white border-[1px] hover:bg-active hover:text-black"><span class="underline text-center">MAX</span></div>
                <span>$0</span>
            </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            value: 1,
        };
    },
    methods: {
        select() {
            console.log('Событие селекта');
        },
    },
});
</script>
