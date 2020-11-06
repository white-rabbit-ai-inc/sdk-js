
import processing from './'

describe('test processing errors', () => {
    test('test getProcessingTypes', () => {
        expect(processing.getProcessingTypes()).not.toBe(undefined)
    })

    test('test request', () => {
        expect(processing.request().message).toBe('error requesting processing')
    })
})