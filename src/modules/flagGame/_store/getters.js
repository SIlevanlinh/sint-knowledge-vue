import mutationTypes from './mutation-types'

const score = state => state.score
const currentCountry = state => state.currentCountry

const getters = {
    score,
    currentCountry
}

for (let key in mutationTypes) {
    if (mutationTypes.hasOwnProperty(key)) {
      for (let subKey in mutationTypes[key]) {
        if (mutationTypes[key].hasOwnProperty(subKey)) {
          if (subKey !== subKey.toUpperCase()) {
            let stateName = mutationTypes[key][subKey]
            getters[stateName] = state => state.response[stateName]
          }
        }
      }
    }
}
  
export default getters