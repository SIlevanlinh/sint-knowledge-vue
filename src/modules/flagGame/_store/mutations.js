import Vue from 'vue'
import types from './mutation-types'
// import mtn from './mutation-types'
import _ from 'lodash'

const mutations = {
    updateField (state, payload) {
        const { path, value } = payload
        _.set(state, path, value)
    },

    [types.SHUFFLE_COUNTRIES] (state) {
        state.response.countryGetAllData = _.shuffle(state.response.countryGetAllData)
    },
    
    [types.INCREASE_SCORE] (state) {
        state.score++
    },

    [types.INCREASE_CURRENT_COUNTRY] (state) {
        state.currentCountry++
    },

    [types.CHANGE_LOCALE] (state, payload) {
      state.locale = payload
    }
}

Object.keys(types).forEach(type => {
    mutations[types[type].BASE] = (state, payload) => {
      switch (payload.type) {
        case types[type].PENDING:
          return Vue.set(state.response, types[type].loadingKey, payload.value)
  
        case types[type].SUCCESS:
          Vue.set(state.response, types[type].statusCode, payload.statusCode)
          return Vue.set(state.response, types[type].stateKey, payload.data)
  
        case types[type].FAILURE:
          return Vue.set(state.response, types[type].statusCode, payload.statusCode)
  
        case types[type].UPDATE_REQUEST_AT:
          return Vue.set(state.response, types[type].requestAt, payload.requestAt)
      }
    }
  })

export default mutations