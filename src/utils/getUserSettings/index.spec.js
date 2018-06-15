import getUserSettings from './index';

describe('getUserSettings', () => {
  it('should return return an empty object from mock storage', () => {
    const localStorage = {
      getItem(name) {
        return '{}';
      },
    };
    expect(getUserSettings(localStorage)).toEqual({});
  });
  it('should return return an empty object when no value in storage ', () => {
    const localStorage = {
      getItem(name) {
        return undefined;
      },
    };
    expect(getUserSettings(localStorage)).toEqual({});
  });
});
