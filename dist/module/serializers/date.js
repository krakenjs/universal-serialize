import { serializeType } from '../common';
import { TYPE } from '../constants';
export function serializeDate(val) {
  return serializeType(TYPE.DATE, val.toJSON());
}
export function deserializeDate(val) {
  return new Date(val);
}