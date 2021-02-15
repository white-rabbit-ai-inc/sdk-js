
import connection from '../connection'
import { request } from '../util/request'

let types = {};

const getType = async (type) => {
    let keys = Object.keys(types)
    if(keys.length == 0){
        types = await getTypes()
        keys = Object.keys(types)
    }
    if(!keys.includes(type))
        throw new Error('Invalid Processing Type')
    return types[type]
}

const getTypes = async () => {
    const conn = connection.init()

    //query for types and return result
    let response = await request(conn,{ method: 'GET', endPoint:'/processing?types'})
    let result = await response.json()
    return result.types
}

module.exports = {
    types: types,
    getType: getType
  };