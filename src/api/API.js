class API {
  constructor ({ axios }) {
    this.axios = axios
    this.endpoints = {}
  }
  /**
   * Create and store a single entity's endpoints
   * @param {A entity Object} entity
   */
  createEntity (entity) {
    this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
  }

  createEntities (arrayOfEntity) {
    arrayOfEntity.forEach(this.createEntity.bind(this))
  }
  /**
   * Create the basic endpoints handlers for CRUD operations
   * @param {A entity Object} entity
   */
  createBasicCRUDEndpoints ({name}) {
    var endpoints = {}

    const resourceURL = `${name}`

    endpoints.getAll = (query = {}) => this.axios.get(`${resourceURL}/`, { params: query, requestAt: new Date() })

    endpoints.getOne = ({ id }) => this.axios.get(`${resourceURL}/${id}`)

    endpoints.create = (toCreate) => this.axios.post(resourceURL, toCreate)

    endpoints.update = (toUpdate) => this.axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate)

    endpoints.patch = ({id}, toPatch) => this.axios.patch(`${resourceURL}/${id}/`, toPatch)

    endpoints.multiPatch = (query = {}, toPatch) => this.axios.patch(`${resourceURL}/multi/`, toPatch, { params: query })

    endpoints.delete = ({ id }) => this.axios.delete(`${resourceURL}/${id}`)

    return endpoints
  }
}

export default API
