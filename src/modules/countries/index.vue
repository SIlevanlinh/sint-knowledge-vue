<template>
    <div class="hello">
        <h1>Wavin' Flags</h1>
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


