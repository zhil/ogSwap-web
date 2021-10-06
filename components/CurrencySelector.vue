<template>
    <div>
        <div class="text-base order-1 sm:order-3 hidden sm:block">
            <div class="relative group cursor-pointer">
                <span tabindex="-1">
                    <div
                            class="
                            selector
                            bg-input
                            w-[142px]
                            h-[56px]
                            p-[12px]
                            rounded-lg
                            text-white
                            mb-[5px]
                        "
                    >
                        <div class="input value flex items-center justify-between">
                            <div class="flex items-center">
                                <img
                                        class=" rounded-full
                        border-border
                        border-[1px]
                        bg-white
                        h-[30px]
                        p-[3px]
                        mr-[8px]"
                                        src="~/assets/img/icons/eth.svg"
                                        alt=""
                                />
                                <span>ETH</span>
                            </div>
                            <icon
                                    name="mono/chevron"
                                    class="group-focus-within:rotate-180 fill-current text-[10px] text-desaturated-cyan"
                            />
                        </div>
                    </div>
                </span>
                <div class="group-focus-within:block hidden absolute z-20 left-0 mt-[5px] rounded-[8px] min-w-[142px] rounded-lg overflow-hidden">
                    <div
                            v-for="i in 2"
                            class="
                            selector
                            bg-input
                            w-[142px]
                            h-[56px]
                            p-[12px]
                            text-white
                        "
                            @click="select"
                    >
                            <div class="flex items-center">
                                <img
                                        class=" rounded-full
                                                border-[1px]
                                                bg-white
                                                h-[30px]
                                                p-[3px]
                                                mr-[8px]"
                                        src="~/assets/img/icons/eth.svg"
                                        alt=""
                                />
                                <span>ETH</span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            value:            1,
        };
    },
    methods:  {
        select(){
            console.log('Событие селекта');
        }
    },
});
</script>
