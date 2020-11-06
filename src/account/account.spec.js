
import account from './'

describe('test account errors', () => {
    test('test getAccount returns error',() => {
        expect(account.getAccount().message).toBe('error getting account') 
     })
     
    //  test('test getAccounts returns error',() => {
    //      expect(account.getAccounts().message).toBe('error getting accounts') 
    //   })
      
    //   test('test createAccount returns error',() => {
    //      expect(account.createAccount().message).toBe('error creating account') 
    //   })
}) 
