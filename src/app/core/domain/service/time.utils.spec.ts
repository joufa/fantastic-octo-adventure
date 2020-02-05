import * as m from 'moment';
import { TimeUtils } from './time.utils';
import { MomentTimeSpan } from '../model/moment-timespan';
describe('TimeUtils', () => {
  it('should calculate ETD', () => {
    const expected = 27000;
    const duration = 1500;
    const latestEnd: Date = m('10.30', 'HH.mm').toDate();

    const result: Date = TimeUtils.getETD(expected, latestEnd, duration);
    expect(result.getHours()).toBe(17);
  });

  it('should convert to nearest quarter', () => {
   const x = '11:38';
   const result = TimeUtils.roundToNearestQuarter(x);
   expect(result.getMinutes()).toBe(45);
  });

  it('should produce decimal string', () => {
  const span = new MomentTimeSpan('11.30', '12.38');
  expect(TimeUtils.durationToDecimal(span.duration())).toBe('1.25');
  });


});
