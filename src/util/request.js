
import axios from 'axios'
import fetch from 'node-fetch'

const request = async (connection, params, data) => {
    if(connection.apiKey === undefined)
        throw new Error('no apiKey set - please refer to the config module')
    if(params.method === undefined)
        throw new Error('no method defined')

    params.method = params.method.toLowerCase() 
    let isFile = !!params.file
    let isDataPost = params.method === 'post' && !isFile

    
    
    let url = `${connection.environment.url}${params.endPoint}`
    
    let options = {
        method: params.method,
    }
    if(params.method === 'get' && params.id){
        url += `/${params.id}` 
    }
    else if(params.method === 'get' && params.queries){
        // url += `/${id}`
        for (const [key, value] of Object.entries(params.queries)) {
            url += url.includes('?') ? `&` : `?`
            url +=  `${key}=${value}`
        }; 
    }

    if(isDataPost){
        options.body = JSON.stringify(data)
    }

    if(isFile){
        options.body = data
        options.headers = {
            "Content-length": params.contentLength
        }
    }

    options.headers = {
        "access-key": process.env.WRI_ACCESS_KEY,
        "x-api-key": process.env.WRI_API_KEY
    }
    // console.log('url',url)
    console.log('options',options)
    
    let result = await fetch(url,options)
    if(result.status !== 200){
        throw new Error(result.statusText)
    }
    return result
}

export default request