"use strict";

var _jestFetchMock = require("jest-fetch-mock");

var _ = _interopRequireDefault(require("./"));

var _connection = _interopRequireDefault(require("../connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jestFetchMock.enableFetchMocks)();
describe('test account errors', () => {
  // test('test getAccount returns error',async () => {
  //     expect(account.getAccount().message).toBe('error getting account') 
  //  })
  test('test getAccount', async () => {
    fetch.mockResponse(JSON.stringify({
      accounts: [{
        id: '1234',
        ownerId: '9087'
      }]
    }));

    const conn = _connection.default.init({
      apiKey: '1234'
    });

    let response = await _.default.getAccount(conn);
    console.log('response', response);
    let result = await response.json();
    expect(result).not.toBe(undefined);
    expect(result.accounts.length).toBe(1);
  }); //  test('test getAccounts returns error',() => {
  //      expect(account.getAccounts().message).toBe('error getting accounts') 
  //   })
  //   test('test createAccount returns error',() => {
  //      expect(account.createAccount().message).toBe('error creating account') 
  //   })
});