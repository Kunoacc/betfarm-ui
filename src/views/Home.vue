<template>
  <div class="home">

    <!-- Sports Categories -->
    <div class="sports bg-accent">
      <div class="container flex justify-around">
        <sports-category v-for="(value, index) in categories" :icon-class="`fa-${value.name.toLowerCase()}-ball`"
          :title="value.name" :is-active="value.name == selectedCategory.name" :key="index" @click="setCategory(value)"></sports-category>
      </div>
    </div>

    <sports-category-stats :category="selectedCategory.name" :events="categoryEvents"></sports-category-stats>

    <div class="markets overflow-auto bg-accent py-4" v-if="allMarkets.length > 0">
        <market-names :names="allMarkets" @marketUpdated="e => setCurrentMarket(e)" :current-market="selectedMarket"></market-names>
    </div>

    <div class="gameboard w-full" v-if="selectedCompetition.name">

        <!-- Gameboard Header -->
        <div class="competition bg-primary py-3">
            <div class="container flex justify-between">
              <div class="competition__content w-3/6">
                <button class="flex w-full flex-row items-center border border-black rounded text-center px-3" @click="e => updateCompetitionPicketState()">
                    <i class="fas fa-football-ball mr-3"></i>
                    <p class="competition__content-title">{{selectedCompetition.name}}</p>
                </button>
              </div>
                <div class=" w-3/6 event__content flex justify-around items-center text-center">
                    <p v-for="(label, index) in eventLabels" :key="index">{{label}}</p>
                </div>
            </div>
        </div>

        <!-- Gameboard Body -->
        <div class="events bg-accent">
          <div class="container grid grid-cols-1">
              <div class="event__item grid grid-cols-2 gap-10 py-2" v-for="(game, index) in games" :key="index">
                  <div class="grid grid-cols-1 row-gap-2">
                      <div class="flex-row flex justify-between">
                          <p class="event__item-team font-semibold text-sm">{{game.team_one_name}}</p>
                          <p class="event__item-score font-semibold text-sm">{{game.info.score1}}</p>
                      </div>
                      <div class="flex-row flex justify-between">
                          <p class="event__item-team font-semibold text-sm">{{game.team_two_name}}</p>
                          <p class="event__item-score font-semibold text-sm">{{game.info.score2}}</p>
                      </div>
                      <div class="flex-row flex justify-between">
                          <p class="event__item-game font-semibold text-sm">
                              <span class="event__item-gamestate">{{game.info.current_game_state === "se1" ? "1st Half " : "2nd Half "}}</span>
                              <span class="event__item-gametime">{{game.info.current_game_time}}"</span>
                          </p>
                          <p class="event__item-gameicon font-semibold">
                              <i class="fas fa-star"></i>
                          </p>
                      </div>

                  </div>
                  <div :class="`grid grid-cols-${game.events.length} gap-1`">
                      <button :class="['bg-primary my-4 text-center font-bold flex justify-center items-center event__item-price',
                      {'active': selectedEvents.includes(event.id)}]"
                      :disabled="!event.price"
                        @click="addBet(game, event)"
                        v-for="(event, index2) in game.events" :key="index2">
                          {{event.price}}
                      </button>
                  </div>
              </div>
          </div>
        </div>

      </div>
      <div class="py-10 flex flex-grow text-center justify-center items-center text-base" v-else>
        <p>No game data available for the selected category</p>
      </div>

    <transition name="fade">
      <competition-picker :competitions="competitions" :selected-competition="selectedCompetition"
        @update-competition="e => updateCompetition(e)"
        @toggle-picker-state="e => updateCompetitionPicketState()"
        v-if="competitionPickerState"></competition-picker>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { toRefs, onMounted, reactive, watch } from 'vue';
