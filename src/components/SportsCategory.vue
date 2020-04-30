<template>
    <button :class="['sports__category transition-all duration-300 ease-linear focus:outline-none', {'active': isActive}]">
        <div class="sports__category-wrapper flex items-center flex-col py-5 bg-accent">
            <div class="sports__category-image flex justify-center items-center gap-5 transition-all duration-300 ease-linear"></div>
            <p class="sports__category-title capitalize mt-4">{{title}}</p>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .sports__category {
        &.active {
            @apply bg-secondary;

            & .sports__category-wrapper{
                clip-path: polygon(0 0, 100% 0, 100% 100%, 69% 100%, 49% 91%, 29% 100%, 0 100%);
                border-radius: 1px;
            }

            & .sports__category-title{
                @apply font-semibold;
            }

            & .sports__category-image{
                @apply text-white bg-secondary;
            }
        }

        & .sports__category-image {
            @apply rounded-full h-8 w-8 bg-primary;
        }

        & .sports__category-wrapper {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 69% 100%, 49% 100%, 29% 100%, 0 100%);
            @apply -mx-1;
        }
    }
</style>