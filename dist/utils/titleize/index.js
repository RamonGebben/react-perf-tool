"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = titleize;

require("core-js/modules/es6.regexp.replace");

function titleize(str) {
  const result = str.replace(/([A-Z])/g, ' $1');
  return `${result.charAt(0).toUpperCase()}${result.slice(1)}`;
}