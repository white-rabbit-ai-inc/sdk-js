

import request from '../util/request'

const data = {
    upload: async (connection, params, stream) => {

        // const requestUrl = 
        console.log(connection)
        try {
            const url = await request(connection, { method: 'POST', endPoint: '/processing/url' }, { contentType: params.contentType })

            // console.log('url', url)
            // console.log(stream)

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
            console.log(e)
        }
       
    }
};

export default data

