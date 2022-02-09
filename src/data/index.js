/* global fetch: true */
import nodeFetch from 'node-fetch'
import { request } from '../util/request'

if (!fetch) {
  fetch = nodeFetch
}
/**
 * data module
 * @exports data
 */
const data = {
  /**
   * Blend two colors together.
   * @param {string} connection - A connection object.
   * @param {string} params - The second color, in hexadecimal format.
   * @param {string} stream - a NodeJS file stream
   * @return {string} The blended color.
   */
  upload: async (connection, params, stream) => {
    try {
      const response = await request(connection, { method: 'GET', endPoint: '/processing/url' })

      const url = await response.json()

      console.log('url', new URL(url.uploadUrl))

      const result = await fetch(url.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-length': params.contentLength,
          ContentType: params.contentType
        },
        body: stream // Here, stringContent or bufferContent would also work
      })

      console.log('uploadStream results', result)

      const responseUrl = new URL(result.url)
      console.log('url', responseUrl.pathname.replace('/uploads/', ''))

      const uuid = responseUrl.pathname.replace('/uploads/', '')

      return uuid
    } catch (e) {
      console.error(`Error! ${e.message}`)
    }
  }
}

export default data
