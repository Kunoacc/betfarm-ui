<template>
  <footer class="fixed bottom-0 right-0 left-0 py-4 bg-primary shadow-2xl">
        <div class="container grid grid-cols-2 gap-5">
            <button class="rounded-sm text-white capitalize px-10 py-2 bg-secondary">book bet</button>
            <button class="rounded-sm text-white capitalize px-10 py-2 bg-secondary">bet slip ({{count}})</button>
        </div>
    </footer>
</template>

<script>
import {emitter, Events} from '../bus'
import { ref, onMounted } from 'vue'
export default {
 setup(){
     const count = ref(0)

    onMounted(() => {
        emitter.on(Events.BOOKED_EVENTS_COUNT_UPDATE, e => count.value = e.length )
    })

    emitter.on(Events.BOOKED_EVENTS_COUNT_UPDATE, e => count.value = e.length )

     return { count }
 }
}
</script>

<style>

</style>