<template>
   <div class="bg-secondary py-3">
        <div class="container flex justify-between">
            <p class="text-white capitalize text-accent">{{category}}</p>
            <p class="text-white text-accent">{{events}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        category: {
            type: String,
            required: true
        },
        events: {
            type: Number,
            required: true
        }
    },
}
</script>

<style>

</style>