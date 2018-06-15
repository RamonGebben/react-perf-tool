"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUserSettings;

function setUserSettings(settings, storage) {
  return storage.setItem('reactPerfToolSettings', JSON.stringify(settings));
}