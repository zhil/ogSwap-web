    <template>
        <div class="    text-sm
                            selector
                            bg-input
                            w-full
                            h-[42px]
                            p-[9px]
                            rounded-lg
                            text-white
                            border-[1px]
                            border-transparent
                            focus-within:border-[1px]
                            focus-within:border-gray-400
                            relative
                        ">
            <img
                    class="max-button absolute left-[12px] top-[8px] w-[24px] h-[24px]"
                    src="~/assets/img/icons/metamask.svg"
                    alt=""
            >
            <input placeholder="Enter email address" class="bg-input outline-none w-full pl-[42px] placeholder-white">
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
