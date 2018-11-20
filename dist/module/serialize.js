var _SERIALIZER;

import { TYPE } from './constants';
import { determineType, isSerializedType } from './common';
import { serializeFunction, serializeError, serializePromise, serializeRegex, serializeDate, serializeArray, serializeObject, serializeString, serializeNumber, serializeBoolean, serializeNull } from './serializers';
var SERIALIZER = (_SERIALIZER = {}, _SERIALIZER[TYPE.FUNCTION] = serializeFunction, _SERIALIZER[TYPE.ERROR] = serializeError, _SERIALIZER[TYPE.PROMISE] = serializePromise, _SERIALIZER[TYPE.REGEX] = serializeRegex, _SERIALIZER[TYPE.DATE] = serializeDate, _SERIALIZER[TYPE.ARRAY] = serializeArray, _SERIALIZER[TYPE.OBJECT] = serializeObject, _SERIALIZER[TYPE.STRING] = serializeString, _SERIALIZER[TYPE.NUMBER] = serializeNumber, _SERIALIZER[TYPE.BOOLEAN] = serializeBoolean, _SERIALIZER[TYPE.NULL] = serializeNull, _SERIALIZER); // $FlowFixMe

var defaultSerializers = {};
export function serialize(obj, serializers) {
  if (serializers === void 0) {
    serializers = defaultSerializers;
  }

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