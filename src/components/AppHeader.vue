<template>
  <header class="bg-primary w-full py-4">
        <div class="container grid grid-rows-2 row-gap-5">
            <div class="header__content flex justify-between">
                <div class="header__contect-icon flex justify-center items-center text-base">
                    <button class="bg-transparent pr-2 focus:outline-none" @click="toggleDrawer()">
                        <i class="fas fa-bars"></i>
                    </button>
                    <b class="text-base uppercase">a - z</b>
                </div>
                <img :src="logo" alt="" srcset="" class="-ml-8">
                <button class="text-base focus:outline-none">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            <div class="header__actions grid gap-4 grid-cols-2">
                <button class="rounded-sm text-white uppercase px-10 py-2 bg-red-500">join now</button>
                <button class="rounded-sm text-white uppercase px-10 py-2 bg-secondary">login</button>
            </div>
        </div>
    </header>
</template>

<script>
import { computed ,ref } from "vue"
import { emitter, Events } from '../bus'
export default {
    setup() {
        const logo = computed(() => require('@/assets/logo.svg'))

        function toggleDrawer(){
            emitter.emit(Events.DRAWER_TOGGLE)
        }

        return { logo, toggleDrawer }
    }
}
</script>

<style>

</style>