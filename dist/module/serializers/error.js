import { serializeType } from '../common';
import { TYPE } from '../constants';
import { serializeObject } from './object';
// $FlowFixMe
export function serializeError(_ref) {
  var message = _ref.message,
      stack = _ref.stack,
      code = _ref.code,
      data = _ref.data;
  return serializeType(TYPE.ERROR, {
    message: message,
    stack: stack,
    code: code,
    data: data
  });
}
export function deserializeError(_ref2) {
  var message = _ref2.message,
      stack = _ref2.stack,
      code = _ref2.code,
      data = _ref2.data;
  var error = new Error(message); // $FlowFixMe

  error.code = code;

  if (data) {
    // $FlowFixMe
    error.data = serializeObject(data);
  }

  error.stack = stack + "\n\n" + error.stack;
  return error;
}