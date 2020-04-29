import data from '../data/sample'

class Api {
    constructor({ data }) {
        this.api = data.data
    }

    setGroup(group) {
        const groups = this.getGroups();
        if (groups.indexOf(group) === -1) {
            throw new Error("the group does not exist in the data set")
        } else {
            this.group = group
            this._resetGroups()
        }
    }

    getGroups() {
        return Object.keys(this.api)
    }

    _resetGroups(){
        if (this.category) {
            this.category = []
            this.region = []
            this.competition = []
            this.game = []
        }
    }

    getCategories(group = "") {
        if (group || this.group) {
            const keys = Object.keys(this.api[group || this.group])
            const values =  Object.values(this.api[group || this.group]).map((value, index) => ({
                'id': keys[index],
                'name' : value.name,
            }))
            return values;
        } else {
            throw new Error('The group has to be set to get categories')
        }
    }

    getAllCategories() {
        const values = Object.values(this.api).map(x => Object.values(x)
                .map((value, index) => ({
                    'id':Object.keys(x)[index],
                    'name': value.name
                })))
            return values.flat();
    }

    setCategory({id, name}) {
        const categories = this.getCategories()
        if (categories.map(x => x.id).indexOf(id) === -1) {
            throw new Error('The category does not exist in the data set')
        } else {
            this.category = { id, name }
            this._resetCategories()
            return this;
        }
    }

    _resetCategories() {
        if (this.region) {
            this.region = []
            this.competition = []
            this.game = []
        }
    }

    getRegions(category = "") {
        if (!this.category || !category) {
            throw new Error('The category has to be set to get regions.')
        } else {
            const keys = Object.keys(this.api[this.group][this.category?.id || category].region)
            const values = Object.values(this.api[this.group][this.category?.id || category].region)
                .map((value, index) => ({
                    'id': keys[index],
                    'name': value.alias
                }))
                return values;
        }
    }

    getAllRegions() {
        const firstValues = Object.values(this.api[this.group]).map(x => Object.values(x));
        const nextValues = firstValues.map(x => x[1])
         const finalValue = nextValues.map(x => Object.values(x).map((y, index) => ({
             'id': Object.keys(x)[index],
             'alias': y.alias
         })))
        return finalValue.flat();
    }

    setRegion({ id, alias }) {
        const regions = this.getRegions()
        if (regions.map(x => x.id).indexOf(id) === -1) {
            throw new Error('This region does not exist in this category')
        } else {
            this.region = { id, alias }
            this._resetRegions()
            return this
        }
    }

    _resetRegions(){
        if (this.competition) {
            this.competition = []
            this.game = []
        }
    }

    getCompetitions(regionId = ""){
        if (!this.region || region) {
            throw new Error('The region has to be set to get competitions')
        } else {
            const keys = Object.keys(this.api[this.group][this.category.id].region[this.region?.id || regionId].competition)
            const values = Object.values(this.api[this.group][this.category.id].region[this.region?.id || regionId].competition)
                .map((value, index) => ({
                    'id': keys[index],
                    'name': value.name
                }))
            return values;
        }
    }

    getAllCompetitions(){
        const regions = Object.values(this.api[this.group][this.category.id].region);
        const competitions = regions.map(x => Object.values(x.competition)).flat();
        const competitionKeys = regions.map(x => Object.keys(x.competition)).flat();
        const formattedCompetitions = competitions.map((x, index) => ({
            'id': competitionKeys[index],
            'name': x.name
        }))
        return formattedCompetitions;
    }

    setCompetition({ id, name }){
        const competitions = this.getAllCompetitions();
        if (competitions.map(x => x.id).indexOf(id) === -1) {
            throw new Error('The competition does not exist in the dataset')
        } else {
            this.competition = { id, name }
            return this;
        }
    }

