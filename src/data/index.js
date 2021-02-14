

import { request } from '../util/request'

const data = {
    upload: async (connection, params, stream) => {

        console.log(connection)
        try {
            const response = await request(connection, { method: 'GET', endPoint: '/processing/url' })
            
            let url = await response.json()

            console.log('url',new URL(url.uploadUrl))

            let result = await fetch(url.uploadUrl, {
                method: 'PUT',
                headers: {
                    "Content-length": params.contentLength,
                    "ContentType": params.contentType
                },
                body: stream // Here, stringContent or bufferContent would also work
            })

            console.log('uploadStream results', result)
            return result;
        }
        catch (e) {
            console.error(`Error! ${e.message}`)
        }
       
    }
};

export default data

