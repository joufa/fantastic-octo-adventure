import { MomentTimeSpan } from './timespan';
import { TimeCollection } from './timespan.collection';

describe('Moment timespan', () => {

  it('should initialize', () => {
    const item = new MomentTimeSpan('8.00', '11.00');
    expect(item).toBeTruthy();
    expect(item.duration()).toBe('PT3H');
  });


});
