
import fetch from 'node-fetch'
import { request } from '../util/request'

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

        console.log(connection)
        try {
            const response = await request(connection, { method: 'GET', endPoint: '/processing/url' })

            let url = await response.json()

            console.log('url', new URL(url.uploadUrl))

            let result = await fetch(url.uploadUrl, {
                method: 'PUT',
                headers: {
                    "Content-length": params.contentLength,
                    "ContentType": params.contentType
                },
                body: stream // Here, stringContent or bufferContent would also work
            })

            console.log('uploadStream results', result)

            let responseUrl = new URL(result.url)
            console.log('url', responseUrl.pathname.replace('/uploads/', ''))

            let uuid = responseUrl.pathname.replace('/uploads/', '')

            return uuid;
        }
        catch (e) {
            console.error(`Error! ${e.message}`)
        }

    }
};

export default data