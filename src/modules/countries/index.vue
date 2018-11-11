<template>
    <div class="hello">
        <h1>Wavin' Flags <b-badge>{{ score }}</b-badge></h1>
        <b-container class="bv-example-row" style="background-color: #99cc00; padding: 1rem" v-if="puzzle != null">
            <b-row>
                <b-col>
                    <b-img class="flag" :src=puzzle.answerCountry.flag fluid alt="Responsive image" />
                    <b-row>
                        <b-col>
                            <b-button-group>
                                <b-button variant="warning" class="btn-option"
                                    v-for="option in puzzle.options" :key="option.alpha2code"
                                    @click="checkAnswer(option)">
                                    {{ option.name }}
                                </b-button>
                            </b-button-group>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-img src="https://media.giphy.com/media/psmj7c3DbrJKkbRYFj/giphy.gif" fluid alt="Responsive image" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    const STORE_KEY = 'countries'
    import store from './_store'
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import Puzzle from './puzzle'
    import types from './_store/mutation-types'
    // import { mapFields } from './_store/mapFields'
    import _ from 'lodash'

    export default {
        name: 'CountriesIndex',
        components: {},
        data () {
            return {
                puzzle: null,
                temp: []
            }
        },
        computed: {
            ...mapGetters({
                countryGetAllData: STORE_KEY + '/countryGetAllData',
                score: STORE_KEY + '/score',
                currentCountry: STORE_KEY + '/currentCountry'
            })
        },
        beforeCreate () {
            if (!(STORE_KEY in this.$store._modules.root._children)) {
                this.$store.registerModule(STORE_KEY, store)
            }
        },
        mounted () {
            this.getCountries()
            .then(data => {
                console.log(data)
                this.shuffleCountries()
                this.puzzle = this.createPuzzle()
            })
        },
        methods: {
            ...mapActions({
                getCountries: STORE_KEY + '/getCountries'
            }),
            ...mapMutations({
                increaseCurrentCountry: STORE_KEY + '/' + types.INCREASE_CURRENT_COUNTRY,
                increaseScore: STORE_KEY + '/' + types.INCREASE_SCORE,
                shuffleCountries: STORE_KEY + '/' + types.SHUFFLE_COUNTRIES
            }),
            createPuzzle () {
                this.increaseCurrentCountry()
                this.temp = [...Array(this.countryGetAllData.length).keys()]
                let currentIndex = this.currentCountry
                let answerCountry = this.countryGetAllData[currentIndex]
                this.temp.splice(currentIndex, 1)
                let fakeCountries = []
                for (let i = 0; i < 3; i++) {
                    let ranIndex = _.random(0, this.temp.length)
                    fakeCountries.push(this.countryGetAllData[ranIndex])
                    this.temp.splice(ranIndex, 1)
                }
                return new Puzzle(answerCountry, fakeCountries)
            },
            checkAnswer (country) {
              let isCorrect = this.puzzle.checkAnswer(country)
              console.log('isCorrect', isCorrect)
              if (isCorrect) {
                this.increaseScore()
              }
            }
        }
    }
</script>

<style>
  .btn-option {
    width: 10rem;
    white-space:normal !important;
  }

  .flag {
    width: 25rem;
  }
</style>


