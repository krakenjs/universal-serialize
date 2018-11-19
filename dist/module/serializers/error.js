import { TYPE } from '../constants';
export function serializeError(val) {
  return {
    __type__: TYPE.ERROR,
    __message__: val.message,
    __stack__: val.stack,
    // $FlowFixMe
    __code__: val.code
  };
}
export function deserializeError(_ref) {
  var __message__ = _ref.__message__,
      __code__ = _ref.__code__,
      __stack__ = _ref.__stack__;
  var error = new Error(__message__); // $FlowFixMe

  error.code = __code__;
  error.stack = __stack__ + "\n\n" + error.stack;
  return error;
}