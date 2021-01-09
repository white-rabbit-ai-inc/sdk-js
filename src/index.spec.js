
import base from './'

describe('test base has each object defined', () => {
    test('account not undef', () => {
        expect(base.account).not.toBe(undefined)
    })

    test('config not undef', () => {
        expect(base.config).not.toBe(undefined)
    })

    test('data not undef', () => {
        expect(base.data).not.toBe(undefined)
    })

    test('processing not undef', () => {
        expect(base.processing).not.toBe(undefined)
    })

    test('user not undef', () => {
        expect(base.user).not.toBe(undefined)
    })

    test('version not undef', () => {
        expect(base.version).not.toBe(undefined)
    })
})
