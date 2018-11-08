<template>
    <div class="hello">
        <h1>Wavin' Flags <b-badge>10</b-badge></h1>
        <b-container class="bv-example-row" style="background-color: #99cc00; padding: 50px">
            <b-row>
                <b-col>
                    <b-img src="https://restcountries.eu/data/aus.svg" fluid alt="Responsive image" />
                    <b-row>
                        <b-col>
                            <b-button variant="outline-success">
                                Vietnam
                            </b-button>
                        </b-col>
                        <b-col>
                            <b-button variant="outline-success">
                                Japan
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-button variant="outline-success">
                                England
                            </b-button>
                        </b-col>
                        <b-col>
                            <b-button variant="outline-success">
                                Laos
                            </b-button>
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
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'CountriesIndex',
        components: {},
        computed: {
            ...mapGetters({
                countryGetAllData: STORE_KEY + '/countryGetAllData'
            })
        },
        beforeCreate () {
            if (!(STORE_KEY in this.$store._modules.root._children)) {
                this.$store.registerModule(STORE_KEY, store)
            }
        },
        mounted () {
            this.getCountries()
        },
        methods: {
            ...mapActions({
                getCountries: STORE_KEY + '/getCountries'
            })
        }
    }
</script>

<style>
</style>


