"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('test connection', () => {
  test('set env', () => {
    _.default.setEnvironment(_.default.ENVIRONMENT_TYPES.STAGING);

    expect(_.default.environment).not.toBe(undefined);
    expect(_.default.environment).toBe(_.default.requests[_.default.ENVIRONMENT_TYPES.STAGING]);
  });
  test('get connection', () => {
    expect(_.default.init({
      apiKey: '1234',
      environment: _.default.ENVIRONMENT_TYPES.STAGING
    })).not.toBe(undefined);
    expect(_.default.init()).toHaveProperty('environment');
  });
});