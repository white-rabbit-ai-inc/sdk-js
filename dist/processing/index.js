"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = _interopRequireDefault(require("./types"));

var _request = require("../util/request");

var _validator = _interopRequireDefault(require("../util/validator"));

var _processingRequest = _interopRequireDefault(require("../../schema/processingRequest.json"));

var _profile = _interopRequireDefault(require("../../schema/profile.json"));

var _match = _interopRequireDefault(require("../../schema/match.json"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global fetch: true */
if (!fetch) {
  fetch = _nodeFetch.default;
}

const schema = Object.freeze({
  'profile.json': _profile.default,
  'match.json': _match.default
});
/**
 * processing
 * @exports processing
 */

const processing = {
  /**
   * init
   * set up initial connection params
   *
   * @param {string} typeName
   * @return {object} the initialized connection object
   */
  getType: typeName => {
    return _types.default.getType(typeName);
  },

  /**
   * request
   * send a request for processing
   *
   * @param {object} connection {@connection}
   * @param {object} type
   * @param {object} data
   * @return {object} the initialized connection object
   */
  request: async (connection, type, data) => {
    if (!type) {
      throw new Error('request type is required');
    }

    if (!data) {
      throw new Error('no payload found - request parameters required to process data');
    } // const results = {
    //   message: 'error requesting processing'
    // }


    if (!data.processingType) {
      data.processingType = type.name;
    }

    if (!(await (0, _validator.default)(_processingRequest.default, data))) {
      return JSON.stringify({
        message: 'the data provided does not meet minimum requirements'
      });
    }

    const typeSchema = schema[type.schema];

    if (!(await (0, _validator.default)(typeSchema, data))) {
      const msg = `the data provided does not meet requirements for a ${type.name} request`;
      return `{ 'message' : ${msg} }`;
    }

    try {
      const params = {
        method: 'POST',
        endPoint: type.url
      };
      const requestResult = await (0, _request.request)(connection, params, data);
      const result = await requestResult; // console.log(JSON.stringify(result))
      // let id = await result.id

      if (requestResult.status !== 200) {
        // console.log(result)
        return result;
      }

      return result.id;
    } catch (e) {
      console.error('error', JSON.stringify(e));
      throw e;
    }
  },

  /**
   * getResults
   * get results of a processing request
   *
   * @param {object} connection
   * @param {object} type
   * @param {string} requestId
   * @return {object} the initialized connection object
   */
  getResults: async (connection, type, requestId) => {
    let results = {
      message: 'error requesting processing'
    }; // let queries = {
    //     type: type.name
    // }

    results = await (0, _request.request)(connection, {
      method: 'GET',
      id: requestId,
      endPoint: type.url
    });
    return results;
  }
};
var _default = processing;
exports.default = _default;