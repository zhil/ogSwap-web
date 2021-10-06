<template>
    <div class="container">
        <div class="bg-modal mx-auto px-[40px] py-[70px] bg-no-repeat max-w-[660px] bg-fill">
            <p class="text-white text-center pb-[15px]">Swap</p>
            <div class="wrap bg-wrap send-wrap px-[28px] pt-[20px] pb-[10px] rounded">
                <div class="names text-white flex justify-between mb-[8px]">
                    <span>Send</span>
                    <span>Balance: 0 ETH</span>
                </div>
                <div class="inputs flex">
                    <currency-selector></currency-selector>
                    <currency-input class="ml-[12px]"></currency-input>
                </div>
                <div class="text-white  mb-[8px]">
                    <span>To Address</span>
                </div>
                <div class="inputs flex">
                    <to-address></to-address>
                    <blood-button class="ml-[12px] min-w-[149px] text-[12px]  bg-black" text="Connect wallet" />
                </div>
            </div>

            <div class="wrap bg-wrap send-wrap mt-[25px] px-[28px] pt-[20px] pb-[10px] rounded">
                <div class="names text-white flex justify-between mb-[8px]">
                    <span>Receive</span>
                </div>
                <div class="inputs flex">
                    <currency-selector></currency-selector>
                    <currency-input class="ml-[12px]"></currency-input>
                </div>
                <div class="text-white  mb-[8px]">
                    <span>To Address</span>
                </div>
                <div class="inputs flex">
                    <to-address></to-address>
                    <blood-button  class="ml-[12px] min-w-[149px] text-[12px] bg-black hidden sm:block" text="Connect wallet" />
                </div>
            </div>
            <blood-button class="w-full h-[42px] mt-[15px] text-[12px]" text="Next" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue          from 'vue'
import ButtonsGroup from '~/components/Landing/ButtonsGroup.vue'

export default Vue.extend({
    components: { ButtonsGroup },
    layout: 'default',
})
</script>
