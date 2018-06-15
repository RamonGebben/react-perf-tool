"use strict";

var _index = _interopRequireDefault(require("./index"));

var _getUserSettings = _interopRequireDefault(require("../getUserSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('setUserSettings', () => {
  it('should return return a settings object from mock storage', () => {
    const localStorage = {
      storage: {},

      setItem(name, value) {
        this.storage[name] = value;
        return this.storage[name];
      },

      getItem(name) {
        return this.storage[name];
      }

    };
    (0, _index.default)({
      setting: 'setting'
    }, localStorage);
    expect((0, _getUserSettings.default)(localStorage)).toEqual({
      setting: 'setting'
    });
  });
});