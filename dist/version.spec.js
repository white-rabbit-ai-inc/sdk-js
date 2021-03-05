"use strict";

var _version = _interopRequireDefault(require("./version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('version exists', () => {
  expect(_version.default).not.toBe(undefined);
});