import { request } from '../util/request'

const account = {
    getAccount: async (connection) => {
        let result = {
            message: 'error getting account'
        }

        result = await request(connection, { method: 'GET', endPoint:'/account'})
        
        return result
    }
}

export default account