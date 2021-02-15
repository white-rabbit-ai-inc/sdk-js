import { enableFetchMocks } from 'jest-fetch-mock'

import account from './'
import connection from '../connection'

enableFetchMocks()

describe('test account errors', () => {
    
    // test('test getAccount returns error',async () => {
    //     expect(account.getAccount().message).toBe('error getting account') 
    //  })
     
     test('test getAccount', async () => {
        fetch.mockResponse(JSON.stringify({
            accounts: [
                {
                    id: '1234',
                    ownerId: '9087'
                }

            ]
        }))

        const conn = connection.init({ apiKey: '1234' })
        let response = await account.getAccount(conn);
        console.log('response', response)
        let result  = await response.json()
        expect(result).not.toBe(undefined)
        expect(result.accounts.length).toBe(1)
    })

    //  test('test getAccounts returns error',() => {
    //      expect(account.getAccounts().message).toBe('error getting accounts') 
    //   })
      
    //   test('test createAccount returns error',() => {
    //      expect(account.createAccount().message).toBe('error creating account') 
    //   })
}) 
