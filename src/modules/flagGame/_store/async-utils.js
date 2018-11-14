const doAsync = async (context, api, mutationTypes) => {
    context.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: true })
    try {
      let response = await api.name.apply(this, api.params)
  
      let updateAllowed = true
      let resRequestAt = null
      if (response.config.requestAt) {
        resRequestAt = response.config.requestAt
        let currentRequestAt = context.state.response[mutationTypes.requestAt]
        if (resRequestAt < currentRequestAt) updateAllowed = false
      }
  
      if (updateAllowed) {
        context.commit(mutationTypes.BASE, {
          type: mutationTypes.UPDATE_REQUEST_AT,
          requestAt: resRequestAt
        })
  
        context.commit(mutationTypes.BASE, {
          type: mutationTypes.SUCCESS,
          data: response.data,
          statusCode: response.status
        })
  
        context.commit(mutationTypes.BASE, {
          type: mutationTypes.PENDING,
          value: false
        })
      }
  
      return response
    } catch (error) {
      context.commit(mutationTypes.BASE, { type: mutationTypes.PENDING, value: false })
      context.commit(mutationTypes.BASE, { type: mutationTypes.FAILURE, statusCode: error.response.status })
      return Promise.reject(error)
    }
  }
  
  export default {
    doAsync
  }
  