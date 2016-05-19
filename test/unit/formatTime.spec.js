import { expect } from 'chai';
import formatTime from '../../src/utils/formatTime';

describe('formatTime', () => {
  it('should return 12:23:02 for 1463394182741', () => {
    expect(formatTime(1463394182741)).to.equal('12:23:02');
  });
});
