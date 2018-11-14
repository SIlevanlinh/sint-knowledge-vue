import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {}

const store = {
    state,
    getters,
    mutations,
    actions
}

export default new Vuex.Store(store)