    games() {
        const gamesSorter = (a, b) => {
            let comparison = (a.start_ts > b.start_ts) ? 1 : 0;
            return comparison;
        }

        if (!this.competition) {
                throw new Error('The competition has to be set to get games')
        } else {

            return {
                get: () => {
                    const values = Object.values(this.api[this.group][this.category.id].region[this.region.id].competition[this.competition.id]);
                    return values.sort(gamesSorter);
                },

                getByCategory: () => {
                    const category = this.api[this.group][this.category.id];
                    const regions = category.region;
                    const competitions = Object.values(regions).map(x => Object.values(x.competition)).flat();
                    const games = competitions.map(x => Object.values(x.game)).flat();
                    return games.sort(gamesSorter);
                },

                getByCompetition: (competitionId = null) => {
                    const category = this.api[this.group][this.category.id];
                    const regions = category.region;
                    const competition = Object.values(regions).reduce((accumulator, currentValue) => {
                        const keys = Object.keys(currentValue.competition);
                        const values = Object.values(currentValue.competition);
                        if (!keys.includes(competitionId || this.competition.id)) {
                            return accumulator
                        } else {
                            Object.assign(accumulator, values[keys.indexOf(competitionId || this.competition.id)])
                            return accumulator;
                        }
                    }, {});
                    const games = Object.values(competition.game);
                    return games.sort(gamesSorter);
                },

                getAll: () => {
                    const categories = Object.values(this.api[this.group]);
                    const regions = categories.map(x => x.region);
                    const competitions = regions.map(x => Object.values(x.competition)).flat();
                    const games = competitions.map(x => Object.values(x.game)).flat();
                    console.log(regions)
                    return games.sort(gamesSorter);
                },

                getByMarket: (marketName, competitionId = null) => {
                    const allGames = this.games().getByCompetition(competitionId);
                    // Big(O)n2. Not so efficient, another quick Fix
                    const gamesReducer = (accumulator, currentValue) => {
                        const events = Object.values(currentValue.market)
                        const eventKeys = Object.keys(currentValue.market)
                        console.log(eventKeys)
                        if (!events.map(x => x.name).includes(marketName)) {
                            return accumulator;
                        } else {
                            let game = {}
                            events.forEach((val, index) => {
                                if (val.name === marketName) {
                                    game.id = currentValue.id
                                    game.info = currentValue.info
                                    game.events = Object.values(val.event).map((x, index) => ({'id': Object.keys(val.event)[index], ...x}))
                                    game.eventName = val.name
                                    game.start_time_stamp = currentValue.start_ts
                                    game.team_one_name = currentValue.team1_name
                                    game.team_two_name = currentValue.team2_name
                                    game.market_id = eventKeys[index]
                                    accumulator.push(game)
                                } else {
                                    return
                                }
                            })
                            return accumulator;
                        }
                    }
                    const marketGames = allGames.reduce(gamesReducer, [])
                    return marketGames;
                },
            }
        }
    }

    // Helper Functions
    getNumberOfEventsInCategory(categoryId) {
        if (!categoryId) {
            throw new Error('A category ID is required to find events in category');
        } else {
            const regions = Object.values(this.api[this.group][categoryId].region)
            const competitions = regions.map(x => Object.values(x.competition)).flat();
            const games = competitions.map(x => Object.values(x.game)).flat();
            const markets = games.map(x => Object.values(x.market)).flat();
            return markets.length;
        }
    }

    getEventLabelsByMarketName(marketName) {
        if (!marketName) {
            throw new Error('A market name is required to get the event labels')
        } else {
            const regions = Object.values(this.api[this.group][this.category.id].region)
            const competitions = regions.map(x => Object.values(x.competition)).flat();
            const games = competitions.map(x => Object.values(x.game)).flat();
            const markets = games.map(x => Object.values(x.market)).flat();
            let event;
            markets.forEach(val => {
                if (val.name === marketName) {
                    if (event) {
                        return;
                    } else {
                        event = val.event
                    }
                }
            })
            const labels = Object.values(event).map(x => x.name);
            return labels;
        }
    }

    getUniqueMarketNamesInCategory(categoryId) {
        if (!categoryId) {
            throw new Error('A category ID is required to get unique market names in category');
        } else {
            const regions = Object.values(this.api[this.group][categoryId].region)
            const competitions = regions.map(x => Object.values(x.competition)).flat();
            const games = competitions.map(x => Object.values(x.game)).flat();
            const markets = games.map(x => Object.values(x.market)).flat();
            const marketNames = markets.map(x => x.name);
            return [...new Set(marketNames)]
        }
    }
}

console.log(data)

const api = new Api(data);

export { api };