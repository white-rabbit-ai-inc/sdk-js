"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonschema = _interopRequireDefault(require("jsonschema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateData = (schema, data) => {
  // console.log('validate data')
  let validator = new _jsonschema.default.Validator();
  let validateResult = validator.validate(data, schema); // console.log(validateResult);

  if (validateResult.errors.length !== 0) {
    console.error(`validation errors exist:\n${validateResult}`);
  }

  return validateResult.errors.length === 0;
};

var _default = validateData;
exports.default = _default;