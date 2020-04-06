"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeRegex = serializeRegex;
exports.deserializeRegex = deserializeRegex;

var _common = require("../common");

var _constants = require("../constants");

function serializeRegex(val) {
  return (0, _common.serializeType)(_constants.TYPE.REGEX, val.source);
}

function deserializeRegex(val) {
  // eslint-disable-next-line security/detect-non-literal-regexp
  return new RegExp(val);
}