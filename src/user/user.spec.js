
import user from './'

describe('test user errors', () => {
    test('test getUsers', () => {
        expect(user.getUsers().message).toBe('error getting users for account')
    })

    test('test getUser', () => {
        expect(user.getUser().message).toBe('error getting user for id')
    })

    // test('test createUser', () => {
    //     expect(user.createUser().message).toBe('error creating user')
    // })
})