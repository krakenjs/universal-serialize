"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserialize = deserialize;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _constants = require("./constants");

var _common = require("./common");

var _serializers = require("./serializers");

var _DESERIALIZER;

// $FlowFixMe
var DESERIALIZER = (_DESERIALIZER = {}, (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.FUNCTION, _serializers.deserializeFunction), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.ERROR, _serializers.deserializeError), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.PROMISE, _serializers.deserializePromise), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.REGEX, _serializers.deserializeRegex), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.DATE, _serializers.deserializeDate), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.ARRAY, _serializers.deserializeArray), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.OBJECT, _serializers.deserializeObject), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.STRING, _serializers.deserializeString), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.NUMBER, _serializers.deserializeNumber), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.BOOLEAN, _serializers.deserializeBoolean), (0, _defineProperty2.default)(_DESERIALIZER, _constants.TYPE.NULL, _serializers.deserializeNull), _DESERIALIZER); // $FlowFixMe

var defaultDeserializers = {};

function deserialize(str) {
  var deserializers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDeserializers;

  if (str === _constants.TYPE.UNDEFINED) {
    // $FlowFixMe
    return;
  }

  function replacer(key, val) {
    if ((0, _common.isSerializedType)(this)) {
      return val;
    }

    var type;
    var value;

    if ((0, _common.isSerializedType)(val)) {
      type = val.__type__;
      value = val.__val__;
    } else {
      type = (0, _common.determineType)(val);
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