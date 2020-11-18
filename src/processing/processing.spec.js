import { enableFetchMocks } from 'jest-fetch-mock'

import processing from './'
import types from './types'
import config from '../config'

enableFetchMocks()

describe('test processing errors', () => {
    test('test getProcessingTypes', () => {
        expect(processing.getProcessingTypes()).not.toBe(undefined)
    })

    test('test request - no type (Error expected)', async () => {
        try {
            let result = await processing.request()
            console.log('result', result)
        }
        catch (e) {
            expect(e.message).toBe('request type is required')
        }
        // expect(processing.request().message).toBe('error requesting processing')
    })

    test('test request - no data (Error expected)', async () => {
        try {
            const connection = config.init({ apiKey: '1234' })
            let result = await processing.request(connection, types.PROCESSING_TYPES.PROFILE)
        }
        catch (e) {
            expect(e.message).toBe('data or dataId required to process data')
        }
        // expect(processing.request().message).toBe('error requesting processing')
    })

    test('test request', async () => {
        let mockResponse = {
            id: '1234',
            data: ['this is test data']
        }
        fetch.mockResponse(JSON.stringify(mockResponse))


        const connection = config.init({ apiKey: '1234' })
        let result = await processing.request(connection, types.PROCESSING_TYPES.PROFILE, { userId: '9896' }, ['this is test data'])
        console.log('result', result)

        expect(result.data).not.toBe(undefined)
        expect(result.data.length).toBe(1)
        expect(result.data[0]).toBe('this is test data')
    })

    test('test get result', async () => {
        let mockResponse = {
            id: '1234',
            data: ['this is response data']
        }
        fetch.mockResponse(JSON.stringify(mockResponse))


        const connection = config.init({ apiKey: '1234' })
        let result = await processing.getResults(connection, types.PROCESSING_TYPES.PROFILE, { requestId: '1234' })
        console.log('result', result)

        expect(result.data).not.toBe(undefined)
        expect(result.data.length).toBe(1)
        expect(result.data[0]).toBe('this is response data')
    })

    test('test url get', async () => {
        let mockResponse = {
            id: '1234',
            data: ['this is response data']
        }
        fetch.mockResponse(
            (req) => {
                let syms = Object.getOwnPropertySymbols(req)
                syms.forEach((symbol) => {
                    let obj = req[symbol]
                    if (obj.parsedURL)
                        req = obj
                })

                return new Promise(resolve => setTimeout(() => resolve(JSON.stringify({ req: req, response: mockResponse })), 100))
            })
        const connection = config.init({ apiKey: '1234' })
        let result = await processing.getResults(connection, types.PROCESSING_TYPES.PROFILE, '1234')
        console.log(result)
    })

    test('test url post', async () => {
        let mockResponse = {
            id: '1234',
            data: ['this is test data']
        }
        fetch.mockResponse(
            (req) => {
                let syms = Object.getOwnPropertySymbols(req)
                syms.forEach((symbol) => {
                    let obj = req[symbol]
                    if (obj.parsedURL)
                        req = obj
                })

                return new Promise(resolve => setTimeout(() => resolve(JSON.stringify({ req: req, response: mockResponse })), 100))
            })
        const connection = config.init({ apiKey: '1234' })
        let result = await processing.request(connection, types.PROCESSING_TYPES.PROFILE, { userId: '9896' }, ['this is test data'])
        console.log('result', result)
    })
})