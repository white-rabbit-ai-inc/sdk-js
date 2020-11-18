import { enableFetchMocks } from 'jest-fetch-mock'

import account from './'
import config from '../config'

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

        const connection = config.init({ apiKey: '1234' })
        let response = await account.getAccount(connection);
        console.log('response', response)
        expect(response.accounts).not.toBe(undefined)
        expect(response.accounts.length).toBe(1)
    })

    //  test('test getAccounts returns error',() => {
    //      expect(account.getAccounts().message).toBe('error getting accounts') 
    //   })
      
    //   test('test createAccount returns error',() => {
    //      expect(account.createAccount().message).toBe('error creating account') 
    //   })
}) 
