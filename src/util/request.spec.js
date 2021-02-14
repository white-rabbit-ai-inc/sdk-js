import { enableFetchMocks } from 'jest-fetch-mock'
import request from './request'
import config from '../config'

enableFetchMocks()

const mockFunc = async () => {

}



describe('test request module', () => {
    beforeEach(() => {
        //fetch.resetMocks();
        fetch.doMock()
        fetch.mockResponse(JSON.stringify({ access_token: '12345' }))
    });

    test('test no key', async () => {
        const connection = config.init()
        let result = await request(connection, {}, {}, -1).catch((err) => err.message);
        // request(params, data, id)

        console.log(result)

        expect(result.includes('no apiKey set')).toBe(true)
    })

    test('test no method', async () => {

        const connection = config.init({ apiKey: '1234' })

        let result = await request(connection, {}, {}, -1).catch((err) => err.message);
        // request(params, data, id)
        
        expect(result.includes('no method defined')).toBe(true)
    })

    test('test GET', async () => {
        const connection = config.init({ apiKey: '1234' })

        const params = {
            method: 'GET',
            endPoint: '/test'
        }
        let result = await request(connection, params, {}, -1).catch((err) => err.message);
        // request(params, data, id)

        // console.log('test GET result', result)
        expect(result).toHaveProperty('access_token')
        expect(result.access_token).toBe('12345')
    })

    test('test GET with id', async () => {
        const connection = config.init({ apiKey: '1234' })

        const params = {
            method: 'GET',
            endPoint: '/test',
            id: '0000'
        }
        let result = await request(connection, params, {}, -1).catch((err) => err.message);
        // request(params, data, id)

        // console.log('result', result)
        expect(result).toHaveProperty('access_token')
        expect(result.access_token).toBe('12345')
    })

    test('test POST', async () => {
        const connection = config.init({ apiKey: '1234' })

        const params = {
            method: 'POST',
            endPoint: '/test'
        }
        let result = await request(connection, params, { id: -99 }, -1).catch((err) => err.message);
        // request(params, data, id)

        // console.log('result', result)
        expect(result).toHaveProperty('access_token')
        expect(result.access_token).toBe('12345')
    })
})
