<template>
    <div class="flex text-white bg-black items-center rounded-[40px] border-gray-300 border-[1px] p-2 my-4">
        <div class="flex">
            <img
                    src="~/assets/img/icons/metamask.svg"
                    alt=""
            >
        </div>
        <div class="flex-col px-2">
            <p class="block font-semibold text-xs">0xced4...sdf01a</p>
            <p class="block text-[10px]">Mainnet</p>
        </div>
        <div class="flex border-[1px] border-gray-400 rounded-full p-2">
            <icon class="text-[10px] fill-current stroke-current" name="mono/logout" />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
})
</script>
