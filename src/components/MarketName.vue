<template>
    <button :class="['mx-3 bg-transparent transition-all duration-300 ease-linear focus:outline-none', {'active': isActiveMarket}]">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        isActiveMarket: {
            type: Boolean,
            required: true,
            default: false
        }
    }
}
</script>