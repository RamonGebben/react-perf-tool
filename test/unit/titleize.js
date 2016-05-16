import { expect } from 'chai';
import titleize from '../../src/utils/titleize';

describe('titleize', () => {
  it('should turn camelCased into Camel Cased', () => {
    expect(titleize('camelCased')).to.equal('Camel Cased');
  });
});
