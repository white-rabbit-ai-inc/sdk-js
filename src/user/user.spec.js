/* global jest, test: true, expect, beforeEach, describe */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import user from './'
import connection from '../connection'

const mock = new MockAdapter(axios)

describe('test user errors', () => {
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
    mock.onGet().reply(200, {
      users: [
        {
          id: '1234',
          email: 'foo@bar.com'
        },
        {
          id: '4321',
          email: 'bar@foo.com'
        },
        {
          id: '5678',
          email: 'sna@foo.com'
        },
        {
          id: '8765',
          email: 'foo@sna.com'
        }

      ]
    })
    mock.onPost().reply(200, {
      users: [{ id: 1, name: 'John Smith' }]
    })
  })
  test('test getUsers', async () => {
    const conn = connection.init({ apiKey: '1234', accessKey: '4321' })
    const response = await user.getUsers(conn)

    console.log('response', response)
    expect(response.data.users).not.toBe(undefined)
    expect(response.data.users.length).toBe(4)
  })

  test('test getUser with email', async () => {
    mock.onGet().reply(200, {
      id: '1234',
      email: 'foo@bar.com'
    })

    const conn = connection.init({ apiKey: '1234', accessKey: '4321' })
    const response = await user.getUser(conn, undefined, 'foo@bar.com')
    expect(response.data.id).toBe('1234')
    expect(response.data.email).toBe('foo@bar.com')
  })

  test('test getUser with id', async () => {
    mock.onGet().reply(200, {
      id: '1111',
      email: 'foo@bar.com'
    })
    // fetch.mockResponse(
    //   (req) => {
    //     let syms = Object.getOwnPropertySymbols(req)
    //     syms.forEach((symbol) => {
    //       let obj = req[symbol]
    //       if (obj.parsedURL)
    //         req = obj
    //     })

    //     return new Promise(resolve => setTimeout(() => resolve(JSON.stringify({ req: req, response: mockResponse })), 100))
    //   }
    // )
    const conn = connection.init({ apiKey: '1234', accessKey: '4321' })
    const response = await user.getUser(conn, '1111')
    // const response = result.response

    console.log('response', response)
    expect(response.data.id).toBe('1111')
    expect(response.data.email).toBe('foo@bar.com')
    expect(response.request.responseURL).toContain('user?id=1111')
  })

  test('test getUser with no email or id', async () => {
    mock.onGet().reply(200, {
      id: '1234',
      email: 'foo@bar.com'
    })
    // fetch.mockResponse(JSON.stringify(mockResponse))
    const conn = connection.init({ apiKey: '1234', accessKey: '4321' })
    try {
      await user.getUser(conn)
    } catch (e) {
      expect(e.message).toBe('id or email required to fetch a user record')
    }
  })
})
