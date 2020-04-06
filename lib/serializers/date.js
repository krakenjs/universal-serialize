"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeDate = serializeDate;
exports.deserializeDate = deserializeDate;

var _common = require("../common");

var _constants = require("../constants");

function serializeDate(val) {
  return (0, _common.serializeType)(_constants.TYPE.DATE, val.toJSON());
}

function deserializeDate(val) {
  return new Date(val);
}