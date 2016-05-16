import { expect } from 'chai';
import getUserSettings from '../../src/utils/getUserSettings';
import setUserSettings from '../../src/utils/setUserSettings';

describe('setUserSettings', () => {
  it('should return return a settings object from mock storage', () => {
    const localStorage = {
      storage: {},
      setItem(name, value) {
        this.storage[name] = value;
        return;
      },
      getItem(name) {
        return this.storage[name];
      },
    };
    setUserSettings({ setting: 'setting' }, localStorage);
    expect(getUserSettings(localStorage)).to.eql({ setting: 'setting' });
  });
});