import { api } from '../api/api';
import { Events, emitter } from '../bus'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      categories: [],
      regions: [],
      competitions: [],
      selectedCompetition: "",
      selectedCategory: {},
      categoryEvents: 0,
      selectedMarket: "",
      allMarkets: [],
      games: [],
      eventLabels: [],
      bets: {},
      selectedEvents: [],
      competitionPickerState: false
    });

    onMounted(() => {
      initiate()
    })

    watch(() => state.selectedEvents, (value) => {
      emitter.emit(Events.BOOKED_EVENTS_COUNT_UPDATE, value)
      emitter.on(Events.BOOKED_EVENTS_COUNT_UPDATE, e => console.log(value))
    })

    function updateCompetitionPicketState() {
      state.competitionPickerState = !state.competitionPickerState;
    }

    function initiate(group = "sport") {
      api.setGroup(group)
      state.categories = api.getCategories("sport")
      setCategory(state.categories[0])
      updateCompetition()
      updateMarkets()
    }

    function updateCompetition(competition = null) {
      let competitions;
      try {
        competitions = api.getAllCompetitions();
        state.competitions = competitions
        api.setCompetition(competition || competitions[0])
        state.selectedCompetition = competition || competitions[0]
        updateMarkets(state.selectedMarket, competition)
      } catch(e) {
        competitions = []
        state.competitions = competitions
        state.selectedCompetition = {}
      }
    }

    function updateMarkets(market = null, competition = null) {
      state.allMarkets = api.getUniqueMarketNamesInCategory(state.selectedCategory?.id)
      setCurrentMarket(market || state.allMarkets[0] || "", competition || state.competitions[0] || "")
    }

    function setCategory(category) {
      if (Object.getOwnPropertyNames(state.selectedCategory).length === 0) {
        state.selectedCategory = category;
        state.categoryEvents = api.getNumberOfEventsInCategory(category.id)
        api.setCategory(category)
      } else {
        state.selectedCategory = category;
        try {
          state.categoryEvents = api.getNumberOfEventsInCategory(category?.id)
          api.setCategory(category)
          updateCompetition()
          updateMarkets()
        } catch(e) {
          state.categoryEvents = 0;
          api.setCategory(category)
          updateCompetition()
          updateMarkets()
        }
      }
    }

    function setCurrentMarket(market, competition = null) {
      try {
        state.selectedMarket = market;
        state.games = api.games().getByMarket(state.selectedMarket, competition?.id)
        state.eventLabels = api.getEventLabelsByMarketName(market)
      } catch(e) {
        state.games = []
        state.eventLabels = []
      }
    }

    function addBet(game, event){
      if (state.bets[game.market_id]) {
        if (state.bets[game.market_id].event_id === event.id) {
          state.selectedEvents.splice(state.selectedEvents.indexOf(event.id), 1)
          delete state.bets[game.market_id]
          emitter.emit(Events.BOOKED_EVENTS_COUNT_UPDATE, state.selectedEvents)
        } else {
          state.selectedEvents.splice(state.selectedEvents.indexOf(state.bets[game.market_id].event_id), 1)
          state.selectedEvents.push(event.id)
          state.bets[game.market_id].event_id = event.id
          emitter.emit(Events.BOOKED_EVENTS_COUNT_UPDATE, state.selectedEvents)
        }
      } else {
        state.bets[game.market_id] = {
          'event_id': event.id
        }
        state.selectedEvents.push(event.id)
        emitter.emit(Events.BOOKED_EVENTS_COUNT_UPDATE, state.selectedEvents)
      }
    }

    return { ...toRefs(state), setCategory, setCurrentMarket, addBet, updateCompetition, updateCompetitionPicketState }
  }
};
</script>

<style lang="scss" scoped>
  .competition__content{
    & > button {
      cursor: pointer;
      width: 100%;
    }

    &-title{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    }
  }

.event__item-price.active {
    @apply text-white bg-secondary;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.event__item:not(:last-child){
  @apply border-b border-gray-400;
}

/* Medium (md) */
@media (min-width: 640px) {
  .competition__content{
    & > button {
      cursor: pointer;
      width: min-content;
    }
  }
}

</style>
