"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUserSettings;

function getUserSettings(storage) {
  try {
    const result = JSON.parse(storage.getItem('reactPerfToolSettings'));
    return Object.assign({}, result);
  } catch (_) {
    return {};
  }
}