import { restcountriesApi } from '@/api/apis'

const countryResource = 'all'
restcountriesApi.createEntity({ name: countryResource })

export const countries = aisiaApi.endpoints[countryResource]
