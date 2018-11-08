import axios from 'axios'
import API from './API'

const restcountriesPath = 'https://restcountries.eu/rest/v2/'

const restcountriesAxios = axios.create({
  baseURL: restcountriesPath,
  headers: {
    Authorization: 'Bearer {token}'
  }
})

export const restcountriesApi = new API({ axios: restcountriesAxios })
