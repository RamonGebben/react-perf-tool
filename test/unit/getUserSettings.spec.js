import { expect } from 'chai';
import getUserSettings from '../../src/utils/getUserSettings';

describe('getUserSettings', () => {
  it('should return return an empty object from mock storage', () => {
    const localStorage = {
      getItem(name) {
        return '{}';
      },
    };
    expect(getUserSettings(localStorage)).to.eql({});
  });
});
