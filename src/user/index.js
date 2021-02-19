import { request } from '../util/request'

const user = {
    getUsers: async (connection) => {
        let result = {
            message: 'error getting users for account'
        }

        result = await request(connection, { method: 'GET', endPoint:'/user'})

        return result
    },

    getUser: async (connection, id, email) => {
        let result = {
            message: 'error getting user for id'
        }
        if(!email && !id){
            throw new Error('id or email required to fetch a user record')
        }

        let queries = id ? {id:id} : {email: email}

        result = request(connection, { method: 'GET', queries: queries, endPoint:'/user'})

        return result
    }
}

export default user