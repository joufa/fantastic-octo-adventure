import { MomentTimeSpan } from './timespan';
import { TimeCollection } from './timespan.collection';

const func = () => {
  throw new Error('Custom error');
};

describe('TimeSpanCollection', () => {
  it('should initialize', () => {
    const collection = new TimeCollection<MomentTimeSpan>();
    expect(collection).toBeTruthy();
  });

  it('should insert items in order', () => {
    const collection = new TimeCollection<MomentTimeSpan>();

    const first = new MomentTimeSpan('8.30', '9.00');
    const second = new MomentTimeSpan('11.00', '12.00');
    const third = new MomentTimeSpan('9.45', '10.59');
    const gigu = new MomentTimeSpan('9.01', '09.40');

    collection.insert(second);
    collection.insert(first);
    collection.insert(third);
    collection.insert(gigu);

    expect(collection.length()).toBe(4);
    const spans: MomentTimeSpan[] = collection.getAll();
    expect(spans.length).toBe(4);
    expect(first).toEqual(spans[0]);
  });

  it('should throw error when adding conflicting span', () => {
    const collection = new TimeCollection<MomentTimeSpan>();
    expect(collection.isEmpty()).toBeTruthy();
    const first = new MomentTimeSpan('07.00', '09.00');
    const conflicting = new MomentTimeSpan('08.40', '11.00');

    collection.insert(first);
    expect(collection.length()).toBe(1);
    expect(() => {
      collection.insert(conflicting);
    }).toThrow();

  });
});
