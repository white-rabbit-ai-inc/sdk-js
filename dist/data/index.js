"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _request = require("../util/request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global fetch: true */
if (!fetch) {
  fetch = _nodeFetch.default;
}
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
      const url = await response.json();
      console.log('url', new URL(url.uploadUrl));
      const result = await fetch(url.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-length': params.contentLength,
          ContentType: params.contentType
        },
        body: stream // Here, stringContent or bufferContent would also work

      });
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