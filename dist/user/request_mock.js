"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;

function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(() => users[userID] ? resolve(users[userID]) : reject({
      error: 'User with ' + userID + ' not found.'
    }));
  });
}