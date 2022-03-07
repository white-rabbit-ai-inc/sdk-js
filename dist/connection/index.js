"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const ENVIRONMENT_TYPES = Object.freeze({
  PRODUCTION: Symbol('PRODUCTION'),
  STAGING: Symbol('STAGING')
});
const requests = {};
requests[ENVIRONMENT_TYPES.PRODUCTION] = {
  url: 'https://api.whiterabbitintel.com'
};
requests[ENVIRONMENT_TYPES.STAGING] = {
  url: 'https://staging-api.whiterabbitintel.com'
};
/**
 * connection
 * @exports connection
 */

const connection = {
  ENVIRONMENT_TYPES: ENVIRONMENT_TYPES,
  requests: requests,
  environment: requests[ENVIRONMENT_TYPES.PRODUCTION],
  accessKey: null,
  apiKey: null,

  /**
  * init
  * set up initial connection params
  *
  * @param {object} params
  * @return {object} the initialized connection object
  */
  init: function (params) {
    if (params.environment) {
      this.environment = params.environment;
    }

    if (params && params.accessKey && params.apiKey) {
      this.accessKey = params.accessKey;
      this.apiKey = params.apiKey;
    }

    return this;
  }
};

const setEnvironment = function (env) {
  this.environment = requests[env];
};

connection.setEnvironment = setEnvironment;
var _default = connection;
exports.default = _default;