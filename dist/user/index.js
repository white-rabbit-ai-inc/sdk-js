"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = require("../util/request");

const user = {
  getUsers: async connection => {
    let result = {
      message: 'error getting users for account'
    };
    result = await (0, _request.request)(connection, {
      method: 'GET',
      endPoint: '/user'
    });
    return result;
  },
  getUser: async (connection, id, email) => {
    let result = {
      message: 'error getting user for id'
    };

    if (!email && !id) {
      throw new Error('id or email required to fetch a user record');
    }

    let queries = id ? {
      id: id
    } : {
      email: email
    };
    result = (0, _request.request)(connection, {
      method: 'GET',
      queries: queries,
      endPoint: '/user'
    });
    return result;
  }
};
var _default = user;
exports.default = _default;