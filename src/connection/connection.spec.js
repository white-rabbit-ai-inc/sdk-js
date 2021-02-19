
import connection  from '.'

describe('test connection', () => {

    test('set env',() => {
        connection.setEnvironment(connection.ENVIRONMENT_TYPES.STAGING)
        expect(connection.environment).not.toBe(undefined) 
        expect(connection.environment).toBe(connection.requests[connection.ENVIRONMENT_TYPES.STAGING]) 
    })

    test('get connection',() => {
        expect(connection.init({apiKey: '1234', environment: connection.ENVIRONMENT_TYPES.STAGING})).not.toBe(undefined) 
        expect(connection.init()).toHaveProperty('environment') 
    })
})
 
