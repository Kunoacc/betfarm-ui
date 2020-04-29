<template>
   <div class="bg-secondary py-4">
        <div class="container flex justify-between">
            <p class="text-white capitalize">{{category}}</p>
            <p class="text-white">{{events}}</p>
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