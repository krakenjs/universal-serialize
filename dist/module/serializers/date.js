import { TYPE } from '../constants';
export function serializeDate(val) {
  return {
    __type__: TYPE.DATE,
    __date__: val.toJSON()
  };
}
export function deserializeDate(_ref) {
  var __date__ = _ref.__date__;
  return new Date(__date__);
}