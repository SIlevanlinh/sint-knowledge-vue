<template>
    <div class="hello">
        <h1>Wavin' Flags 
          <b-badge>{{ score }}</b-badge>
          <span v-if="countryGetAllData" style="font-size: 20px"> / {{ countryGetAllData.length }}</span>
        </h1>
        <b-container class="bv-example-row" style="background-color: #99cc00; padding: 1rem" v-if="puzzle != null">
            <b-row>
                <b-col>
                    <b-img class="flag" :src=puzzle.answerCountry.flag fluid alt="Responsive image" />
                    <b-row class="answer-options">
                        <b-col>
                            <b-button-group>
                                <b-button variant="warning" class="btn-option"
                                    v-for="option in puzzle.options" :key="option.alpha2code"
                                    @click="checkAnswer(option)"
                                    :disabled="answerDisabled">
                                    <!-- {{ option.name }} -->
                                    {{ option.translations.ja }}
                                </b-button>
                            </b-button-group>
                        </b-col>
                    </b-row>

                    <!-- Next puzzle -->
                    <b-row>
                      <b-col>
                        <b-button class="btn-next" variant="primary" @click="nextPuzzle">次</b-button>
                      </b-col>
                    </b-row>

                </b-col>
                <b-col>
                    <b-img :src="resultIcon" fluid alt="Responsive image" width="300rem"/>
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
                temp: [],
                answerDisabled: false,
                earthIcon: require('@/assets/earth_walking_hc.gif'),
                correctIcon: require('@/assets/correct.gif'),
                incorrectIcon: require('@/assets/incorrect.gif'),
                resultIcon: null
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

            this.resultIcon = this.earthIcon
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
              this.answerDisabled = true
              let isCorrect = this.puzzle.checkAnswer(country)
              if (isCorrect) {
                this.increaseScore()
                this.resultIcon = this.correctIcon
                return
              }
              this.resultIcon = this.incorrectIcon
            },
            nextPuzzle () {
              this.resultIcon = this.earthIcon
              this.puzzle = this.createPuzzle()
              this.answerDisabled = false
            }
        }
    }
</script>

<style>
  .btn-option {
    width: 10rem;
    white-space:normal !important;
    margin-right: 0.5rem;
  }

  .btn-next {
    width: 9rem;
  }

  .flag {
    width: 25rem;
  }
  .answer-options {
    margin: 1rem 1rem 1rem 1rem;
  }
</style>


