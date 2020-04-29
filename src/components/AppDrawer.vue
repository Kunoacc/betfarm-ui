<template>
  <aside class="drawer absolute top-0 left-0 bottom-0 w-full shadow hidden">
        <div class="drawer__overlay w-full h-full"></div>
        <div class="drawer__content bg-white w-3/4 sm:w-2/3 md:w-1/2 top-0 bottom-0 left-0 absolute">
            <div class="drawer__content-header flex bg-primary py-5 container">
                <button class="bg-transparent outline-none focus:outline-none ml-auto">
                    <i class="fas fa-times text-2xl" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </aside>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.drawer__overlay {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>