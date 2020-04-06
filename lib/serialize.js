"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serialize = serialize;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _constants = require("./constants");

var _common = require("./common");

var _serializers = require("./serializers");

var _SERIALIZER;

var SERIALIZER = (_SERIALIZER = {}, (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.FUNCTION, _serializers.serializeFunction), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.ERROR, _serializers.serializeError), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.PROMISE, _serializers.serializePromise), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.REGEX, _serializers.serializeRegex), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.DATE, _serializers.serializeDate), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.ARRAY, _serializers.serializeArray), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.OBJECT, _serializers.serializeObject), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.STRING, _serializers.serializeString), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.NUMBER, _serializers.serializeNumber), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.BOOLEAN, _serializers.serializeBoolean), (0, _defineProperty2.default)(_SERIALIZER, _constants.TYPE.NULL, _serializers.serializeNull), _SERIALIZER); // $FlowFixMe

var defaultSerializers = {};

function serialize(obj) {
  var serializers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSerializers;

  function replacer(key) {
    var val = this[key];

    if ((0, _common.isSerializedType)(this)) {
      return val;
    }

    var type = (0, _common.determineType)(val);

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
    return _constants.TYPE.UNDEFINED;
  }

  return result;
}