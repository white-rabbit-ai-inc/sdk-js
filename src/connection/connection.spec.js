
import connection, { requests } from '.'

describe('test connection', () => {
    test('api key undef',() => {
        expect(connection.apiKey).toBe(undefined) 
    })

    test('api key defined',() => {
        let keyValue = 'test' 
        connection.setKey(keyValue)
        expect(connection.apiKey).not.toBe(undefined) 
        expect(connection.apiKey).toBe(keyValue) 
    })

    test('set env',() => {
        connection.setEnvironment(connection.ENVIRONMENT_TYPES.STAGING)
        expect(connection.environment).not.toBe(undefined) 
        expect(connection.environment).toBe(connection.requests[connection.ENVIRONMENT_TYPES.STAGING]) 
    })

    test('get connection',() => {
        expect(connection.init({apiKey: '1234', environment: connection.ENVIRONMENT_TYPES.STAGING})).not.toBe(undefined) 
        expect(connection.init()).toHaveProperty('environment') 
        expect(connection.init()).toHaveProperty('apiKey') 
    })
})
 
