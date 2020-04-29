<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 modal flex justify-center items-center z-10">
      <div class="w-4/5 md:w-1/2 bg-accent rounded-sm p-6 relative modal__content">
        <h2 class="text-2xl font-bold uppercase text-center">Competitions</h2>
        <div class="competitions py-8 grid grid-cols-1 row-gap-5 text-center" v-if="competitions.length > 0">
            <span class="text-sm py-3 text-black capitalize"> Please select a competition</span>
            <button v-for="(competition, index) in competitions"
            :class="['p-2 border-2 competition transition-all duration-300 rounded w-3/4 mx-auto', {'active': selectedCompetition.id === competition.id}]"
             @click="e => updateSelected(competition)"
             :key="index"
            > {{competition.name}} </button>
        </div>
        <div class="py-16 text-center w-full flex flex-col items-center justify-center" v-else>
            <i class="fas fa-exclamation-circle"></i>
            <span class="text-sm mt-3"> No competitions available</span>
        </div>

        <div class="absolute modal__content-button">
            <button @click="e => togglePickerState()">
                <i class="fas fa-times"></i>
            </button>
        </div>
      </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
    props: ['competitions', 'selectedCompetition'],
    setup(props, ctx) {
        function updateSelected(competition) {
            ctx.emit('update-competition', competition)
            ctx.emit('toggle-picker-state')
        }

        function togglePickerState() {
            ctx.emit('toggle-picker-state')
        }

        return { updateSelected, togglePickerState }
    }
}
</script>

<style lang="scss" scoped>
    .modal {
        background-color: rgba($color: #000000, $alpha: 0.6);

        &__content-button {
            top: 10px;
            right: 20px;
        }
    }
    .competition{
        @apply text-black border-black bg-transparent;

        &.active {
            @apply bg-black text-white;
        }
    }
</style>