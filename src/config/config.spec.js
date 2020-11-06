
import config from '.'

describe('test config', () => {
    test('api key undef',() => {
    expect(config.apiKey).toBe(undefined) 
    })

    test('api key defined',() => {
        let keyValue = 'test' 
        config.setKey(keyValue)
        expect(config.apiKey).not.toBe(undefined) 
        expect(config.apiKey).toBe(keyValue) 
    })

    test('set env',() => {
        config.setEnvironment(config.ENVIRONMENT_TYPES.SANDBOX)
        expect(config.environment).not.toBe(undefined) 
        expect(config.environment).toBe(config.ENVIRONMENT_TYPES.SANDBOX) 
    })

    test('get config',() => {
        expect(config.init({apiKey: '1234', environment: config.ENVIRONMENT_TYPES.SANDBOX})).not.toBe(undefined) 
        expect(config.init()).toHaveProperty('environment') 
        expect(config.init()).toHaveProperty('apiKey') 
    })
})
 
