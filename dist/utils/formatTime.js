"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatTime;

require("core-js/modules/es6.regexp.split");

function formatTime(time) {
  return new Date(time).toTimeString().split(' ')[0];
}