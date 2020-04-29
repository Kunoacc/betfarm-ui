<template>
  <aside :class="['drawer absolute top-0 left-0 bottom-0 w-full shadow', {'hidden': !isOpen}]">
        <div class="drawer__overlay w-full h-full"></div>
        <div class="drawer__content bg-white w-3/4 sm:w-2/3 md:w-1/2 top-0 bottom-0 left-0 absolute">
            <div class="drawer__content-header flex bg-primary py-5 container">
                <button class="bg-transparent outline-none focus:outline-none ml-auto" @click="toggleDrawer()">
                    <i class="fas fa-times text-2xl" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </aside>
</template>

<script>
import { ref, onMounted } from 'vue'
import { emitter, Events } from '../bus'
export default {
    setup() {
        const isOpen = ref(false)

        emitter.on(Events.DRAWER_TOGGLE, e => isOpen.value = !isOpen.value)

        onMounted(() => {
            emitter.on(Events.DRAWER_TOGGLE, e => isOpen.value = !isOpen.value)
        })

        function toggleDrawer(){
            emitter.emit(Events.DRAWER_TOGGLE)
        }
        
        return { isOpen, toggleDrawer }
    }
}
</script>

<style lang="scss" scoped>
.drawer__overlay {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>