"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getUserSettings', () => {
  it('should return return an empty object from mock storage', () => {
    const localStorage = {
      getItem(name) {
        return '{}';
      }

    };
    expect((0, _index.default)(localStorage)).toEqual({});
  });
  it('should return return an empty object when no value in storage ', () => {
    const localStorage = {
      getItem(name) {
        return undefined;
      }

    };
    expect((0, _index.default)(localStorage)).toEqual({});
  });
});