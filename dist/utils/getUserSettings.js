"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUserSettings;

function getUserSettings(storage) {
  const userSettings = Object.assign({}, JSON.parse(storage.getItem('reactPerfToolSettings')));
  return userSettings || {};
}