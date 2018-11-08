import Vue from 'vue'
import types from './mutation-types'

const mutations = {}

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