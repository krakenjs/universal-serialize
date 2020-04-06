"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeError = serializeError;
exports.deserializeError = deserializeError;

var _common = require("../common");

var _constants = require("../constants");

// $FlowFixMe
function serializeError(_ref) {
  var message = _ref.message,
      stack = _ref.stack,
      code = _ref.code;
  return (0, _common.serializeType)(_constants.TYPE.ERROR, {
    message: message,
    stack: stack,
    code: code
  });
}

function deserializeError(_ref2) {
  var message = _ref2.message,
      stack = _ref2.stack,
      code = _ref2.code;
  var error = new Error(message); // $FlowFixMe

  error.code = code;
  error.stack = "".concat(stack, "\n\n").concat(error.stack);
  return error;
}