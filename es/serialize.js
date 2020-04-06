import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _SERIALIZER;

import { TYPE } from './constants';
import { determineType, isSerializedType } from './common';
import { serializeFunction, serializeError, serializePromise, serializeRegex, serializeDate, serializeArray, serializeObject, serializeString, serializeNumber, serializeBoolean, serializeNull } from './serializers';
var SERIALIZER = (_SERIALIZER = {}, _defineProperty(_SERIALIZER, TYPE.FUNCTION, serializeFunction), _defineProperty(_SERIALIZER, TYPE.ERROR, serializeError), _defineProperty(_SERIALIZER, TYPE.PROMISE, serializePromise), _defineProperty(_SERIALIZER, TYPE.REGEX, serializeRegex), _defineProperty(_SERIALIZER, TYPE.DATE, serializeDate), _defineProperty(_SERIALIZER, TYPE.ARRAY, serializeArray), _defineProperty(_SERIALIZER, TYPE.OBJECT, serializeObject), _defineProperty(_SERIALIZER, TYPE.STRING, serializeString), _defineProperty(_SERIALIZER, TYPE.NUMBER, serializeNumber), _defineProperty(_SERIALIZER, TYPE.BOOLEAN, serializeBoolean), _defineProperty(_SERIALIZER, TYPE.NULL, serializeNull), _SERIALIZER); // $FlowFixMe

var defaultSerializers = {};
export function serialize(obj) {
  var serializers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSerializers;

  function replacer(key) {
    var val = this[key];

    if (isSerializedType(this)) {
      return val;
    }

    var type = determineType(val);

    if (!type) {
      return val;
    } // $FlowFixMe


    var serializer = serializers[type] || SERIALIZER[type];

    if (!serializer) {
      return val;
    }

    return serializer(val, key);
  }

  var result = JSON.stringify(obj, replacer);

  if (typeof result === 'undefined') {
    return TYPE.UNDEFINED;
  }

  return result;
}