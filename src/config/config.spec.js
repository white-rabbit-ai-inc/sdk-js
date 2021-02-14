
import config, { requests } from '.'

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
        config.setEnvironment(config.ENVIRONMENT_TYPES.STAGING)
        expect(config.environment).not.toBe(undefined) 
        expect(config.environment).toBe(config.requests[config.ENVIRONMENT_TYPES.STAGING]) 
    })

    test('get config',() => {
        expect(config.init({apiKey: '1234', environment: config.ENVIRONMENT_TYPES.STAGING})).not.toBe(undefined) 
        expect(config.init()).toHaveProperty('environment') 
        expect(config.init()).toHaveProperty('apiKey') 
    })
})
 
