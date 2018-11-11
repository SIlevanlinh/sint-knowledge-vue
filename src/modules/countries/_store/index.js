import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
    score: 0,
    currentCountry: -1,
    response: {},
    locale: 'ja'
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}