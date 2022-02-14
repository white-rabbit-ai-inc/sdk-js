"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _axiosMockAdapter = _interopRequireDefault(require("axios-mock-adapter"));

var _ = _interopRequireDefault(require("./"));

var _connection = _interopRequireDefault(require("../connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test: true, expect, describe */
const mock = new _axiosMockAdapter.default(_axios.default);
describe('test account errors', () => {
  // test('test getAccount returns error',async () => {
  //     expect(account.getAccount().message).toBe('error getting account') 
  //  })
  test('test getAccount', async () => {
    mock.onGet().reply(200, {
      accounts: [{
        id: '1234',
        ownerId: '9087'
      }]
    });

    const conn = _connection.default.init({
      apiKey: '1234'
    });

    const result = await _.default.getAccount(conn);
    console.log('result', result); // const result = await response

    expect(result).not.toBe(undefined);
    expect(result.data.accounts.length).toBe(1);
  });
});