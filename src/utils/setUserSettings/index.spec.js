import setUserSettings from './index';
import getUserSettings from '../getUserSettings';

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
      },
    };
    setUserSettings({ setting: 'setting' }, localStorage);
    expect(getUserSettings(localStorage)).toEqual({ setting: 'setting' });
  });
});
