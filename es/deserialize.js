import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _DESERIALIZER;

import { TYPE } from './constants';
import { determineType, isSerializedType } from './common';
import { deserializeFunction, deserializeError, deserializePromise, deserializeRegex, deserializeDate, deserializeArray, deserializeObject, deserializeString, deserializeNumber, deserializeBoolean, deserializeNull } from './serializers';
// $FlowFixMe
var DESERIALIZER = (_DESERIALIZER = {}, _defineProperty(_DESERIALIZER, TYPE.FUNCTION, deserializeFunction), _defineProperty(_DESERIALIZER, TYPE.ERROR, deserializeError), _defineProperty(_DESERIALIZER, TYPE.PROMISE, deserializePromise), _defineProperty(_DESERIALIZER, TYPE.REGEX, deserializeRegex), _defineProperty(_DESERIALIZER, TYPE.DATE, deserializeDate), _defineProperty(_DESERIALIZER, TYPE.ARRAY, deserializeArray), _defineProperty(_DESERIALIZER, TYPE.OBJECT, deserializeObject), _defineProperty(_DESERIALIZER, TYPE.STRING, deserializeString), _defineProperty(_DESERIALIZER, TYPE.NUMBER, deserializeNumber), _defineProperty(_DESERIALIZER, TYPE.BOOLEAN, deserializeBoolean), _defineProperty(_DESERIALIZER, TYPE.NULL, deserializeNull), _DESERIALIZER); // $FlowFixMe

var defaultDeserializers = {};
export function deserialize(str) {
  var deserializers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDeserializers;

  if (str === TYPE.UNDEFINED) {
    // $FlowFixMe
    return;
  }

  function replacer(key, val) {
    if (isSerializedType(this)) {
      return val;
    }

    var type;
    var value;

    if (isSerializedType(val)) {
      type = val.__type__;
      value = val.__val__;
    } else {
      type = determineType(val);
      value = val;
    }

    if (!type) {
      return value;
    } // $FlowFixMe


    var deserializer = deserializers[type] || DESERIALIZER[type];

    if (!deserializer) {
      return value;
    }

    return deserializer(value, key);
  }

  return JSON.parse(str, replacer);
}