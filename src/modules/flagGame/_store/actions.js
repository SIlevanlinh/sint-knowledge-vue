import { countries } from '../_api/index'
import asyncUtil from './async-utils'
import types from './mutation-types'

const getCountries = async context => {
    let api = {
      name: countries.getAll,
      params: []
    }
    let mutationTypes = types.COUNTRY_GET_ALL
  
    return asyncUtil.doAsync(context, api, mutationTypes, true)
}

const actions = {
    getCountries
}

export default actions