import { serializeType } from '../common';
import { TYPE } from '../constants';
export function serializeRegex(val) {
  return serializeType(TYPE.REGEX, val.source);
}
export function deserializeRegex(val) {
  // eslint-disable-next-line security/detect-non-literal-regexp
  return new RegExp(val);
}