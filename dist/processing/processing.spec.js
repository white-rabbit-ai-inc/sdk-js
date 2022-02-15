"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));

var _ = _interopRequireDefault(require("./"));

var _connection = _interopRequireDefault(require("../connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test: true, expect, describe, fetch */
// import types from './types'
const mock = new _axiosMockAdapter.default(_axios.default);
describe('test processing errors', () => {
  test('test request - no type (Error expected)', async () => {
    try {
      const result = await _.default.request();
      console.log('result', result);
    } catch (e) {
      expect(e.message).toBe('request type is required');
    } // expect(processing.request().message).toBe('error requesting processing')

  });
  test('test request - no data (Error expected)', async () => {
    try {
      const conn = _connection.default.init({
        apiKey: '1234'
      });

      const result = await _.default.request(conn, 'PROFILE');
    } catch (e) {
      expect(e.message).toBe('no payload found - request parameters required to process data');
    } // expect(processing.request().message).toBe('error requesting processing')

  });
  test('test request - invalid payload', async () => {
    mock.onGet().reply(200, {
      id: '1234',
      data: ['this is test data']
    }); // fetch.mockResponse(JSON.stringify(mockResponse))

    const conn = _connection.default.init({
      apiKey: '1234'
    });

    const result = await _.default.request(conn, 'PROFILE', {
      userId: '9896'
    }, ['this is test data']);
    console.log('result', result);
    expect(JSON.parse(result).message).toBe('the data provided does not meet minimum requirements');
  });
  test('test get result', async () => {
    const mockResponse = {
      id: '1234',
      data: ['this is response data']
    };
    fetch.mockResponse(JSON.stringify(mockResponse));

    const conn = _connection.default.init({
      apiKey: '1234'
    });

    const result = await _.default.getResults(conn, 'PROFILE', {
      requestId: '1234'
    });
    console.log('result', result);
    expect(result.data).not.toBe(undefined);
    expect(result.data.length).toBe(1);
    expect(result.data[0]).toBe('this is response data');
  });
  test('test url post', async () => {
    mock.onPost().reply(200, {
      id: '1234',
      data: ['this is test data']
    }); // fetch.mockResponse(
    //   (req) => {
    //     let syms = Object.getOwnPropertySymbols(req)
    //     syms.forEach((symbol) => {
    //       let obj = req[symbol]
    //       if (obj.parsedURL)
    //         req = obj
    //     })
    //   return new Promise(resolve => setTimeout(() => resolve(JSON.stringify({ req: req, response: mockResponse })), 100))
    // })

    const conn = _connection.default.init({
      apiKey: '1234'
    });

    const result = await _.default.request(conn, 'PROFILE', {
      userId: '9896'
    }, ['this is test data']);
    console.log('result', result);
  });
});