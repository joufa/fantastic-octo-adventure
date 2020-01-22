import { MomentTimeSpan } from './moment-timespan';

describe('Moment timespan', () => {

  it('should initialize', () => {
    const item = new MomentTimeSpan('8.00', '11.00');

    expect(item).toBeTruthy();
    expect(item.durationAsString()).toBe('PT3H');
  });

  it('should be comparable', () => {
    const first = new MomentTimeSpan('8.00', '11.00');
    const second = new MomentTimeSpan('11.15', '12.00');

    expect(first.isBefore(second)).toBeTruthy();
    expect(second.isAfter(first)).toBeTruthy();
    expect(second.isBefore(first)).toBeFalsy();
  });

  it ('should conflict with timespans', () => {
    const dep = new MomentTimeSpan('07.30', '08.00');
    const first = new MomentTimeSpan('08.00', '11.00');
    const second = new MomentTimeSpan('7.30', '9.00');
    const third = new MomentTimeSpan('11.15', '12.00');

    const fourth = new MomentTimeSpan('8.30', '9.00');
    const fifth = new MomentTimeSpan('11.00', '12.00');

    expect(first.conflicts(dep)).toBeFalsy();
    expect(first.conflicts(fifth)).toBeFalsy();
    expect(first.conflicts(second)).toBeTruthy();
    expect(first.conflicts(third)).toBeFalsy();

    expect(fifth.conflicts(fourth)).toBeFalsy();
  });

  it ('should handle equality', () => {
    const first = new MomentTimeSpan('8.00', '11.00');
    const second = new MomentTimeSpan('8.00', '11.00');
    const third = new MomentTimeSpan('8.00', '12.00');

    expect(first.isSame(second)).toBeTruthy();
    expect(first.isSame(third)).toBeFalsy();
  });

  it('should handle connections', () => {
    const first = new MomentTimeSpan('8.00', '11.00');
    const second = new MomentTimeSpan('11.00', '12.00');
    const third = new MomentTimeSpan('7.00', '8.00');
    const fourth = new MomentTimeSpan('11.15', '12.00');

    expect(first.isConnectedTo(third, 'start')).toBeTruthy();
    expect(first.isConnectedTo(second, 'end')).toBeTruthy();
    expect(first.isConnectedTo(fourth, 'end')).toBeFalsy();
    expect(() => first.isConnectedTo(second, 'xxx')).toThrow();
  });

});
