import { TYPE } from '../constants';
export function serializeRegex(val) {
  return {
    __type__: TYPE.REGEX,
    __source__: val.source
  };
}
export function deserializeRegex(_ref) {
  var __source__ = _ref.__source__;
  // eslint-disable-next-line security/detect-non-literal-regexp
  return new RegExp(__source__);
}