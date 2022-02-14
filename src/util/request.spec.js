/* global jest, test: true, expect, beforeEach, afterEach, describe */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { request } from './request'
import connection from '../connection'

// enableFetchMocks()

describe('test request module', () => {
  beforeEach(() => {
    // fetch.resetMocks();
    // fetch.doMock()
    // fetch.mockResponse(JSON.stringify({ access_token: '12345' }))
    jest.setTimeout(10000)
    // mockAxios.get.mockImplementationOnce(() =>
    //   Promise.resolve({
    //     data: { results: ["cat.jpg"] }
    //   })
    // )
    const mock = new MockAdapter(axios)
    mock.onGet().reply(200, {
      users: [{ id: 1, name: 'John Smith' }]
    })
    mock.onPost().reply(200, {
      users: [{ id: 1, name: 'John Smith' }]
    })
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    // mockAxios.reset()
  })

  test('test no method', async () => {
    const conn = connection.init({ apiKey: '1234', accessKey: '4321' })

    const result = await request(conn, {}, {}, -1).catch((err) => err.message)
    // request(params, data, id)

    expect(result.includes('no method defined')).toBe(true)
  })

  test('test GET', async () => {
    const conn = connection.init({ apiKey: '1234', accessKey: '4321' })

    const params = {
      method: 'GET',
      endPoint: '/test'
    }
    const result = await request(conn, params, {}, -1).catch((err) => err.message)
    // request(params, data, id)

    // let responseObj = { data: 'server says hello!' }
    // mockAxios.mockResponse(responseObj)

    console.log('test GET result', result)
    // expect(mockAxios.get).toHaveBeenCalled()
    expect(result.config).toHaveProperty('headers')
    expect(result.config.headers['access-key']).toBe('4321')
  })

  test('test GET with id', async () => {
    const conn = connection.init({ apiKey: '1234', accessKey: '4321' })

    const params = {
      method: 'GET',
      endPoint: '/test',
      id: '0000'
    }
    const result = await (await request(conn, params, {}, -1).catch((err) => err.message))
    // request(params, data, id)

    console.log('result', result)
    expect(result.config).toHaveProperty('headers')
    expect(result.config.headers['access-key']).toBe('4321')
    expect(result.request.responseURL).toContain('/test/0000')
  })

  test('test POST', async () => {
    const conn = connection.init({ apiKey: '1234', accessKey: '4321' })

    const params = {
      method: 'POST',
      endPoint: '/test'
    }
    const result = await (await request(conn, params, { id: -99 }, -1).catch((err) => err.message))
    // request(params, data, id)

    console.log('result', result)
    expect(result.config).toHaveProperty('headers')
    expect(result.config.headers['access-key']).toBe('4321')
    expect(result.request.responseURL).toContain('/test')
    expect(result.config.data).toBe('{"id":-99}')
  })
})
