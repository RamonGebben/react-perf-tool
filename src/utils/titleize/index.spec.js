import titleize from './index';

describe('titleize', () => {
  it('should turn camelCased into Camel Cased', () => {
    expect(titleize('camelCased')).toEqual('Camel Cased');
  });
});
