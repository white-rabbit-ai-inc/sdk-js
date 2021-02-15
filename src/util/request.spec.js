import { enableFetchMocks } from 'jest-fetch-mock'
import { request } from './request'
import connection from '../connection'

enableFetchMocks()

const mockFunc = async () => {

}


describe('test request module', () => {
    beforeEach(() => {
        //fetch.resetMocks();
        fetch.doMock()
        fetch.mockResponse(JSON.stringify({ access_token: '12345' }))
    });


    test('test no method', async () => {

        const conn = connection.init({ apiKey: '1234' })

        let result = await request(conn, {}, {}, -1).catch((err) => err.message);
        // request(params, data, id)
        
        expect(result.includes('no method defined')).toBe(true)
    })

    test('test GET', async () => {
        const conn = connection.init({ apiKey: '1234' })

        const params = {
            method: 'GET',
            endPoint: '/test'
        }
        let result = await(await request(conn, params, {}, -1).catch((err) => err.message)).json();
        // request(params, data, id)

        // console.log('test GET result', result)
        expect(result).toHaveProperty('access_token')
        expect(result.access_token).toBe('12345')
    })

    test('test GET with id', async () => {
        const conn = connection.init({ apiKey: '1234' })

        const params = {
            method: 'GET',
            endPoint: '/test',
            id: '0000'
        }
        let result = await(await request(conn, params, {}, -1).catch((err) => err.message)).json();
        // request(params, data, id)

        // console.log('result', result)
        expect(result).toHaveProperty('access_token')
        expect(result.access_token).toBe('12345')
    })

    test('test POST', async () => {
        const conn = connection.init({ apiKey: '1234' })

        const params = {
            method: 'POST',
            endPoint: '/test'
        }
        let result = await(await request(conn, params, { id: -99 }, -1).catch((err) => err.message)).json();
        // request(params, data, id)

        // console.log('result', result)
        expect(result).toHaveProperty('access_token')
        expect(result.access_token).toBe('12345')
    })
})
