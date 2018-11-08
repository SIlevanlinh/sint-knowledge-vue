import mutationTypes from './mutation-types'

const getters = {}

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