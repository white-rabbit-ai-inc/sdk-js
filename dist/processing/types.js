"use strict";

var _connection = _interopRequireDefault(require("../connection"));

var _request = require("../util/request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let types = {};

const getType = async type => {
  let keys = Object.keys(types);

  if (keys.length === 0) {
    types = await getTypes();
    keys = Object.keys(types);
  }

  if (!keys.includes(type)) {
    throw new Error('Invalid Processing Type');
  }

  return types[type];
};

const getTypes = async () => {
  const keys = Object.keys(types);

  if (keys.length === 0) {
    const conn = _connection.default.init(); // query for types and return result


    const response = await (0, _request.request)(conn, {
      method: 'GET',
      endPoint: '/processing?types'
    });
    const result = await response.json();
    types = result.types;
  }

  return types;
};

module.exports = {
  types: types,
  getType: getType
};