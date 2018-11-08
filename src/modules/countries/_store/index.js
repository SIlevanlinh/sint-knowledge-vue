import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
    score: 0,
    response: {}
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}