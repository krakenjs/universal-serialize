import { serializeType } from '../common';
import { TYPE } from '../constants';
// $FlowFixMe
export function serializeError(_ref) {
  var message = _ref.message,
      stack = _ref.stack,
      code = _ref.code;
  return serializeType(TYPE.ERROR, {
    message: message,
    stack: stack,
    code: code
  });
}
export function deserializeError(_ref2) {
  var message = _ref2.message,
      stack = _ref2.stack,
      code = _ref2.code;
  var error = new Error(message); // $FlowFixMe

  error.code = code;
  error.stack = "".concat(stack, "\n\n").concat(error.stack);
  return error;
}