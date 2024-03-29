
import types from './types'
import { request as req } from '../util/request'

import validateData from '../util/validator'
import baseSchema from '../../schema/processingRequest.json'
import profileSchema from '../../schema/profile.json'
import matchSchema from '../../schema/match.json'

const schema = Object.freeze({
  'profile.json': profileSchema,
  'match.json': matchSchema
})

/**
 * processing
 * @exports processing
 */
const processing = {

  /**
   * init
   * set up initial connection params
   *
   * @param {string} typeName
   * @return {object} the initialized connection object
   */
  getType: (typeName) => {
    return types.getType(typeName)
  },
  /**
   * request
   * send a request for processing
   *
   * @param {object} connection {@connection}
   * @param {object} type
   * @param {object} data
   * @return {object} the initialized connection object
   */
  request: async (connection, type, data) => {
    if (!type) {
      throw new Error('request type is required')
    }
    if (!data) {
      throw new Error('no payload found - request parameters required to process data')
    }
    // const results = {
    //   message: 'error requesting processing'
    // }
    if (!data.processingType) {
      data.processingType = type.name
    }

    if (!await validateData(baseSchema, data)) {
      return JSON.stringify({ message: 'the data provided does not meet minimum requirements' })
    }

    const typeSchema = schema[type.schema]
    if (!await validateData(typeSchema, data)) {
      const msg = `the data provided does not meet requirements for a ${type.name} request`
      return `{ 'message' : ${msg} }`
    }

    try {
      const params = {
        method: 'POST',
        endPoint: type.url
      }

      const requestResult = await req(connection, params, data)
      const result = await requestResult

      // console.log(JSON.stringify(result))
      // let id = await result.id
      if (requestResult.status !== 200) {
        // console.log(result)
        return result
      }
      return result.id
    } catch (e) {
      console.error('error', JSON.stringify(e))
      throw e
    }
  },
  /**
   * getResults
   * get results of a processing request
   *
   * @param {object} connection
   * @param {object} type
   * @param {string} requestId
   * @return {object} the initialized connection object
   */
  getResults: async (connection, type, requestId) => {
    let results = {
      message: 'error requesting processing'
    }

    // let queries = {
    //     type: type.name
    // }

    results = await req(connection, { method: 'GET', id: requestId, endPoint: type.url })

    return results
  }

}

export default processing
