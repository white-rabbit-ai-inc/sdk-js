"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = require("../util/request");

// /**
//  * account
//  * @exports account
//  */
const account = {
  // /**
  //  * get account
  //  *
  //  * @param {object} connection
  //  * @return {string} The account associated with the apiKey used.
  //  */
  getAccount: async connection => {
    let result = {
      message: 'error getting account'
    };
    result = await (0, _request.request)(connection, {
      method: 'GET',
      endPoint: '/account'
    });
    return result;
  }
};
var _default = account;
exports.default = _default;