
import {account, connection, data, processing, user, version } from './'

describe('test base has each object defined', () => {
    test('account not undef', () => {
        expect(account).not.toBe(undefined)
    })

    test('connection not undef', () => {
        expect(connection).not.toBe(undefined)
    })

    test('data not undef', () => {
        expect(data).not.toBe(undefined)
    })

    test('processing not undef', () => {
        expect(processing).not.toBe(undefined)
    })

    test('user not undef', () => {
        expect(user).not.toBe(undefined)
    })

    test('version not undef', () => {
        expect(version).not.toBe(undefined)
    })
})
