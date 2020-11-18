
// import config from '../config'

// const createRequest = (params, data) => {
//     if(config.getConfig().apiKey == undefined)
//         throw new Error('no apiKey set - please refer to the config module')
//     let baseUrl = config.getConfig().environment.url
//     let result = await axios.post(`${baseUrl}${params.endPoint}`, data)
//     return result
// }  

// const fetchRequest = (id) => {
//     if(config.getConfig().apiKey == undefined)
//         throw new Error('no apiKey set - please refer to the config module')
//     let baseUrl = config.getConfig().environment.url
//     let result = await axios.get(`${baseUrl}${params.endPoint}/${id}`)
//     return result
// }

const request = async (connection, params, data) => {
    if(connection.apiKey == undefined)
        throw new Error('no apiKey set - please refer to the config module')
    if(params.method === undefined)
        throw new Error('no method defined')
    params.method = params.method.toUpperCase() 
    let url = `${connection.environment.url}${params.endPoint}`
    
    let fetchOptions = {
        method: params.method,
    }
    if(params.method === 'GET' && params.id){
        url += `/${params.id}` 
    }
    else if(params.method === 'GET' && params.queries){
        // url += `/${id}`
        for (const [key, value] of Object.entries(params.queries)) {
            url += url.includes('?') ? `&` : `?`
            url +=  `${key}=${value}`
        }; 
    }
    if(params.method === 'POST'){
        fetchOptions.data = data
    }
    
    let result = await fetch(url,fetchOptions)
    return result.json()
}

export default request