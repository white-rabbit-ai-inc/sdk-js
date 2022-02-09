
/* global fetch: true */
import nodeFetch from 'node-fetch'

if (!fetch) {
  fetch = nodeFetch
}

export const request = async (connection, params, data) => {
  if (params.method === undefined) {
    throw new Error('no method defined')
  }

  params.method = params.method.toLowerCase()
  const isFile = !!params.file
  const isDataPost = params.method === 'post' && !isFile

  let url = `${connection.environment.url}${params.endPoint}`

  const options = {
    method: params.method.toUpperCase()
  }
  if (params.method === 'get' && params.id) {
    url += `/${params.id}`
  }
  if (params.method === 'get' && params.queries) {
    for (const [key, value] of Object.entries(params.queries)) {
      url += url.includes('?') ? '&' : '?'
      url += `${key}=${value}`
    };
  }

  if (isDataPost) {
    options.body = JSON.stringify(data)
  }

  if (isFile) {
    options.body = data
    options.headers = {
      'Content-length': params.contentLength
    }
  }

  options.headers = {
    'access-key': process.env.WRI_ACCESS_KEY || connection.accessKey,
    'x-api-key': process.env.WRI_API_KEY || connection.apiKey
  }

  const result = await fetch(url, options)
  // console.log(result)
  // if(result.status !== 200){
  //     console.error(result)
  // }
  return result
}
