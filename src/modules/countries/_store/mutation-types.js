import _ from 'lodash'

/*
 * createAsyncMutation('GET_INFO_ASYNC') will lead to:
 *
 * GET_INFO_ASYNC = {
 *      BASE: GET_INFO_ASYNC_BASE,
 *      SUCCESS: GET_INFO_ASYNC_SUCCESS,
 *      PENDING: GET_INFO_ASYNC_PENDING,
 *      FAILURE: GET_INFO_ASYNC_FAILURE,
 *      loadingKey: getInfoAsyncPending,
 *      errorCode: getInfoAsyncErrorCode,
 *      stateKey: getInfoAsyncData
 * }
 *
 */
const createAsyncMutation = (type) => ({
  BASE: `${type}`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
  PENDING: `${type}_PENDING`,
  UPDATE_REQUEST_AT: `${type}_UPDATE_REQUEST_AT`,
  loadingKey: `${_.camelCase(type)}Pending`,
  statusCode: `${_.camelCase(type)}StatusCode`,
  stateKey: `${_.camelCase(type)}Data`,
  requestAt: `${_.camelCase(type)}RequestAt`
})

export default {
  COUNTRY_GET_ALL: createAsyncMutation('COUNTRY_GET_ALL')
}
