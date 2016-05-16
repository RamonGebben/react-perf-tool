import { expect } from 'chai';
import formatTime from '../../src/utils/formatTime';

xdescribe('formatTime', () => {
  it('should return 12:23:02.741 PM for 1463394182741', () => {
    expect(formatTime(1463394182741)).to.equal('12:23:02.741 PM');
  });
});
