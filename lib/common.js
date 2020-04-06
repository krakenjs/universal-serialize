"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSerializedType = isSerializedType;
exports.determineType = determineType;
exports.serializeType = serializeType;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/typeof"));

var _constants = require("./constants");

function isSerializedType(item) {
  return (0, _typeof2.default)(item) === 'object' && item !== null && typeof item.__type__ === 'string';
}

function determineType(val) {
  if (typeof val === 'undefined') {
    return _constants.TYPE.UNDEFINED;
  }

  if (val === null) {
    return _constants.TYPE.NULL;
  }

  if (Array.isArray(val)) {
    return _constants.TYPE.ARRAY;
  }

  if (typeof val === 'function') {
    return _constants.TYPE.FUNCTION;
  }

  if ((0, _typeof2.default)(val) === 'object') {
    if (val instanceof Error) {
      return _constants.TYPE.ERROR;
    }

    if (typeof val.then === 'function') {
      return _constants.TYPE.PROMISE;
    }

    if (Object.prototype.toString.call(val) === '[object RegExp]') {
      return _constants.TYPE.REGEX;
    }

    if (Object.prototype.toString.call(val) === '[object Date]') {
      return _constants.TYPE.DATE;
    }

    return _constants.TYPE.OBJECT;
  }

  if (typeof val === 'string') {
    return _constants.TYPE.STRING;
  }

  if (typeof val === 'number') {
    return _constants.TYPE.NUMBER;
  }

  if (typeof val === 'boolean') {
    return _constants.TYPE.BOOLEAN;
  }
}

function serializeType(type, val) {
  return {
    __type__: type,
    __val__: val
  };
}