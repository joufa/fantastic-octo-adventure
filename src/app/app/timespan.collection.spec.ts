import { MomentTimeSpan } from './timespan';
import { TimeCollection } from './timespan.collection';

describe('TimeSpanCollection', () => {
  it('should initialize', () => {
    const collection = new TimeCollection<MomentTimeSpan>();
    expect(collection).toBeTruthy();
  });

  it('should insert items in order', () => {
    const collection = new TimeCollection<MomentTimeSpan>();
    const first = new MomentTimeSpan('8.30', '9.00');
    const second = new MomentTimeSpan('11.00', '12.00');
    collection.insert(first);
    collection.insert(second);
    expect(collection.length()).toBe(2);
  });

});
