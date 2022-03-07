"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('test connection', () => {
  test('set env', () => {
    _.default.setEnvironment(_.default.ENVIRONMENT_TYPES.STAGING);

    expect(_.default.environment).not.toBe(undefined);
    expect(_.default.environment).toBe(_.default.requests[_.default.ENVIRONMENT_TYPES.STAGING]);
  });
  test('get connection with env param', () => {
    expect(_.default.init({
      apiKey: '1234',
      environment: _.default.ENVIRONMENT_TYPES.STAGING
    })).not.toBe(undefined);
    expect(_.default.init()).toHaveProperty('environment');
    expect(_.default.environment).toBe(_.default.requests[_.default.ENVIRONMENT_TYPES.STAGING]);
  });
  test('get connection', () => {
    const conn = _.default.init({
      apiKey: '1234'
    });

    expect(conn).not.toBe(undefined);
    expect(conn).toHaveProperty('environment');
    console.log(conn.environment);
    console.log(_.default.requests[_.default.ENVIRONMENT_TYPES.PRODUCTION]);
    expect(conn.environment).toBe(_.default.requests[_.default.ENVIRONMENT_TYPES.PRODUCTION]);
  });
});