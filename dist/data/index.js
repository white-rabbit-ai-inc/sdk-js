"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _request = require("../util/request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global fetch: true */

/**
 * data module
 * @exports data
 */
const data = {
  /**
   * Blend two colors together.
   * @param {string} connection - A connection object.
   * @param {string} params - The second color, in hexadecimal format.
   * @param {string} stream - a NodeJS file stream
   * @return {string} The blended color.
   */
  upload: async (connection, params, stream) => {
    try {
      const response = await (0, _request.request)(connection, {
        method: 'GET',
        endPoint: '/processing/url'
      });
      const url = await response;
      console.log('url', new URL(url.uploadUrl));
      const result = await (0, _isomorphicFetch.default)(url.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-length': params.contentLength,
          ContentType: params.contentType
        },
        body: stream // Here, stringContent or bufferContent would also work

      }); // const config = {
      //   headers: {
      //     'Content-length': params.contentLength,
      //     ContentType: params.contentType
      //   }
      // }
      // const result = await axios.put(url.uploadUrl, stream, config)
      // const config = {
      //   headers: {
      //     'Content-length': params.contentLength,
      //     ContentType: params.contentType
      //   }
      // }
      // const result = await axios.put(url.uploadUrl, stream, config)

      console.log('uploadStream results', result);
      const responseUrl = new URL(result.url);
      console.log('url', responseUrl.pathname.replace('/uploads/', ''));
      const uuid = responseUrl.pathname.replace('/uploads/', '');
      return uuid;
    } catch (e) {
      console.error(`Error! ${e.message}`);
    }
  }
};
var _default = data;
exports.default = _default;