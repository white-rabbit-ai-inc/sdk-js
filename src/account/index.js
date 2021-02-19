import { request } from '../util/request'

// /**
//  * account
//  * @exports account
//  */
const account = {
    // /**
    //  * get account
    //  *
    //  * @param {object} connection
    //  * @return {string} The account associated with the apiKey used.
    //  */
    getAccount: async (connection) => {
        let result = {
            message: 'error getting account'
        }

        result = await request(connection, { method: 'GET', endPoint:'/account'})
        
        return result
    }
}

export default account