/* global test: true, expect, describe */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import account from './'
import connection from '../connection'

const mock = new MockAdapter(axios)
describe('test account errors', () => {

  // test('test getAccount returns error',async () => {
  //     expect(account.getAccount().message).toBe('error getting account') 
  //  })

  test('test getAccount', async () => {
    mock.onGet().reply(200, {
      accounts: [
        {
          id: '1234',
          ownerId: '9087'
        }

      ]
    })

    const conn = connection.init({ apiKey: '1234' })
    const result = await account.getAccount(conn)
    console.log('result', result)
    // const result = await response
    expect(result).not.toBe(undefined)
    expect(result.data.accounts.length).toBe(1)
  })
})
