import * as m from 'moment';
import { TimeUtils } from './time.utils';
describe('TimeUtils', () => {
  it('should calculate ETD', () => {
    const expected = 27000;
    const duration = 1500;
    const latestEnd: Date = m('10.30', 'HH.mm').toDate();

    const result: Date = TimeUtils.getETD(expected, latestEnd, duration);
    expect(result.getHours()).toBe(17);
  });
});
