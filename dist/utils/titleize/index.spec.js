"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('titleize', () => {
  it('should turn camelCased into Camel Cased', () => {
    expect((0, _index.default)('camelCased')).toEqual('Camel Cased');
  });
});