import { MomentTimeSpan } from './timespan';
import { TimeCollection } from './timespan.collection';

describe('Moment timespan', () => {

  it('should initialize', () => {
    const item = new MomentTimeSpan('8.00', '11.00');

    expect(item).toBeTruthy();
    expect(item.duration()).toBe('PT3H');
  });

  it('should be comparable', () => {
    const first = new MomentTimeSpan('8.00', '11.00');
    const firstSame = new MomentTimeSpan('8.00', '11.00');
    const second = new MomentTimeSpan('11.15', '12.00');

    expect(first.isBefore(second)).toBeTruthy();
    expect(second.isAfter(first)).toBeTruthy();
    expect(second.isBefore(first)).toBeFalsy();
  });

  it ('should conflict with timespans', () => {
    const first = new MomentTimeSpan('8.00', '11.00');
    const second = new MomentTimeSpan('7.30', '9.00');
    const third = new MomentTimeSpan('11.15', '12.00');

    const fourth = new MomentTimeSpan('8.30', '9.00');
    const fifth = new MomentTimeSpan('11.00', '12.00');

    expect(first.conflicts(second)).toBeTruthy();
    expect(first.conflicts(third)).toBeFalsy();

    expect(fifth.conflicts(fourth)).toBeFalsy();
  });

});
