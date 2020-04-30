<template>
    <div class="market__names inline-flex flex-row mx-auto">
        <market-name v-for="(name, index) in names" :key="index"
            :is-active-market="name === currentMarket" @click="updateMarket(name)">
            {{name}}
        </market-name>
    </div>
</template>

<script>
export default {
    props: ["names", "currentMarket"],
    setup(props, ctx) {
        function updateMarket(market) {
            ctx.emit('marketUpdated', market)
        }

        return { updateMarket }
    }
}
</script>

<style lang="scss">
.market__names {
    -webkit-box-shadow: inset 8px 6px -6px black;
        -moz-box-shadow: inset 8px 6px -6px black;
            box-shadow: inset 8px 6px -6px black;

    & > button {
        width: max-content;
        @apply border-b-4 border-transparent;
    }

    & > button.active {
        @apply font-bold capitalize border-b-4 border-secondary;
    }
}
</style>