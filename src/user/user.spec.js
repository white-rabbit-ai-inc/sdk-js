/* global test: true, expect, fetch, describe */

import { enableFetchMocks } from 'jest-fetch-mock'

import user from './'
import connection from '../connection'

enableFetchMocks()

describe('test user errors', () => {
  test('test getUsers', async () => {
    fetch.mockResponse(JSON.stringify({
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
    }))

    const conn = connection.init({ apiKey: '1234' })
    const response = await user.getUsers(conn)

    console.log('response', response)
    expect(response.users).not.toBe(undefined)
    expect(response.users.length).toBe(4)
  })

  test('test getUser with email', async () => {
    const mockResponse = {
      id: '1234',
      email: 'foo@bar.com'
    }
    fetch.mockResponse(JSON.stringify(mockResponse))
    const conn = connection.init({ apiKey: '1234' })
    const response = await user.getUser(conn, undefined, 'foo@bar.com')
    expect(response.id).toBe('1234')
    expect(response.email).toBe('foo@bar.com')
  })

  test('test getUser with id', async () => {
    const mockResponse = {
      id: '1111',
      email: 'foo@bar.com'
    }
    fetch.mockResponse(
      (req) => {
        const syms = Object.getOwnPropertySymbols(req)
        syms.forEach((symbol) => {
          const obj = req[symbol]
          if (obj.parsedURL) {
            req = obj
          }
        })

        return new Promise(resolve => setTimeout(() => resolve(JSON.stringify({ req: req, response: mockResponse })), 100))
      }
    )
    const conn = connection.init({ apiKey: '1234' })
    const result = await user.getUser(conn, '1111')
    const response = result.response

    // console.log(result)
    expect(response.id).toBe('1111')
    expect(response.email).toBe('foo@bar.com')
    expect(result.req.parsedURL.query).toBe('id=1111')
  })

  test('test getUser with no email or id', async () => {
   
    const mockResponse = {
      id: '1234',
      email: 'foo@bar.com'
    }
    fetch.mockResponse(JSON.stringify(mockResponse))
    const conn = connection.init({ apiKey: '1234' })
    try {
      await user.getUser(conn)
    } catch (e) {
      expect(e.message).toBe('id or email required to fetch a user record')
    }
  })
})
